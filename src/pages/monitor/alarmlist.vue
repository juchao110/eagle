<template>
<div class="content">
	<Header></Header>
	<div class="alarm_list_page">
		<div class="nav_list">
			<div v-for="s in statusList" :class="{current:currentStatus==s.status}" @click="changeStatus(s.status)">
				{{s.name}}
			</div>
		</div>
		<mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore" style="width:7.5rem">
			<div v-if="listData" v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="1">
				<ul class="alarm">
					<li v-for="l in listData">
						<div class="alarm_name">
							<p class="name">
								<span>报警名称：</span> {{l.name}}
							</p>
							<p class="status" :class="{stop:l.status==0}">
								<span>当前状态：</span> {{getStatus(l.status)}}
							</p>
						</div>
						<div class="btn_list">
							<button type="button" class="start" :disabled="l.status==1" :class="{disabled:l.status==1}" @click="operate('启用',l.id)">启用</button>
							<button type="button" class="stop" :disabled="l.status==0" :class="{disabled:l.status==0}" @click="operate('停用',l.id)">停用</button>
							<button type="button" class="delete" @click="operate('删除',l.id)">删除</button>
						</div>
					</li>
				</ul>
			</div>
		</mt-loadmore>
	</div>
	<mt-popup v-model="popupVisible" popup-transition="popup-fade">
		<div class="alarm_pop_div">
			<h3>确认{{operateTypeName}}？</h3>
			<div class="operate_div">
				<div @click="submit">
					确定
				</div>
				<div @click="popupVisible=false">
					取消
				</div>
			</div>
		</div>
	</mt-popup>
</div>
</template>

<script>
import '../../assets/sass/monitor/alarmlist.sass'
import {
	alarmList,
	changeAlarm,
	deleteAlarm
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
			statusList: [{
				name: '全部',
				status: '-1'
			}, {
				name: '已启用',
				status: '1'
			}, {
				name: '已停用',
				status: '0'
			}],
			currentStatus: -1,
			pageSize: 15,
			currentPage: 1,
			list: '',
			listData: '',
			loading: false,
			allLoaded: true,
			popupVisible: false,
			operateTypeName: '',
			currentId: ''
		}
	},
	mounted: function() {
		this.getList()
	},
	methods: {
		getList() {
			alarmList({
				page_index: this.currentPage,
				page_size: this.pageSize
			}).then(res => {
				this.list = res.data.data
				this.listData = ''
				let filterArr = []
				if (this.currentStatus != -1) {
					for (let i in res.data.data.list) {
						if (res.data.data.list[i].status == this.currentStatus) {
							filterArr.push(res.data.data.list[i])
						}
					}
					this.listData = filterArr
				} else {
					this.listData = res.data.data.list
				}
				this.listData.sort((a, b) => {
					if (a.id !== b.id) {
						return b.id - a.id
					}
				})
			})
		},
		getStatus(n) {
			if (n == 1) {
				return '已启用'
			} else if (n == 0) {
				return '已停用'
			} else {
				return '非法状态'
			}
		},
		changeStatus(s) {
			this.currentPage = 1
			this.currentStatus = s
			this.getList()
		},
		loadTop() {
			this.currentPage = 1
			this.getList()
			this.$refs.loadmore.onTopLoaded()
			this.loading = false
		},
		loadMore() {
			this.currentPage += 1
			alarmList({
				page_index: this.currentPage,
				page_size: this.pageSize
			}).then(res => {
				if (res.data.data.list.length == 0) {
					this.loading = true
					Toast({
						message: '没有更多数据了',
						duration: 3000
					})
					return
				}
				this.list = res.data.data
				let filterArr = []
				if (this.currentStatus != -1) {
					for (let i in res.data.data.list) {
						if (res.data.data.list[i].status == this.currentStatus) {
							filterArr.push(res.data.data.list[i])
						}
					}
					this.listData = [...filterArr, ...this.listData]
				} else {
					this.listData = [...this.listData, ...res.data.data.list]
				}
				this.listData.sort((a, b) => {
					if (a.id !== b.id) {
						return b.id - a.id
					}
				})
			})
		},
		operate(type, id) {
			this.operateTypeName = type
			this.currentId = id
			this.popupVisible = true
		},
		doChange() {
			let status
			if (this.operateTypeName == '启用') {
				status = 1
			} else if (this.operateTypeName == '停用') {
				status = 0
			}
			changeAlarm(this.currentId, status).then(res => {
				if (res.data.error !== undefined) {
					Toast({
						message: res.data.error,
						duration: 3000
					})
					return
				}
				if (res.data.status === 0) {
					Toast({
						message: `${this.operateTypeName}操作成功`,
						duration: 3000
					})
					this.popupVisible = false
					this.getList()
				}
			})
		},
		doDelete() {
			deleteAlarm(this.currentId).then(res => {
				if (res.data.error !== undefined) {
					Toast({
						message: res.data.error,
						duration: 3000
					})
					return
				}
				if (res.data.status === 0) {
					Toast({
						message: `${this.operateTypeName}操作成功`,
						duration: 3000
					})
					this.popupVisible = false
					this.getList()
				}
			})
		},
		submit() {
			if (this.operateTypeName == '删除') {
				this.doDelete()
			} else {
				this.doChange()
			}
		}
	}
}
</script>
