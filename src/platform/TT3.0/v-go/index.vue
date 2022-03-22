<template>
	<div id="v-detail" class="view-bg-gray">
		<div class="layout-wrap form-s1">
			<div class="panel-main box-shadow">
				<div class="bank-info form-item">
					<div class="w-row w-middle">
						<div class="img-wrap">
							<img :src="transferInfo.iconUrl" alt="" />
						</div>
						<div class="ml10">
							<p class="fw-100 f14 color-898">{{ $i18n("detail.index.txt_1", "银行名称") }}</p>
							<p class="f16 b mt5 color-333">{{ transferInfo.bankName }}</p>
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
						<p class="b color-333 f16">{{ transferInfo.bankCard }}</p>
					</div>

					<div class="btn btn-copy" @click="copy(transferInfo.bankCard)">{{ $i18n("detail.index.txt_3", "复制") }}</div>
				</div>

				<div class="form-item">
					<div>
						<h5 class="label color-898">{{ $i18n("detail.index.txt_4", "开户姓名") }}</h5>
						<p class="b color-333 f16">{{ transferInfo.cardholder }}</p>
					</div>

					<div class="btn btn-copy" @click="copy(transferInfo.cardholder)">
						{{ $i18n("detail.index.txt_3", "复制") }}
					</div>
				</div>

				<div class="form-item mb30">
					<div>
						<h5 class="label color-898">{{ $i18n("detail.index.txt_5", "存款金额") }}</h5>
						<div class="w-row w-middle f14">
							<div class="b f16 fc-red">
								{{ transferInfo.amount | money }}
							</div>
							<span>{{ $$tools.moneyKey }}</span>
							<div class="ml30">
								<span class="line-through f18 fc-bcb">
									{{ transferInfo.baseAmount | money }} {{ $$tools.moneyKey }}
								</span>
							</div>
						</div>
					</div>

					<div class="btn btn-copy" @click="copy(transferInfo.amount)">{{ $i18n("detail.index.txt_3", "复制") }}</div>
				</div>
			</div>

			<div class="tips-box mt20">
				<img class="icon-tips" src="./images/icon-tips2.png" alt="" />
				<div
					class="tips-info ml10"
					v-html="
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
				>
					<!--  请在 <em>30分钟</em>内存入
                      <em>{{transferInfo.amount | money}}Ks</em>到上述银行卡，
                      不是 <em>{{transferInfo.baseAmount | money}}Ks</em>
                      ，否则您的存款不能实时到账。-->
				</div>
			</div>

			<div class="btn btn-cancel mt30" @click="cancelHandel">{{ $i18n("detail.index.txt_7", "撤销订单") }}</div>

			<div class="panel-notice">
				<h5 class="title-notice">
					{{ $i18n("detail.index.txt_8", "注意") }}
				</h5>
				<div class="item-notice">
					<em>1</em>
					{{ $i18n("detail.index.txt_9", "如果您想修改支付金额，请先撤销订单，然后重新发起新的订单请求；") }}
				</div>
				<div class="item-notice">
					<em>2</em>
					{{
						$i18n(
							"detail.index.txt_10",
							"如果您已完成汇款，请勿点击“撤销订单”按钮，成功汇款超过3分钟未到账，请联系 在线客服， 我们将尽快为您处理。"
						)
					}}
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">

import countDown from '@/components/count-down';
import Tools from '@/common/tools';
import {injectLanguage} from "@/common/i18n";
import lang from "./language.json";

let injectOnce = Tools.once(function(){
	injectLanguage(lang);
});
export default {
	name: "v-detail",
	data() {
		return {
			countDownSecond: [],

			moneyUnit:"Ks"
		}
	},
	props: {
		config: Object
	},
	mounted() {

		injectOnce();

		this.moneyUnit = this.config.currencyUnit;

		this.init();
	},
	methods: {
		init() {

			this.countDownSecond = [this.transferInfo.ttlSeconds * 1000];
		},
		endCount() {

			this.$$alert(this.$i18n('detail.index.txt_11','倒计时结束，请重新提交充值申请！'))
		},

		cancelHandel() {
			this.$$confirm(this.$i18n('detail.index.txt_12','如已汇款请勿撤销，我们将尽快为您处理，撤销订单将影响实时到帐！'), rs => {
						if (rs) {

							this.withdrawal();
						}
					}, this.$i18n('detail.index.txt_13','提示'),
					'',
					this.$i18n('detail.index.txt_7','撤销订单'),
					this.$i18n('detail.index.txt_14','暂不撤销'));
		},

		withdrawal() {
			let config = this.config, transferInfo = this.transferInfo;
			window.location.href = `/p/cancel?sign=${encodeURIComponent(config.sign)}&paymentAmount=${transferInfo.amount}&paymentId=${config.paymentId}&lang=${config.lang}`
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
	components: {countDown}
}
</script>

<style lang="scss" rel="stylesheet/scss">
#v-detail {
	.color-898 {
		color: #898c98;
	}
	.color-333 {
		color: #333333;
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
			border-bottom: 1px solid #f0f1f7;

			&:last-child {
				border-bottom: none;
			}
		}

		.label {
			font-size: 12px;
			font-weight: 200;
			color: #898c98;
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
		color: #bcbfcb;
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

	.btn-cancel {
		width: 300px;
		height: 50px;
		border: 2px solid #898c98;
		font-size: 15px;
		font-weight: bold;
		background: transparent;
		color: #676974;
		border-radius: 25px;
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
		color: #b3b3b3;
	}
	.v-count-down {
		.time {
			width: 32px;
			height: 32px;
			line-height: 32px;
			font-size: 16px;
			background-image: linear-gradient(180deg, #2d384d 0%, #1a212f 100%);
			box-shadow: none;
			border-radius: 3px;
			text-align: center;
		}
		.dot {
			&::before,
			&::after {
				background: #2d384d;
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
		min-height: 420px;
		background-color: #fcfcff;
		border: 2px dashed #e5e5eb;
		border-radius: 10px;
		padding: 10px 40px 10px 104px;
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
			font-size: 16px;
			color: #333333;
		}
	}
	.tips-box {
		display: flex;
		align-items: flex-start;
		padding: 0 !important;
		border-radius: 0 !important;
		background: none !important;
		border: none !important;
		font-size: 14px;
	}
}

#v-alert {
	.content {
		margin-top: 20px !important;
		color: #808080;
	}
	.wrap-btns {
		display: block !important;
		height: auto !important;
		margin-top: 30px !important;
		.btn {
			width: 100%;
			height: 40px;
			display: block;
			border-radius: 10px;
			border: none;
		}
		.btn-cancel {
			color: #333333;
			background: #f5f6f7;
		}
		.btn-ok {
			margin-top: 10px;
			background: #ed4041;
		}
	}
}
</style>
