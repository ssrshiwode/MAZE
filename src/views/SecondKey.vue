<template>
  <div id="secondKey" ref="secondKey" @touchstart.prevent="swipeStart" @touchmove.prevent="swipeMove" @touchend.prevent="swipeEnd" :style="secondKeyStyle" @mousewheel.prevent @gesturestart.prevent @gesturechange.prevent @gestureend.prevent>
    <div class="ceil end" :style="ceilStyle">
      <img class="shilaimu" :src="puzzlePath">
      <img class="shadow" src="@/assets/secondKey/shadow.png">
      <dialog-box ref="puzzle" class="dialog" dialog-id="puzzle" background-img="black" @touchstart.native="refs.puzzle.playDialogOfPuzzle"></dialog-box>
      <div class="up" v-show="puzzleShow" @touchstart="crackPuzzle('up')" />
      <div class="down" v-show="puzzleShow" @touchstart="crackPuzzle('down')" />
      <div class="left" v-show="puzzleShow" @touchstart="crackPuzzle('left')" />
      <div class="right" v-show="puzzleShow" @touchstart="crackPuzzle('right')" />
    </div>
    <div class="ceil white" :style="ceilAisleStyle">
      <div class="left">索线键关的匙钥的<span></span></div>
      <div class="right">方前在利胜住持坚<span></span></div>
    </div>
    <div class="ceil gary" :style="ceilAisleStyle">
      <div class="left">后最握掌家玩号零<span></span></div>
      <div class="right">定一力努续继错不<span></span></div>
    </div>
    <div class="ceil start" :style="ceilStyle">
      <key-bar ref="keyBar" class="key-bar" key-cabinet="secondKey" :first-key-browse="firstKeyBrowse"></key-bar>
      <img class="shilaimu" :style="{opacity:shilaimuOpacity}" src="@/assets/secondKey/lan-shang.gif">
      <img class="shadow" :style="{opacity:shilaimuOpacity}" src="@/assets/secondKey/shadow.png">
      <dialog-box ref="secondKeyDialog" class="dialog" dialog-id="secondKeyDialog" @touchstart.native="playDialogOfSecondKey"></dialog-box>
    </div>
    <template v-for="(img, index) in preloadImgs">
      <img :src="img" v-show="false" :key="index">
    </template>
  </div>
</template>

<script>
import anime from 'animejs';
import DialogBox from '@/components/DialogBox.vue';
import KeyBar from '@/components/KeyBar.vue';
import up from '@/assets/secondKey/huang-shang.gif';
import down from '@/assets/secondKey/huang-xia.gif';
import left from '@/assets/secondKey/huang-zuo.gif';
import right from '@/assets/secondKey/huang-you.gif';
import mazeBackground from '@/assets/maze/background.jpg';
import mazeBaolie from '@/assets/maze/baolie.gif';
import mazeChuchang from '@/assets/maze/chuchang.gif';
import mazeDaiji from '@/assets/maze/daiji.gif';

