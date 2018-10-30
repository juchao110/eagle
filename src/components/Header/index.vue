<template>
<div class="common_header">
	<i class="iconfont back" @click="goBack">&#xe604;</i> {{title}}
</div>
</template>

<script>
import '../../assets/sass/component.sass'
export default {
	data() {
		return {
			title: ''
		}
	},
	mounted: function() {
		this.title = this.$store.state.headerTitle
	},
	methods: {
		goBack() {
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="css">
</style>
