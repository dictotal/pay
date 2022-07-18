<template>
  <div id="v-detail" class="view-bg-gray">
    <cancel-order @cancelHandel="cancelHandel" :config="config" :status="status"></cancel-order>
    <!-- <top-tips
      :content="
        $i18n(
          '存款金额限制',
          {
            el: '<em>$$</em>',
            maxAmount: $$tools.toMoney(transferInfo.maxAmount),
            minAmount: $$tools.toMoney(transferInfo.minAmount),
            moneyUnit: moneyUnit
          },
          '见下方注释'
        )
      "
    /> -->
    <!--  转账信息  -->
    <div class="layout-wrap form-s1">
      <div class="panel-main box-shadow">
        <div class="order-step">
          <div class="order-step-content flex justify">
            <div class="order-step-item">
              <img class="step-icon" src="@/platform/PAY/v-init/images/selected.png" alt="" />
              <div class="step-text">{{ $i18n("创建订单", "你好") }}</div>
            </div>
            <div class="order-step-item" :class="{ gray: step === 1 }">
              <div class="step-icon">2</div>
              <div class="step-text">{{ $i18n("录入订单") }}</div>
            </div>
          </div>
        </div>
        <!-- step1 -->
        <template v-if="step === 1">
          <div class="bank-info form-item">
            <div class="w-row w-middle">
              <div class="img-wrap">
                <img :src="transferInfo.iconUrl" alt="" />
              </div>
              <div class="ml10 bank-padding">
                <p class="fw-100 f14 color-898">{{ $i18n("detail.index.txt_1", "银行名称") }}</p>
                <p class="b mt5 color-333">{{ transferInfo.bankName }}</p>
              </div>
            </div>
          </div>

          <div class="form-item">
            <div>
              <h5 class="label color-898" v-if="transferInfo.cardNumberType === 'bank'">
                {{ $i18n("detail.index.txt_2", "银行卡") }}
              </h5>
              <h5 class="label color-898" v-else-if="transferInfo.cardNumberType === 'phone'">
                {{ $i18n("detail.index.txt__2", "手机号") }}
              </h5>
              <p class="b color-333">
                {{ transferInfo.bankCard }}
                <img class="copy-icon" src="../images/copy.png" alt="copy" @click="copy(transferInfo.bankCard)" />
              </p>
            </div>
          </div>
          <div class="form-item">
            <div>
              <h5 class="label color-898">{{ $i18n("detail.index.txt_4", "开户姓名") }}</h5>
              <p class="b color-333">
                {{ transferInfo.cardholder }}
                <img class="copy-icon" src="../images/copy.png" alt="copy" @click="copy(transferInfo.cardholder)" />
              </p>
            </div>
          </div>
        </template>
        <template v-else-if="step === 2">
          <h2 class="title-s1">{{ $i18n("存款金额") }}-{{ config.currency }}</h2>
          <div class="input-amount-warp">
            <!-- <div class="amount-type">{{ minAmount }}~{{ maxAmount }}{{ $$tools.moneyKey }}</div> -->
            <input type="number" class="input-amount f-din" v-model="amount" @input="limitMoney(50)" @blur="limitAmountHandel" :placeholder="$i18n('请输入金额')" />
          </div>
          <h2 class="title-s1">{{ $i18n("存款编号") }}</h2>
          <div class="input-amount-warp">
            <input type="number" class="input-amount f-din" v-model="depositNo" @blur="limitAmountHandel" :maxlength="6" :placeholder="$i18n('请输入编号后6位')" />
            <div class="question-tip flex w-center w-middle" @click="setShowTip">
              <img class="question-tip-icon" src="../images/question.svg" alt="" />
            </div>
          </div>
          <div class="input-error-msg">
            <span v-if="isShow">{{ $i18n("请输入6位存款编号") }}</span>
          </div>
        </template>
      </div>
      <!-- 订单信息 -->
      <template v-if="step === 1">
        <div class="pay-btns mt30 auto-btns">
          <div class="btn btn-confirm" @click="confirmHandel">
            <div class="set-order">{{ $i18n("录入订单") }}</div>
            <div class="set-order-desc">{{ $i18n("汇款成功后再录入") }}</div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="pay-btns mt30 auto-btns">
          <div class="btn btn-confirm" @click="submitOrder">
            <div class="set-order">{{ $i18n("提交订单") }}</div>
          </div>
        </div>

        <div class="auto-tips">
          <div class="auto-tips-title">{{ $i18n("充值编号") }}</div>
          <img class="auto-tips-image" :src="activePayConfig.imageTip" alt="" />
        </div>
      </template>
    </div>
    <guild-tip ref="guildTip"></guild-tip>
  </div>
