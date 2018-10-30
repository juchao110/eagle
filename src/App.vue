<template>
<div id="app" :class="{disable_scroll:status}">
	<div class="black_bg" v-if="status" @click="status=false"></div>
	<div class="menu_box">
		<LeftMenu v-if="status" :level="$store.state.leftMenu" @menuStatus="getStatus" class="animated" :class="{fadeInLeft:status}"></LeftMenu>
		<div class="menu_icon" @click="status=true" v-if="!status&&$store.state.menuIcon">
			<i class="iconfont">&#xe6b9;</i>
		</div>
	</div>
	<router-view class="animated fadeIn" />
</div>
</template>

<script>
import {
	getUserInfo
} from '../http/api.js'
import {
	mapActions,
	mapMutations
} from 'vuex'
import {
	Toast
} from 'mint-ui'
export default {
	name: 'App',
	data() {
		return {
			status: false,
			isLogin: false
		}
	},
	created: function() {

	},
	methods: {
		getStatus(data) {
			this.status = data
		},
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: left;
}

.black_bg {
	width: 100%;
	height: 100vh;
	position: absolute;
	left: 0;
	top: 0;
	background: rgba(0, 0, 0, 0.4);
	z-index: 99
}

.menu_icon {
	width: .8rem;
	height: .8rem;
	text-align: center;
	line-height: .8rem;
	position: fixed;
	left: .2rem;
	bottom: 2rem;
	background: #09f;
	border-radius: 50%;
	box-shadow: 0 0 10px 1px #09f;
	z-index: 99
}

.menu_icon i {
	color: #fff
}
</style>
