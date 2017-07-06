<template>
 <div>1231</div>
</template>
<script>
  export default {
    data () {
      return {
        matrix: new Map(
          Array(9).fill().map((item, i) => {
            return [i, Array(9).fill()]
          }
        )),
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
    mounted () {
      console.log(this.matrix)
    },
    methods: {
      init () {
        this.setMatrix()
        this.start.show = false
      },
      setMatrix () {
      },
      setOrigin (val) {
      }
    }
  }
</script>
