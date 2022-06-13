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
				if (res.paymentList && res.paymentList.length > 0) {
					window.config = res
					this.$router.replace('/sports/init')
				} else if (res.transferInfo && res.transferInfo.status === 'pay$confirm') {
					localStorage.setItem(`charge${res.orderNo}`, JSON.stringify(res))
					this.$router.replace(`/charge/status/${res.orderNo}`)
					return
				} else {
					this.toDetail(res)
				}
			}).catch(err => {
				console.log(err)
			})
		},
		toDetail (data) {
			let url = '/sports/auto'
			localStorage[data.currency + data.paymentId] = JSON.stringify(data)
			if (data.modelType === 'transfer' || data.modelType === 'online') {
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