</template>

<script type="text/ecmascript-6">
import countDown from '@/components/count-down';
import topTips from './tips'
import Tools from '@/common/tools';
import { injectLanguage } from "@/common/i18n";
import lang from "@/platform/PAY/v-go/language.json";
import CancelOrder from '@/components/cancel-order'
import GuildTip from '@/components/guild-tip'
let injectOnce = Tools.once(function () {
	injectLanguage(lang);
});

export default {
  name: "v-detail",
  data () {
    return {
      countDownSecond: [],
      moneyUnit: "Ks",
      step: 1,
      amount: '',
      depositNo: '',
      isShow: false,
      status: 'wait',
      payConfig: {
        'wave': {
          imageTip: '/images/wave-tips.png'
        },
        'kbzp': {
          imageTip: '/images/kbzp-tips.png'
        }
      }
    }
  },
  props: {
    config: Object
  },
  mounted () {
    injectOnce();
    this.moneyUnit = this.config.currencyUnit;
    this.init();
    this.$$tools.postMessage('addFrameHeight', {value: 825})
  },
  methods: {
    init () {
      this.countDownSecond = [this.transferInfo.ttlSeconds * 1000];
    },
    endCount () {
      this.$$alert(this.$i18n('detail.index.txt_11', '倒计时结束，请重新提交充值申请！'))
    },
    data () {
      $i18n('detail.index.txt_6', {
        el: '<em>$$</em>',
        amount: $$tools.toMoney(transferInfo.amount),
        baseAmount: $$tools.toMoney(transferInfo.baseAmount),
        moneyUnit: moneyUnit
      }, '见下方注释')
    },
    cancelHandel () {
      this.$$confirm(this.$i18n('detail.index.txt_12', '如已汇款请勿撤销，我们将尽快为您处理，撤销订单将影响实时到帐！'), rs => {
        if (rs) {
          this.cancelOrder();
        }
      }, this.$i18n('detail.index.txt_13', '提示'),
        '',
        this.$i18n('detail.index.txt_7', '撤销订单'),
        this.$i18n('detail.index.txt_14', '暂不撤销'));
    },
    cancelOrder () {
      let transferInfo = this.transferInfo;
      this.$$ajax.post('/recharge/cancelRecharge', {
        amount: transferInfo.amount,
        paymentAmount: transferInfo.baseAmount,
        paymentId: this.config.paymentId
      }).then(() => {
        window.config = undefined
        this.$router.replace('/')
      }).catch(err => {
        this.$$msg.show(err)
      })
    },
    // 录入订单
    confirmHandel () {
      this.step = 2
    },
    // 提交订单成功
    submitOrder () {
      if (!this.amount || !/\d+/.test(this.amount)) {
        return
      } else if (this.depositNo.length !== 6) {
        this.isShow = true
      } else {
        let data = {
          paymentId: this.config.paymentId,
          depositNo: '',
          paymentAmount: this.amount,
          serialNumber: this.depositNo
        }
        if (this.isRequest) {
          return
        }
        this.isRequest = true
        setTimeout(() => {
          this.isRequest = false
        })
        this.$$ajax.post('/recharge/verifyOrder', data).then(res => {
          if (res.operateResult) {
            this.$router.replace('/')
          }
          this.$$msg.show(res.tips)
          this.isRequest = false
        }).catch(err => {
          this.isRequest = false
          this.$$msg.show(err)
        })
      }
    },
    copy (str) {
      this.$$msg.show(this.$i18n('detail.index.txt_15', '复制成功,请粘贴使用'));
      this.$$tools.copyToClipboard(str);
    },
    limitAmountHandel () {
      let amount = this.amount;

      // if (minAmount) {
      //   if (amount < minAmount) {
      //     amount = minAmount;
      //   }
      // }

      // if (maxAmount) {
      //   if (amount > maxAmount) {
      //     amount = maxAmount;
      //   }
      // }

      this.amount = parseInt(amount);
    },
    limitMoney () {
      let v = this.amount
      v = (v + '').replace(/\D|\.\-/g, '').substring(0, 12)
      this.amount = v
      console.log(v)
    },
    // 显示类型
    setShowTip () {
      this.$refs.guildTip.show({
        bankType: this.transferInfo.bankType
      })
    }
  },
  computed: {
    transferInfo () {
      return this.config.transferInfo;
    },
    isMobile () {
      return this.$$tools.isMobile();
    },
    maxAmount () {
      return this.transferInfo.maxAmount
    },
    minAmount () {
      return this.transferInfo.minAmount
    },
    activePayConfig () {
      return this.transferInfo && this.payConfig[this.transferInfo.bankType] ? this.payConfig[this.transferInfo.bankType] : {}
    }
	},
	watch: {
		depositNo (value) {
			if (value.length < 6) {
				this.isShow = true
			} else {
				this.isShow = false
			}
		},
	},
	beforeUpdate () {
		this.depositNo = this.depositNo.toString().substr(0, 6)
	},
	components: { countDown, topTips, CancelOrder, GuildTip }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.auto-tips {
  display: block;
  width: 265px;
  margin: 5px auto 0;
  text-align: center;
  color: $skin-font3;
  font-size: 13px;
  line-height: 28px;
  img {
    width: 100%;
  }
  .auto-tips-title {
    margin-bottom: 10px;
  }
}
#v-detail {
  .color-898 {
    color: $skin-font3;
    font-size: 13px;
  }
  .copy-para {
    margin-top: 10px;
    .copy-icon {
      transform: translateY(0);
    }
  }
  .color-333 {
    color: $skin-font1;
    font-size: 14px;
    font-family: Barlow;
  }
  .copy-icon {
    width: 21px;
    height: 21px;
    transform: translateY(5px);
    cursor: pointer;
  }
  .img-wrap {
    width: 44px;
    height: 44px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .order-step {
    width: 260px;
    margin: 20px auto;
    position: relative;
    &::before {
      position: absolute;
      content: "";
      display: block;
      left: 50%;
      transform: translateX(-50%);
      width: 130px;
      top: 6.5px;
      border-bottom: 1px dashed $skin-color1;
    }
  }
  .order-step-content {
    position: relative;
    justify-content: space-between;
    .order-step-item {
      height: 40px;
      display: flex;
      flex-flow: column nowrap;
      width: 14px;
      white-space: nowrap;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      color: $skin-color1;
      &.gray {
        .step-icon {
          background: #d4d5db;
        }
        color: #d4d5db;
      }
      .step-icon {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: $skin-color1;
        text-align: center;
        line-height: 14px;
        color: $skin-font5;
        font-size: 12px;
        font-weight: bold;
      }
    }
  }
  .form-s1 {
    .form-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 0;
      height: 70px;
      border-bottom: 1px solid $skin-font5;
      position: relative;
      &.form-item-mini {
        height: 44px;
        padding: 0;
      }
      &:last-child {
        border-bottom: none;
      }
    }

    .label {
      font-size: 12px;
      font-weight: 200;
      color: $skin-font3;
    }
  }

  .btn-copy {
    min-width: 50px;
    height: 24px;
    padding: 0 14px;
    font-size: 12px;
    border-radius: 17px;
    border-color: #898c98;
  }

  .fc-bcb {
    color: $skin-color4;
  }

  .tips-box {
    display: flex;
    padding: 20px 30px;
    border-radius: 10px;
    align-items: flex-start;
    background: #fffef4;
    border: 1px dashed #ffb052;
  }

  .icon-tips {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }
  .pay-btns {
    display: flex;
    align-items: center;
    &.auto-btns {
      flex-flow: column nowrap;
      .btn {
        width: 345px;
        margin-bottom: 10px;
        font-size: 15px;
      }
      .btn-confirm {
        display: flex;
        align-items: center;
        flex-flow: column nowrap;
        line-height: 1;
        color: #fff;
        justify-content: center;
        .set-order {
          font-size: 17px;
        }
        .set-order-desc {
          font-size: 10px;
          margin-top: 5px;
        }
      }
    }
    .btn {
      width: 170px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      border-radius: 10px;
      border: solid 1px $skin-font3;
      box-sizing: border-box;
      color: $skin-font3;
      margin: 0 auto;
    }
    .btn-cancel {
      background: transparent;
    }
    .btn-confirm {
      background: $skin-color1;
      border: 1px solid $skin-color1;
      color: $skin-font5;
    }
  }

  .tips-info {
    em {
      color: #f8723b;

      &:nth-child(3) {
        color: #333;
        text-decoration: line-through;
      }
    }
  }
  .panel-notice {
    color: $skin-font3;
    margin-top: 20px;
  }
  .v-count-down {
    .time {
      width: 29px;
      height: 27px;
      line-height: 27px;
      font-size: 16px;
      background-image: linear-gradient(180deg, #2d384d 0%, #1a212f 100%);
      box-shadow: none;
      border-radius: 3px;
      text-align: center;
    }
    .dot {
      &::before,
      &::after {
        background: $skin-bg5;
      }
    }
  }
  .input-amount-warp {
    position: relative;
    height: 44px;
    background: $skin-bg5;
    overflow: hidden;
    border-radius: 7px;
    .amount-type {
      position: absolute;
      top: 6px;
      right: 20px;
      line-height: 30px;
      font-size: 14px;
      color: $skin-font4;
    }

    .input-amount {
      width: 100%;
      height: 44px;
      padding: 0 50px 0 20px;
      box-sizing: border-box;
      border-radius: 5px;
      color: #000000;
      font-size: 20px;
      background: transparent;
      outline: none;
      border: none;
      color: $skin-font1;
      line-height: 44px;
      &::placeholder {
        color: $skin-font4;
        font-size: 14px;
        line-height: 30px;
      }
    }
    .question-tip {
      position: absolute;
      width: 44px;
      height: 44px;
      right: 0;
      top: 0;
    }
  }
  .title-s1 {
    color: $skin-font3;
    font-weight: 600;
    line-height: 20px;
    font-size: 14px;
    margin: 10px 0;
  }
  .input-error-msg {
    height: 20px;
    line-height: 20px;
    color: $skin-color2;
  }
}

@media screen and (max-width: 760px) {
  #v-detail {
    .btn-cancel {
      display: flex;
      width: 100%;
      margin: 30px auto;
      border-radius: 10px;
      justify-content: center;
    }
  }
}

