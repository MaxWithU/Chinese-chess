<template>
<div>
  <dashboard 
    :camp = "choose"
    @on-reset = "reset"
    @on-undo = "undo"
    ></dashboard>
  <chess-main>
    <div 
      v-for = "(item, index) in mtx" 
      class ="row-x">
      <div 
        class ="col-x"
        
        @click = 'pick(it, index, i)'
        v-for = "(it, i) in item" 
        >
        <div
          class= "chess"
          v-if ="it"
          :class = "{
            'blue': it[2] === 'B',
            'red': it[2] === 'A',
            'active': chooseItem && chooseItem === it
          }"
          >
          {{it?chess.get(it).name: '' }}
        </div>
      </div>  
    </div>
  </chess-main>
</div>
</template>
<script>
  import chessMain from './__child/main'
  import dashboard from './__child/dashboard'
  import curryPick from './utils/curryPick'
  import Chess from './class/Chess'
  import Rule from './class/Rule'
  // import Check from './class/Check'
  export default {
    components: {
      dashboard, chessMain
    },
    data () {
      return {
        chess: {},
        mtx: [],
        choose: 'A',
        chooseItem: null
      }
    },
    mounted () {
      this.reset()
    },
    methods: {
      undo () {
        console.log('undo')
      },
      reset () {
        console.log('reset')
        this.choose = 'A'
        this.chooseItem = null
        this.chess = new Map(new Chess().map((item) => item))
        this.renderIt()
      },
      renderIt () {
        console.log(this.chess)
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
<style lang = "less">
  html{
    height:1200px;
    background-image:url(../assets/bg.png);
  }
  .row-x {
    height:100px;
    width:1200px;
  }
  .col-x{
    position:relative;
    width:100px;
    float:left;
    height:100px;
  }
  .chess{

    font-size:40px;
    font-family:KaiTi;
    position:absolute;
    text-shadow:0px -.5px .5px #666;
    border-radius:50%;
    &.red{
      width:80px;
      background :#FDF5E6;
      margin: 10px;
      height:80px;
      line-height:75px;
      box-shadow: 
        0 -3px 1px #C59F75 inset,
        0px -5px 5px #DEB887 inset,
        0 -3px 0 6px #FDF5E6 inset,
        0 -2px 0px 6px #FFDAB9 inset,
        0 -3px 0 10px #FDF1d1 inset,
        0 -4px 0px 10px #FFDAB9 inset,
        0px 1px 5px #666,
        0px 3px 6px #cbcbcb,
        0px 6px 5px #f1f1f1;
      color:#FF4500;
      &.active{
        box-shadow: 
          0 -3px 1px #C59F75 inset,
          0px -5px 5px #DEB887 inset,
          0 -3px 0 6px #FDF5E6 inset,
          0 -2px 2px 6px #FFDAB9 inset,
          0 -3px 0 10px #FDF1d1 inset,
          0 -4px 2px 10px #FFDAB9 inset,
          0px 5px 10px #777,
          0px 10px 20px #cbcbcb;
      }
      &:after {
        content: '';
        color: red;
      }
    }
    &.blue{
      width:80px;
      background :#FDF5E6;
      margin: 10px;
      height:80px;
      line-height:75px;
      box-shadow: 
        0 -3px 1px #C59F75 inset,
        0px -5px 5px #DEB887 inset,
        0 -3px 0 6px #FDF5E6 inset,
        0 -2px 1px 6px #FFDAB9 inset,
        0 -3px 0 10px #FDF1d1 inset,
        0 -4px 1px 10px #FFDAB9 inset,
        0px 1px 5px #666,
        0px 3px 6px #cbcbcb,
        0px 6px 5px #f1f1f1;
      color:#1E90FF;
      &.active{
        box-shadow: 
          0 -3px 1px #C59F75 inset,
          0px -5px 5px #DEB887 inset,
          0 -3px 0 6px #FDF5E6 inset,
          0 -3px 0 10px #FDF1d1 inset,
          0px 10px 5px #666,
          0px 10px 10px #cbcbcb;
      }
      &:after {
        content: '';
        color: blue;
      }
    }
  }
</style>
