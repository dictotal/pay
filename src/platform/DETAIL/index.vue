<template>
  <div class="detail-index">
    <component :is="activeView" :config="config"></component>
    <customer :config="config"></customer>
  </div>
</template>
<script type="text/ecmascript-6">
import {changeLanguage, injectLanguage} from "@/common/i18n";

let input  = document.querySelector("body > input[type=hidden]");
const CONFIG = input?JSON.parse(input.value):{};
changeLanguage(CONFIG.lang||"zh");
import applyDetail from "./components/applyDetail"
import chargeDetail from "./components/chargeDetail";
import customer from "./components/customer";
import lang from './language.json'
injectLanguage(lang);

export default {
  name: "detail",
  data() {
    return {
      config: CONFIG,
      statusConfig: {

      }
    }
  },
  created() {
    this.config = CONFIG
  },
  computed: {
    activeView() {
      if(this.$$cfg.isTestModel){
        return 'chargeDetail';
      }
      return `v-${this.view}`;
    }
  },
  components: {
    chargeDetail,
    applyDetail,
    customer
  }
}
</script>

<style lang="scss">
.detail-index {
  padding: 1px;
}
.common-wrapper {
  width: 355px;
  border-radius: 10px;
  background: $skin-bg5;
  margin: 10px auto;
  color: $skin-font1;
  padding: 1px 0;
}
.active-title {
  display: flex;
  align-items: center;
  height: 45px;
  justify-content: center;
  font-size: 12px;
  &-icon {
    margin-right: 10px;
  }
}
.active-detail-icon {
  width: 70px;
  height: 70px;
  margin: 30px auto 10px;
  display: block;
}
.active-status {
  margin-bottom: 30px;
  color: $skin-color1;
  font-size: 17px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  font-weight: bold
}
</style>