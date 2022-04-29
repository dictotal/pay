<template>
	<div id="v-detail" class="view-bg-gray" :class="status">
		<div class="card-view">
			<div class="logo-view">
				<img src="./images/qrLogo.png" />
			</div>
			<div class="time-view">
				<count-down :time="countDownSecond" @endCount="endCount" />
			</div>
			<div class="qrcode-view">
				<div class="qrcode">
					<canvas ref="qr"></canvas>
				</div>
				<span>{{ $i18n("detail.index.txt_5", "扫描二维码支付") }}</span>
			</div>
			<div class="result-view">
				<img :src="result.image" />
				<div>{{ result.message }}</div>
			</div>
		</div>
		<div class="card-view bank-view">
			<div class="tips-view">
				{{ $i18n("detail.index.txt_1", "支持以下银行的手机应用程序扫描二维码进行支付") }}
			</div>
			<div class="bank-imgs">
				<img v-for="i in 4" :src="require(`./images/bank${i}.png`)" />
			</div>
		</div>
		<div class="card-view order-view">
			<div class="order-item">
				<div class="order-title">Deposit amount:</div>
				<div>{{ orderAmount }}{{ moneyUnit }}</div>
			</div>
			<div class="order-item">
				<div class="order-title">Order number:</div>
				<div class="order-value">
					{{ orderNo }}
					<img src="./images/copy.png" @click="copy" />
				</div>
			</div>
		</div>
		<div class="btn btn-cancel" v-if="status === 'wait'" @click="cancelHandel">{{ $i18n("detail.index.txt_7", "撤销订单") }}</div>
	</div>
</template>

<script type="text/ecmascript-6">

