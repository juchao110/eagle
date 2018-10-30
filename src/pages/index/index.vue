<template>
<div class="content">
	<div class="index_page">
		<h3>欢迎进入鹰眼矿场管理系统</h3>
		<div class="all_view">
			<router-link to="/metrics" tag="div" class="all_view_item">
				<i class="iconfont run">&#xe66d;</i>
				<span>运行正常
						<em class="run">{{view.normal}}</em>
					</span>
			</router-link>
			<router-link to="/metrics" tag="div" class="all_view_item">
				<i class="iconfont contect">&#xe65e;</i>
				<span>连接异常
						<em class="contect">{{view.contect}}</em>
					</span>
			</router-link>
			<router-link to="/metrics" tag="div" class="all_view_item">
				<i class="iconfont power">&#xe60d;</i>
				<span>算力丢失
						<em class="power">{{view.power}}</em>
					</span>
			</router-link>
			<router-link to="/metrics" tag="div" class="all_view_item">
				<i class="iconfont temp">&#xe67f;</i>
				<span>温度异常
						<em class="temp">{{view.temp}}</em>
					</span>
			</router-link>
		</div>
	</div>
</div>
</template>

<script>
import '../../assets/sass/index/index.sass'
import {
	fetchOverview
} from '../../../http/api.js'
export default {
	data() {
		return {
			view: {
				normal: 0,
				contect: 0,
				temp: 0,
				power: 0,
			}
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
			fetchOverview(time, this.$store.state.userInfo.id).then(res => {
				if (res.data.error !== undefined) {
					return
				}
				for (let i = 0; i < res.data.pools.length; i++) {
					this.view.normal += res.data.pools[i].status_0
					this.view.contect += res.data.pools[i].status_1
					this.view.temp += res.data.pools[i].status_2
					this.view.power += res.data.pools[i].status_4
				}
			})
		},
	}
}
</script>
