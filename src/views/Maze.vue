<template>
  <div id="maze">
    <div id="openAnimation" v-show="mazeProcess === 'start'" :style="{ height: vhStyle.openendAnimationheight }">
      <img src="@/assets/maze/chuchang.gif" :style="{ bottom: vhStyle.openAnimationimgbottom}">
    </div>

    <div id="endAnimation" v-show="mazeProcess === 'end'" :style="{ height: vhStyle.openendAnimationheight }">
      <img src="@/assets/maze/baolie.gif" :style="{ bottom: vhStyle.endAnimationimgbottom}">
    </div>

    <div id="puzzle" @touchmove.prevent v-show="mazeShow" @mousewheel.prevent @gesturestart.prevent @gesturechange.prevent @gestureend.prevent>
      <transition name="fade">
        <div id="map" :style="mapStyle" @touchmove.prevent v-show="openAnimation">
          <template v-for="(mapDataX, y) in mapData">
            <div class="ceil" :style="ceilStyle" v-for="(item, x) in mapDataX" :key="createKey(x,y)"></div>
          </template>
        </div>
      </transition>
      <div id="player" :style="{ height: vhStyle.playerheight}">
        <img class="p1" src="@/assets/maze/p1.png" v-show="promptShow.p1" :style="{ top: vhStyle.p1top10top}">
        <img class="p2" src="@/assets/maze/p2.png" v-show="promptShow.p2" :style="{ top: vhStyle.p1top10top}">
        <img class="p3" src="@/assets/maze/p3.png" v-show="promptShow.p3" :style="{ top: vhStyle.p1top10top}">
        <img class="p4" src="@/assets/maze/p4.png" v-show="promptShow.p4" :style="{ top: vhStyle.p1top10top}">
        <img class="p5" src="@/assets/maze/p5.png" v-show="promptShow.p5" :style="{ top: vhStyle.p1top10top}">
        <img class="p6" src="@/assets/maze/p6.png" v-show="promptShow.p6" :style="{ top: vhStyle.p1top10top}">
        <img class="p7" src="@/assets/maze/p7.png" v-show="promptShow.p7" :style="{ top: vhStyle.p1top10top}">
        <img class="p8" src="@/assets/maze/p8.png" v-show="promptShow.p8" :style="{ top: vhStyle.p1top10top}">
        <img class="p9" src="@/assets/maze/p9.png" v-show="promptShow.p9" :style="{ top: vhStyle.p1top10top}">
        <img class="p10" src="@/assets/maze/p10.png" v-show="promptShow.p10" :style="{ top: vhStyle.p1top10top}">
        <img class="exclamation" src="@/assets/maze/exmark.png" v-show="promptShow.exclamation" :style="{ top: vhStyle.exclamationtop}">
        <img class="daiji" src="@/assets/maze/daiji.gif" :style="daijiStyle">
        <div class="container" :style="containerStyle">
          <div class="up" @touchstart.prevent="debounceMove('up')" :style="{ width: vhStyle.updownleftrightwidth, height: vhStyle.updownleftrightheight}" @touchend.prevent="moveEnd" />
          <div class="right" @touchstart.prevent="debounceMove('right')" :style="{ width: vhStyle.updownleftrightwidth, height: vhStyle.updownleftrightheight}" @touchend.prevent="moveEnd" />
          <div class="left" @touchstart.prevent="debounceMove('left')" :style="{ width: vhStyle.updownleftrightwidth, height: vhStyle.updownleftrightheight}" @touchend.prevent="moveEnd" />
          <div class="down" @touchstart.prevent="debounceMove('down')" :style="{ width: vhStyle.updownleftrightwidth, height: vhStyle.updownleftrightheight}" @touchend.prevent="moveEnd" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs';
import background from '@/assets/maze/background.jpg';

const playerMoveDuation = 750;