import countDown from '@/components/count-down';
import QRious from 'qrious';
import {injectLanguage} from "@/common/i18n";
import lang from "./language.json";
injectLanguage(lang);
export default {
    name: "v-detail",
    data() {
        return {
            countDownSecond: [],

            moneyUnit:"Ks",
			orderNo: '',
			orderAmount: 0,
        }
    },
    props: {
        config: Object
    },
    mounted() {
        this.init();

        if(this.status !== "wait"){
            return false;
        }
        this.initQr();
        this.iniLoop();

        this.countDownSecond = [this.qrCodeInfo.ttlSeconds * 1000];
    },
    methods: {
        init() {

            this.moneyUnit = this.config.currencyUnit;
            let {amount,orderNo}= this.qrCodeInfo;
            this.orderNo = orderNo;
            this.orderAmount = amount;
        },
        initQr(){

            let qr = new QRious({
                element: this.$refs.qr,
                value: this.qrCodeInfo.thirdUrl
            });
            qr.size = 440;
        },
        iniLoop(){
            if(this.status !== "wait") {
                return false;
            }
            setTimeout(()=>{
                this.$$ajax.get("/p/recharge/payStatus",{orderNo:this.orderNo}).then(resp=>{

                    this.qrCodeInfo.status  =  resp.orderStatus;

                }).finally(()=>{
                    this.iniLoop();
                })
            },5000)
        },
        endCount() {
            if (this.status === 'wait') {
                this.$$alert(this.$i18n('detail.index.txt_6','倒计时结束，请重新提交充值申请！'), () => {
                    this.withdrawal()
                })
            }

        },
		copy() {
			this.$$msg.show(this.$i18n('detail.index.txt_4','复制成功,请粘贴使用'));
			this.$$tools.copyToClipboard(this.orderNo);
		},
        getStatus(status){
            let cfg = {
                pay$waiting:"wait",
                pay$success:"success",
                pay$failed:"failed"
            }
            return cfg[status]||"failed";
        },
		cancelHandel() {
			this.$$confirm(this.$i18n('detail.index.txt_8','如已汇款请勿撤销，我们将尽快为您处理，撤销订单将影响实时到帐！'), rs => {
						if (rs) {
							this.withdrawal();
						}
					}, this.$i18n('detail.index.txt_10','提示'),
					'',
					this.$i18n('detail.index.txt_7','撤销订单'),
					this.$i18n('detail.index.txt_9','暂不撤销'));
		},
		withdrawal() {
			let config = this.config, qrCodeInfo = this.qrCodeInfo;
			window.location.href = `/p/cancel?sign=${encodeURIComponent(config.sign)}&paymentAmount=${qrCodeInfo.amount}&paymentId=${config.paymentId}&lang=${config.lang}`
		}
    },
    computed: {

        status(){
            return this.getStatus(this.qrCodeInfo.status);
        },
    	result() {
    		if (this.status === "wait"){
    			return {}
			}
			let message = this.$i18n('detail.index.txt_3','支付失败')
    		if (this.status === 'success') {
				message = this.$i18n('detail.index.txt_2','支付成功')
			}
    		let image = require(`./images/${this.status}.png`)
    		return {image, message}
		},
		qrCodeInfo() {
            return this.config.qrCodeInfo || {};
        },
        isMobile() {
            return this.$$tools.isMobile();
        },
    },
    components: {countDown}
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

	.card-view {
		background-color: #ffffff;
		border: 1px #f0f0f0 solid;
		border-radius: 10px;
		font-weight: 600;
		color: #333333;
		font-size: 13px;
		margin: 0 12px 8px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		&.bank-view {
			border-top: unset;
			border-radius: 0 0 10px 10px;
			padding-top: 20px;
			margin-top: -20px;
		}
	}
	.logo-view {
		width: 100%;
		height: 47px;
		background-color: #00366a;
		border-radius: 10px 10px 0px 0px;
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			width: 112px;
			height: 47px;
		}
	}
	.time-view {
		width: 130px;
		height: 40px;
		background-color: #ffffff;
		border: 1px #cccccc solid;
		border-radius: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20px;
		.v-count-down {
			.time {
				font-size: 24px;
				background-color: #ffffff;
				color: #333333;
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
		margin: 30px 0;
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
		.order-item {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 15px;
			.order-title {
				color: #808080;
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
	.btn-cancel {
		margin: 15px 12px;
		width: 350px;
		height: 50px;
		border: 2px solid #808080;
		font-size: 15px;
		font-weight: bold;
		background: transparent;
		color: #808080;
		border-radius: 12px;
	}
}
@media screen and (min-width: 780px) {
	#v-detail {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		position: relative;
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
		}
		.card-view {
			position: relative;
			margin: 0;
			width: 269px;
			border-radius: 24px;
			&.bank-view,
			&.order-view {
				position: absolute;
				right: 30px;
				width: 471px;
			}
			&.bank-view {
				position: absolute;
				background-color: unset;
				border: unset;
				top: 0;
				padding: 36px 0 20px;
				margin: 0;
				justify-content: flex-start;
				align-items: flex-start;
				.bank-imgs {
					position: relative;
					width: 100%;
					height: unset;
					justify-content: flex-start;
					img {
						width: 100px;
						height: 30px;
						margin-left: 20px;
						&:first-child {
							margin-left: 0;
						}
					}
				}
				&:after {
					content: " ";
					position: absolute;
					bottom: 0;
					right: 0;
					height: 1px;
					background-color: #ebebeb;
					width: 471px;
				}
			}
			&.order-view {
				bottom: 70px;
				height: 130px;
				background-color: #fffef2;
				border: 1px #f0f0f0 solid;
				border-radius: 10px;
				padding: 0 30px;
				justify-content: space-around;
				align-items: center;
				.order-item {
					margin: 0;
					.order-title {
						color: #808080;
					}
				}
			}
			.logo-view {
				height: 60px;
				border-radius: 24px 24px 0px 0px;
				justify-content: space-between;
				align-items: center;
				img {
					margin-left: 24px;
				}
			}
			.time-view {
				position: absolute;
				top: 0;
				right: 0;
				height: 60px;
				margin: 0;
				background-color: #00366a;
				border-radius: 0 24px 0px 0px;
				border: unset;
				.v-count-down {
					.time {
						font-size: 24px;
						background-color: #00366a;
						color: #fff500;
						box-shadow: none;
						border-radius: 3px;
						text-align: center;
					}
					.dot {
						&::before,
						&::after {
							margin-top: 5px;
							background: #fff500;
						}
					}
				}
			}
			.qrcode-view {
				padding: 16px 0;
				margin: 0;
				width: 100%;
				border: 2px #00366a solid;
				border-radius: 0px 0px 24px 24px;
				span {
					display: block;
					font-size: 18px;
					color: #00366a;
					margin-top: 16px;
				}
			}
		}
		.result-view {
			padding: 16px 0;
			margin: 0;
			width: 100%;
			border: 2px #00366a solid;
			border-radius: 0px 0px 24px 24px;
			display: none;
			justify-content: center;
			align-items: center;
			padding: 95px 0;
		}
		.btn-cancel {
			position: absolute;
			bottom: 0;
			margin-bottom: 8px;
			right: 70px;
		}
	}
	canvas {
		width: 220px;
		height: 220px;
	}
}
</style>
