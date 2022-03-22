<template>
	<div id="app">
		<v-index />
	</div>
</template>
<script type="text/ecmascript-6">


const vIndex = ()=>import("@platform/index");
export default {
    name: "app",
    data() {
        return {}
    },
    components:{
        vIndex
    }
}
</script>
<style lang="scss">
@import "scss/base";
@import "scss/common";
@import "scss/mobile";
#app {
	height: 100%;
}
</style>
