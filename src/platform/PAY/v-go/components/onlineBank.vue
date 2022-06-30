<template>
  <div id="v-detail" class="view-bg-gray" :class="status">
    <cancel-order :config="config" @cancelHandel="cancelHandel" :status="status"></cancel-order>
    <div class="iframe-el-container">
      <iframe class="iframe-el" :src="config.url" frameborder="0"></iframe>
    </div>
    <div class="empty-padding"></div>
  </div>
</template>

<script type="text/ecmascript-6">

import countDown from '@/components/count-down';
import QRious from 'qrious';
import CancelOrder from '@/components/cancel-order'
import { injectLanguage } from "@/common/i18n";
import lang from "../language.json";
injectLanguage(lang);
export default {
	name: "v-detail",
	data () {
		return {
			countDownSecond: [],
			moneyUnit: "Ks",
			orderNo: '',
			orderAmount: 0,
		}
	},
	props: {
		config: Object
	},
	mounted () {
		this.init();
		if (this.status !== "wait") {
			return false;
		}
		this.initQr();
		this.iniLoop();
		this.countDownSecond = [this.qrCodeInfo.ttlSeconds * 1000];
    this.$$tools.postMessage('addFrameHeight', {value: 1280})
  },
  beforeDestroy () {
    this.clearTimeout()
  },
  methods: {
    clearTimeout () {
      if (this.timeOut) {
        clearTimeout(this.timeOut)
      }
    },
		init () {
			this.moneyUnit = this.config.currencyUnit;
			let { amount, orderNo } = this.qrCodeInfo;
			this.orderNo = orderNo;
			this.orderAmount = amount;
			this.listenMessage()
		},
		listenMessage () {
			// url有参数才能发正常渲染数据，提交的时候是form post， 无参数不能由客户端再次加载
			window.removeEventListener('message', this.messageHandle)
			window.addEventListener('message', this.messageHandle)
		},
		// 消息处理
		messageHandle ({ data }) {
			switch (data.action) {
				case 'payComplete':
					dsBridge.call('payComplete', {})
					this.$$tools.postMessage('payComplete', data.params)
				default: '';
			}
		},

		initQr () {
			let qr = new QRious({
				element: this.$refs.qr,
				value: this.qrCodeInfo.thirdUrl
			});
			qr.size = 440;
		},
		iniLoop () {
			if (this.status !== "wait") {
				return false;
			}
      if (this.timeOut) {
        clearTimeout(this.timeOut)
      }
			this.timeOut = setTimeout(() => {
				this.$$ajax.post("/recharge/payStatus", { orderNo: this.orderNo }).then(resp => {
					this.qrCodeInfo.status = resp.orderStatus;
				}).finally(() => {
					this.iniLoop();
				})
			}, 5000)
    },
		endCount () {
			this.$$alert(this.$i18n('detail.qrcode.txt_6', '倒计时结束，请重新提交充值申请！'))
		},
		copy () {
			this.$$msg.show(this.$i18n('detail.qrcode.txt_4', '复制成功,请粘贴使用'));
			this.$$tools.copyToClipboard(this.orderNo);
		},
		getStatus (status) {
			let cfg = {
				pay$waiting: "wait",
				pay$success: "success",
				pay$failed: "failed"
			}
			let newStatus = cfg[status] || "failed";
			// 不是waiting跳转到充值订单详情，改版中
			// let url = `/charge/status/${this.config.orderNo}`
			// if (newStatus !== 'wait') {
			//   config.qrCodeInfo.status = status
			//   localStorage.setItem(`charge${config.orderNo}`, JSON.stringify(this.config))
			//   this.$router.replace(url)
			// }
			return newStatus
		},
		cancelHandel () {
			this.$$confirm(this.$i18n('detail.qrcode.txt_8', '如已汇款请勿撤销，我们将尽快为您处理，撤销订单将影响实时到帐！'), rs => {
				if (rs) {
					this.cancelOrder();
				}
			}, this.$i18n('detail.qrcode.txt_10', '提示'),
				'',
				this.$i18n('detail.qrcode.txt_7', '撤销订单'),
				this.$i18n('detail.qrcode.txt_9', '暂不撤销'));
		},
		cancelOrder () {
			let qrCodeInfo = this.qrCodeInfo;
			this.$$ajaxLoading.post('/recharge/cancelRecharge', {
				amount: qrCodeInfo.amount,
				paymentAmount: qrCodeInfo.baseAmount,
				paymentId: this.config.paymentId
			}).then(() => {
				window.config = undefined
        this.clearTimeout()
				this.$router.replace('/')
			}).catch(err => {
        this.clearTimeout()
				this.$$msg.show(err)
			})
		}
	},
	computed: {
		status () {
			return this.getStatus(this.qrCodeInfo.status);
		},
		result () {
			if (this.status === "wait") {
				return {}
			}
			let message = this.$i18n('detail.qrcode.txt_3', '支付失败')
			if (this.status === 'success') {
				message = this.$i18n('detail.qrcode.txt_2', '支付成功')
			}
			let image = require(`../images/${this.status}.png`)
			return { image, message }
		},
		qrCodeInfo () {
			return this.config.qrCodeInfo || {};
		},
		isMobile () {
			return this.$$tools.isMobile();
		},
	},
	components: { countDown, CancelOrder }
}
</script>

