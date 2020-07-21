<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    if (window.screen.width > 767) window.location.replace('https://resource.itaotuo.com/website/activity/pc.html');
  },
};
</script>

<style>
@font-face {
  font-family: "PIXEL";
  src: url("https://resource.itaotuo.com/website/activity/pixel-font.TTF");
}

* {
  margin: 0;
  padding: 0;
  font-family: "PIXEL";
}
</style>
