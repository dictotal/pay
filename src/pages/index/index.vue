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
      this.$$ajax.post('recharge/rechargeInitS').then(res => {
        console.log(res)
        if (res.paymentList && res.paymentList.length > 0) {
          window.config = res
          this.$router.replace('/sports/init')
        } else {
          this.toDetail(res)
        }
      })
    },
    toDetail (data) {
      let url = '/sports/auto'
      localStorage[data.currency + data.paymentId] = JSON.stringify(data)
      if (data.modelType === 'transfer') {
        url = '/sports/go'
      } else if (data.modelType === 'qrcode') {
        url = '/sports/go'
      }
      this.$router.push(`${url}?paymentId=${data.paymentId}&modelType=${data.modelType}`)
    },
	},
	created () {
		this.init()
	}
}
</script>
