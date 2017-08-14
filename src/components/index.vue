<template>
<div 
  :style = '{
    transition: ".5s all",
    transformOrigin: "50% 0",
    transform: `scale(${this.scale})`
  }'
>
  <dashboard 
    :camp = "choose"
    @on-reset = "reset"
    @on-undo = "undo"
    @on-rotate = "rotate"
    @on-zoom-in = "zoom('in')"
    @on-zoom-out = "zoom('out')"
    ></dashboard>
  <chess-main
    :style = '{
      
      transition: ".5s all",
      transform: `rotate(${this.deg}deg)`
    }'
  >
    <div 
      style = "-webkit-perspective:1000"
      v-for = "(item, index) in mtx" 
      class ="row-x">
      <div 
        class ="col-x"
        @click = 'pick(it, index, i)'
        v-for = "(it, i) in item" 
        >
        <div
          :style = '{
            transform: "rotate(" + -deg + "deg)"
          }'
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
  // import curryPick from './utils/curryPick'
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
        choose: 'B',
        chooseItem: null,
        history: [],
        deg: 0,
        scale: 1
      }
    },
    mounted () {
      this.reset()
    },
    methods: {
      zoom (str) {
        if (str === 'in') {
          this.scale < 2 ? this.scale += 0.1 : ''
        } else {
          this.scale > 0.5 ? this.scale -= 0.1 : ''
        }
      },
      rotate () {
        this.deg += 90
        console.log('rotate')
      },
      undo () {
        if (this.history.length > 1) {
          this.history.shift()
          this.chess = new Map(JSON.parse(this.history[0]))
          this.renderIt(this.history[0])
        }
      },
      submit () {
        this.history.unshift(JSON.stringify([...this.chess]))
        this.renderIt(this.history[0])
      },
      reset () {
        this.choose = 'B'
        this.chooseItem = null
        this.chess = new Map(new Chess())
        this.history = []
        this.submit()
      },
      renderIt (obj) {
        let now = Array(10).fill().map((item, i) => Array(9).fill(null))
        for (let [key, value] of new Map(JSON.parse(obj))) {
          if (value.x !== null) {
            now[value.y][value.x] = key
          }
        }
        this.mtx = now.map((item) => item)
        this.choose === 'A' ? this.choose = 'B' : this.choose = 'A'
        this.chooseItem = null
      },
      pick (it, y, x) {
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
        console.log('jump')
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
        this.submit()
      }
    }
  }
</script>
<style lang = "less">
  html{
    height:1200px;
    background-image:url(../assets/bg.png);
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
  .row-x {
    height:100px;
    width:1200px;
  }
  .col-x{
    cursor:pointer;
    position:relative;
    width:100px;
    float:left;
    height:100px;
  }
  .chess{
    cursor:pointer;
    transition:.3s all;
    font-size:40px;
    font-family:KaiTi;
    font-weight:bold;
    position:absolute;
    text-shadow:0px -.5px .5px #666;
    border-radius:50%;
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
      &.active{
        transform: translateZ(20px);
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
    &.red{
      width:80px;
      background :#FDF5E6;
      margin: 10px;
      height:80px;
      line-height:75px;
      color:#FF4500;
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
      color:#1E90FF;
      &:after {
        content: '';
        color: blue;
      }
    }
  }
</style>
