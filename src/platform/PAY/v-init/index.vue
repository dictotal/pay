<template>
  <div id="bank-my" class="div-bg-gray" v-if="config" :class="{ 'pay-init-tt-pc': isMobile !== true }">
    <div class="layout-wrap">
      <div class="panel-main box-shadow">
         <!-- 选择金额部分 -->
         <template v-if="actPayment.paymentId !== 'zz_c'">
          <div class="init-common">
            <h2 class="title-s1">{{ $i18n("bank-my.index.txt_2", "存款金额") }}-{{ config.currency }}</h2>
            <div class="quick-amount-box">
              <div class="item btn btn-amount mb10 f-din" @click="amount = item" v-for="item in filterQuickAmountList" :key="item">
                {{ item | money }}
                <span class="act_gift">{{ item | promoRule(that) }}</span>
              </div>
              <template v-if="filterQuickAmountList.length % 3 !== 0">
                <div class="item no-bg" v-for="(fast, i) in 3 - (filterQuickAmountList.length % 3)" :key="'d' + i"></div>
              </template>
            </div>
            <div class="input-amount-warp">
              <span class="act_gift">{{ amount | promoRule(that) }}</span>
              <div class="amount-type">{{ limitInfo.minAmount }}~{{ limitInfo.maxAmount }}{{ $$tools.moneyKey }}</div>
              <input type="number" class="input-amount f-din" v-model="amount" @blur="limitAmountHandel" maxlength="10" :placeholder="$i18n('bank-my.index.txt_3', '请输入金额')" />
            </div>
          </div>
        </template>
        <!-- 选择金额部分 -->
        <!-- 银行卡支付方式 -->
        <template v-if="showPayWay">
          <div class="init-common-pay">
            <div class="choose-list">
              <template v-for="(item, index) in bankChooseList">
                <div class="choose-pay-mode" @click="choosePayWay(index)" :key="index">
                  <div class="choose-item-top">
                    <img class="choose-pay-icon" alt="pay-icon" :src="item.paymentIconUrl" @error="src = errorSrc" />
                    <div class="choose-item-type">{{ item.keyName }}</div>
                  </div>
                  <div class="choose-bank-list" ref="bankListRef">
                    <template v-if="item.type === 'transpay'">
                      <div class="choose-bank-item w-row" v-for="(bank, idx) of item.bankCardList" @click="chooseBankCard($event, index, idx)" :key="`${index}-${idx}`">
                        <div class="choose-child-left w-cell">
                          <div class="choose-child-left w-cell">
                            <div class="bank-name">{{ bank.bankName }}</div>
                            <div class="ml10 bank-limit">{{ $i18n('限制') }} {{bank.minAmount | money}} ~ {{bank.maxAmount | money}}</div>
                          </div>
                          <div class="choose-child-desc" v-if="bank.descr">{{ bank.descr }}</div>
                        </div>
                        <img class="bank-child-arrow" width="34" height="34" src="/images/right-arrow.png" alt="">
                      </div>
                    </template>
                    <template v-else-if="item.qrList">
                      <div class="choose-bank-item w-row" v-for="(bank, idx) of item.bankCardList" @click="chooseBankCard($event, index, idx)" :key="`${index}-${idx}`">
                        <div class="choose-child-left w-cell">
                          <div class="choose-child-top w-row w-middle">
                            <div class="bank-name">{{ bank.keyName }}</div>
                            <div class="ml10 bank-limit">{{ $i18n('限制') }} {{bank.minAmount | money}} ~ {{bank.maxAmount | money}}</div>
                          </div>
                          <div class="choose-child-desc" v-if="bank.descr">{{ bank.descr}}</div>
                        </div>
                        <img class="bank-child-arrow" width="34" height="34" src="/images/right-arrow.png" alt="">
                      </div>
                    </template>
                  </div>
                </div>
              </template>
            </div>
          </div>

        </template>
      </div>
      <!-- <div class="mt30 pb30 w-row w-center">
        <div class="btn btn-submit" :class="{ disable: !amountIsRight }" @click="submitHandel">
          {{ $i18n("bank-my.index.txt_4", "下一步") }}
        </div>
      </div> -->
    </div>
    <confirm-name ref="confirmName"></confirm-name>
  </div>
</template>

