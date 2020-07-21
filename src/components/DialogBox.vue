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
          contents: ['获得了物品：第一把钥匙', '哇，这么快就找到第一把钥匙啦！你好厉害！', '我这里有一个很重要的信息要告诉你，听好了哦！', '奥秘官奥秘官奥秘官奥秘官奥秘官···'],
          loop: 'tow-three',
        },
        secondKeyDialog: {
          contents: ['获得了物品：第二把钥匙', '想不到这都被你发现了，你好厉害！', '我这里有一个很重要的信息要告诉你，要记住哦！', '网首页网首页网首页网首页网首页···'],
          loop: 'tow-three',
        },
        puzzle: {
          contents: ['能找到这里真是不容易！你太棒了！', '第三把钥匙的线索就藏在来时的灰色道路旁', '找到那个掌握线索的人吧！'],
          loop: 'tow-three',
        },
        thirdKey: {
          contents: ['获得了物品：第三把钥匙', '你太厉害了！赢得了第三把钥匙！', '不过，光集齐钥匙是不够的，还得找到能使用它们的地方。', '我这里也有重要的消息要告诉你，记住了哦！', 'F12F12F12F12F12···'],
          loop: 'three-four',
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
      else this.process = 2;
      if (this.intervaler) clearInterval(this.intervaler);
      this.i = 0;
      this.items = [];
      this.intervaler = setInterval(() => {
        if (this.i < this.content.length) this.items.push(this.content[this.i]);
        this.i += 1;
      }, timeInterval);
    },
    playDialogOfSecondKey() {
      if (this.process !== this.contents.length - 1) this.process += 1;
      else this.process = 2;
      if (this.intervaler) clearInterval(this.intervaler);
      this.i = 0;
      this.items = [];
      this.intervaler = setInterval(() => {
        if (this.i < this.content.length) this.items.push(this.content[this.i]);
        this.i += 1;
      }, timeInterval);
    },
    playDialogOfPuzzle() {
      if (this.process !== this.contents.length - 1) this.process += 1;
      else this.process = 1;
      if (this.intervaler) clearInterval(this.intervaler);
      this.i = 0;
      this.items = [];
      this.intervaler = setInterval(() => {
        if (this.i < this.content.length) this.items.push(this.content[this.i]);
        this.i += 1;
      }, timeInterval);
    },
    playDialogOfThirdKey() {
      if (this.process !== this.contents.length - 1) this.process += 1;
      else this.process = 3;
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
