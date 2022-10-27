export default {
  data () {

  },
  methods: {
    getOrderData () {
      return new Promise((resolve, reject) => {
        this.$$ajaxLoading.post('/recharge/rechargeInitS').then(res => {
          if (res.paymentList && res.paymentList.length > 0) {
            window.config = res
            this.$router.replace('/sports/init')
          } else if (res.transferInfo && res.transferInfo.status === 'pay$confirm') {
            this.$router.replace(`/charge/status/${res.orderNo}`)
            return
          } else {
            resolve(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
}
