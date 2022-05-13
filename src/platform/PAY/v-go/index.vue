<template>
  <div class="pay-waiting">
    <component :is="viewName" :config="config"></component>
  </div>
</template>
<script>
import qrcode from './components/qr'
import onlineBank from './components/onlineBank'
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
    if (this.$route.query.paymentType === 'transpay') {
      this.viewName = 'transfer'
      this.config = transferData
    } else if (this.$route.query.paymentType === 'third') {
       this.viewName = 'qrcode'
       this.config = qrcodeData
    } else if (this.$route.query.paymentId === 'zz_vader_online') {
        this.viewName = 'onlineBank'
        this.config = qrcodeData
    }
  },
  components: {
    transfer,
    qrcode,
    onlineBank
  }
}
</script>
