<template>
	<div id="bank-my" class="view-bg-gray" :class="{'pay-init-tt-pc': isMobile !== true}">
		<div class="layout-wrap">
			<div class="panel-main box-shadow">
				<h2 class="title-s1">{{ $i18n("bank-my.index.txt_1", "选择银行") }}</h2>
				<div class="bank-card-list">
					<div
						class="bank-card-item cur"
						@click="bankChange(item)"
						:class="{active: actBank === item}"
						v-for="item in bankCardList"
					>
						<div class="img-wrap">
							<img v-if="item.iconUrl" :src="item.iconUrl" :alt="item.name" />
						</div>
						<p class="bank-name">{{ item.bankName }}</p>
					</div>
				</div>

				<h2 class="title-s1">{{ $i18n("bank-my.index.txt_2", "存款金额") }}</h2>
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

				<div class="quick-amount-box mt30">
					<div class="item btn btn-amount mb10 f-din" @click="amount = item" v-for="item in filterQuickAmountList">
						{{ item | money }}
					</div>
				</div>

				<div class="mt30 pb30 w-row w-center">
					<div class="btn btn-submit" :class="{disable: !amountIsRight}" @click="submitHandel">
						{{ $i18n("bank-my.index.txt_4", "下一步") }}
					</div>
				</div>
			</div>

			<div class="panel-notice">
				<h5 class="title-notice">
					{{ $i18n("bank-my.index.txt_5", "提示") }}
				</h5>
				<div class="item-notice">
					<em>1</em>
					{{
						$i18n(
							"bank-my.index.txt_6",
							{
								minAmount: $$tools.moneyInternational(minAmount),
								maxAmount: $$tools.moneyInternational(maxAmount),
								moneyUnit: $$tools.moneyKey
							},
							"充值金额：单笔最低充值金额为{minAmount}{moneyUnit}，最高 {maxAmount}{moneyUnit}"
						)
					}}
				</div>
				<div class="item-notice">
					<em>2</em>
					{{ $i18n("bank-my.index.txt_7", "充值时限：请在30分钟内完成充值") }}
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">

import Tools from '@/common/tools';
import {injectLanguage} from "@/common/i18n";
import lang from "./language.json";

let injectOnce = Tools.once(function(){
    injectLanguage(lang);
});

export default {
    name: "v-init",
    data() {
        return {
            bankCardList: [

            ],
            actBank: {},

            paymentMethodList:[],
            actPaymentIdx:0,

            quickAmountList: [
                5000,10000,20000,50000,100000,200000,500000
            ],
            amount:"",

            moneyUnit:"Ks"
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

        init(){
            let cfg = this.config;

            this.bankCardList = cfg.bankCardList||[];
            this.actBank =  this.bankCardList.length?this.bankCardList[0]:null;

            this.paymentMethodList = cfg.paymentMethodList||[];
        },

        limitAmountHandel(){
            let maxAmount = this.maxAmount,
                minAmount = this.minAmount,
                amount = this.amount;

            if(minAmount){
                if(amount<minAmount){
                    amount = minAmount;
                }
            }

            if(maxAmount){
                if(amount>maxAmount){
                    amount = maxAmount;
                }
            }

            this.amount = amount;
        },

        submitHandel(){

            if(!this.amountIsRight){
                return false;
            }
            let config = this.config,actPayment = this.actPayment;
            let queryMap = {
                paymentId:config.paymentId,
                paymentKey: actPayment.paymentKey,
                paymentType: actPayment.paymentType,
                rechargeFees: actPayment.rechargeFees,
                paymentAmount: this.amount,

                id:this.actBank.id
            }
            this.$$tools.formSubmit({
                sign: config.sign,
                token: encryptPublicLong(this.$$tools.map2get(queryMap), config.publicKey),
                lang:this.lang

            }, "/p/pay?lang="+this.lang);
        },

        bankChange(item){
            this.actBank = item;
            if(this.amount){
                this.limitAmountHandel();
            }
        }
    },
    computed:{
        isMobile() {
            return this.$$tools.isMobile();
        },
        actPayment(){
            return this.paymentMethodList[this.actPaymentIdx]||{};
        },

        maxAmount(){
            return  this.actBank.maxAmount||this.actPayment.maxAmount;
        },

        minAmount(){
            return  this.actBank.minAmount||this.actPayment.minAmount;
        },
        amountIsRight(){
            let amount = this.amount;
            return amount>=this.minAmount&&amount<=this.maxAmount
        },
        lang(){
            return this.config.lang;
        },

        filterQuickAmountList(){
            let quickAmountList = this.quickAmountList;
            let minAmount = parseInt(this.minAmount||0);
            let maxAmount = parseInt(this.maxAmount||10000000);
            return quickAmountList.filter(function(item){
                return item>=minAmount&&item<=maxAmount;
            });
        }
    }
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
		color: #333;
		font-weight: 600;
		line-height: 20px;
		font-size: 14px;
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
		height: 50px;
		.amount-type {
			position: absolute;
			top: 10px;
			right: 20px;
			line-height: 30px;
			font-size: 14px;
			color: #bcbfcb;
		}
		.input-amount {
			width: 100%;
			height: 48px;
			padding: 0 50px 0 20px;
			border: 1px solid #bcbfcb;
			box-sizing: border-box;
			border-radius: 5px;
			color: #000000;
			font-size: 20px;
			&:focus {
				border: 1px solid #898c98;
			}
			&::placeholder {
				color: #bcbfcb;
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
			height: 36px;
			border: 1px solid #e4e5e9;
			border-radius: 5px;
			padding: 0 15px;
			margin: 0 10px 10px 0;
			&:hover,
			&.active {
				color: #ffffff;
				border: 1px solid #ed4041;
				background: #ed4041;
			}
		}
	}
	.line-1 {
		height: 1px;
		background: #e7ebf4;
	}
	.w-center {
		border-top: 1px solid #e7ebf4;
		padding-top: 30px;
		margin-top: 20px;
		justify-content: left;
	}
	.btn.btn-submit {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 320px;
		height: 50px;
		background-image: linear-gradient(180deg, #fa7b7c 0%, #ed4041 100%);
		color: #ffffff;
		font-size: 18px;
		border-radius: 10px;
		box-shadow: 0 0 7px rgba(237, 64, 65, 0.2);
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
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			grid-column-gap: 20px;
		}
		.panel-main {
			padding: 0 15px;
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
