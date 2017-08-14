<template>
  <div class="dashboard">
    <div class ="start btn" @click ="$emit('on-reset')"><i class="iconfont icon-arrow-right-drop-circle-outline"></i></div>
    <div class="undo btn" @click = "$emit('on-undo')"><i class="iconfont icon-reply"></i></div>
    <div class ="camp">
      <div class="switch" :class= "camp === 'B' ? 'active': ''">{{camp === 'B' ? 'BLUE': 'RED'}}</div>
    </div>
    <div class= "btn-group">
      <div class="rotate btn" @click = "$emit('on-rotate')"><i class="iconfont icon-rotate-right"></i></div>
      <div class="zoom-in btn" @click = "$emit('on-zoom-in')"><i class="iconfont icon-arrow-expand-all"></i></div>
      <div class="zoom-out btn" @click = "$emit('on-zoom-out')"><i class = "iconfont icon-arrow-compress-all"></i></div>
    </div>
    
  </div>
</template>
<script>
  export default {
    props: {
      camp: String
    }
  }
</script>
<style lang="less">
  @import"//at.alicdn.com/t/font_383261_7gc0spw89v7eewmi.css";
  .dashboard{
    height:55px;
    overflow: hidden;
    background:#F8F8FF;
    border-radius:10px;
    padding:8px;
    box-shadow:
      0px -1px 0px 1px #fff inset,
      0px 5px 0px darken(#f0f0f0, 5%),
      0px 5px 10px #cbcbcb;
    width:900px;
    margin:40px auto;
    .btn-group {
      float:right;
      padding:8px;
      box-shadow: 0px 1px 3px #cbcbcb inset;
      background:#F0F8FF;
      border-radius:5px;
      margin-right:20px;
    }
    .btn {
      i:before{
        font-size:25px;
      }
      font-weight:bold;
      cursor:pointer;
      float:left;  
      text-align:center;
      border-radius:5px;
      margin:0 5px;
      font-size:25px;
      color:#fff;
      padding:0 20px;
      box-shadow: 
        0px 3px 10px darken(#cbcbcb, 10%), 
        0px -5px 0px darken(#DC143C, 10%) inset,
        0px 2px 0px 3px #f7f7f7, 
        0px 2px 0px 4px #cbcbcb, 
        0px -5px 1px lighten(#DC143C, 20%) inset;
      &:active{
        line-height:46px;
      }
    }
    .dashboard-btn (@color: #666, @height: 50px) {
      height:@height;
      line-height:@height - 5;
      background: @color;
      text-shadow:0px -1px 0px darken(@color, 30%);
      box-shadow: 
        0px 3px 10px darken(#cbcbcb, 10%), 
        0px -5px 0px darken(@color, 10%) inset,
        0px 2px 0px 3px #f7f7f7, 
        0px -5px 1px lighten(@color, 20%) inset;
      &:hover{
        background: lighten(@color, 2%);
      }
      &:active{
        text-shadow:0px 0px 0px darken(@color, 30%);
        background: darken(@color, 5%);
        box-shadow:
          0px 2px 0px #f1f1f1 inset, 
          0px 2px 2px darken(#cbcbcb, 10%),
          0px 2px 0px 3px #f1f1f1, 
          0px -1px 0px darken(@color, 20%) inset;
      }
    }

    .start{
      .dashboard-btn(#1E90FF)
    }
    .undo{
      .dashboard-btn(#AFEEEE)
    }
    .rotate{
      .dashboard-btn(#40E0D0, 40px)
    }
    .zoom-in{
      .dashboard-btn(#B0C4DE, 40px);      
    }
    .zoom-out{
      .dashboard-btn(#ADD8E6, 40px)
    }
    .camp{
      box-shadow:0px 2px 0px #cbcbcb inset, 0px 3px 0px #f1f1f1 inset, 0px 1px 0px 1px #f1f1f1,  0px 1px 0px 2px #f7f7f7;
      padding:1px;
      border-radius:5px;
      width:90px;
      background:#fff;
      float:right;
      height:30px;
    }
    .switch{
      box-shadow: 
      0px -5px 0px darken(#FF4500, 10%) inset, 
      0px -6px 0px lighten(#FF4500, 10%) inset,
      0px -5px 0px #FF4500;
      transition: .2s all;
      width: 60px;
      height:30px;
      border-radius: 5px;
      background:#FF4500;
      color:#fff;
      line-height:20px;
      font-weight:bold;
      text-shadow:0px -1px 0px 1px darken(#FF4500, 10%);
      &.active{
        margin-left:30px;
        background:#1E90FF;
        text-shadow:0px -1px 0px darken(#1E90FF, 10%);
        box-shadow: 
        0px -5px 0px darken(#1E90FF, 10%) inset,
        0px -6px 0px lighten(#1E90FF, 10%) inset,
        0px -5px 0px #1E90FF;
      }
    }
  }
</style>
