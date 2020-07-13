<template>
  <div id="key-bar">
    <template v-for="(key, index) in keyArray">
      <img :class="[key.keyName, {'current-key':openAnimation}]" :src="key.img" @touchstart="showAlert(key.content, key.img)" :key="index" v-if="key.keyName === keyCabinet">
      <img :class="key.keyName" :style="{opacity:keyOpacity}" :src="key.img" @touchstart="showAlert(key.content, key.img)" :key="index" v-else>
    </template>
    <div class="alert" :style="alertStyle" v-show="alert.show">
      <div class="close" @touchstart="alert.show = false"></div>
      <img :src="alert.img">
      <p>{{alert.content}}</p>
    </div>
  </div>
</template>

<script>
import firstKey from '@/assets/keyBar/firstKey.png';
import secondKey from '@/assets/keyBar/secondKey.png';
import thirdKey from '@/assets/keyBar/thirdKey.png';
import alertImg from '@/assets/keyBar/alert.png';

export default {
  name: 'KeyBar',
  props: ['keyCabinet', 'firstKeyBrowse'],
  data() {
    return {
      alert: {
        show: false,
        content: '',
        img: '',
      },
      alertStyle: {
        'background-image': '',
      },
      keyArray: [],
      openAnimation: true,
      keyOpacity: 0,
      alertLock: false,
    };
  },
  created() {
    switch (this.keyCabinet) {
      case 'firstKey':
        this.keyArray = [{ keyName: 'firstKey', img: firstKey, content: '第一把钥匙' }];
        break;
      case 'secondKey':
        if (this.firstKeyBrowse === 'Browsed') this.keyArray = [{ keyName: 'firstKey', img: firstKey, content: '第一把钥匙' }, { keyName: 'secondKey', img: secondKey, content: '第二把钥匙' }];
        else this.keyArray = [{ keyName: 'firstKey', img: firstKey, content: '第一把钥匙' }];
        break;
      case 'thirdKey':
        this.keyArray = [{ keyName: 'firstKey', img: firstKey, content: '第一把钥匙' }, { keyName: 'secondKey', img: secondKey, content: '第一把钥匙' }, { keyName: 'thirdKey', img: thirdKey, content: '第三把钥匙' }];
        break;
      default:
        break;
    }
    this.alertStyle['background-image'] = `url(${alertImg})`;
  },
  methods: {
    showAlert(content, img) {
      if (this.alertLock) {
        this.alert = {
          show: true,
          content,
          img,
        };
      }
    },
    init() {
      this.openAnimation = false;
      this.keyOpacity = 1;
      this.alertLock = true;
    },
  },
};
</script>

<style scoped>
#key-bar {
  width: 100%;
  position: relative;
}
.firstKey, .secondKey, .thirdKey {
  position: absolute;
  width: 6.3vw;
  height: 14.7vw;
  top: 4vh;
  transition: all 1s linear;
}
.firstKey {
  left: 6.7vw;
}
.secondKey {
  left: 17.8vw;
}
.thirdKey {
  left: 28.9vw;
}
.current-key {
  position: absolute;
  width: 10.3vw;
  height: 24.2vw;
  top: 75vw;
  left: 44.8vw;
}
.alert {
  position: absolute;
  left: 26.7vw;
  bottom: 0;
  width: 46.5vw;
  height: 46vw;
  background-size: 100% 100%;
}
.alert .close {
  position: absolute;
  top: 0;
  right: 0;
  width: 6vw;
  height: 6vw;
}
.alert img {
  width: 10.3vw;
  height: 24.2vw;
  display: block;
  margin: 6vw auto 5.5vw auto;
}
.alert p {
  width: 100%;
  font-size: 16px;
  text-align: center;
  letter-spacing: 8px;
  color: #e1e1e1;
  line-height: 20px;
}
</style>
