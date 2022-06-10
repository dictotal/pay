<template>
  <transition name="confirm">
    <div class="guild-tip" v-if="isShow" :style="{ 'z-index': zIndex }">
      <img class="guild-tip-image" :src="`/images/${parentData.bankType}.png`" width="530" height="900" alt="" />
      <img class="close-icon" @click="close" src="/images/close.svg" alt="" />
    </div>
  </transition>
</template>

<script>
import IndexTools from "@/common/z-index"
import { injectLanguage } from "@/common/i18n"
import lang from "./language.json"

injectLanguage(lang)
export default {
  name: "confirmName",
  data() {
    return {
      parentData: {},
      zIndex: 0,
      isShow: false,
      maskId: ""
    }
  },
  methods: {
    show(parentData) {
      this.isShow = true
      this.parentData = parentData
      this.maskId = this.$$mask.show(() => {
        this.$$mask.hidden(this.maskId)
        this.isShow = false
      })
      this.zIndex = IndexTools.getZIndex() + 1
    },
    close() {
      this.$$mask.hidden(this.maskId)
      this.isShow = false
    }
  }
}
</script>

<style scoped lang="scss">
.guild-tip {
  position: fixed;
  color: $skin-font1;
  left: 50%;
  top: 50%;
  transform: scale(1) translate(-50%, -50%);
  .close-icon {
    width: 36px;
    height: 36px;
    display: block;
    margin: 10px auto;
  }
}
.confirm-enter-active {
  animation: confirm-in 0.3s;
}

.confirm-leave-active {
  animation: confirm-out 0.3s;
}

@keyframes confirm-in {
  0% {
    transform: scale(0.8) translate(-50%, -50%);
    opacity: 0;
  }

  to {
    transform: scale(1) translate(-50%, -50%);
    opacity: 1;
  }
}

@keyframes confirm-out {
  0% {
    transform: scale(1) translate(-50%, -50%);
    opacity: 1;
  }

  to {
    transform: scale(0.8) translate(-50%, -50%);
    opacity: 0;
  }
}
</style>
