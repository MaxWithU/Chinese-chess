<template>
  <div class ="board">
    <div v-for = "(item, index) in mtx" class ="row">
      <span class ="col" v-for = "(it, i) in item" @click = 'pick(it, index, i)'>{{it?chess.get(it).name: '' }}</span>  
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
        matrix: Array(10).fill().map((item, i) => Array(9).fill(null)),
        chess: new Map(chess),
        mtx: [],
        choose: 'A',
        chooseItem: []
      }
    },
    computed: {
    },
    mounted () {
      this.renderIt()
    },
    methods: {
      renderIt () {
        this.mtx = this.matrix.map(item => item)
        for (let item of this.chess) {
          this.mtx[item[1].y][item[1].x] = item[0]
        }
      },
      pick (it, y, x) {
        switch (this.chooseItem.length) {
          case 0:
            console.log(0)
            if (it) {
              this.chess.get(it).camp === this.choose ? this.chooseItem.push(it) : ''
            }
            break
          case 1:
            console.log(1)
            // console.log(this.chess.get(it).camp)
            if (it) {
              if (it === this.chooseItem[0]) {
                console.log('chooseSelf')
                this.chooseItem = []
              } else if (this.chess.get(it).camp === this.choose) {
                console.log('chooseFriend')
                this.chooseItem[0] = it
              } else {
                console.log('chooseOther')
                this.setItem(
                  this.mtx,
                  this.chess.get(this.chooseItem[0]),
                  {x: x, y: y}
                )
              }
            } else {
              this.setItem(
                this.mtx,
                this.chess.get(this.chooseItem[0]),
                {x: x, y: y}
              )
            }
            break
        }
      },
      setItem (...args) {
        console.log('setItem')
        switch (args[1].type) {
          case 'R': rook(...args) && this.jump(...args)
            break
          default: console.log('other')
            break
        }
      },
      jump (...args) {
        console.log('jump')
        this.chess.get(this.mtx[args[1].y][args[1].x]).x = args[2].x
        this.chess.get(this.mtx[args[1].y][args[1].x]).y = args[2].y
        if (this.mtx[args[2].y][args[2].x]) {
          this.chess.get(this.mtx[args[2].y][args[2].x]).x = null
          this.chess.get(this.mtx[args[2].y][args[2].x]).y = null
        }
        this.renderIt()
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
