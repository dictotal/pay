<template>
	<div id="v-msg" :style="{zIndex: zIndex}">
		<transition-group name="list" tag="div" appear>
			<p ref="items" class="msg-item tc" v-for="item in list" :key="item.uid">
				<span class="info">{{ item.msg }}</span>
			</p>
		</transition-group>
	</div>
</template>

<script type="text/ecmascript-6">

import IndexTools from '../z-index';
let uid = 0;
export default {
    name: "v-msg",
    data() {
        return {
            list:[],
            zIndex:999
        }
    },
    methods:{
        show(msg){
            let itemsEl = this.$refs.items;
            if(itemsEl&&itemsEl.length>4){

                return false;
            }
            this.list.unshift({msg,uid:uid++});
            this.zIndex = IndexTools.getCurZIndex()+1;

            setTimeout(this._remove,3000);
        },
        _remove(){
            this.list.pop();
        }

    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
#v-msg {
	position: fixed;
	width: 100%;
	top: 10%;

	pointer-events: none;
	.msg-item {
		margin-bottom: 10px;
		transition: all 0.3s;
	}
	.info {
		display: inline-block;
		padding: 5px 10px;
		background: rgba(0, 0, 0, 0.6);
		color: #fff;
		font-size: 14px;
		line-height: 20px;
		border-radius: 4px;
	}
	.list-enter {
		opacity: 0;
		transform: translate3d(0, -40px, 0);
	}

	.list-leave-to {
		opacity: 0;
		transform: translate3d(0, 40px, 0);
	}
}
</style>
