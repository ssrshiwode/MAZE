<template>
  <div id="maze">
    <!-- <img class="bg1" src="@/assets/maze/daiji.gif"> -->
    <div id="openAnimation" v-show="mazeProcess === 'start'">
      <img src="@/assets/maze/chuchang.gif">
    </div>

    <div id="endAnimation" v-show="mazeProcess === 'end'">
      <img src="@/assets/maze/baolie.gif">
      <!-- <img src="@/assets/maze/吃下爆裂.gif"> -->
    </div>

    <div id="puzzle" @touchmove.prevent v-show="mazeShow" @mousewheel.prevent @gesturestart.prevent @gesturechange.prevent @gestureend.prevent>
      <transition name="fade">
        <div id="map" :style="mapStyle" @touchmove.prevent v-show="openAnimation">
          <template v-for="(mapDataX, y) in mapData">
            <div class="ceil" :style="ceilStyle" v-for="(item, x) in mapDataX" :key="createKey(x,y)"></div>
          </template>
        </div>
      </transition>
      <div id="player">
        <img class="p1" src="@/assets/maze/p1.png" v-show="promptShow.p1">
        <img class="p2" src="@/assets/maze/p2.png" v-show="promptShow.p2">
        <img class="p3" src="@/assets/maze/p3.png" v-show="promptShow.p3">
        <img class="p4" src="@/assets/maze/p4.png" v-show="promptShow.p4">
        <img class="p5" src="@/assets/maze/p5.png" v-show="promptShow.p5">
        <img class="p6" src="@/assets/maze/p6.png" v-show="promptShow.p6">
        <img class="p7" src="@/assets/maze/p7.png" v-show="promptShow.p7">
        <img class="p8" src="@/assets/maze/p8.png" v-show="promptShow.p8">
        <img class="p9" src="@/assets/maze/p9.png" v-show="promptShow.p9">
        <img class="p10" src="@/assets/maze/p10.png" v-show="promptShow.p10">
        <img class="exclamation" src="@/assets/maze/exmark.png" v-show="promptShow.exclamation">
        <img class="daiji" src="@/assets/maze/daiji.gif" :style="daijiStyle">
        <div class="container">
          <div class="up" @touchstart.prevent="debounceMove('up')" @touchend.prevent="moveEnd" />
          <div class="right" @touchstart.prevent="debounceMove('right')" @touchend.prevent="moveEnd" />
          <div class="left" @touchstart.prevent="debounceMove('left')" @touchend.prevent="moveEnd" />
          <div class="down" @touchstart.prevent="debounceMove('down')" @touchend.prevent="moveEnd" />
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
      },
      ceilStyle: {
        width: '0px',
        height: '0px',
      },
      daijiStyle: {
        width: '0px',
        height: '0px',
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
    };
  },
  created() {
    this.init();
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
      this.clientHeight = window.screen.height;
      this.start = {
        x: -this.clientWidth * 6,
        y: -this.clientWidth * 2,
      };
      this.mapStyle.transform = `translateX(${this.start.x}px) translateY(${this.start.y}px)`;
      this.offset = (this.clientHeight - this.clientWidth) / 2;
      this.moveValue = this.clientWidth;
      this.mapStyle.width = `${this.clientWidth * 13}px`;
      this.mapStyle.height = `${this.clientWidth * 13}px`;
      this.mapStyle['background-image'] = `url(${background})`;
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
        transform: 'rotate(180deg)',
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
  height: 100vh;
}

#openAnimation img {
  position: fixed;
  width: 200.7vw;
  left: -56.1vw;
  bottom: calc(50vh - 9vw);
}

#endAnimation img {
  position: fixed;
  width: 126.5vw;
  left: -42.2vw;
  bottom: calc(50vh - 24.43vw);
  z-index: 997;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 4s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

#map {
  border-top: calc((100vh - 100vw) /2 ) solid #0f0f0f;
  border-bottom: calc((100vh - 100vw) /2 ) solid #0f0f0f;
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
  height: 100vh;
}

.daiji, .container {
  position: fixed;
  z-index: 999;
}

.daiji {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.container {
  width: 200vh;
  height: 200vh;
  top: -50vh;
  left: calc(50vw - 100vh);
  transform: rotate(45deg);
}

.up, .down, .left, .right {
  width: 100vh;
  height: 100vh;
  float: left;
}

.p1, .p2, .p3, .p4, .p5, .p6, .p7, .p8, .p9, .p10 {
  width: 47vw;
  position: fixed;
  top: 18vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 998;
}

.exclamation {
  width: 2.7vw;
  position: fixed;
  top: 38vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 998;
}
</style>
