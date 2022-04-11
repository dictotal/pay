<template>
  <div id="bank-my" class="div-bg-gray" :class="{'pay-init-tt-pc': isMobile !== true}">
    <div class="layout-wrap">
      <div class="panel-main box-shadow">
        <!-- 银行卡支付方式 -->
        <template v-if="showPayWay">
          <h2 class="title-s1">{{ $i18n("bank-my.index.txt_8", "充值方式") }}</h2>
          <div class="choose-list">
            <div class="choose-pay-mode" @click="choosePayWay(index)" v-if="item.bankCardList.length > 0"
                 :class="{'choose-active': index === activeIndex}" v-for="(item, index) in bankChooseList" :key="index">
              <div class="choose-item-top">
                <img class="choose-pay-icon" alt="pay-icon" :src="item.icon">
                <div class="choose-item-type">{{ item.name }}</div>
                <img class="choose-icon" v-if="item.selected" src="./images/selected.png" alt="choose">
                <img class="choose-icon" v-else src="./images/un-select.png" alt="choose">
              </div>
              <div class="choose-bank-list" ref="bankListRef" v-show="item.selected">
                <div class="choose-bank-item" :class="{active: idx === item.activeIdx}"
                     v-for="(bank, idx) of item.bankCardList" @click="chooseBankCard($event, index, idx)">
                  <img class="bank-icon" :src="bank.iconUrl" alt="">
                  <div class="bank-name">{{ bank.bankName }}</div>
                </div>
              </div>
            </div>
          </div>

        </template>

        <h2 class="title-s1">{{ $i18n("bank-my.index.txt_2", "存款金额") }}-{{ config.currency }}</h2>
        <div class="quick-amount-box">
          <div class="item btn btn-amount mb10 f-din" @click="amount = item" v-for="item in filterQuickAmountList">
            {{ item | money }}
          </div>
        </div>
        <div class="input-amount-warp">
          <div class="amount-type">{{ minAmount }}~{{ maxAmount }}{{ $$tools.moneyKey }}</div>
          <input
              type="number"
              class="input-amount f-din"
              v-model="amount"
              @blur="limitAmountHandel"
              maxlength="10"
              :placeholder="$i18n('bank-my.index.txt_3', '请输入金额')"
          />
        </div>
      </div>
      <div class="mt30 pb30 w-row w-center">
        <div class="btn btn-submit" :class="{disable: !amountIsRight}" @click="submitHandel">
          {{ $i18n("bank-my.index.txt_4", "下一步") }}
        </div>
      </div>
    </div>
    <confirm-name ref="confirmName"></confirm-name>
  </div>
</template>

<script type="text/ecmascript-6">

import Tools from '@/common/tools';
import {injectLanguage} from "@/common/i18n";
import lang from "./language.json";
import confirmName from '@/components/confirm-name'
let injectOnce = Tools.once(function () {
  injectLanguage(lang);
});

