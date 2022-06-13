<template>
  <div class="pay-waiting">
    <component :is="viewName" :config="config"></component>
  </div>
</template>
<script>
import Tools from "@/common/tools"
import transfer from "./components/transfer"
import { injectLanguage } from "@/common/i18n"
import lang from "@/platform/PAY/v-go/language.json"
import langAuto from "./language.json"
let injectOnce = Tools.once(function () {
  injectLanguage(lang)
  injectLanguage(langAuto)
})
export default {
  name: "v-go",
  data() {
    return {
      viewName: "transfer",
      config: null
    }
  },
  created() {
    let storeKey = window.commonParams.currency + this.$route.query.paymentId
    let storeData = JSON.parse(localStorage.getItem(storeKey))
    storeData.qrCodeInfo = storeData.transferInfo
    this.config = storeData
    injectOnce()
  },
  components: {
    transfer
  }
}
</script>
