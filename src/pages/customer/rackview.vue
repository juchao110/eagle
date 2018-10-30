<template>
<div class="content">
	<Header></Header>
	<div class="rackview_page">
		<div class="current_pos">
			<span>矿场名称：<span>{{$route.query.name}}</span></span>
			<span>机架别名：<span>{{$route.query.alias}}</span></span>
		</div>
		<Search class="search_box" placeholder="请输入矿工名称" @searchKey="getSearchKey"></Search>
		<mt-loadmore :top-method="loadTop" ref="loadmore" style="width:7.5rem">
			<div class="field_item" v-for="l in list" :class="{active:l.id==currentId}">
				<div class="item_name" @click="showDetail(l.id)">
					<div class="name">
						矿工名称：
						<em>{{l.name}}</em>
					</div>
					<div class="id">
						运行正常：
						<span :class="{status:l.status_0==1}">{{l.status_0}}/1</span>
					</div>
					<i class="iconfont" :class="{active:l.id==currentId}">&#xe602;</i>
				</div>
				<ul class="item_info animated" :class="{fadeIn:l.id==currentId}">
					<li>
						连接异常：<span :class="{status:l.status_1==0}">{{l.status_1}}/1</span>
					</li>
					<li>
						算力：<span :class="{status:l.status_4==0&&l.status_3==0}">{{l.power==-1?'-':l.power}}</span>
					</li>
					<li>
						温度异常：<span :class="{status:l.status_2==0}">{{l.status_2}}/1</span>
					</li>
					<li>
						矿机状态：<em>{{l.statusName}}</em>
					</li>
					<li>
						异常状态：<em :class="{error:l.error_type_id!==1}">{{l.errorName}}</em>
					</li>
					<li>
						矿机类型：<em>{{l.minerTypesName}}</em>
					</li>
					<li>
						客户名称：<em>{{l.customerName}}</em>
					</li>
				</ul>
			</div>
		</mt-loadmore>
	</div>
</div>
</template>

<script>
const commandsName = {
	1: '上架',
	1001: '关机',
	1002: '下架'
}
const errorTypesName = {
	1: '无异常',
	10001: '算力板故障',
	10002: '风扇故障',
	10003: '电源故障',
	99999: '其他故障'
}
const minerTypesName = {
	1001: 'Antminer T9+',
	1002: 'Antminer S9',
	1003: 'Antminer S9i',
	1004: 'Antminer L3+',
	1005: 'Antminer L3++',
	1006: 'Antminer D3',
	2001: 'WhatsMiner M3'
}
import {
	fetchCustomerRackview
} from '../../../http/api.js'
import '../../assets/sass/metrics/overview.sass'
export default {
	data() {
		return {
			commands: [{
					id: 1,
					name: '上架'
				},
				{
					id: 1001,
					name: '关机'
				},
				{
					id: 1002,
					name: '下架'
				}
			],
			errorTypes: [{
					id: 1,
					name: '无异常'
				},
				{
					id: 10001,
					name: '算力板故障'
				},
				{
					id: 10002,
					name: '风扇故障'
				},
				{
					id: 10003,
					name: '电源故障'
				},
				{
					id: 99999,
					name: '其他故障'
				}
			],
			minerTypes: [{
					id: 1001,
					name: 'Antminer T9+'
				},
				{
					id: 1002,
					name: 'Antminer S9'
				},
				{
					id: 1003,
					name: 'Antminer S9i'
				},
				{
					id: 1004,
					name: 'Antminer L3+'
				},
				{
					id: 1005,
					name: 'Antminer L3++'
				},
				{
					id: 1006,
					name: 'Antminer D3'
				},
				{
					id: 2001,
					name: 'WhatsMiner M3'
				}
			],
			list: [],
			copyList: '',
			currentId: '',
			customerList: '',
			customerName: {}
		}
	},
	mounted: function() {
		this.timer()
	},
	methods: {
		getTimestamp() {
			if (parseInt(localStorage.time) >= 120) {
				return Math.round(new Date().getTime() / 1000) - parseInt(localStorage.time)
			} else {
				return Math.round(new Date().getTime() / 1000) - 60 * 2
			}
		},
		timer() {
			let current = this.getTimestamp()
			let currentInt = parseInt(current / 60) * 60
			let time = ''
			if (parseInt(localStorage.time) >= 120) {
				time = parseInt(localStorage.time)
			} else {
				time = 60
			}
			for (let i = 0; i <= localStorage.time / 60; i++) {
				if ((currentInt - 60 * i) % time === 0) {
					this.getList(currentInt - 60 * i)
					return
				}
			}

		},
		getList(time) {
			this.list = []
			fetchCustomerRackview(time, this.$route.query.owner, this.$route.query.id, this.$route.query.rack_id).then(res => {
				this.customerList = res.data.customers
				this.customerList.push({
					name: '不指定客户',
					id: -1
				})
				this.customerList.forEach(e => {
					this.customerName[e.id] = e.name
				})
				res.data.miners.forEach(e => {
					if (e[this.$route.query.customerid] === undefined) {
						return
					}
					this.list.push(e[this.$route.query.customerid])
				})
				this.list.forEach(e => {
					if (e.status_1001 === 1) {
						e.status = 1002
						e.statusName = commandsName[e.status]
					} else if (e.status_1002 === 1) {
						e.status = 1002
						e.statusName = commandsName[e.status]
					} else {
						e.status = 1
						e.statusName = commandsName[e.status]
					}
					if (e.status_10001 === 1) {
						e.error_type_id = 10001
						e.errorName = errorTypesName[e.error_type_id]
					} else if (e.status_10002 === 1) {
						e.error_type_id = 10002
						e.errorName = errorTypesName[e.error_type_id]
					} else if (e.status_10003 === 1) {
						e.error_type_id = 10003
						e.errorName = errorTypesName[e.error_type_id]
					} else if (e.status_99999 === 1) {
						e.error_type_id = 99999
						e.errorName = errorTypesName[e.error_type_id]
					} else {
						e.error_type_id = 1
						e.errorName = errorTypesName[e.error_type_id]
					}
					e.minerTypesName = minerTypesName[e.type_id]
					e.customerName = this.customerName[e.customer_id]
				})

				this.list.sort(function(a, b) {
					if (a.status_0 !== b.status_0) {
						return b.status_0 - a.status_0
					}
					if (a.status_4 !== b.status_4) {
						return b.status_4 - a.status_4
					}
					if (a.status_3 !== b.status_3) {
						return b.status_3 - a.status_3
					}
					if (a.status_2 !== b.status_2) {
						return b.status_2 - a.status_2
					}
					if (a.status !== b.status) {
						return b.status - a.status
					}
					if (a.error_type_id !== b.error_type_id) {
						return b.error_type_id - a.error_type_id
					}
					var a_last = parseInt(a.name.split('.')[3])
					var b_last = parseInt(b.name.split('.')[3])
					return a_last - b_last
				})
				this.copyList = this.list
			})
		},
		loadTop() {
			this.timer()
			this.$refs.loadmore.onTopLoaded()
		},
		showDetail(id) {
			if (id == this.currentId) {
				this.currentId = ""
				return
			}
			this.currentId = id
		},
		getSearchKey(data) {
			this.list = this.copyList
			let searchResult = []
			for (let i in this.list) {
				if (this.list[i].name.indexOf(data) > -1) {
					searchResult.push(this.list[i])
				}
			}
			this.list = searchResult
		}
	}
}
</script>