export default {
  name: "v-init",
  data() {
    return {
      activeIndex: 0,
      bankCardList: [],
      bankChooseList: [
        {
          name: 'Bank Transfer',
          bankCardList: [],
          selected: false,
          icon: require('./images/transfer.png'),
          type: 'transpay'
        },
        {
          name: 'THAI QR',
          bankCardList: [],
          selected: false,
          icon: require('./images/qrcode.png'),
          type: 'qrcode'
        }
      ],
      paymentMethodList: [],
      actPaymentIdx: 0,

      quickAmountList: [
        5000, 10000, 20000, 50000, 100000, 200000, 500000
      ],
      amount: "",

      moneyUnit: "Ks"
    }
  },
  props: {
    config: Object
  },
  created() {

    injectOnce();

    this.moneyUnit = this.config.currencyUnit;

    this.init();
  },
  methods: {
    init() {
      let cfg = this.config;
      this.bankCardList = cfg.bankCardList || [];
      let transferList = []
      let qrcodeWay = []
      cfg.bankCardList.forEach(item => {
        if (item.type === 'transpay') {
          transferList.push(item)
        } else if (item.type === '') {
          qrcodeWay.push(item)
        }
        // 以下数据为测试
        transferList.push(item)
        qrcodeWay.push(item)
      })
      this.$set(this.bankChooseList[0], 'bankCardList', transferList)
      this.$set(this.bankChooseList[0], 'selected', true)
      this.$set(this.bankChooseList[0], 'activeIdx', 0)
      this.$set(this.bankChooseList[1], 'bankCardList', qrcodeWay)

      this.paymentMethodList = cfg.paymentMethodList || [];
    },

    limitAmountHandel() {
      let maxAmount = this.maxAmount,
          minAmount = this.minAmount,
          amount = this.amount;

      if (minAmount) {
        if (amount < minAmount) {
          amount = minAmount;
        }
      }

      if (maxAmount) {
        if (amount > maxAmount) {
          amount = maxAmount;
        }
      }

      this.amount = amount;
    },
    // 点击提交按钮
    submitHandel() {
      if (!this.amountIsRight) {
        return false;
      }
      if (this.actPayment.paymentType === 'transpay') {
        this.$refs.confirmName.show({
          content: '',
          success: ((bool, {keyword}) => {
            if (bool) {
              console.log(this.config, keyword, this.config.identityName, keyword === this.config.identityName)
              if (keyword === '') {
                this.$$msg.show(this.$i18n('confirm.txt3'))
              } else if (keyword !== this.config.identityName) {
                this.$message({
                  message: this.$i18n('confirm.txt2')
                })
              } else {
                return this.postPay()
              }
            }
          })
        })
      } else {
        this.postPay()
      }
    },
    // 发起支付
    postPay() {
      let config = this.config, actPayment = this.actPayment;
      let queryMap = {
        paymentId: config.paymentId,
        paymentKey: actPayment.paymentKey,
        paymentType: actPayment.paymentType,
        rechargeFees: actPayment.rechargeFees,
        paymentAmount: this.amount,

        id: this.actBank.id
      }
      this.$$tools.formSubmit({
        sign: config.sign,
        token: encryptPublicLong(this.$$tools.map2get(queryMap), config.publicKey),
        lang: this.lang
      }, "/p/pay?lang=" + this.lang);
    },

    // 选择付款方式
    choosePayWay(index) {
      this.activeIndex = index
      this.bankChooseList.forEach((v, x) => {
        if (index === x) {
          this.$set(this.bankChooseList[x], 'selected', true)
        } else {
          this.$set(this.bankChooseList[x], 'selected', false)
        }
      })
    },
    //选择银行卡
    chooseBankCard(e, index, idx) {
      const ref = this.$refs.bankListRef[index]
      const child = e.currentTarget
      if (idx > 0) {
        ref.scrollLeft = (child.offsetWidth + 10) * (idx - 0.5)
      } else {
        ref.scrollLeft = 0
      }
      this.bankChooseList[index].bankCardList.forEach((v1, x1) => {
        if (x1 === idx) {
          this.$set(this.bankChooseList[index].bankCardList[x1], 'selected', true)
          this.$set(this.bankChooseList[index], 'activeIdx', idx)
        } else {
          this.$set(this.bankChooseList[index].bankCardList[x1], 'selected', false)
        }
      })
    },
  },
  computed: {
    isMobile() {
      return this.$$tools.isMobile();
    },
    actPayment() {
      return this.paymentMethodList[this.actPaymentIdx] || {};
    },

    maxAmount() {
      return this.actBank?.maxAmount || this.actPayment?.maxAmount;
    },

    minAmount() {
      return this.actBank?.minAmount || this.actPayment?.minAmount;
    },
    amountIsRight() {
      let amount = this.amount;
      return amount >= this.minAmount && amount <= this.maxAmount
    },
    lang() {
      return this.config.lang;
    },

    filterQuickAmountList() {
      let quickAmountList = this.quickAmountList;
      let minAmount = parseInt(this.minAmount || 0);
      let maxAmount = parseInt(this.maxAmount || 10000000);
      return quickAmountList.filter(function (item) {
        return item >= minAmount && item <= maxAmount;
      });
    },
    // 是否显示支付方式
    showPayWay() {
      return this.bankChooseList[0].bankCardList.length > 0 && this.bankChooseList[1].bankCardList.length > 0
    },
    // 銀行卡激活
    actBank() {
      let index = this.bankChooseList.findIndex(item => item.selected)
      if (index > -1) {
        let index2 = this.bankChooseList[index].activeIdx
        if (index2 > -1) {
          const o = this.bankChooseList[index].bankCardList[index2]
          this.$nextTick(() => {
            this.limitAmountHandel()
          })
          return o
        }
      }
      return null
    }
  },
  components: {
    confirmName
  },
}
</script>

