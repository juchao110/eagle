<template>
<div class="content">
	<Header></Header>
	<div class="monitor_status_page">
		<mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore" style="width:7.5rem">
			<div v-if="list" v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="1">
				<div class="field_item" :class="{active:index==currentIndex}" v-for="(l,index) in list">
					<div class="item_name" @click="showDetail(index)">
						<div class="name">
							<span>{{l.pool_name}}</span>
						</div>
						<div class="time">
							发生时间：
							<span>{{l.created_at | YYYY-MM-DD-hh-mm}}</span>
						</div>
						<i class="iconfont" :class="{active:index==currentIndex}">&#xe602;</i>
					</div>
					<div class="item_info animated" :class="{fadeIn:index==currentIndex}">
						<ul class="item_info_ul">
							<li>
								矿场名称：<span class="blue">{{l.pool_name}}</span>
							</li>
							<li>
								连接异常：<span :class="{status:l.done.status_1==l.summary.status_1}">{{l.done.status_1}}/{{l.summary.status_1}}</span>
							</li>
							<li>
								算力丢失：<span :class="{status:l.done.status_4==l.summary.status_4}">{{l.done.status_4}}/{{l.summary.status_4}}</span>
							</li>
							<li>
								算力偏低：<span :class="{status:l.done.status_3==l.summary.status_3}">{{l.done.status_3}}/{{l.summary.status_3}}</span>
							</li>
							<li>
								温度异常：<span :class="{status:l.done.status_2==l.summary.status_2}">{{l.done.status_2}}/{{l.summary.status_2}}</span>
							</li>
						</ul>
					</div>

				</div>
			</div>
		</mt-loadmore>
	</div>
</div>
</template>

<script>
import '../../assets/sass/monitor/monitorstatus.sass'
import {
	getMonitorStatus
} from '../../../http/api'
import {
	Indicator,
	InfiniteScroll,
	Toast,
	Popup
} from 'mint-ui'
export default {
	data() {
		return {
			currentPage: 1,
			pageSize: 20,
			oldList: '',
			list: '',
			allLoaded: true,
			loading: false,
			currentIndex: -1,

		}
	},
	mounted: function() {
		this.getList()
	},
	methods: {
		getList() {
			getMonitorStatus({
				page_index: this.currentPage,
				page_size: this.pageSize
			}).then(res => {
				this.oldList = res.data.data.list
				this.list = res.data.data.list

				// let newList = []
				// for (let i = 0; i < list.length; i++) {
				// 	for (let j = i + 1; j < list.length; j++)
				// 		if (list[i].created_at == list[j].created_at) {
				// 			let arr = []
				// 			arr.push(list[i], list[j])
				// 			newList.push({
				// 				created_at: list[i].created_at,
				// 				arr: arr
				// 			})
				// 		}
				// }
				// this.list = newList
				// console.log(this.list)
			})
		},
		loadTop() {
			this.currentPage = 1
			this.getList()
			this.$refs.loadmore.onTopLoaded()
		},
		loadMore() {
			this.currentPage += 1
			getMonitorStatus({
				page_index: this.currentPage,
				page_size: this.pageSize
			}).then(res => {
				this.oldList = [...this.oldList, ...res.data.data.list]
				let list = res.data.data.list
				if (list.length == 0) {
					this.loading = true
					Toast({
						message: '没有更多数据了',
						duration: 3000
					})
					return
				}
				// list = this.oldList
				// let newList = []
				// for (let i = 0; i < list.length; i++) {
				// 	for (let j = i + 1; j < list.length; j++)
				// 		if (list[i].created_at == list[j].created_at) {
				// 			let arr = []
				// 			arr.push(list[i], list[j])
				// 			newList.push({
				// 				created_at: list[i].created_at,
				// 				arr: arr
				// 			})
				// 		}
				// }
				this.list = this.oldList
			})
		},
		showDetail(index) {
			if (index == this.currentIndex) {
				this.currentIndex = -1
				return
			}
			this.currentIndex = index
		}
	}
}
</script>
