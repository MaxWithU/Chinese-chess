<template>
  <div class ="board">
    <div 
      v-for = "(item, index) in mtx" 
      class ="row">
      <span 
        class ="col" 
        :class ="{
          'blue': it && it[2] === 'B',
          'red': it && it[2] === 'A',
          'active': chooseItem && chooseItem === it,
        }"
        v-for = "(it, i) in item" 
        @click = 'pick(it, index, i)'>
        {{it?chess.get(it).name: '' }}
      </span>  
    </div>
  </div>
</template>
<script>
  import curryPick from './utils/curryPick'
  import chess from './chess.json'
  import Rule from './class/Rule'
  // import Check from './class/Check'
  export default {
    data () {
      return {
        chess: new Map(chess),
        mtx: [],
        choose: 'A',
        chooseItem: null
      }
    },
    mounted () {
      this.renderIt()
    },
    methods: {
      renderIt () {
        this.mtx = Array(10).fill().map((item, i) => Array(9).fill(null))
        for (let [key, value] of this.chess) {
          if (value.x !== null) {
            this.mtx[value.y][value.x] = key
          }
        }
        console.log(this.mtx)
        // this.choose === 'A' ? this.choose = 'B' : this.choose = 'A'
        // this.chooseItem = null
      },
      pck (...arg) {
        curryPick((...arg) => {
          return [...arg]
        })
      },
      pick (it, y, x) {
        console.log(this.pck(it))
        // console.log(Check(it))
        // console.log(it)
        if (this.chooseItem) {
          if (it) {
            if (it === this.chooseItem) {
              console.log('chooseSelf')
              this.chooseItem = null
            } else if (this.chess.get(it).camp === this.choose) {
              console.log('chooseFriend')
              this.chooseItem = it
            } else {
              console.log('chooseOther')
              this.setItem(
                this.chess.get(this.chooseItem),
                {x: x, y: y}
              )
            }
          } else {
            this.setItem(
              this.chess.get(this.chooseItem),
              {x: x, y: y}
            )
          }
        } else {
          !!it && this.chess.get(it).camp === this.choose ? this.chooseItem = it : ''
        }
      },
      setItem (one, two) {
        console.log('setItem')
        new Rule(this.mtx).from(one).to(two) && this.jump(one, two)
      },
      jump (one, two) {
        let ax = one.x
        let ay = one.y
        let bx = two.x
        let by = two.y
        this.chess.get(this.mtx[ay][ax]).x = bx
        this.chess.get(this.mtx[ay][ax]).y = by
        if (this.mtx[by][bx]) {
          this.chess.get(this.mtx[by][bx]).x = null
          this.chess.get(this.mtx[by][bx]).y = null
        }
        // console.log(this.mtx[one.y][one.x])
        this.renderIt()
        this.choose === 'A' ? this.choose = 'B' : this.choose = 'A'
        this.chooseItem = null
        console.log(this.chess)
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
      font-size:40px;
      font-family:SongTi;
      text-shadow:0px -1px 1px #666;
      overflow:hidden;
      height:100px;
      line-height:100px;
      display:inline-block;
      border-radius:50%;  
    }
  .col.red{
    width:80px;
    background :#FDF5E6;
    margin: 10px;
    height:80px;
    line-height:75px;
    box-shadow: 
      0 -3px 1px #C59F75 inset,
      0px -5px 5px #DEB887 inset,
      0 -3px 0 6px #FDF5E6 inset,
      0 -3px 0 10px #FDF1d1 inset,
      0px 1px 5px #666,
      0px 3px 10px #cbcbcb;
    color:#FF4500;
    
  }
  .col.red:after {
    content: '';
    color: red;
  }
  .col.blue{
    width:80px;
    background :#FDF5E6;
    margin: 10px;
    height:80px;
    line-height:75px;
    box-shadow: 
      0 -3px 1px #C59F75 inset,
      0px -5px 5px #DEB887 inset,
      0 -3px 0 6px #FDF5E6 inset,
      0 -3px 0 10px #FDF1d1 inset,
      0px 1px 5px #666,
      0px 3px 10px #cbcbcb;
    color:#1E90FF;
  }
  .col.blue:after {
    content: '';
    color: blue;
  }
  .col.active{
    background:#cbcbcb;
  }
</style>
