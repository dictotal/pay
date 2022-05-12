<template>
  <div class="pay-waiting">
    <component :is="viewName" :config="config"></component>
  </div>
</template>
<script>
import qrcode from './components/qr'
import transfer from './components/transfer'
import {
    qrcodeData,
    transferData
} from '@/data'
export default {
  name: 'v-go',
  data() {
    return {
      viewName: '',
      config: {}
    }
  },
  created() {
    console.log(this.$route.query)
    if (this.$route.query.paymentType === 'transpay') {
      this.viewName = 'transfer'
      this.config = transferData
    } else if (this.$route.query.paymentType === 'third') {
       this.viewName = 'qrcode'
       this.config = qrcodeData
    }
  },
  components: {
    transfer,
    qrcode
  }
}
</script>
