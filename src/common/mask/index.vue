<template>
	<transition name="fade">
		<div v-show="isShow" :style="{'z-index': zIndex}" class="mask common-mask" @click="clickHidden()">
			<div v-if="isLoading" class="wrap-loading tc">
				<i class="loading-bar"></i>
				<p class="pt10">加载中...</p>
			</div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">

import IndexTools from '../z-index';

export default {
    data() {
        return {
            isShow: false,
            uid: -1,
            isCloseByClick: false,
            clickCallback: null,
            zIndex: 900,

            isLoading:false
        }
    },
    methods: {

        clickHidden() {
            if (this.clickCallback) {
                this.clickCallback(this);
            }
        },
        hidden() {
            this.isShow = false
        },
        show() {

            this.isLoading = false;
            this.isShow = true;

            this.zIndex = IndexTools.getCurZIndex();
        },
        loading(){
            this.show();

            this.isLoading = true;
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.common-mask {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 900;
	background: rgba(17, 17, 17, 0.5);

	.wrap-loading {
		position: fixed;
		left: 50%;
		top: 40%;
		width: 200px;
		height: 180px;
		margin: -100px 0 0 -100px;
		background: rgba(17, 17, 17, 0.7);
		border-radius: 5px;
	}
	.loading-bar {
		margin-top: 45px;
	}
}

.fade-enter-active,
.fade-leave {
	transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>
