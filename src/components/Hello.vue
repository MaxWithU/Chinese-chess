<template>
<div>
 <div v-for = "(item, index) in mtx" >
  <span v-for = "(it, i) in item[1]" @click = 'deleteItem(index, i)'>{{it}}</span>  
</div>
 </div>
</template>
<script>
  export default {
    data () {
      return {
        matrix: new Map(
          Array(9).fill(1).map((item, i) => {
            return [i, Array(9).fill(1)]
          }
        )),
        mtx: [],
        stepCache: [],
        player: 'r',
        end: {
          show: false,
          winner: ''
        },
        start: {
          show: true
        }
      }
    },
    computed: {
    },
    mounted () {
      this.mtx = [...this.matrix]
    },
    methods: {
      init () {
      },
      renderItem () {
        this.mtx = [...this.matrix]
      },
      deleteItem (index, i) {
        console.log(this.matrix.get(index))
        this.matrix.get(index)[i] = 'x'
        this.renderItem()
      },
      setMatrix () {
      },
      setOrigin (val) {
      }
    }
  }
</script>
