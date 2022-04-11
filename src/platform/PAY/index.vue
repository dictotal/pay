<script type="text/ecmascript-6">

import indexMixin from "@/mixins/index";

import vInit from "./v-init";
import vGo from "./v-go";
export default {
    mixins:[indexMixin],
    components:{
        vInit,vGo
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.btn {
	display: inline-flex;
	justify-content: center;
	align-items: center;
	min-width: 68px;
	height: 36px;
	border-radius: 5px;
	border: 1px solid #dbdeeb;
	font-size: 14px;
	color: #676974;
	background: #fff;
	cursor: pointer;
	transition: all 0.3s;

	&:active {
		opacity: 0.8;
	}
	&.disable {
		color: #fff;
		background: linear-gradient(90deg, #7c7c7c, #333333);
	}
}

.btn-submit {
	display: flex;
	width: 303px;
	height: 50px;
	border-radius: 25px;
	color: #fff;
	font-size: 16px;
	background: linear-gradient(90deg, #4664c4, #2a3e83);
}

.panel-notice {
	margin-top: 30px;
	font-size: 12px;
	color: #898c98;

	.title-notice {
		display: flex;
		align-items: center;
		text-align: center;
		&::after,
		&::before {
			content: "";
			display: block;
			flex: 1;
			height: 1px;
			margin: 0 10px;
			border-bottom: 1px dashed #bcbfcb;
		}
	}
	.item-notice {
		display: flex;
		margin-top: 16px;
		align-items: flex-start;
		em {
			display: inline-block;
			width: 18px;
			@include h-lh(18px);
			margin: 0 10px;
			vertical-align: middle;
			text-align: center;
			background: $skin-font4;
      color: $skin-font5;
			border-radius: 100%;
			flex-shrink: 0;
		}
	}
}
</style>
