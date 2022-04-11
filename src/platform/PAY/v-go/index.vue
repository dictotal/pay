<template>
  <div class="pay-waiting">
    <component :is="viewName" :config="config"></component>
  </div>
</template>
<script>
import qrcode from './components/qr'
import transfer from './components/transfer'
export default {
  name: 'v-go',
  props: {
    config: {
      type: Object,
    }
  },
  data() {
    return {
      viewName: 'transfer'
    }
  },
  created() {
    if (this.config.qrCodeInfo) {
      this.viewName = 'qrcode'
    } else if (this.config.transferInfo) {
      this.viewName = 'transfer'
    }
    console.log(this.config)
  },
  components: {
    transfer,
    qrcode
  }
}
</script>
