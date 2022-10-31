<template>
	<ul class="v-count-down tc clearfix">
		<template v-if="h">
			<li class="time">{{ hour }}</li>
			<li class="dot"></li>
		</template>
		<li class="time">{{ minutes }}</li>
		<li class="dot"></li>
		<li class="time">{{ seconds }}</li>
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

    props: {
        time:Array
    },
    created() {

        this.intervalTools = new IntervalTools(() => {

            this.updateSeconds();
        });
    },
    destroyed() {
        console.log("【count-down】计时牌组件被销毁");
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
        start(timeArray) {
            let time = timeArray[0];
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
            return this.count >= 3600;
        },
        hour() {

            return this.addZero(this.h);
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
	font-size: 14px;
	color: #fff;
	li {
		float: left;
	}
	.time {
		min-width: 28px;
		@include h-lh(28px);
		box-shadow: 0 2px 2px rgba(0, 0, 0, 0.6);
		border-radius: 4px;
		text-align: center;
    color: $skin-bg1;
    background: #fff;
    font-family: Barlow;
    font-size: 16px;
	}
	.dot {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 28px;
		width: 20px;
		flex-direction: column;
		&::after,
		&::before {
			content: "";
			display: block;
			width: 4px;
			height: 4px;
			margin: 2px 0;
			background: #e1e1ee;
			border-radius: 100%;
		}
	}
}
@media screen and (max-width: 760px) {
    .v-count-down {
      .time {
        color: $skin-main1;
        background: #2C2C38;
      }
      .dot::before, .dot::after {
        background:#2C2C38;
      }
    }
}
</style>