export default {
  name: 'Maze',
  data() {
    return {
      mapData: [
        /* 0 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        [/* 0 */{ top: 1, left: 1, right: 0, bottom: 0 }, /* 1 */{ top: 1, left: 0, right: 0, bottom: 1 }, /* 2 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 3 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 4 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 5 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 6 */ { top: 1, left: 0, right: 1, bottom: 0 }, /* 7 */ { top: 1, left: 1, right: 0, bottom: 1, trap: 1 }, /* 8 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 9 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 10 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 11 */ { top: 1, left: 0, right: 1, bottom: 0 }, /* 12 */ { top: 1, left: 1, right: 1, bottom: 0, trap: 1 }],
        /* 1 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        [/* 0 */{ top: 0, left: 1, right: 0, bottom: 1 }, /* 1 */{ top: 1, left: 0, right: 0, bottom: 0, prompt: 'p2' }, /* 2 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 3 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 4 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 5 */ { top: 1, left: 0, right: 1, bottom: 0 }, /* 6 */ { top: 0, left: 1, right: 0, bottom: 0, prompt: 'p2' }, /* 7 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 8 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 9 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 10 */ { top: 1, left: 0, right: 0, bottom: 0, prompt: 'p3' }, /* 11 */ { top: 0, left: 0, right: 0, bottom: 0, prompt: 'p4' }, /* 12 */ { top: 0, left: 0, right: 1, bottom: 0, prompt: 'p5' }],
        /* 2 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        [/* 0 */{ top: 1, left: 1, right: 1, bottom: 0, trap: 1 }, /* 1 */{ top: 0, left: 1, right: 1, bottom: 0 }, /* 2 */ { top: 1, left: 1, right: 0, bottom: 0 }, /* 3 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 4 */ { top: 1, left: 0, right: 1, bottom: 0 }, /* 5 */ { top: 0, left: 1, right: 0, bottom: 1 }, /* 6 */ { top: 0, left: 0, right: 0, bottom: 0, prompt: 'p1', strat: 1 }, /* 7 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 8 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 9 */ { top: 1, left: 0, right: 1, bottom: 0 }, /* 10 */ { top: 0, left: 1, right: 1, bottom: 0 }, /* 11 */ { top: 0, left: 1, right: 1, bottom: 0 }, /* 12 */ { top: 0, left: 1, right: 1, bottom: 0 }],
        /* 3 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        [/* 0 */{ top: 0, left: 1, right: 1, bottom: 0 }, /* 1 */{ top: 0, left: 1, right: 0, bottom: 1 }, /* 2 */ { top: 0, left: 0, right: 0, bottom: 1, prompt: 'p3' }, /* 3 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 4 */ { top: 0, left: 0, right: 0, bottom: 1, prompt: 'p4' }, /* 5 */ { top: 1, left: 0, right: 1, bottom: 1, trap: 1 }, /* 6 */ { top: 0, left: 1, right: 1, bottom: 0 }, /* 7 */ { top: 1, left: 1, right: 0, bottom: 1, trap: 1 }, /* 8 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 9 */ { top: 0, left: 0, right: 0, bottom: 1, prompt: 'p2' }, /* 10 */ { top: 0, left: 0, right: 1, bottom: 0, prompt: 'p4' }, /* 11 */ { top: 0, left: 1, right: 1, bottom: 0 }, /* 12 */ { top: 0, left: 1, right: 1, bottom: 0 }],
        /* 4 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        [/* 0 */{ top: 0, left: 1, right: 0, bottom: 0, prompt: 'p4' }, /* 1 */{ top: 1, left: 0, right: 0, bottom: 1 }, /* 2 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 3 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 4 */ { top: 1, left: 0, right: 0, bottom: 0, prompt: 'p3' }, /* 5 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 6 */ { top: 0, left: 0, right: 0, bottom: 0, prompt: 'p2' }, /* 7 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 8 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 9 */ { top: 1, left: 0, right: 1, bottom: 0 }, /* 10 */ { top: 0, left: 1, right: 1, bottom: 0 }, /* 11 */ { top: 0, left: 1, right: 0, bottom: 0, prompt: 'p5' }, /* 12 */ { top: 0, left: 0, right: 1, bottom: 0, prompt: 'p6' }],
        /* 5 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        [/* 0 */{ top: 0, left: 1, right: 0, bottom: 1 }, /* 1 */{ top: 1, left: 0, right: 0, bottom: 1 }, /* 2 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 3 */ { top: 1, left: 0, right: 1, bottom: 0 }, /* 4 */ { top: 0, left: 1, right: 1, bottom: 0 }, /* 5 */ { top: 1, left: 1, right: 1, bottom: 0, trap: 1 }, /* 6 */ { top: 0, left: 1, right: 0, bottom: 1 }, /* 7 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 8 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 9 */ { top: 0, left: 0, right: 1, bottom: 1 }, /* 10 */ { top: 0, left: 1, right: 1, bottom: 1, trap: 1 }, /* 11 */ { top: 0, left: 1, right: 1, bottom: 0 }, /* 12 */ { top: 0, left: 1, right: 1, bottom: 0 }],
        /* 6 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        [/* 0 */{ top: 1, left: 1, right: 0, bottom: 0 }, /* 1 */{ top: 1, left: 0, right: 0, bottom: 1 }, /* 2 */ { top: 1, left: 0, right: 1, bottom: 0 }, /* 3 */ { top: 0, left: 1, right: 1, bottom: 1, trap: 1 }, /* 4 */ { top: 0, left: 1, right: 1, bottom: 0 }, /* 5 */ { top: 0, left: 1, right: 0, bottom: 1 }, /* 6 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 7 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 8 */ { top: 1, left: 0, right: 0, bottom: 0, prompt: 'p6' }, /* 9 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 10 */ { top: 1, left: 0, right: 1, bottom: 0 }, /* 11 */ { top: 0, left: 1, right: 1, bottom: 1, trap: 1 }, /* 12 */ { top: 0, left: 1, right: 1, bottom: 1, trap: 1 }],
        /* 7 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        [/* 0 */{ top: 0, left: 1, right: 0, bottom: 0, prompt: 'p6' }, /* 1 */{ top: 1, left: 0, right: 0, bottom: 1 }, /* 2 */ { top: 0, left: 0, right: 0, bottom: 1, prompt: 'p5' }, /* 3 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 4 */ { top: 0, left: 0, right: 0, bottom: 0, prompt: 'p4' }, /* 5 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 6 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 7 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 8 */ { top: 0, left: 0, right: 0, bottom: 0, prompt: 'p5' }, /* 9 */ { top: 1, left: 0, right: 1, bottom: 1, trap: 1 }, /* 10 */ { top: 0, left: 1, right: 0, bottom: 0, prompt: 'p7' }, /* 11 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 12 */ { top: 1, left: 0, right: 1, bottom: 0 }],
        /* 8 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        [/* 0 */{ top: 0, left: 1, right: 1, bottom: 1, trap: 1 }, /* 1 */{ top: 1, left: 1, right: 0, bottom: 0, prompt: 'p8' }, /* 2 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 3 */ { top: 1, left: 0, right: 1, bottom: 0 }, /* 4 */ { top: 0, left: 1, right: 1, bottom: 0 }, /* 5 */ { top: 1, left: 1, right: 0, bottom: 0 }, /* 6 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 7 */ { top: 1, left: 0, right: 1, bottom: 0 }, /* 8 */ { top: 0, left: 1, right: 1, bottom: 0 }, /* 9 */ { top: 1, left: 1, right: 1, bottom: 0, trap: 1 }, /* 10 */ { top: 0, left: 1, right: 1, bottom: 1, trap: 1 }, /* 11 */ { top: 1, left: 1, right: 1, bottom: 0, trap: 1 }, /* 12 */ { top: 0, left: 1, right: 1, bottom: 0 }],
        /* 9 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        [/* 0 */{ top: 1, left: 1, right: 0, bottom: 1, trap: 1 }, /* 1 */{ top: 0, left: 0, right: 0, bottom: 1, prompt: 'p9' }, /* 2 */ { top: 1, left: 0, right: 1, bottom: 1, trap: 1 }, /* 3 */ { top: 0, left: 1, right: 1, bottom: 0 }, /* 4 */ { top: 0, left: 1, right: 0, bottom: 1 }, /* 5 */ { top: 0, left: 0, right: 0, bottom: 1, prompt: 'p5' }, /* 6 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 7 */ { top: 0, left: 0, right: 1, bottom: 1 }, /* 8 */ { top: 0, left: 1, right: 1, bottom: 0 }, /* 9 */ { top: 0, left: 1, right: 0, bottom: 1 }, /* 10 */ { top: 1, left: 0, right: 0, bottom: 0, prompt: 'p8' }, /* 11 */ { top: 0, left: 0, right: 1, bottom: 1 }, /* 12 */ { top: 0, left: 1, right: 1, bottom: 0 }],
        /* 10 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        [/* 0 */{ top: 1, left: 1, right: 0, bottom: 0 }, /* 1 */{ top: 1, left: 0, right: 1, bottom: 0 }, /* 2 */ { top: 1, left: 1, right: 0, bottom: 0 }, /* 3 */ { top: 0, left: 0, right: 0, bottom: 0, prompt: 'p7' }, /* 4 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 5 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 6 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 7 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 8 */ { top: 0, left: 0, right: 0, bottom: 0, prompt: 'p6' }, /* 9 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 10 */ { top: 0, left: 0, right: 1, bottom: 1, prompt: 'p7' }, /* 11 */ { top: 1, left: 1, right: 0, bottom: 1, trap: 1 }, /* 12 */ { top: 0, left: 0, right: 1, bottom: 0, prompt: 'p8' }],
        /* 11 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        [/* 0 */{ top: 0, left: 1, right: 1, bottom: 0 }, /* 1 */{ top: 0, left: 1, right: 1, bottom: 0 }, /* 2 */ { top: 0, left: 1, right: 1, bottom: 1, trap: 1 }, /* 3 */ { top: 0, left: 1, right: 1, bottom: 0 }, /* 4 */ { top: 1, left: 1, right: 0, bottom: 1, trap: 1 }, /* 5 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 6 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 7 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 8 */ { top: 0, left: 0, right: 1, bottom: 0, prompt: 'p7' }, /* 9 */ { top: 1, left: 1, right: 0, bottom: 1, trap: 1 }, /* 10 */ { top: 1, left: 0, right: 0, bottom: 0, prompt: 'p10' }, /* 11 */ { top: 1, left: 0, right: 1, bottom: 1, trap: 1 }, /* 12 */ { top: 0, left: 1, right: 1, bottom: 0 }],
        /* 12 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        [/* 0 */{ top: 0, left: 1, right: 0, bottom: 1 }, /* 1 */{ top: 0, left: 0, right: 0, bottom: 1, prompt: 'p9' }, /* 2 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 3 */ { top: 0, left: 0, right: 1, bottom: 1, prompt: 'p8', end: 1 }, /* 4 */ { top: 1, left: 0, right: 1, bottom: 1 }, /* 5 */ { top: 1, left: 1, right: 0, bottom: 1, trap: 1 }, /* 6 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 7 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 8 */ { top: 0, left: 0, right: 0, bottom: 1, prompt: 'p8' }, /* 9 */ { top: 1, left: 0, right: 0, bottom: 1 }, /* 10 */ { top: 0, left: 0, right: 1, bottom: 1, prompt: 'p9' }, /* 11 */ { top: 1, left: 1, right: 0, bottom: 1, trap: 1 }, /* 12 */ { top: 0, left: 0, right: 1, bottom: 1 }],
      ],
      clientWidth: 0,
      clientHeight: 0,
      moveValue: 0,
      offset: 0,
      mapStyle: {
        width: '0px',
        height: '0px',
        transform: 'translateX(0) translateY(0)',
        'background-image': '',
        'border-top': '',
        'border-bottom': '',
      },
      ceilStyle: {
        width: '0px',
        height: '0px',
      },
      daijiStyle: {
        width: '0px',
        height: '0px',
        top: '0px',
        left: '0px',
        transform: 'rotate(180deg)',
        opacity: 1,
      },
      player: {
        x: 0,
        y: 0,
      },
      start: {
        x: 0,
        y: 0,
      },
      debounceTimer: null,
      moveStation: 'moved',
      promptShow: {
        p1: false,
        p2: false,
        p3: false,
        p4: false,
        p5: false,
        p6: false,
        p7: false,
        p8: false,
        p9: false,
        p10: false,
        exclamation: false,
      },
      openAnimation: false,
      mazeProcess: 'start',
      mazeShow: false,
      timeIntervalHandler: null,
      moveEndTimer: null,
      vhStyle: {
        openendAnimationheight: '0px',
        openAnimationimgbottom: '0px',
        endAnimationimgbottom: '0px',
        playerheight: '0px',
        updownleftrightwidth: '0px',
        updownleftrightheight: '0px',
        p1top10top: '0px',
        exclamationtop: '0px',
      },
      containerStyle: {
        width: '0px',
        height: '0px',
        top: '0px',
        left: '0px',
      },
    };
  },
  created() {
    this.init();
    // eslint-disable-next-line func-names
    window.onscroll = function () {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 500);
    };
  },
  mounted() {
    setTimeout(() => {
      this.mazeShow = true;
      this.$nextTick(() => {
        this.openAnimation = true;
        this.judgePlayerMeetPrompt();
      });
    }, 2200);
  },
  methods: {
    createKey(x, y) {
      return `${x}-${y}`;
    },
    // 初始化所有参数
    init() {
      this.clientWidth = window.screen.width;
      this.clientHeight = window.innerHeight;
      this.start = {
        x: -this.clientWidth * 6,
        y: -this.clientWidth * 2,
      };
      this.offset = (this.clientHeight - this.clientWidth) / 2;
      this.moveValue = this.clientWidth;
      this.mapStyle = {
        width: `${this.clientWidth * 13}px`,
        height: `${this.clientWidth * 13}px`,
        transform: `translateX(${this.start.x}px) translateY(${this.start.y}px)`,
        'background-image': `url(${background})`,
        'border-top': `${(this.clientHeight - this.clientWidth) / 2}px solid black`,
        'border-bottom': `${(this.clientHeight - this.clientWidth) / 2}px solid black`,
      };
      this.player = {
        x: -this.clientWidth * 6,
        y: -this.clientWidth * 2,
      };
      this.ceilStyle = {
        width: `${this.clientWidth}px`,
        height: `${this.clientWidth}px`,
      };
      this.daijiStyle = {
        width: `${0.18 * this.clientWidth}px`,
        height: `${0.18 * this.clientWidth}px`,
        top: `${this.clientHeight * 0.5 - this.clientWidth * 0.09}px`,
        left: `${this.clientWidth * 0.41}px`,
        transform: 'rotate(180deg)',
        opacity: 1,
      };
      this.containerStyle = {
        width: `${this.clientHeight * 2}px`,
        height: `${this.clientHeight * 2}px`,
        top: `-${this.clientHeight / 2}px`,
        left: `${this.clientWidth / 2 - this.clientHeight}px`,
      };
      this.vhStyle = {
        openendAnimationheight: `${this.clientHeight}px`,
        openAnimationimgbottom: `${this.clientHeight * 0.5 - this.clientWidth * 0.09}px`,
        endAnimationimgbottom: `${this.clientHeight * 0.5 - this.clientWidth * 0.2443}px`,
        playerheight: `${this.clientHeight}px`,
        updownleftrightwidth: `${this.clientHeight}px`,
        updownleftrightheight: `${this.clientHeight}px`,
        p1top10top: `${this.clientHeight * 0.18}px`,
        exclamationtop: `${this.clientHeight * 0.38}px`,
      };
    },
    // 事件防抖
    debounceMove(action) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.playerRotate(action);
        this.playerMove(action);
        if (this.timeIntervalHandler) clearInterval(this.timeIntervalHandler);
        this.timeIntervalHandler = setInterval(() => {
          this.playerRotate(action);
          this.playerMove(action);
        }, playerMoveDuation);
      }, 200);
    },
    // 结束移动
    moveEnd() {
      clearTimeout(this.moveEndTimer);
      this.moveEndTimer = setTimeout(() => {
        clearInterval(this.timeIntervalHandler);
      }, 200);
    },
    // 吃豆人移动
    playerMove(action) {
      if (this.judgePlayerCanMove(action)) return;
      if (this.moveStation === 'moving') return;
      switch (action) {
        case 'up':
          this.player.y += this.clientWidth;
          anime({
            targets: '#map',
            translateY: this.player.y,
            easing: 'linear',
            duration: playerMoveDuation,
            changeBegin: () => {
              this.hidePrompt();
              this.moveStation = 'moving';
            },
            changeComplete: () => {
              this.moveStation = 'moved';
              this.judgePlayerMeetPrompt();
              this.judgePlayerMeetTrap();
            },
          });
          break;
        case 'left':
          this.player.x += this.clientWidth;
          anime({
            targets: '#map',
            translateX: this.player.x,
            easing: 'linear',
            duration: playerMoveDuation,
            changeBegin: () => {
              this.hidePrompt();
              this.moveStation = 'moving';
            },
            changeComplete: () => {
              this.moveStation = 'moved';
              this.judgePlayerMeetPrompt();
              this.judgePlayerMeetTrap();
            },
          });
          break;
        case 'right':
          this.player.x -= this.clientWidth;
          anime({
            targets: '#map',
            translateX: this.player.x,
            easing: 'linear',
            duration: playerMoveDuation,
            changeBegin: () => {
              this.hidePrompt();
              this.moveStation = 'moving';
            },
            changeComplete: () => {
              this.moveStation = 'moved';
              this.judgePlayerMeetPrompt();
              this.judgePlayerMeetTrap();
            },
          });
          break;
        case 'down':
          this.player.y -= this.clientWidth;
          anime({
            targets: '#map',
            translateY: this.player.y,
            easing: 'linear',
            duration: playerMoveDuation,
            changeBegin: () => {
              this.hidePrompt();
              this.moveStation = 'moving';
            },
            changeComplete: () => {
              this.moveStation = 'moved';
              this.judgePlayerMeetPrompt();
              this.judgePlayerMeetTrap();
            },
          });
          break;
        default:
          break;
      }
    },
    // 吃豆人转头
    playerRotate(action) {
      if (this.moveStation === 'moving') return;
      switch (action) {
        case 'up':
          this.daijiStyle.transform = 'rotate(270deg)';
          break;
        case 'left':
          this.daijiStyle.transform = 'rotate(180deg)';
          break;
        case 'right':
          this.daijiStyle.transform = 'rotate(0deg)';
          break;
        case 'down':
          this.daijiStyle.transform = 'rotate(90deg)';
          break;
        default:
          break;
      }
    },
    // 判断吃豆人是否碰到墙面
    judgePlayerCanMove(action) {
      const playerPosition = this.mapData[Math.abs(this.player.y / this.moveValue)][Math.abs(this.player.x / this.moveValue)];
      let result;
      switch (action) {
        case 'up':
          result = playerPosition.top;
          break;
        case 'left':
          result = playerPosition.left;
          break;
        case 'right':
          this.judgePlayerMeetEnd();
          result = playerPosition.right;
          break;
        case 'down':
          result = playerPosition.bottom;
          break;
        default:
          break;
      }
      return result;
    },
    // 吃豆人遇到陷阱
    judgePlayerMeetTrap() {
      const playerPosition = this.mapData[Math.abs(this.player.y / this.moveValue)][Math.abs(this.player.x / this.moveValue)];
      if (playerPosition.trap) {
        this.player = { ...this.start };
        anime({
          targets: '#map',
          translateY: this.player.y,
          translateX: this.player.x,
          easing: 'linear',
          duration: 0,
        });
        this.judgePlayerMeetPrompt();
      }
    },
    // 吃豆人遇到提示
    judgePlayerMeetPrompt() {
      const playerPosition = this.mapData[Math.abs(this.player.y / this.moveValue)][Math.abs(this.player.x / this.moveValue)];
      if (playerPosition.prompt) {
        const p = playerPosition.prompt;
        this.promptShow[p] = !this.promptShow[p];
        this.promptShow.exclamation = true;
        if (p === 'p1') this.promptShow.exclamation = false;
      }
    },
    // 吃豆人开始移动，立刻隐藏提示框
    hidePrompt() {
      this.promptShow = {
        p1: false,
        p2: false,
        p3: false,
        p4: false,
        p5: false,
        p6: false,
        p7: false,
        p8: false,
        p9: false,
        p10: false,
        exclamation: false,
      };
    },
    // 吃豆人到了终点
    judgePlayerMeetEnd() {
      const playerPosition = this.mapData[Math.abs(this.player.y / this.moveValue)][Math.abs(this.player.x / this.moveValue)];
      if (playerPosition.end) {
        this.hidePrompt();
        this.player.x -= this.clientWidth;
        anime({
          targets: '#map',
          translateX: this.player.x,
          easing: 'linear',
          duration: 0,
        });
        this.mazeProcess = 'end';
        this.daijiStyle.opacity = 0;
        setTimeout(() => {
          this.$router.replace({ name: 'ThirdKey' });
        }, 9000);
      }
    },
  },
};
</script>

