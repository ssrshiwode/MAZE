<template>
  <div id="dialog" :style="dialogStype">
    <p>
      <span
        v-for="(item, index) in items"
        v-bind:key="index"
        class="list-complete-item"
      >
        {{ item }}
      </span>
    </p>
  </div>
</template>

<script>
import background from '@/assets/dialogBox/dialog.png';
import backgroundBlack from '@/assets/dialogBox/dialog-black.png';

const timeInterval = 100;

export default {
  name: 'DialogBox',
  props: ['dialogId', 'backgroundImg'],
  data() {
    return {
      items: [],
      dialogStype: {
        'background-image': '',
      },
      text: {
        firstKey: {
          contents: ['获得了物品：第一把钥匙', '哇！这么快就找到第一把钥匙啦！', '我这里有一个很重要的信息，你听好了哦！', '奥秘官奥秘官奥秘官奥秘官奥秘官···'],
          loop: 'end',
        },
        secondKeyDialog: {
          contents: ['获得了物品：第二把钥匙', '想不到这都能被你找到，你真是太厉害啦！', '我还有一个重要的事情要告诉你：', '网首页网首页网首页网首页网首页···'],
          loop: 'order',
        },
        puzzle: {
          contents: ['就在灰色的道路上！', '偶尔回头看一看。', '第三把钥匙只有他才知道在哪里。', '能走到这里真是不容易！'],
          loop: 'random',
        },
        thirdKey: {
          contents: ['获得了物品：第三把钥匙', '接下来，钥匙要用在哪里呢？', '还有最后一句重要的话要告诉你：', 'F12F12F12F12F12F12F12·····'],
          loop: 'order',
        },
      },
      process: -1,
      intervaler: null,
      i: 0,
    };
  },
  computed: {
    contents() {
      const { contents } = this.text[this.dialogId];
      return contents;
    },
    content() {
      const { contents } = this.text[this.dialogId];
      return contents[this.process];
    },
  },
  created() {
    if (this.backgroundImg === 'black') this.dialogStype['background-image'] = `url(${backgroundBlack})`;
    else this.dialogStype['background-image'] = `url(${background})`;
  },
  mounted() {
    switch (this.dialogId) {
      case 'firstKey':
        this.playDialogOfFirstKey();
        break;
      case 'secondKeyDialog':
        this.playDialogOfSecondKey();
        break;
      case 'puzzle':
        this.playDialogOfPuzzle();
        break;
      case 'thirdKey':
        this.playDialogOfThirdKey();
        break;
      default:
        break;
    }
  },
  methods: {
    createKey(item) {
      return `${item}${Date.now()}`;
    },
    playDialogOfFirstKey() {
      if (this.process !== this.contents.length - 1) this.process += 1;
      if (this.intervaler) clearInterval(this.intervaler);
      this.i = 0;
      this.items = [];
      this.intervaler = setInterval(() => {
        if (this.i < this.content.length) this.items.push(this.content[this.i]);
        this.i += 1;
      }, timeInterval);
    },
    playDialogOfSecondKey() {
      if (this.process === this.contents.length - 1) this.process = 1;
      else this.process += 1;
      if (this.intervaler) clearInterval(this.intervaler);
      this.i = 0;
      this.items = [];
      this.intervaler = setInterval(() => {
        if (this.i < this.content.length) this.items.push(this.content[this.i]);
        this.i += 1;
      }, timeInterval);
    },
    playDialogOfPuzzle() {
      this.process = Math.floor(Math.random() * 4);
      if (this.intervaler) clearInterval(this.intervaler);
      this.i = 0;
      this.items = [];
      this.intervaler = setInterval(() => {
        if (this.i < this.content.length) this.items.push(this.content[this.i]);
        this.i += 1;
      }, timeInterval);
    },
    playDialogOfThirdKey() {
      if (this.process === this.contents.length - 1) this.process = 1;
      else this.process += 1;
      if (this.intervaler) clearInterval(this.intervaler);
      this.i = 0;
      this.items = [];
      this.intervaler = setInterval(() => {
        if (this.i < this.content.length) this.items.push(this.content[this.i]);
        this.i += 1;
      }, timeInterval);
    },
  },
};
</script>

<style scoped>
#dialog {
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

p {
  font-size: 16px;
  padding: 3.4vw 2.6vw 0 6.6vw;
  text-align: left;
  letter-spacing: 8px;
  line-height: 20px;
}

.list-complete-item {
  transition: all 0.5s;
  display: inline-block;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  /* transform: translateY(30px); */
}
.list-complete-leave-active {
  position: absolute;
}
</style>
