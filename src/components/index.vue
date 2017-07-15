<template>
  <div class ="board">
    <div v-for = "(item, index) in mtx" class ="row">
      <span class ="col" :class ="chooseItem[0] === it ? 'active': ''" v-for = "(it, i) in item" @click = 'pick(it, index, i)'>{{it?chess.get(it).name: '' }}</span>  
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
  import Rook from './action/Rook'
  import Cannon from './action/Cannon'
  import Elephant from './action/Elephant'
  import Horse from './action/Horse'
  import Soldier from './action/Soldier'
  import General from './action/General'
  import Mandarin from './action/Mandarin'
  export default {
    data () {
      return {
        chess: new Map(chess),
        mtx: [],
        choose: 'A',
        chooseItem: []
      }
    },
    mounted () {
      this.renderIt()
    },
    methods: {
      renderIt () {
        this.mtx = Array(10).fill().map((item, i) => Array(9).fill(null))
        for (let [key, value] of this.chess) {
          this.mtx[value.y][value.x] = key
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
                  this.chess.get(this.chooseItem[0]),
                  {x: x, y: y}
                )
              }
            } else {
              this.setItem(
                this.chess.get(this.chooseItem[0]),
                {x: x, y: y}
              )
            }
            break
        }
      },
      setItem (one, two) {
        console.log('setItem')
        this.setChess(one, two) && this.jump(one, two)
      },
      setChess (one, two) {
        switch (one.type) {
          case 'R': return Rook(this.mtx, one).has(`${two.x}_${two.y}`)
          case 'H': return Horse(this.mtx, one).has(`${two.x}_${two.y}`)
          case 'E': return Elephant(this.mtx, one).has(`${two.x}_${two.y}`)
          case 'M': return Mandarin(this.mtx, one).has(`${two.x}_${two.y}`)
          case 'G': return General(this.mtx, one).has(`${two.x}_${two.y}`)
          case 'S': return Soldier(this.mtx, one).has(`${two.x}_${two.y}`)
          case 'C': return Cannon(this.mtx, one).has(`${two.x}_${two.y}`)
          default: return false
        }
      },
      jump (one, two) {
        console.log('jump')
        this.choose === 'A' ? this.choose = 'B' : this.choose = 'A'
        this.chooseItem = []
        this.chess.get(this.mtx[one.y][one.x]).x = two.x
        this.chess.get(this.mtx[one.y][one.x]).y = two.y
        if (this.mtx[two.y][two.x]) {
          this.chess.get(this.mtx[two.y][two.x]).x = null
          this.chess.get(this.mtx[two.y][two.x]).y = null
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
  .col.active{
    background:#cbcbcb;
  }
</style>
