<template>
	<ul class="v-count-down tc f36 clearfix">
		<template v-if="isShowHour">
			<li class="time" v-for="h in hour">{{ h }}</li>
			<li class="dot"></li>
		</template>
		<li class="time">{{ minutes[0] }}</li>
		<li class="time">{{ minutes[1] }}</li>
		<li class="dot"></li>
		<li class="time">{{ seconds[0] }}</li>
		<li class="time">{{ seconds[1] }}</li>
	</ul>
</template>

<script type="text/ecmascript-6">
import IntervalTools from '@/common/intervalTools';

export default {
    name: "count-down",
    data() {
        return {
            h: 0,
            m: 0,
            s: 0,

            count: 0,
        }
    },

    props: ['time','isShowAll'],
    created() {

        this.intervalTools = new IntervalTools(() => {

            this.updateSeconds();
        });
    },
    beforeDestroy() {

        this.clear();
        this.intervalTools = null;
    },
    methods: {
        clear() {
            this.intervalTools.clear();
        },

        init(time) {
            this.count = 0;


            let s = Math.ceil(time / 1000) + 1;

            this.count = s;
            let h = parseInt(s / 3600);

            s -= h * 3600;
            //
            let m = parseInt(s / 60);
            //
            s -= m * 60;
            this.h = h;
            this.m = m;
            this.s = s;
        },
        updateHour() {
            this.h--;
        },
        updateMinutes() {
            let m = --this.m;
            if (m === -1) {
                this.updateHour();
                this.m = 59;
            }
        },
        updateSeconds() {
            let count = --this.count;
            let s = --this.s;
            if (count <= 0) {


                this.endCount();
                return false;
            }
            if (s === -1) {

                this.updateMinutes();
                this.s = 59;
            }
        },
        addZero(num) {
            return this.$$tools.addZero(num).toString();
        },
        endCount() {
            console.log("计时器完成！");
            this.$emit("endCount");
        },
        start(timeList) {
            let time = timeList[0];
            if (isNaN(time)) {
                time = 0
            }


            this.init(time);


            if(time === 0 ){

                this.clear();
                this.s = 0;
                setTimeout(()=>{
                   this.endCount();
                },500);
            }else{
                this.intervalTools.run(time);
            }
        }
    },
    watch: {

        time(nv) {
            this.start(nv);
        },
    },

    computed: {
        isShowHour() {
            return this.isShowAll || this.count >= 3600;
        },
        hour() {

            return this.addZero(this.h).split("");
        },
        minutes() {
            return this.addZero(this.m);
        },
        seconds() {
            return this.addZero(this.s);
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.v-count-down {
	text-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
	li {
		float: left;
		margin-left: 10px;
	}
	.time {
		width: 30px;
		@include h-lh(50px);
		background: #ffc936;
		box-shadow: 0 2px 2px rgba(0, 0, 0, 0.6);
		border-radius: 4px;
		color: #fff;
	}
	.dot {
		width: 9px;
		height: 50px;
		background: url("images/dot.png") center no-repeat;
	}
}
</style>
