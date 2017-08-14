<template>
  <div class="main">
    <div class="board">
      <div class="row" v-for ="i in 10">
        <div
        class="col"
        :class = "{
          left: left(i, ii),
          right: right(i,ii)
        }"
        v-for = "ii in 9" 
        >
        <div 
        v-if = "home(i, ii)"
        :class="{
          home: home(i, ii)
        }"></div>
        </div>
      </div>
    </div>
    <div class="controller">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  const LEFTLIST = [
    [3, 2], [3, 8], [8, 2], [8, 8], [4, 9], [4, 3], [4, 5], [4, 7], [7, 9], [7, 3], [7, 5], [7, 7]
  ]
  const RIGHTLIST = [
    [3, 2], [3, 8], [8, 2], [8, 8], [4, 1], [4, 3], [4, 5], [4, 7], [7, 1], [7, 3], [7, 5], [7, 7]
  ]
  export default {
    data () {
      return {
      }
    },
    methods: {
      left (i, ii) {
        return LEFTLIST.some((item) => item[0] === i && item[1] === ii)
      },
      right (i, ii) {
        return RIGHTLIST.some((item) => item[0] === i && item[1] === ii)
      },
      home (i, ii) {
        if (i === 2 && ii === 5) {
          return true
        }
        if (i === 9 && ii === 5) {
          return true
        }
      }
    }
  }
</script>
<style lang="less">
.main{
  &:before {
    content: '';
    top:50px;
    left:50px;
    right:50px;
    bottom:50px;
    z-index:100;
    position:absolute;
    display:block;
    background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACdJREFUeNpiYEAFvP///2cAYQxBJBoiCCKQVPPCCWQJgjqw2gEQYACWECdcSWpl9AAAAABJRU5ErkJggg==);
  }
  width: 900px;
  position:relative;
  box-shadow:
    0px 0px 0px 40px #FDF5E6 inset,
    0px 0px 0px 45px #fff inset,
    0px 0px 0px 48px #FDF5E6 inset,
    0px 0px 0px 50px #fff inset,
    0px 0px 0px 50px #FDF5E6 inset,
    0px 0px 0px 20px #FDF5E6,
    0px 1px 0px 20px #fff,
    0px 6px 3px 17px darken(#FDF5E6, 20%),
    0px 6px 0px 20px darken(#FDF5E6, 10%),
    0px 5px 3px 22px #cbcbcb;
  margin:0 auto;
  border-radius:5px;
  overflow: hidden;
  background-color: #FAEBD7;
  background-image: 
    linear-gradient(
      transparent, 
      transparent 49px,
      #fff 49px,
      #fff 51px,
      transparent 51px
    ), linear-gradient(90deg,
      transparent, 
      transparent 49px,
      #fff 49px,
      #fff 51px,
      transparent 51px
    );
  background-size: 100px 100px, 100px 100px;
  &:after{
    font-family: KaiTi;
    color:#fff;
    font-weight: bold;
    font-size: 60px;
    position: absolute;
    left: 400px;
    top: 102px;
    font-weight:bold;
    width: 98px;
    content: '楚河漢界';
    line-height:200px;
    text-align: center;
    background: #FAEBD7;
    z-index:0;
    height:795px;
    transform: rotate(-90deg)
  }
}
.home{
  position: absolute;
  width:100%;
  height:100%;
  z-index:1;
  &:after{
    content: '';
    display:block;
    width:100%;
    height:.5px;
    transform:rotate(135deg) scale(2.8) translate(12.5px ,-12.5px);
    position:absolute;
    z-index:-1;
    background:#fff;
  }
  &:before{
    content: '';
    display:block;
    width:100%;
    height:.5px;
    transform:rotate(45deg) scale(2.8) translate(12.5px ,12.5px);
    position:absolute;
    z-index:-1;
    background:#fff;
  }
}
.row{
  position:relative;
  z-index:1;
  width:900px;
  height:100px;
  font-size:0;
}
.col{ 
  float:left;
  position:relative;
  transition:all .2s;
  width:100px;
  height:100px;
  line-height:100px;
  display:inline-block; 
  &.left:before{
    z-index:-1;
    position:absolute;
    top:0;
    left:0;
    content: '';
    width:50px;
    height:100px;
    display:block;
    background-image: 
      linear-gradient(
      transparent 16px,
      #fff 16px,
      #fff 18px,
      #FAEBD7 18px,
      #FAEBD7 24px,
      transparent 24px,
      transparent 26px,
      #FAEBD7 26px,
      #FAEBD7 32px,
      #fff 32px,
      #fff 34px,
      transparent 34px,
      ), 
      linear-gradient(
      90deg, 
      transparent,
      transparent 14px,
      #fff 14px,
      #fff 16px,
      transparent 16px
      );
    background-size:16px 48px;
    background-position:25px 25px;
    background-repeat:no-repeat; 
  }
  &.right:after{
    z-index:-1;
    position:absolute;
    top:0;
    right:0;
    content: '';
    width:50px;
    height:100px;
    display:block;
    background-image: 
      linear-gradient(
      transparent 16px,
      #fff 16px,
      #fff 18px,
      #FAEBD7 18px,
      #FAEBD7 24px,
      transparent 24px,
      transparent 26px,
      #FAEBD7 26px,
      #FAEBD7 32px,
      #fff 32px,
      #fff 34px,
      transparent 34px,
      ), 
      linear-gradient(
      90deg, 
      transparent,
      transparent 0px,
      #fff 0px,
      #fff 2px,
      transparent 2px
      );
    background-size:18px 48px;
    background-position:8px 25px;
    background-repeat:no-repeat; 
  }
}
.controller{
  z-index:100;
  position:absolute;
  width:100%;
  height:100%;
  top:0;
  left:0;
}
</style>
