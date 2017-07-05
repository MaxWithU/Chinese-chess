<script>
export default {
  data () {
    return {
      matrix: {},
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
  methods: {
    init () {
      console.log('init')
      this.setMatrix()
      this.start.show = false
    },
    setMatrix () {
      let matrix = {}
      for (let x = 0; x < 9; x++) {
        for (var y = 0; y < 10; y++) {
          let item = this.setOrigin(`${x}_${y}`)
          item.active = false
          item.area = {
            x: x,
            y: y
          }
          matrix[`${x}_${y}`] = item
        }
      }
      this.matrix = matrix
    },
    setOrigin (val) {
      switch (val) {
        case '0_0':
        case '8_0': return {name: '车', type: 'r'}
        case '1_0':
        case '7_0': return {name: '马', type: 'r'}
        case '2_0':
        case '6_0': return {name: '相', type: 'r'}
        case '3_0':
        case '5_0': return {name: '士', type: 'r'}
        case '4_0': return {name: '帅', type: 'r'}
        case '7_2':
        case '1_2': return {name: '炮', type: 'r'}
        case '0_3':
        case '2_3':
        case '4_3':
        case '6_3':
        case '8_3': return {name: '兵', type: 'r'}
        case '0_9':
        case '8_9': return {name: '车', type: 'b'}
        case '1_9':
        case '7_9': return {name: '马', type: 'b'}
        case '2_9':
        case '6_9': return {name: '象', type: 'b'}
        case '4_9': return {name: '将', type: 'b'}
        case '3_9':
        case '5_9': return {name: '士', type: 'b'}
        case '1_7':
        case '7_7': return {name: '炮', type: 'b'}
        case '0_6':
        case '2_6':
        case '4_6':
        case '6_6':
        case '8_6': return {name: '卒', type: 'b'}
        default: return {name: '', type: ''}
      }
    }
  }
}
</script>
