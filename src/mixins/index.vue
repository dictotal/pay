<template>
	<div id="v-index">
		<div class="test-list" v-if="isTestModel">
			<div
				class="btn btn-nav"
				:class="{active: idx === actTestIdx}"
				@click="actTestIdx = idx"
				v-for="(item, idx) in testViewList"
                :key="idx"
			>
				{{ item.label }}
			</div>
		</div>
		<component v-if="config" :is="viewName" :config="config" />
	</div>
</template>

<script type="text/ecmascript-6">

import {changeLanguage} from "@/common/i18n";

let input  = document.querySelector("body > input[type=hidden]");
const CONFIG = input?JSON.parse(input.value):{};

changeLanguage(CONFIG.lang||"zh");
export default {
    name: "v-index",
    data() {
        return {
            actTestIdx:0,
            testViewList:[
                {label:'INIT',value:"vInit"},
                {label:'GO',value:"vGo"},
            ],
            view:"",
            config: null
        }
    },

    created(){

        this.config = CONFIG;
        this.view =  input.dataset.view;

        this.$$tools.setMoneyKey(CONFIG.currencyUnit)
    },
    methods: {

    },
    computed: {
        actTestView(){
            return this.testViewList[this.actTestIdx];
        },

        viewName() {
            if(this.$$cfg.isTestModel){
                return this.actTestView.value;
            }

            return `v-${this.view}`;
        },
        isTestModel(){
            return this.$$cfg.isTestModel;
        }
    },


}
</script>

<style lang="scss" rel="stylesheet/scss">
#v-index {
	height: 100%;
	&.is-test {
		height: calc(100vh - 50px);
	}
	.test-list {
		.btn-nav {
			height: 48px;
			line-height: 48px;
			padding: 0 20px;
			border-radius: 10px 10px 0 0;
			color: #ffffff;
			background: #898c98;
			&.active {
				background: linear-gradient(90deg, #ff6e6e, #ff0000);
			}
		}
	}
}
</style>