@media screen and (min-width: 780px) {
  #v-detail {
    margin: 20px;
    background: $pc-bg0;
    border-radius: 10px;
    .bank-padding {
      margin-left: 0!important;
    }
    .color-898 {
      color: $pc-font2;
      font-weight: bold;
    }
    .color-333 {
      color: $pc-font1;
    }
    .title-s1 {
      color: $skin-bg1;
    }
    .order-step {
      width: 500px;
      transform: translateY(15%) scale(1.5);

      &::before {
        width: 260px;
      }
    }
    .input-amount-warp {
      background: $pc-bg2;
      color: $skin-bg1;
      .input-amount {
        color: $skin-bg1;
        max-width: 90%;
        &::placeholder {
          font-weight: bold;
          color: $pc-font3;
        }
      }
    }
    .question-tip-icon {
      width: 26px;
      height: 26px;
    }
    .input-error-msg {
      margin: 10px auto 20px;
    }
    .auto-tips {
      width: 300px;
    }
    .form-s1 {
      .form-item {
        border-bottom: 1px solid #f2f2f8 !important;
        padding: 0;
        height: 100px;
        padding-left: 60px;
        .label {
          color: $pc-font2;
          font-weight: bold;
          font-size: 16px;
        }
        .h5 {
          font-size: 14px;
          color: #898c98;
        }
        .p {
          color: #333333;
          vertical-align: middle;
        }
      }
      .img-wrap {
        position: absolute;
        top: 30px;
        left: 0px;
        height: 44px;
        width: 44px;
      }
    }
  }
  .layout-wrap {
    max-width: 100%;
    padding: 20px 20px;
  }
  .panel-main {
    position: relative;
    width: 100%;
    background-color: $pc-bg0;
    border: 2px dashed #e5e5eb;
    border-radius: 10px;
  }

  .pay-btns {
    margin-left: 0;
    .btn-cancel {
      margin-right: 20px !important;
    }
    .panel-main {
      background: $pc-bg1;
    }
  }
}
</style>
