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
  }
}
</script>
<style lang="scss">
@import "scss/base";
@import "scss/common";
@import "scss/mobile";
#app {
  height: 100%;
}
</style>
