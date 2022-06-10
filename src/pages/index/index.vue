<template>
  <div id="name"></div>
</template>
<script type="text/ecmascript-6">
export default {
	name: 'Index',
	data () {
		return {

		}
	},
	methods: {
		init () {
			this.$router.push('/sports/init')
		}
	},
	created () {
		this.init()
	}
}
</script>