<script type="text/ecmascript-6">

import Tools from '@/common/tools';
import { injectLanguage, changeLanguage } from "@/common/i18n";
import lang from "./language.json";
import confirmName from '@/components/confirm-name'
let injectOnce = Tools.once(function () {
	injectLanguage(lang);
});
changeLanguage(sessionStorage.getItem('lang'))
export default {
	name: "v-init",
	data () {
		return {
			activeIndex: 0,
			bankChooseList: [],
			paymentMethodList: [],
			actPaymentIdx: 0,
			quickAmountList: [
				200, 500, 1000, 5000, 10000, 50000
			],
			amount: "",
			moneyUnit: "Ks",
			actPayment: {},
      config: null,
      errorSrc: 'https://img.yym203.com/link/tt/payment_icon/transfer01.png',
      promoId: '',
      amountRule: [],
      that: this,
      upperLimit: 0
		}
	},
  filters: {
    promoRule(amount, that) {
      if (!that.amountRule.length) return
      let newAmount = ''
      that.amountRule.forEach((item) => {
        if (amount > (that.upperLimit / item.ratio)) return newAmount = `${that.$i18n("bank-my.index.txt_9", "加送")} ${that.upperLimit}`
        else if (amount >= item.min && amount <= item.max) return newAmount = `${that.$i18n("bank-my.index.txt_9", "加送")} ${item.ratio * 100}%`
        else if (amount >= item.min && item.max === 0) return newAmount = `${that.$i18n("bank-my.index.txt_9", "加送")} ${item.ratio * 100}%`
        else if (amount <= item.max && item.min === 0) return newAmount = `${that.$i18n("bank-my.index.txt_9", "加送")} ${item.ratio * 100}%`
      })
      return newAmount
    }
  },
	created () {
		window.addEventListener("message", this.messageHandle, false);
		injectOnce();
		this.init();
    this.$$tools.postMessage('removeFrameHeight', {})
	},
	beforeDestroy () {
		window.removeEventListener('message', this.messageHandle);
	},
	methods: {
    messageHandle({data}) {
      switch (data.type) {
        case 'rechargeListPop':
          this.promoId = data.promoId || ''
          this.amountRule = (data.amountRule && JSON.parse(data.amountRule)) || []
          this.upperLimit = data.upperLimit || 0
          this.$forceUpdate()
          break;
        default:
          break;
      }
    },
    async init () {
      let cfg
      if (!window.config) {
        cfg = await this.getData()
      } else {
        cfg = JSON.parse(JSON.stringify(window.config))
      }
      this.$$tools.postMessage('noRecharge', {}) // 未充值状态调用活动接口拉起弹框
      this.config = cfg
      this.$$tools.setMoneyKey(cfg.currencyUnit)
      this.moneyUnit = this.config.currencyUnit;
			cfg.paymentList.forEach((item, index) => {
				if (item.qrList) {
					this.$set(this.bankChooseList, index, {
            ...item,
            ...this.bankChooseList[index],
						bankCardList: item.qrList,
            type: item.paymentType,
						activeIdx: 0
					})
				} else {
					this.$set(this.bankChooseList, index, {
						...item,
            ...this.bankChooseList[index],
						bankCardList: item.bankCardList,
						type: item.paymentType,
						activeIdx: 0
					})
				}
			})
			this.$set(this.bankChooseList[0], 'selected', true)
			this.getActPayment()
    },
    getData () {
      return new Promise((resolve, reject) => {
        this.$$ajaxLoading.post('/recharge/rechargeInitS').then(res => {
          if (res.paymentList && res.paymentList.length > 0) {
            resolve(res)
          } else {
            this.toDetail(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
		// 获取激活的支付方式
		getActPayment (cb) {
			let obj = {}
			if (this.bankChooseList.length > 0) {
				if (this.bankChooseList[this.activeIndex].type === 'transpay') {
					obj = this.bankChooseList[this.activeIndex]
				} else if (this.bankChooseList[this.activeIndex].qrList && this.bankChooseList[this.activeIndex].qrList.length > 0) {
					obj = this.bankChooseList[this.activeIndex].bankCardList[this.bankChooseList[this.activeIndex].activeIdx]
				} else {
					obj = this.bankChooseList[this.activeIndex]
					console.error('暂未配置当前支付方式')
				}
			}
			this.actPayment = obj
      typeof cb === 'function' && cb()
		},
		limitAmountHandel () {
			let amount = this.amount;
      let {maxAmount, minAmount} = this.limitInfo

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
		submitHandel () {
			if (!this.amountIsRight) {
				return false;
			}
			if (this.actPayment.paymentType === 'transpay' && this.actPayment.paymentId !== 'zz_c') {
				this.$refs.confirmName.show({
					content: '',
					success: ((bool, { keyword }) => {
						if (bool) {
							if (keyword === '') {
								this.$$msg.show(this.$i18n('confirm.txt3'))
							} else {
								this.$refs.confirmName.close()
								return this.postPay(keyword)
							}
						}
					})
				})
			} else {
				this.postPay()
			}
		},
		// 发起支付
		postPay (payerName) {
			let actPayment = this.actPayment;
			let queryMap = {
				paymentId: actPayment.paymentId,
				paymentKey: actPayment.paymentKey,
				paymentType: actPayment.paymentType,
				rechargeFees: actPayment.rechargeFees,
        paymentAmount: this.amount,
        origin: window.commonParams.origin,
        platform: window.commonParams.platform
			}
      if (window.commonParams.promoType) {
        queryMap.promoType = window.commonParams.promoType
      }
			if (actPayment.paymentType === 'transpay') {
				queryMap.bandId = this.actBank.id
				queryMap.payAccount = payerName
      }
      queryMap.promoId = this.promoId || ''
      this.$$ajaxLoading.post('/recharge/pay', queryMap).then(res => {
        this.toDetail(res)
      }).catch(err => {
        this.$$msg.show(err)
      })
		},
    toDetail (data) {
      let url = '/sports/auto'
      localStorage[data.currency + data.paymentId] = JSON.stringify(data)
      if (data.modelType === 'transfer' || data.modelType === 'online') {
        url = '/sports/go'
      } else if (data.modelType === 'qrcode') {
        url = '/sports/go'
      }
      this.$router.replace(`${url}?paymentId=${data.paymentId}&modelType=${data.modelType}`)
    },
		// 选择付款方式
		choosePayWay (index) {
			this.activeIndex = index
			this.bankChooseList.forEach((v, x) => {
				if (index === x) {
					this.$set(this.bankChooseList[x], 'selected', true)
				} else {
					this.$set(this.bankChooseList[x], 'selected', false)
				}
			})
      this.getActPayment(() => {
        console.log(this.actPayment)
        let {minAmount, maxAmount, keyName, bankName} = this.actPayment
        let name = keyName || bankName
        if (!this.amount) {
          this.$$msg.show(this.$i18n('请输入充值金额'))
        } else if (this.amount < minAmount || this.amount > maxAmount) {
          return this.$$msg.show(this.$i18n('支付方式限额', {
            name,
            minAmount,
            maxAmount,
            moneyKey: this.$$tools.moneyKey
          }, '支付方式限额'))
        } else {
          this.submitHandel()
        }
      })
		},
		//选择银行卡
		chooseBankCard (e, index, idx) {
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
			this.getActPayment()
		},
	},
	computed: {
		isMobile () {
			return this.$$tools.isMobile();
		},
    limitInfo () {
      let mins = [],maxs = []
      this.bankChooseList.forEach(item => {
        item.bankCardList.forEach(child => {
          mins.push(child.minAmount)
          maxs.push(child.maxAmount)
        })
      })
      return {
        minAmount: Math.min(...mins),
        maxAmount: Math.max(...maxs)
      }
    },
		amountIsRight () {
			return true
		},
		lang () {
			return this.config.lang;
		},

		filterQuickAmountList () {
			let quickAmountList = this.quickAmountList;
			let minAmount = parseInt(this.minAmount || 0);
			let maxAmount = parseInt(this.maxAmount || 10000000);
			return quickAmountList.filter(function (item) {
				return item >= minAmount && item <= maxAmount;
			});
		},
		// 是否显示支付方式
		showPayWay () {
			return true
		},
		// 是否是自动订单
		autoOrder () {
			return ['zz_c'].includes(this.actPayment.paymentId)
		}
	},
	components: {
		confirmName
	},
}
</script>

<style lang="scss" rel="stylesheet/scss">
#bank-my {
  height: 100%;
  background: #EEF0FE;
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
    color: $skin-color333;
    font-weight: 600;
    line-height: 20px;
    font-size: 14px;
  }

  .choose-list {
    color: $skin-color333;
    font-weight: bold;
    padding-bottom: env(safe-area-inset-bottom);
  }
  .choose-pay-mode.choose-active {
    .choose-item-top {
      border: 1px solid $skin-color1;
    }
  }
  .choose-item-top {
    display: flex;
    flex-flow: row nowrap;
    height: 44px;
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
    .choose-bank-item {
      background: $skin-font1;
      border: 1px solid $skin-bg4;
      border-radius: 10px;
      vertical-align: middle;
      display: flex;
      align-items: center;
      padding: 15px;
      box-sizing: border-box;
      margin-bottom: 9px;
      min-height: 71px;

      &.active {
        border: 1px solid $skin-color1;
      }
    }

    .bank-name {
      vertical-align: middle;
      display: inline-block;
      max-width: 80px;
      font-size: 14px;
    }
    .bank-limit {
      background: $skin-color1;
      height: 20px;
      line-height: 20px;
      padding: 0 5px;
      border-radius: 4px;
      font-size: 10px;
    }
    .choose-child-desc {
      font-size: 10px;
      color: $skin-font3;
      font-weight: normal;
      margin-top: 7px;
      line-height: 15px;
      overflow: hidden;
      text-overflow: ellipsis;  /* 超出部分省略号 */
      word-break: break-all;  /* break-all(允许在单词内换行。) */
      display: -webkit-box; /* 对象作为伸缩盒子模型显示 */
      -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
      -webkit-line-clamp: 3; /* 显示的行数 */
    }
    .bank-child-arrow {
      margin-left: 10px;
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
    background: $skin-bg4;
    overflow: hidden;
    border-radius: 7px;
    .act_gift {
      position: absolute;
      color: $skin-color2;
      font-size: 14px;
      font-weight: 600;
      line-height: normal;
      top: 0;
      right: 0;
    }

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
      position: relative;
      display: flex;
      align-items: center;
      height: 44px;
      line-height: 44px;
      border-radius: 10px;
      padding: 0 15px;
      margin: 0 10px 10px 0;
      background: $skin-bg4;
      border: 1px solid $skin-bg4;
      color: $skin-color333;
      font-weight: bold;
      .act_gift {
        position: absolute;
        color: $skin-color2;
        font-weight: 600;
        line-height: normal;
        width: 100%;
        text-align: right;
        top: -10px;
        left: 0;
      }

      &:hover,
      &.active {
        border: 1px solid $skin-color1;
        background: no-repeat left top $skin-color1;
        background-size: 17px 18px;
      }
      &.no-bg {
        background: transparent;
        border-color: transparent;
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
    color: #ffffff;
    font-size: 18px;
    border-radius: 10px;
    background: $skin-color1;
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
    }

    .panel-main {
      padding: 0 0 20px;
      background: none;
      color: $skin-font1;
    }
    .init-common {
      background: $skin-font1;
      padding: 1px 15px 15px;
      border-radius: 8px;
      overflow: hidden;
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


@media screen and (min-width: 780px) {
  body {
    #bank-my {
      .title-s1 {
        color: $skin-font5;
        margin: 0;
      }
      .choose-item-top {
        background: $pc-bg2;
        color: $skin-font5;
        font-weight: bold;
        margin: 20px 0 20px;
      }
      .choose-bank-list {
        margin: 20px 0 30px;
        .choose-bank-item {
          background: $pc-bg2;
          color: $skin-font5;
          font-weight: bold;
          border-color: $pc-bg2;
        }
        .bank-icon {
          width: 22px;
          height: 22px;
        }
      }
      .quick-amount-box {
        margin: 20px 0 20px;
        .item {
          max-width: 1.4rem;
          flex: 1;
          min-width: 0;
          background: $pc-bg2;
          border-color: transparent;
          color: $skin-font5;
          font-weight: bold;
          &:hover {
            color: $skin-font5;
          }
        }
      }
      .input-amount-warp {
        background: $pc-bg2;
        color: $skin-font5;
        .input-amount {
          color: $skin-font5;
        }
      }

    }
  }
}

</style>
