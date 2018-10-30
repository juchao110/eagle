<template>
<div class="left_menu_component">
	<ul class="first_level">
		<router-link @click.native="handleGo" to="/index" tag="li">
			<div>
				<i class="iconfont">&#xe63c;</i> 首页
			</div>
		</router-link>
		<li v-for="i in level" :class="{active:i.first==currentLevel}">
			<div @click="showSecondLevel(i.first)">
				<icon :name="i.icon" height=".4rem" width=".4rem" style="position:relative;top:.08rem"></icon>
				{{i.first}}
				<i class="iconfont showLevel" :class="{active:currentLevel==i.first}">&#xe602;</i>
			</div>
			<ul class="second_level animated" :class="{fadeIn:i.first==currentLevel}">
				<router-link @click.native="handleGo" :to='s.link' tag='li' v-for="s in i.child" :key="s.link">{{s.second}}</router-link>
			</ul>
		</li>
	</ul>
</div>
</template>

<script>
import '../../assets/sass/component.sass'
export default {
	props: {
		level: ''
	},
	data() {
		return {
			currentLevel: ''
		}
	},
	mounted: function() {

	},
	methods: {
		showSecondLevel(l) {
			if (this.currentLevel == l) {
				this.currentLevel = ''
				return
			}
			this.currentLevel = l
		},
		handleGo() {
			this.$emit('menuStatus', false)
		}
	}
}
</script>

<style lang="css">
</style>
