<template>
  <div class ="board">
    <div v-for = "(item, index) in mtx" class ="row">
      <span class ="col" v-for = "(it, i) in item[1]" @click = 'pick(index, i)'>{{it?chess.get(it).name: '' }}</span>  
    </div>
  </div>
</template>
<script>
  // 车:Rook
  // 马:Horse
  // 象/相:Elephant
  // 士/仕:Mandarin
  // 将/帅:General
  // 炮:Cannon
  // 卒/兵:Soldier
  import chess from './chess.json'
  export default {
    data () {
      return {
        matrix: new Map(
          Array(10).fill().map((item, i) => {
            return [i, Array(9).fill(null)]
          }
        )),
        chess: new Map(chess),
        mtx: []
      }
    },
    computed: {
    },
    mounted () {
      for (let item of this.chess.entries()) {
        this.matrix.get(item[1].y)[item[1].x] = item[0]
      }
      this.renderIt()
    },
    methods: {
      init () {
      },
      renderIt () {
        this.mtx = [...this.matrix]
      },
      pick (index, i) {
        this.matrix.get(index)[i] = 'x'
        this.renderIt()
      }
    }
  }
</script>
<style>
  .board{
    width: 900px;
    margin:0 auto;
  }
  .row{
    width:900px;
    height:100px;
    font-size:0;
  }
  .col{
      width:100px;
      font-size:20px;
      overflow:hidden;
      height:100px;
      line-height:100px;
      display:inline-block;
      outline: 1px solid #cbcbcb;
    }
</style>
