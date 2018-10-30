<template>
<div class="content">
	<Header></Header>
	<div class="overview_page padding_t_120" v-if="list">
		<mt-loadmore :top-method="loadTop" ref="loadmore" style="width:7.5rem">
			<div class="field_item" :class="{active:l.id==currentId}" v-for="l in list">
				<div class="item_name" @click="showDetail(l.id)">
					<div class="name">
						客户名称：
						<em>{{l.name}}</em>
					</div>
					<div class="id">
						运行正常：<span :class="{status:getStatus(l.status_0,l)}">{{l.status_0}}/{{l.status_0+l.status_1+l.status_2+l.status_3+l.status_4+l.status_1001+l.status_1002}}</span>
					</div>
					<i class="iconfont" :class="{active:l.id==currentId}">&#xe602;</i>
				</div>
				<div class="right_icon">
					<i class="iconfont">&#xe606;</i>
				</div>
				<ul class="item_info animated" :class="{fadeIn:l.id==currentId}" @click="goOverView(l.id,l.name)">
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
			<div class="empty" v-if="list.length==0">
				暂无矿场
			</div>
		</mt-loadmore>

	</div>
</div>
</template>

<script>
import {
	fetchCustomersList,
} from '../../../http/api.js'
import {
	Toast
} from 'mint-ui'
import '../../assets/sass/metrics/overview.sass'
export default {
	data() {
		return {
			list: '',
			currentId: ''
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
			fetchCustomersList(time, this.$store.state.userInfo.id).then(res => {
				if (res.data.error !== undefined) {
					return
				}
				res.data.customers.sort(function(a, b) {
					if (a.id !== b.id) {
						return a.id - b.id
					}
				})
				this.list = res.data.customers
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
		goOverView(id, name) {
			this.$router.push({
				path: 'overview',
				query: {
					id: id,
				}
			})
		}
	}
}
</script>
