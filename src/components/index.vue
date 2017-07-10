<template>
  <div class ="board">
    <div v-for = "(item, index) in mtx" class ="row">
      <span class ="col" v-for = "(it, i) in item[1]" @click = 'pick(it, index, i)'>{{it?chess.get(it).name: '' }}</span>  
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
  import curryPick from './utils/curryPick.js'
  import rook from './action/rook'
  export default {
    data () {
      return {
        matrix: new Map(
          Array(10).fill().map((item, i) => {
            return [i, Array(9).fill(null)]
          }
        )),
        chess: new Map(chess),
        mtx: [],
        choose: 'A',
        chooseItem: []
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
      renderIt () {
        this.mtx = [...this.matrix]
      },
      pick (it, y, x) {
        console.log(it)
        console.log(this.chooseItem.length)
        switch (this.chooseItem.length) {
          case 0:
            console.log(0)
            if (it) {
              this.chess.get(it).camp === this.choose ? this.chooseItem.push(it) : ''
            }
            break
          case 1:
            console.log(1)
            if (it) {
              if (it === this.chooseItem[0]) {
                this.chooseItem = []
              } else if (this.chess.get(it).camp === this.chooseItem[0]) {
                this.chooseItem[0] = it
              } else {
                this.setItem(
                  this.matrix,
                  this.chess.get(this.chooseItem[0]),
                  {x: x, y: y}
                )
              }
            } else {
              this.setItem(
                this.matrix,
                this.chess.get(this.chooseItem[0]),
                {x: x, y: y}
              )
            }
            break
        }
      },
      setItem (...args) {
        console.log(args)
        console.log('setItem')
        console.log(args[1].type)
        switch (args[1].type) {
          case 'R': console.log(rook(...args))
            break
          default: console.log('other')
            break
        }
      },
      pck: curryPick((...arg) => {
        return [...arg]
      })
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
