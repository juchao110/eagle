<template>
<div class="content">
	<Header></Header>
	<div class="poolview_page padding_t_80">
		<div class="current_pos">
			<span>矿场名称：<span>{{$route.query.name}}</span></span>
		</div>
		<Search class="search_box" placeholder="请输入机架名称或别名" @searchKey="getSearchKey"></Search>
		<mt-loadmore :top-method="loadTop" ref="loadmore" style="width:7.5rem">
			<div class="field_item" :class="{active:l.id==currentId}" v-for="l in list">
				<div class="item_name" @click="showDetail(l.id)">
					<div class="name">
						机架名称：
						<em>{{l.name}}</em>
					</div>
					<div class="id">
						机架别名：
						<em>{{l.alias}}</em>
					</div>
					<i class="iconfont" :class="{active:l.id==currentId}">&#xe602;</i>
				</div>
				<div class="right_icon">
					<i class="iconfont">&#xe606;</i>
				</div>
				<ul class="item_info animated" :class="{fadeIn:l.id==currentId}" @click="goRackView(l.id,l.alias)">
					<li>
						运行正常：<span :class="{status:getStatus(l.status_0,l)}">{{l.status_0}}/{{l.status_0+l.status_1+l.status_2+l.status_3+l.status_4+l.status_1001+l.status_1002}}</span>
					</li>
					<li>
						连接异常：<span :class="{status:l.status_1==0}">{{l.status_1}}/{{l.status_0+l.status_1+l.status_2+l.status_3+l.status_4+l.status_1001+l.status_1002}}</span>
					</li>
					<li>
						算力丢失：<span :class="{status:l.status_4==0}">{{l.status_4}}/{{l.status_0+l.status_1+l.status_2+l.status_3+l.status_4+l.status_1001+l.status_1002}}</span>
					</li>
					<li>
						算力偏低：<span :class="{status:l.status_3==0}">{{l.status_3}}/{{l.status_0+l.status_1+l.status_2+l.status_3+l.status_4+l.status_1001+l.status_1002}}</span>
					</li>
					<li>
						温度异常：<span :class="{status:l.status_2==0}">{{l.status_2}}/{{l.status_0+l.status_1+l.status_2+l.status_3+l.status_4+l.status_1001+l.status_1002}}</span>
					</li>
					<li>
						关机：<span :class="{status:l.status_1001==0}">{{l.status_1001}}/{{l.status_0+l.status_1+l.status_2+l.status_3+l.status_4+l.status_1001+l.status_1002}}</span>
					</li>
					<li>
						下架：<span :class="{status:l.status_1002==0}">{{l.status_1002}}/{{l.status_0+l.status_1+l.status_2+l.status_3+l.status_4+l.status_1001+l.status_1002}}</span>
					</li>
				</ul>
			</div>
		</mt-loadmore>
	</div>
</div>
</template>

<script>
import {
	fetchCustomerPoolview
} from '../../../http/api.js'
import '../../assets/sass/metrics/overview.sass'

export default {
	data() {
		return {
			list: [],
			currentId: '',
			copyList: ''
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
			fetchCustomerPoolview(time, this.$route.query.owner, this.$route.query.id).then(res => {
				if (res.data.error !== undefined) {
					return
				}
				res.data.racks.forEach(e => {
					if (e[this.$route.query.customerid] === undefined) {
						return
					}
					this.list.push(e[this.$route.query.customerid])
				})
				this.list.sort(function(a, b) {
					if (a.status_1 !== b.status_1) {
						return b.status_1 - a.status_1
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
					if (a.status_1001 !== b.status_1001) {
						return b.status_1001 - a.status_1001
					}
					if (a.status_1002 !== b.status_1002) {
						return b.status_1002 - a.status_1002
					}
					var a_rack = parseInt(a.name)
					var b_rack = parseInt(b.name)
					return a_rack - b_rack
				})
				this.copyList = this.list
			})
		},
		loadTop() {
			this.timer()
			this.$refs.loadmore.onTopLoaded()
		},
		getStatus(cur, all) {
			if (cur != all.status_0 + all.status_1 + all.status_2 + all.status_3 + all.status_4 + all.status_1001 + all.status_1002) {
				return false
			} else {
				return true
			}
		},
		showDetail(id) {
			if (id == this.currentId) {
				this.currentId = ""
				return
			}
			this.currentId = id
		},
		goRackView(id, alias) {
			this.$router.push({
				path: 'rackview',
				query: {
					owner: this.$route.query.owner,
					id: this.$route.query.id,
					rack_id: id,
					name: this.$route.query.name,
					alias: alias,
					customerid: this.$route.query.customerid
				}
			})
		},
		getSearchKey(data) {
			this.list = this.copyList
			let searchResult = []
			for (let i in this.list) {
				if (this.list[i].name.indexOf(data) > -1 || this.list[i].alias.indexOf(data) > -1) {
					searchResult.push(this.list[i])
				}
			}
			this.list = searchResult
		}
	}
}
</script>
