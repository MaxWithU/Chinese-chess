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
  html{
    height:1200px;
    background:#f1f1f1;
  }
  .board{
    font-family:KaiTi;
    width: 900px;
    position:relative;
    box-shadow:
    0px 0px 0px 40px #FDF5E6 inset,
    0px 0px 0px 45px #fff inset,
    0px 0px 0px 48px #FDF5E6 inset,
    0px 0px 0px 50px #fff inset,
    0px 0px 0px 50px #FDF5E6 inset,
    0px 0px 0px 20px #FDF5E6,
    0px 3px 3px 20px #C59F75,
    0px 5px 0px 20px #DEB887,
    0px 5px 10px 22px #cbcbcb
    ;
    margin:0 auto;
    border-radius:5px;
      overflow: hidden;
      background: #FDF5E6;
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
  }
  .board:after{
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
      background: #FDF5E6;
      z-index:0;
      height:795px;
      transform: rotate(-90deg)
    }
  .row{
    position:relative;
    z-index:1;
    width:900px;
    height:100px;
    font-size:0;
  }
  .col{
      transition:all .2s;
      width:100px;
      font-size:40px;
      font-family:KaiTi;
      text-shadow:0px -1px 0px #666;
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
      0 -2px 0px 6px #FFDAB9 inset,
      0 -3px 0 10px #FDF1d1 inset,
      0 -4px 0px 10px #FFDAB9 inset,
      0px 1px 5px #666,
      0px 3px 6px #cbcbcb,
      0px 6px 5px #f1f1f1;
    color:#FF4500;
    
  }
  .col.red.active{
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
      0 -2px 1px 6px #FFDAB9 inset,
      0 -3px 0 10px #FDF1d1 inset,
      0 -4px 1px 10px #FFDAB9 inset,
      0px 1px 5px #666,
      0px 3px 6px #cbcbcb,
      0px 6px 5px #f1f1f1;
    color:#1E90FF;
  }
  .col.blue.active{
    box-shadow: 
      0 -3px 1px #C59F75 inset,
      0px -5px 5px #DEB887 inset,
      0 -3px 0 6px #FDF5E6 inset,
      0 -3px 0 10px #FDF1d1 inset,
      0px 10px 5px #666,
      0px 10px 10px #cbcbcb;
  }
  .col.blue:after {
    content: '';
    color: blue;
  }
</style>
