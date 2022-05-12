<template>
	<div id="app">
        <router-view />
	</div>
</template>
<script type="text/ecmascript-6">
import {changeLanguage} from "@/common/i18n";
let input  = document.querySelector("body > input[type=hidden]");
const CONFIG = input?JSON.parse(input.value):{};
export default {
    name: "app",
    data() {
        return {}
    },
    created() {
        console.error()
        const query = this.$$tools.getUrlQuery()
        let lang = sessionStorage.getItem('lang')
        if (query.lang) {
            changeLanguage(query.lang);
            sessionStorage.setItem('lang', query.lang)
        } else if (lang) {
            changeLanguage(lang);
        } else {
            changeLanguage('en');
        }
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
