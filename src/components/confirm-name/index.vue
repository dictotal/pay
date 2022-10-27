<template>
  <transition name="confirm">
    <div class="confirm-name" v-if="isShow" :style="{ 'z-index': zIndex }">
      <div class="confirm-title">{{ $i18n("confirm.txt1", "付款人开户名") }}</div>
      <div class="confirm-input">
        <input class="confirm-input-model" v-model="parentData.content" maxlength="50" :placeholder="parentData.placeholder || $i18n('confirm.txt3', '输入付款人姓名')" type="text" />
      </div>
      <div class="confirm-tip">{{ $i18n("confirm.txt2", "请正确填入付款银行卡开户名，填错将会影响充值到账") }}</div>
      <div class="confirm-btns flex">
        <div class="confirm-btn cancel-btn">{{ $i18n("confirm.txt6", "取消") }}</div>
        <div class="confirm-btn" @click="confirm">{{ $i18n("confirm.txt5", "确定") }}</div>
      </div>
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
    confirm() {
      this.parentData.success &&
        this.parentData.success(true, {
          keyword: this.parentData.content.trim()
        })
    },
    close() {
      this.$$mask.hidden(this.maskId)
      this.isShow = false
    }
  }
}
</script>

<style scoped lang="scss">
.confirm-name {
  position: fixed;
  text-align: left;
  width: 100%;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  background: $skin-white;
  //   height: 208px;
  padding-bottom: 15px;
  padding-bottom: calc(15px + env(safe-area-inset-bottom));
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  .confirm-title {
    margin: 20px;
    color: $skin-color1;
    font-family: Barlow;
    font-size: 22px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
  }
  .confirm-input {
    height: 49px;
    background: $skin-bg4;
    margin: 0 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    &-model {
      margin: 0 10px;
      background: transparent;
      outline: none;
      border: 0;
      font-size: 14px;
      color: $skin-color333;
      line-height: 30px;
      display: block;
      width: 100%;
      &::placeholder {
        color: $skin-font4;
      }
    }
  }
  .confirm-tip {
    font-size: 11px;
    color: $skin-color3;
    padding: 5px 20px 0;
  }
  .confirm-btns {

  }
  .confirm-btn {
    width: 162px;
    height: 41px;
    line-height: 41px;
    background-color: $skin-color1;
    border-radius: 41px;
    font-size: 17px;
    text-align: center;
    color: $skin-color333;
    margin: 10px auto 0;
    &.cancel-btn {
      background: $skin-bg4;
    }
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
    transform: translate(-50%, 100%);
    opacity: 0;
  }

  to {
    transform: translate(-50%, 0%);
    opacity: 1;
  }
}

@keyframes confirm-out {
  0% {
    transform: translate(-50%, 0%);
    opacity: 1;
  }

  to {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
}

@media screen and (min-width: 780px) {
  .confirm-name {
    background: $pc-bg0;
    .confirm-title {
      color: $skin-font5;
      font-weight: bold;
    }
    .confirm-input {
      background: $pc-bg2;
    }
    .confirm-input-model {
      font-weight: bold;
      color: black;
      &::placeholder {
        color: $skin-font3;
      }
    }
  }
}
</style>