export default {
  name: 'secondKey',
  components: {
    DialogBox,
    KeyBar,
  },
  data() {
    return {
      clientWidth: 0,
      clientHeight: 0,
      fingerOne: 0,
      fingerTwo: 0,
      total: 0,
      secondKeyStyle: {
        transform: 'translateY(0)',
        width: '0px',
        height: '0px',
      },
      ceilStyle: {
        width: '0px',
        height: '0px',
      },
      puzzleShow: false,
      puzzlePath: '',
      puzzle: {
        answer: '',
        count: 0,
      },
      puzzleAnswers: ['up', 'down', 'left', 'right'],
      puzzleImgs: { up, down, left, right },
      returnStartAnimateHandle: null,
      shilaimuOpacity: 0,
      secondKeyBarInit: false,
      secondKeyBarshilaimu: false,
      refs: this.$refs,
      preloadImgs: [mazeBackground, mazeBaolie, mazeChuchang, mazeDaiji],
      slipDownLock: false, // 页面下移锁
      slidUpLock: true, // 页面上移锁
      swipeLock: false, // 页面滑动锁,
      firstKeyBrowse: '',
      randomIndex: -1,
    };
  },
  created() {
    this.init();
  },
  mounted() {
    this.initPuzzle();
  },
  methods: {
    /**
     * 初始化参数
     */
    init() {
      if (document.domain === 'twokeys.omescape.net') document.domain = 'omescape.net';
      // eslint-disable-next-line no-unused-expressions
      document.cookie.includes('keyone_history=Browsed') ? this.firstKeyBrowse = 'Browsed' : this.firstKeyBrowse = 'UnBrowse';
      this.clientWidth = window.screen.width;
      this.clientHeight = window.screen.height;
      this.total = -this.clientHeight * 2.4;
      this.secondKeyStyle = {
        width: `${this.clientWidth}px`,
        height: `${this.clientHeight * 3.4}px`,
        transform: `translateY(${this.total}px)`,
      };
      this.ceilStyle = {
        width: `${this.clientWidth}px`,
        height: `${this.clientHeight}px`,
      };
      this.ceilAisleStyle = {
        width: `${this.clientWidth}px`,
        height: `${this.clientHeight * 0.7}px`,
      };
    },
    /**
     * 手指接触屏幕，开始滑动
     */
    swipeStart(event) {
      if (this.swipeLock) return;
      if (this.returnStartAnimateHandle) this.stopReturnStartAnimate();
      const len = event.touches.length;
      if (len === 1) {
        this.fingerOne = event.touches[0].pageY;
      } else {
        this.fingerOne = event.touches[0].pageY;
        this.fingerTwo = event.touches[1].pageY;
      }
    },
    /**
     * 手指移动，正在滑动
     */
    swipeMove(event) {
      if (this.swipeLock) return;
      const len = event.touches.length;
      if (len === 1) { // 单指操作
        const currentY = event.touches[0].pageY;
        if (currentY >= this.fingerOne) { // 手指向下滑动,页面向上移动
          if (this.total >= 0) { // 顶部对齐
            this.total = 0;
            this.animeTransltaeY();
            this.slipDownLock = true;
            return;
          }
          this.isNeedToTopAnime();
          const interval = this.swipResistance(currentY - this.fingerOne);
          this.total += interval;
          this.animeTransltaeY();
          // this.fingerOne = currentY; // 记录当前手指的位置
        }
        if (currentY < this.fingerOne && this.slipDownLock) { // 手指向上滑动,页面向下移动
          this.isNeedToBottom();
          const interval = currentY - this.fingerOne;
          this.total += interval;
          this.animeTransltaeY();
          // this.fingerOne = currentY; // 记录当前手指的位置
        }
        this.fingerOne = currentY; // 记录当前手指的位置
      } else { // 双指手操作（多指算双指）
        const currentY = event.touches[0].pageY;
        const sCurrentY = event.touches[1].pageY;
        let interval = (currentY - this.fingerOne) + (sCurrentY - this.fingerTwo);
        if (interval >= 0) { // 手指下滑
          if (this.total >= 0) { // 顶部对齐
            this.total = 0;
            this.animeTransltaeY();
            return;
          }
          this.isNeedToTopAnime();
          interval = this.swipResistance(interval);
          this.total += interval;
          this.animeTransltaeY();
          /* this.fingerOne = currentY; // 记录当前手指的位置
          this.fingerTwo = sCurrentY; */
        }
        if (interval < 0 && this.slipDownLock) { // 手指上滑
          this.isNeedToBottom();
          interval = currentY - this.fingerOne;
          this.total += interval;
          this.animeTransltaeY();
          /* this.fingerOne = currentY; // 记录当前手指的位置
          this.fingerTwo = sCurrentY; */
        }
        this.fingerOne = currentY; // 记录当前手指的位置
        this.fingerTwo = sCurrentY;
      }
    },
    /**
     * 手指抬起，滑动结束
     */
    swipeEnd(event) {
      if (this.swipeLock) return;
      const len = event.touches.length;
      if (len === 0) {
        if (this.total >= -this.clientHeight * 0.5) this.returnTopAnimate();
        else this.returnStartAnimate();
      }
    },
    /**
     * 滑动阻力
     *
     * @param interval 每次手指滑动与上一个手指之间的间隔
     */
    swipResistance(interval) {
      if (this.total >= -this.clientHeight * 0.5) return interval;
      const total = this.clientHeight * 2.5;
      // eslint-disable-next-line no-restricted-properties
      const pow = Math.pow(1 - (total - Math.abs(this.total)) / total, 2);
      let resistance = pow;
      if (resistance <= 0.4) resistance = 0.4;
      return (interval * resistance) / 4;
    },
    /**
     * 返回起点，最底部
     */
    returnStartAnimate() {
      this.returnStartAnimateHandle = anime({
        targets: '#secondKey',
        translateY: -this.clientHeight * 2.4,
        delay: 0,
        duration: 400,
        easing: 'linear',
        changeComplete: () => {
          this.total = -this.clientHeight * 2.4;
        },
      });
    },
    /**
     * 返回最顶部
     */
    returnTopAnimate() {
      this.swipeLock = true;
      anime({
        targets: '#secondKey',
        translateY: 0,
        duration: 500,
        easing: 'linear',
        changeComplete: () => {
          this.total = 0;
          this.swipeLock = false;
          this.slipDownLock = true;
        },
      });
    },
    /**
     * 划到出现史莱姆开启动画，滑倒顶部
     */
    isNeedToTopAnime() {
      if (this.total >= -this.clientHeight * 0.5) {
        if (this.puzzleShow) return;
        this.swipeLock = true;
        anime({
          targets: '#secondKey',
          translateY: 0,
          duration: 500,
          easing: 'linear',
          changeComplete: () => {
            this.total = 0;
            this.swipeLock = false;
            this.slipDownLock = true;
          },
        });
        if (!this.puzzleShow) this.puzzleShow = true;
      }
    },
    /**
     * 划到第一个页面的底部时，触发返回起点的动画
     */
    isNeedToBottom() {
      if (this.total <= -this.clientHeight * 0.5) {
        this.returnStartAnimate();
        this.swipeLock = false;
        this.slipDownLock = false;
      }
    },
    /**
     * 停止回到底部动画
     */
    stopReturnStartAnimate() {
      this.returnStartAnimateHandle.pause();
      this.total = this.getRealTranslateY();
    },
    /**
     * 获取页面的实际translateY属性值
     */
    getRealTranslateY() {
      let translateY = this.$refs.secondKey.style.transform; // 通过ref获取元素，拿到元素的transform属性值
      translateY = translateY.match(/-|[0-9]|\./g).join('');
      translateY = parseFloat(translateY);
      return translateY;
    },
    /**
     * 实现页面滑动
     */
    animeTransltaeY() {
      this.secondKeyStyle.transform = `translateY(${this.total}px)`;
    },
    /**
     * 初始化谜题
     */
    initPuzzle() {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const creatRandomIndex = Math.floor(Math.random() * 4);
        if (creatRandomIndex !== this.randomIndex) {
          this.randomIndex = creatRandomIndex;
          break;
        }
      }
      this.puzzle.answer = this.puzzleAnswers[this.randomIndex];
      this.puzzlePath = this.puzzleImgs[this.puzzle.answer];
    },
    /**
     * 解迷题
     */
    crackPuzzle(path) {
      if (path === this.puzzle.answer) this.puzzle.count++;
      else this.puzzle.count = 0;
      if (this.puzzle.count === 5) this.$router.replace({ name: 'Maze' });
      this.initPuzzle();
    },
    /**
     * 点击对话框
     */
    playDialogOfSecondKey() {
      if (!this.secondKeyBarInit) {
        this.secondKeyBarInit = !this.secondKeyBarInit;
        this.$refs.keyBar.init();
        setTimeout(() => {
          this.shilaimuOpacity = 1;
        }, 1000);
        setTimeout(() => {
          this.$refs.secondKeyDialog.playDialogOfSecondKey();
          this.secondKeyBarshilaimu = !this.secondKeyBarshilaimu;
        }, 2000);
      } else {
        if (!this.secondKeyBarshilaimu) return;
        this.$refs.secondKeyDialog.playDialogOfSecondKey();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#secondKey {
  background: #0f0f0f;
}
.ceil {
  background: #0f0f0f;
  color: white;
  position: relative;
  overflow: hidden;
}
.ceil.gary {
  background: #787878;
  color: #e2e2e2;
}
.ceil.white {
  background: #e2e2e2;
  color: #787878;
}

.ceil .left, .ceil .right {
  position: absolute;
  height: 70vh;
  writing-mode: vertical-rl;
  text-align: justify;
  letter-spacing: 1px;
  font-size: 10px;
}

.ceil .right {
  line-height: 30px;
}

.ceil .left span, .ceil .right span {
  display:inline-block;
  height: 70vh;
}

.ceil .left {
  left: 0;
}
.ceil .right {
  right: 0;
}
.ceil.end {
  background-color: white;
  color: #0f0f0f;
}
.ceil.end .shilaimu {
  width: 17.8vw;
  height: 16.5vw;
  margin-top: 41.4vh;
  margin-left: 41.20vw;
}
.ceil.end .shadow {
  display: block;
  width: 19.2vw;
  height: 4.8vw;
  margin: 2px auto 0 auto;
}
.ceil.end .dialog {
  width: 90vw;
  height: 22vw;
  margin: 2px auto 0 auto;
}
.ceil.end .up, .ceil.end .down, .ceil.end .left, .ceil.end .right {
  position: absolute;
}
.ceil.end .up {
  top: 0;
  left: 41.20vw;
  width: 17.8vw;
  height: 41.4vh;
}
.ceil.end .down {
  left: 41.20vw;
  bottom: 0;
  width: 17.8vw;
  height: calc(58.6vh - 43.3vw - 4px);
}
.ceil.end .left {
  left: 0;
  top: 41.4vh;
  width: 41.20vw;
  height: 16.5vw;
}
.ceil.end .right {
  right: 0;
  top: 41.4vh;
  width: 41vw;
  height: 16.5vw;
}
.ceil.start .key-bar {
  width: 100vw;
  height: 75vw;
}
.ceil.start .shilaimu {
  width: 17.8vw;
  height: 16.5vw;
  margin-top: 2.9vh;
  margin-left: 41.20vw;
  transition: opacity 1s linear;
}
.ceil.start .shadow {
  display: block;
  width: 19.2vw;
  height: 4.8vw;
  margin: 2px auto 0 auto;
  transition: opacity 1s linear;
}
.ceil.start .dialog {
  width: 90vw;
  height: 22vw;
  margin: 1vh auto 0 auto;
}
</style>
