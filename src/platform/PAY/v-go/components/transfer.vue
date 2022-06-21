<template>
  <div id="v-detail" class="view-bg-gray">
    <cancel-order :config="config" v-if="config.paymentId" @cancelHandel="cancelHandel" :status="status"></cancel-order>
    <top-tips
      :content="
        $i18n(
          'detail.index.txt_6',
          {
            el: '<em>$$</em>',
            amount: $$tools.toMoney(transferInfo.amount),
            baseAmount: $$tools.toMoney(transferInfo.baseAmount),
            moneyUnit: moneyUnit
          },
          '见下方注释'
        )
      "
    />
    <!--  转账信息  -->
    <div class="layout-wrap form-s1">
      <div class="panel-main box-shadow">
        <div class="bank-info form-item">
          <div class="w-row w-middle">
            <div class="img-wrap">
              <img :src="transferInfo.iconUrl" alt="" />
            </div>
            <div class="ml10">
              <p class="fw-100 f14 color-898">{{ $i18n("detail.index.txt_1", "银行名称") }}</p>
              <p class="b mt5 color-333">{{ transferInfo.bankName }}</p>
            </div>
          </div>

          <count-down :time="countDownSecond" @endCount="endCount" />
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
        <div class="form-item">
          <div>
            <h5 class="label color-898">{{ $i18n("detail.index.txt_5", "存款金额") }}</h5>
            <div class="w-row f14 copy-para">
              <div class="b fc-red">
                {{ transferInfo.amount | money }}
              </div>
              <span>{{ $$tools.moneyKey }}</span>
              <img class="copy-icon" src="../images/copy.png" alt="copy" @click="copy(transferInfo.amount)" />
              <div class="ml10">
                <span class="line-through fc-bcb">{{ transferInfo.baseAmount | money }} {{ $$tools.moneyKey }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--   个人账户信息   -->
      <!-- <div class="panel-main box-shadow mt10">
        <div class="form-item form-item-mini">
          <h5 class="label color-898">
            {{ $i18n("detail.index.txt_16", "付款人开户名") }}
          </h5>
          <div class="form-item-right">{{ config.identityName }}</div>
        </div>
        <div class="form-item form-item-mini">
          <h5 class="label color-898">
            {{ $i18n("detail.index.txt_17", "充值方式") }}
          </h5>
          <div class="form-item-right">{{ config.paymentType === "transpay" ? $i18n("detail.index.txt_18", "银行卡转账") : "THAI QR" }}</div>
        </div>
        <div class="form-item form-item-mini">
          <h5 class="label color-898">orderNumber</h5>
          <div class="form-item-right">
            {{ config.orderNo }}
            <img class="copy-icon" src="../images/copy.png" alt="copy" @click="copy(config.orderNo)" />
          </div>
        </div>
      </div> -->
      <div class="pay-btns mt30">
        <div class="btn btn-confirm" @click="confirmHandel">{{ $i18n("detail.index.txt_20", "我已付款") }}</div>
      </div>
      <div class="panel-notice">
        <h5 class="title-notice">
          <span class="title-notice-text">{{ $i18n("detail.index.txt_8", "注意") }}</span>
        </h5>
        <div class="item-notice">
          <em>1</em>
          {{ $i18n("detail.index.txt_9", "如果您想修改支付金额，请先撤销订单，然后重新发起新的订单请求；") }}
        </div>
        <div class="item-notice">
          <em>2</em>
          {{ $i18n("detail.index.txt_10", "如果您已完成汇款，请勿点击“撤销订单”按钮，成功汇款超过3分钟未到账，请联系 在线客服， 我们将尽快为您处理。") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

import countDown from '@/components/count-down';
import topTips from './tips'
import Tools from '@/common/tools';
import {injectLanguage} from "@/common/i18n";
import lang from "@/platform/PAY/v-go/language.json";
import CancelOrder from '@/components/cancel-order'
let injectOnce = Tools.once(function(){
  injectLanguage(lang);
});

export default {
  name: "v-detail",
  data() {
    return {
      countDownSecond: [],
      moneyUnit: "Ks",
      status: 'wait'
    }
  },
  props: {
    config: Object
  },
  mounted() {

    injectOnce();
    console.log(this.config)
    this.moneyUnit = this.config.currencyUnit;

    this.init();
  },
  methods: {
    init() {

      this.countDownSecond = [this.transferInfo.ttlSeconds * 1000];
    },
    endCount() {
      this.status = 'failed'
      this.$$alert(this.$i18n('detail.index.txt_11','倒计时结束，请重新提交充值申请！'))
    },
    data() {
      $i18n('detail.index.txt_6', {
        el: '<em>$$</em>',
        amount: $$tools.toMoney(transferInfo.amount),
        baseAmount: $$tools.toMoney(transferInfo.baseAmount),
        moneyUnit: moneyUnit
      }, '见下方注释')
    },
    cancelHandel() {
      this.$$confirm(this.$i18n('detail.index.txt_12','如已汇款请勿撤销，我们将尽快为您处理，撤销订单将影响实时到帐！'), rs => {
            if (rs) {
              this.cancelOrder();
            }
          }, this.$i18n('detail.index.txt_13','提示'),
          '',
          this.$i18n('detail.index.txt_7','撤销订单'),
          this.$i18n('detail.index.txt_14','暂不撤销'));
    },
    cancelOrder() {
      let transferInfo = this.transferInfo;
      this.$$ajaxLoading.post('/recharge/cancelRecharge', {
        paymentAmount: transferInfo.amount,
        paymentId: this.config.paymentId
      }).then(() => {
        window.config = undefined
        this.$router.replace('/')
      }).catch(err => {
        this.$$msg.show(err)
      })
    },
    confirmHandel() {
      this.$$confirm(this.$i18n('detail.index.txt_21', {
            el: '<font color="#ff7600">$$</font>',
            amount: this.$$tools.toMoney(this.transferInfo.amount),
            moneyUnit: this.moneyUnit
          }, '确定您已存入[[{{amount}}{{moneyUnit}}]]?'), rs => {
            if (rs) {
              this.confirmOrder();
            }
          }, this.$i18n('detail.index.txt_13','提示'),
          ''
      );
    },
    // 确认已经付款
    confirmOrder() {
      const data = {
        paymentId: this.config.paymentId,
        orderNo: this.config.orderNo
      }
      this.$$ajax.post('/recharge/payConfirm', data).then((res) => {
        localStorage.setItem(`charge${data.orderNo}`, JSON.stringify(this.config))
        this.$router.replace(`/charge/status/${data.orderNo}`)
      }).catch(err => {
        this.$$msg.show(err)
      })
    },
    copy(str) {
      this.$$msg.show(this.$i18n('detail.index.txt_15','复制成功,请粘贴使用'));
      this.$$tools.copyToClipboard(str);
    }
  },
  computed: {
    transferInfo() {
      return this.config.transferInfo;
    },
    isMobile() {
      return this.$$tools.isMobile();
    },
  },
  components: {countDown, topTips, CancelOrder}
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
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
  }
  .img-wrap {
    width: 44px;
    height: 44px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .bank-info {
    color: #cd263f;
  }

  .line {
    height: 1px;
    margin: 20px auto;
    background: #f0f1f7;
  }

  .form-s1 {
    .form-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 0;
      height: 70px;
      border-bottom: 1px solid $skin-font5;
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
    color: $skin-font4;
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
    .btn {
      width: 100%;
      height: 45px;
      line-height: 45px;
      text-align: center;
      border-radius: 10px;
      border: solid 1px $skin-font3;
      font-weight: bold;
      box-sizing: border-box;
      margin: 0 auto;
    }
    .btn-cancel {
      background: transparent;
    }
    .btn-confirm {
      background: $skin-color1;
      border: 1px solid $skin-color1;
      font-size: 17px;
      color: $skin-font1;
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
    padding-bottom: 10px;
    .title-notice {
      text-align: center;
      position: relative;
      overflow: hidden;
      &::after {
        content: "";
        border-bottom: 1px dashed $skin-font3;
        display: block;
        width: 100%;
        position: absolute;
        top: 50%;
        z-index: 0;
      }
      &-text {
        padding: 0 10px;
        background: $skin-bg1;
        position: relative;
        z-index: 1;
      }
    }
    .item-notice {
      position: relative;
      margin-top: 12px;
      font-size: 12px;
      em {
        display: inline-block;
        width: 15px;
        height: 15px;
        background: $skin-font4;
        color: $skin-bg1;
        border-radius: 50%;
        text-align: center;
        font-size: 11px;
      }
    }
  }
  .v-count-down {
    .time {
      width: 29px;
      height: 27px;
      line-height: 27px;
      font-size: 16px;
      background: $skin-font1;
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
  .layout-wrap {
    max-width: 100%;
    padding: 20px 20px;
  }
  .panel-main {
    position: relative;
    width: 100%;
    //min-height: 420px;
    background-color: $skin-bg1;
    border: 2px dashed #e5e5eb;
    border-radius: 10px;
    padding: 10px 40px 10px 104px;
  }
  .pay-btns {
    margin-top: 300px !important;
    margin-left: 100px;
    .btn-cancel {
      margin-right: 20px !important;
    }
  }
  .img-wrap {
    position: absolute;
    top: 30px;
    left: 40px;
    height: 44px;
    width: 44px;
  }

  .form-item {
    border-bottom: 1px solid #f2f2f8 !important;
    .h5 {
      font-size: 14px;
      color: #898c98;
    }
    .p {
      color: #333333;
      vertical-align: middle;
    }
  }
}
</style>