<style scoped>
#maze {
  min-width: 100vw;
  min-height: 100vh;
}

/* .bg1 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 18vw;
  height: 18vw;
} */

#openAnimation, #endAnimation {
  position: absolute;
  width: 100vw;
  /* height: 100vh; */
}

#openAnimation img {
  position: fixed;
  width: 200.7vw;
  left: -56.1vw;
  /* bottom: calc(50vh - 9vw); */
}

#endAnimation img {
  position: fixed;
  width: 126.5vw;
  left: -42.2vw;
  /* bottom: calc(50vh - 24.43vw); */
  z-index: 997;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 4s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

#map {
  /* border-top: calc((100vh - 100vw) /2 ) solid black;
  border-bottom: calc((100vh - 100vw) /2 ) solid black; */
  transform: translateX(0px) translateY(0px);
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 0;
}

.ceil {
  display: inline-block;
}

#player {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  /* height: 100vh; */
}

.daiji, .container {
  position: fixed;
  z-index: 999;
}

/* .daiji {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
} */

.container {
  /* width: 200vh;
  height: 200vh;
  top: -50vh;
  left: calc(50vw - 100vh); */
  transform: rotate(45deg);
}

.up, .down, .left, .right {
  /* width: 100vh;
  height: 100vh; */
  float: left;
}

.p1, .p2, .p3, .p4, .p5, .p6, .p7, .p8, .p9, .p10 {
  width: 47vw;
  position: fixed;
  /* top: 18vh; */
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 998;
}

.exclamation {
  width: 2.7vw;
  position: fixed;
  /* top: 38vh; */
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 998;
}
</style>
