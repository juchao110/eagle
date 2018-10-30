<template>
<div class="search_component">
	<div>
		<i class="iconfont">&#xe607;</i>
		<span>|</span>
		<form action="" target="nm_iframe">
			<input type="search" v-model.trim="searchWord" :placeholder="placeholder">
			<input type="submit" @click="submit">
		</form>
		<i class="iconfont" v-if="reset" @click="clean">&#xe61b;</i>
		<iframe name="nm_iframe" style="display:none;"></iframe>
	</div>
</div>
</template>

<script>
import '../../assets/sass/component.sass'
export default {
	props: {
		placeholder: '',

	},
	watch: {
		searchWord: function(nv, ov) {
			if (nv) {
				this.reset = true
			} else {
				this.reset = false
			}
		}
	},
	data() {
		return {
			searchWord: '',
			reset: false
		}
	},
	mounted: function() {

	},
	methods: {
		clean() {
			this.searchWord = ''
			this.$emit('searchKey', this.searchWord)
		},
		submit() {
			this.$emit('searchKey', this.searchWord)
		}
	}
}
</script>

<style lang="css">
</style>
