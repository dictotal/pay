<template>
	<transition name="dialog">
		<div id="v-alert" v-if="isShow" :class="[type, css]" :style="{ 'z-index': zIndex }">
			<h1 class="title">{{ title }}</h1>
			<div class="content" v-html="content"></div>

			<div class="wrap-ipt pr" v-if="type === 'prompt'">
				<input v-model="prompt.value" maxlength="60" :type="prompt.inputType" />

				<transition name="fade">
					<p v-show="prompt.err" class="va-tips tl">{{ prompt.inputErrorMessage }}</p>
				</transition>
			</div>

			<div class="wrap-btns">
				<div class="btn btn-cancel" @click="handel(false)">{{ cancelTxt }}</div>
				<div class="btn btn-ok" @click="handel(true)">{{ okTxt }}</div>
			</div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">

import IndexTools from '../z-index';
import Tools from '@/common/tools';
import {injectLanguage} from "../i18n";
import lang from "./language.json";

let injectOnce = Tools.once(function(){
    injectLanguage(lang);
});

const PROMPT = {
    inputType: 'text',
    value: "",

    inputPattern: null,

    inputErrorMessage: '',
    err: false
};
export default {
    name: "alert",
    data() {
        return {

            type: 'alert',
            isShow: false,
            maskUid: "",
            title: '',
            content: "",
            zIndex: 100,
            prompt: {},
            css: '',
            okTxt:"",
            cancelTxt:""
        }
    },
    created(){

        injectOnce()
    },
    methods: {
        show(content, callback, title, cfg, css,okTxt,cancelTxt) {
            this.css = css;

            if (this.isShow === false) {

                this.maskUid = this.$$mask.show();

                this.zIndex = IndexTools.getZIndex();
            }
            this.isShow = true;
            this.title = title || this.$i18n("common.alert.txt_1","消息提示");
            this.content = content || "";

            if (this.isPrompt) {
                this.prompt = Tools.responseInit(PROMPT, cfg);
            }

            this.callback = callback;
            this.okTxt = okTxt || this.$i18n("common.alert.txt_2","确定");
            this.cancelTxt = cancelTxt || this.$i18n("common.alert.txt_3","取消");
        },
        hidden() {
            this.isShow = false;
            this.$$mask.hidden(this.maskUid);
        },

        promptCheck() {
            let rs = true, prompt = this.prompt;
            if (this.isPrompt && prompt.inputPattern) {
                rs = prompt.inputPattern.test(prompt.value);
                prompt.err = !rs;
            }
            return rs;
        },
        handel(isOk) {


            if (isOk && !this.promptCheck()) {
                return false;
            }
            if (this.callback) {
                this.callback(isOk, this.prompt.value);
            }

            this.hidden();
        }
    },
    computed: {
        isPrompt() {
            return this.type === "prompt"
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
$red: #f56c6c;
#v-alert {
	position: fixed;
	left: 50%;
	top: 50%;
	margin: auto;
	display: table;
	width: 300px;
	padding: 30px;
	text-align: center;
	border-radius: 20px;
	overflow: hidden;
	background: #fff;
	transform: translate(-50%, -50%);
	&.notice {
		text-align: inherit;
	}
	.title {
		@include h-lh(22px);
		font-size: 16px;
		font-weight: normal;
		word-break: break-all;
		text-align: center;
		color: #333;
	}
	.content {
		margin-top: 40px;
		font-size: 14px;
		line-height: 20px;
		color: #999;
	}
	.wrap-btns {
		display: flex;
		height: 50px;
		margin-top: 40px;
		align-items: stretch;
		justify-content: space-between;
		.btn-ok {
			color: $skin-font1;
		}
	}
	.btn {
		@include h-lh(40px);
		width: 110px;
		padding: 0;
		font-size: 14px;
		color: #ffffff;
		background: #898c98;
		border-radius: 5px;
	}
	&.alert {
		.btn-ok {
			flex: 1;
		}
		.btn-cancel {
			display: none;
		}
	}

	.btn-ok {
		background: linear-gradient(90deg, #4664c4, #2a3e83);
	}

	.wrap-ipt {
		margin-bottom: 20px;
		input {
			width: 80%;
			@include h-lh(24px);
			text-indent: 10px;
			border: 1px solid #dedede;
			border-radius: 4px;
			appearance: none;
			outline: none;
		}
	}
	.va-tips {
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		@include h-lh(16px);
		font-size: 10px;
		color: $red;
		white-space: nowrap;
		padding-left: 30px;
	}
}

.dialog-enter-active {
	animation: dialog-in 0.3s;
}

.dialog-leave-active {
	animation: dialog-out 0.3s;
}

@keyframes dialog-in {
	0% {
		transform: scale(1.185) translate(-50%, -50%);
		opacity: 0;
	}

	to {
		transform: scale(1) translate(-50%, -50%);
		opacity: 1;
	}
}

@keyframes dialog-out {
	0% {
		transform: scale(1) translate(-50%, -50%);
		opacity: 1;
	}

	to {
		transform: scale(0.85) translate(-50%, -50%);
		opacity: 0;
	}
}
@media screen and (max-width: 760px) {
	#v-alert {
		background: $skin-bg5;
		.title {
			color: $skin-font1;
		}
	.content {
		margin-top: 20px !important;
		color: $skin-font3;
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
			color: $skin-font6;
			background: $skin-bg2;
		}
		.btn-ok {
			margin-top: 10px;
			background: $skin-color1;
		}
	}
}
}
</style>
