<template>
  <div class="pay-waiting">
    <component :is="viewName" :config="config"></component>
  </div>
</template>
<script>
import Tools from '@/common/tools'
import transfer from './components/transfer'
import langAuto from './language.json'
import {injectLanguage} from "@/common/i18n";
import lang from "@/platform/PAY/v-go/language.json";
let injectOnce = Tools.once(function(){
  injectLanguage(lang);
  injectLanguage(langAuto);
});
import {
    autoOrder
} from '@/data'
export default {
  name: 'v-go',
  data() {
    return {
      viewName: 'transfer',
      config: {}
    }
  },
  created() {
    injectOnce()
    this.config = autoOrder
  },
  components: {
    transfer
  }
}
</script>
