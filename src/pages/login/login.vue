<template>
<div class="login_page">
	<h3>
        <img src="../../assets/images/logo.png" alt="">
    </h3>
	<div class="user_name">
		<i class="iconfont">&#xe619;</i>
		<input type="text" v-model="userName" placeholder="请输入用户名">
	</div>
	<div class="password">
		<i class="iconfont">&#xe618;</i>
		<input type="password" v-model="password" placeholder="请输入密码">
	</div>
	<button type="button" name="button" class="login_btn" @click="login">登  录</button>
</div>
</template>

<script>
import '../../assets/sass/login/login.sass'
import {
	Toast,
	Indicator
} from 'mint-ui'
import {
	mapActions,
	mapMutations
} from 'vuex'
import {
	getUserInfo,
	loginByUsername
} from '../../../http/api.js'
export default {
	data() {
		return {
			userName: '',
			password: '',
		}
	},
	mounted: function() {

	},
	methods: {
		...mapActions(['setUserInfo']),
		...mapMutations(['CHANGEMENUICON']),
		login() {
			if (!this.userName) {
				Toast({
					message: '请输入用户名',
					duration: 3000
				})
				return
			}
			if (!this.password) {
				Toast({
					message: '请输入密码',
					duration: 3000
				})
				return
			}
			loginByUsername({
				'username': this.userName,
				'password': this.password
			}).then(res => {
				if (res.data.error !== undefined) {
					Toast({
						message: res.data.error,
						duration: 3000
					})
					return
				}
				localStorage.setItem('token', res.data.user_token)
				getUserInfo().then(res => {
					if (res.data.error !== undefined) {
						Toast({
							message: '登录失效，请重新登录',
							duration: 5000
						});
						this.$router.push({
							path: '/login'
						})
						return
					}
					this.setUserInfo(res.data)
					this.$store.commit('CHANGEMENUICON', true)
					localStorage.setItem('time', res.data.collect_interval)
					this.$router.push({
						path: "/index"
					})
				})

			})
		}
	}
}
</script>

<style lang="css">
</style>