<style lang="scss" rel="stylesheet/scss">
#v-detail {
  &.success,
  &.failed {
    .time-view,
    .qrcode-view,
    .bank-view {
      display: none;
    }
    .result-view {
      display: flex;
    }
  }
  .empty-padding {
    height: 50px;
    height: calc(20px + env(safe-area-inset-bottom));
  }

  .iframe-el-container {
    height: calc(100vh - 67px);
    width: 100%;
    overflow: hidden;
    .iframe-el {
      height: 50%;
      display: block;
      width: 50%;
      transform: translate(50%, 50%) scale(2);
    }
  }
  .time-view {
    width: 130px;
    height: 27px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    .v-count-down {
      .time {
        font-size: 16px;
        background-color: $skin-white;
        color: $skin-font1;
        box-shadow: none;
        border-radius: 3px;
        text-align: center;
      }
      .dot {
        &::before,
        &::after {
          margin-top: 5px;
          background: #333333;
        }
      }
    }
  }
  .qrcode-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    .qrcode {
      width: 220px;
      height: 220px;
    }
    span {
      display: none;
    }
  }
  .bank-imgs {
    width: 308px;
    height: 88px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    img {
      width: 134px;
      height: 40px;
    }
  }
  .result-view {
    margin: 30px 0;
    font-weight: 600;
    color: #333333;
    font-size: 17px;
    display: none;
    flex-direction: column;
    img {
      width: 70px;
      height: 70px;
      margin-bottom: 10px;
    }
  }
  .order-view {
    padding: 15px 17px 0;
    background: $skin-white;
    border-color: $skin-font5;
    .order-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      color: $skin-font1;
      .order-title {
        color: $skin-font3;
        font-size: 13px;
      }
      .order-value {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 17px;
          height: 17px;
          margin-left: 1px;
        }
      }
    }
  }
  .btn {
    text-align: center;
  }
}
@media screen and (min-width: 780px) {
  #v-detail {
    position: relative;
    background: #fff;
    .iframe-el-container {
      height: auto;
      width: 100%;
      .iframe-el {
        width: 60%;
        transform: initial;
        margin: 20px auto;
        height: 1128px;
      }
    }
    &.success,
    &.failed {
      .time-view,
      .qrcode-view {
        display: none;
      }
      .result-view,
      .bank-view {
        display: flex;
      }
    }
    &.view-bg-gray {
      min-height: 262px;
      margin: 0 17px 12px;
      border-radius: 24px;
      margin: 20px;
      overflow: hidden;
      border-radius: 10px;
    }
  }
}
</style>
