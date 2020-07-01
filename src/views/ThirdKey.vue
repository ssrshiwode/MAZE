<template>
  <div id="thirdKey">
    <key-bar ref="keyBar" class="key-bar" key-cabinet="thirdKey"></key-bar>
    <img class="shilaimu" :style="{opacity:shilaimuOpacity}" src="@/assets/secondKey/lan-shang.gif">
    <img class="shadow" :style="{opacity:shilaimuOpacity}" src="@/assets/secondKey/shadow.png">
    <dialog-box ref="thirdKeyDialog" class="dialog" dialog-id="thirdKey" @touchstart.native="playDialogOfThirdKey"></dialog-box>
  </div>
</template>

<script>
import DialogBox from '@/components/DialogBox.vue';
import KeyBar from '@/components/KeyBar.vue';

export default {
  name: 'ThirdKey',
  components: { DialogBox, KeyBar },
  data() {
    return {
      shilaimuOpacity: 0,
      thirdKeyBarInit: false,
    };
  },
  methods: {
    // 点击对话框
    playDialogOfThirdKey() {
      if (!this.thirdKeyBarInit) {
        this.thirdKeyBarInit = !this.thirdKeyBarInit;
        this.$refs.keyBar.init();
        setTimeout(() => {
          this.shilaimuOpacity = 1;
        }, 1000);
      }
      this.$refs.thirdKeyDialog.playDialogOfThirdKey();
    },
  },
};
</script>

<style scoped>
#thirdKey {
  width: 100vw;
  height: 100vh;
  background: #0f0f0f;
  overflow: hidden;
  color: #e1e1e1;
}

.key-bar {
  width: 100vw;
  height: 75vw;
}
.shilaimu {
  width: 17.8vw;
  height: 16.5vw;
  margin-top: 2.9vh;
  margin-left: 41.20vw;
  transition: opacity 1s linear;
}
.shadow {
  display: block;
  width: 19.2vw;
  height: 4.8vw;
  margin: 2px auto 0 auto;
  transition: opacity 1s linear;
}
.dialog {
  width: 90vw;
  height: 22vw;
  margin: 1vh auto 0 auto;
}
</style>
