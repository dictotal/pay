<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script type="text/ecmascript-6">
import {changeLanguage, injectLanguage} from "@/common/i18n";
import language from '@/common/i18n/language.json'
changeLanguage(window.lang)
export default {
    name: "app",
    data() {
      return {}
  },
  created () {
    injectLanguage(language)
    console.log(window.commonParams)
    if (['Ttag'].includes(window.commonParams.platform)) document.body.className = 'pvp'
  }
}
</script>
<style lang="scss">
@import "scss/base";
@import "scss/common";
@import "scss/mobile";
@import "scss/font/wdfont";
#app {
  height: 100%;
}
</style>