<style lang="scss" rel="stylesheet/scss">
#bank-my {
  .btn-amount {
    margin-right: 10px;

    &:hover {
      color: #fff;
      border-color: #ff0000;
      background: linear-gradient(90deg, #ff6e6e, #ff0000);
    }
  }

  .title-s1 {
    margin-top: 30px;
    margin-bottom: 20px;
    color: $skin-font1;
    font-weight: 600;
    line-height: 20px;
    font-size: 14px;
  }

  .choose-list {
    color: $skin-font1;
  }

  .choose-item-top {
    display: flex;
    flex-flow: row nowrap;
    width: 321px;
    height: 44px;
    background-color: $skin-font5;
    margin: 10px 0;
    border-radius: 7px;
    padding: 0 15px;
    align-items: center;
  }

  .choose-pay-icon {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }

  .choose-icon {
    width: 14px;
    height: 14px;
  }

  .choose-item-type {
    min-width: 0;
    flex: 1;
  }

  .choose-bank-list {
    display: flex;
    overflow-y: hidden;
    overflow-x: auto;
    white-space: nowrap;

    .choose-bank-item {
      width: 140px;
      min-width: 140px;
      height: 60px;
      background: $skin-bg1;
      border: 1px solid $skin-bg1;
      border-radius: 10px;
      vertical-align: middle;
      display: flex;
      align-items: center;
      padding: 0 10px;
      margin-right: 10px;
      box-sizing: border-box;
      float: left;

      &.active {
        border: 1px solid $skin-color1;
      }
    }

    .bank-name {
      vertical-align: middle;
      display: inline-block;
      max-width: 80px;
      margin-left: 5px;
    }

    .bank-icon {
      width: 30px;
      height: 30px;
      vertical-align: middle;
      display: inline-block;
    }
  }

  .bank-card-list {
    display: flex;
    flex-wrap: wrap;

    .bank-card-item {
      position: relative;
      display: flex;
      align-items: center;
      width: 260px;
      height: 62px;
      padding: 0 20px;
      margin: 0 15px 15px 0;
      background: #f5f6f7;
      border: 1px solid transparent;
      border-radius: 6px;
      font-size: 14px;
      color: #333333;

      &.active {
        background: #f7f2f2;
        color: #333333;
        border: 2px solid #ed4041;

        &::after {
          content: "";
          position: absolute;
          top: 50%;
          right: 20px;
          width: 16px;
          height: 16px;
          transform: translateY(-50%);
          background: url("images/selected2.png") center/cover no-repeat;
        }
      }

      .img-wrap {
        width: 22px;
        height: 22px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .bank-name {
        margin-left: 10px;
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
      }
    }
  }

  .quick-amount-box {
    display: flex;
    flex-wrap: wrap;
    color: #676974;
    font-size: 14px;
    margin-top: 10px;

    .item {
      display: flex;
      align-items: center;
      height: 44px;
      line-height: 44px;
      border-radius: 10px;
      padding: 0 15px;
      margin: 0 10px 10px 0;
      background: $skin-bg5;
      border: 1px solid $skin-bg5;
      color: $skin-font6;

      &:hover,
      &.active {
        color: #ffffff;
        border: 1px solid $skin-color1;
        background: url("./images/arrow.png") no-repeat left top;
        background-size: 17px 18px;
      }
    }
  }

  .line-1 {
    height: 1px;
    background: #e7ebf4;
  }

  .w-center {
    margin-top: 30px;
  }

  .btn.btn-submit {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 320px;
    height: 50px;
    background-image: linear-gradient(0deg,
        #31f894 0%,
        #00c763 100%);
    color: #ffffff;
    font-size: 18px;
    border-radius: 10px;
    box-shadow: 0px 0px 7px 0px rgba(0, 199, 99, 0.3);
    border: 0;
    &:hover {
      opacity: 0.9;
    }

    .disable {
      background: #8c8ea2;

      &:hover {
        border: none;
        background: #8c8ea2;
      }
    }
  }

  &.pay-init-tt-pc {
    .layout-wrap {
      max-width: 100%;
    }

    .input-amount {
      padding-right: 120px;
    }
  }
}

@media screen and (max-width: 760px) {
  #bank-my {
    .title-s1 {
      margin: 15px 0 10px;
    }

    .btn-amount {
      margin-right: 0;
    }

    .quick-amount-box {
      display: flex;
      grid-template-columns: 1fr 1fr 1fr;
      //grid-column-gap: 20px;
      justify-content: space-between;

      .item {
        width: 1rem;
        margin-right: 0;
      }

      .item:nth-child(3n) {
      }
    }

    .panel-main {
      padding: 0 17px 20px;
      background: $skin-bg2;
      color: $skin-font1;
    }

    .bank-card-list .bank-card-item {
      width: 100%;
      height: 50px;
      margin-right: 0;
      margin-bottom: 8px;

      &.active {
        background-color: #fffdf3;
      }
    }
  }
}
</style>
