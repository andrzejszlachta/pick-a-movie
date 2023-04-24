<template>
  <div class="spinner"><div class="spinner__bar">
    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
  </div></div>
</template>

<style lang="scss" scoped>
@import '@/_variables';
  @keyframes spin {
    0% { opacity: 1 }
    100% { opacity: 0 }
  }
  .spinner {
    width: 104px;
    height: 104px;
    display: flex;
    overflow: hidden;
    margin: 0 auto;
  }
  .spinner__bar {
    position: relative;
    transform: translateX(46px) translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0;
  }
  .spinner__bar div {
    position: absolute;
    animation: spin linear 1s infinite;
    background: $alt-color;
    width: 12px;
    height: 24px;
    border-radius: 6px / 12px;
    transform-origin: 6px 52px;
    box-sizing: content-box;
  }
  .spinner__bar div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -0.9166666666666666s;
  }
  .spinner__bar div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -0.8333333333333334s;
  }
  .spinner__bar div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.75s;
  }
  .spinner__bar div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.6666666666666666s;
  }
  .spinner__bar div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.5833333333333334s;
  }
  .spinner__bar div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.5s;
  }
  .spinner__bar div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.4166666666666667s;
  }
  .spinner__bar div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.3333333333333333s;
  }
  .spinner__bar div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.25s;
  }
  .spinner__bar div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.16666666666666666s;
  }
  .spinner__bar div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.08333333333333333s;
  }
  .spinner__bar div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }
</style>