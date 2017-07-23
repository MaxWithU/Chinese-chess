<template>
  <div class="dashboard">
    <div class ="start-btn" @click ="$emit('on-reset')">START / RESET</div>
    <div class="undo-btn" @click = "$emit('on-undo')">UNDO</div>
    <div class ="camp">
      <div class="switch" :class= "camp === 'B' ? 'active': ''">{{camp === 'B' ? 'BLUE': 'RED'}}</div>
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
  .dashboard{
    height:55px;
    overflow: hidden;
    background:#f7f7f7;
    border-radius:10px;
    padding:8px;
    box-shadow:
      0px -1px 0px 1px #fff inset,
      0px 5px 0px darken(#f0f0f0, 5%),
      0px 5px 10px #cbcbcb;
    width:900px;
    margin:40px auto;
    .start-btn{
      font-weight:bold;
      cursor:pointer;
      float:left;  
      height:50px;
      line-height:45px;
      text-align:center;
      border-radius:5px;
      background: #DC143C;
      margin-right:15px;
      font-size:25px;
      color:#fff;
      text-shadow:0px -1px 0px darken(#DC143C, 30%);
      box-shadow: 
        0px 3px 10px darken(#cbcbcb, 10%), 
        0px -5px 0px darken(#DC143C, 10%) inset,
        0px 2px 0px 3px #f7f7f7, 
        0px 2px 0px 4px #cbcbcb, 
        0px -5px 1px lighten(#DC143C, 20%) inset;
      padding:0 30px;
      &:hover{
        background: lighten(#DC143C, 2%);
      }
      &:active{
        text-shadow:0px 0px 0px darken(#DC143C, 30%);
        line-height:46px;
        background: darken(#DC143C, 5%);
        box-shadow:
          0px 2px 0px #f1f1f1 inset, 
          0px 2px 2px darken(#cbcbcb, 10%),
          0px 2px 0px 3px #f1f1f1, 
          0px 2px 0px 4px #cbcbcb,
          0px -1px 0px darken(#DC143C, 20%) inset;
      }
    }
    
    .undo-btn{
      font-weight:bold;
      cursor:pointer;
      float:left;      
      height:50px;
      line-height:45px;
      text-align:center;
      border-radius:5px;
      background:#4169e1;
      font-size:25px;
      color:#fff;
      text-shadow:0px -1px 0px darken(#4169e1, 30%);
      box-shadow: 
        0px 3px 10px darken(#cbcbcb, 10%), 
        0px -5px 0px darken(#4169e1, 10%) inset,
        0px 2px 0px 3px #f7f7f7, 
        0px 2px 0px 4px #cbcbcb, 
        0px -5px 1px lighten(#4169e1, 20%) inset;
      padding:0 30px;
      &:hover{
        background: lighten(#4169e1, 2%);
      }
      &:active{
        text-shadow:0px 0px 0px darken(#4169e1, 30%);
        line-height:46px;
        background: darken(#4169e1, 5%);
        box-shadow:
          0px 2px 0px #f1f1f1 inset, 
          0px 2px 2px darken(#cbcbcb, 10%),
          0px 2px 0px 3px #f1f1f1, 
          0px 2px 0px 4px #cbcbcb,
          0px -1px 0px darken(#4169e1, 20%) inset;
      }
    }
    .camp{
      box-shadow:0px 2px 0px #cbcbcb inset, 0px 3px 0px #f1f1f1 inset, 0px 1px 0px 1px #f1f1f1,  0px 1px 0px 2px #f7f7f7;
      padding:1px;
      border-radius:5px;
      width:90px;
      background:#fff;
      float:right;
      height:40px;
    }
    .switch{
      box-shadow: 
      0px -5px 0px darken(#FF4500, 10%) inset, 
      0px -6px 0px lighten(#FF4500, 10%) inset,
      0px -5px 0px #FF4500;
      transition: .2s all;
      width: 60px;
      height:40px;
      border-radius: 5px;
      background:#FF4500;
      color:#fff;
      line-height:30px;
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
