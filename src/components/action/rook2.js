export default function (mtx, item) {
  mtx[item.y].reduce((x, y, i) => {
    if (i < 3) {
      if (y) {
        return [i]
      } else {
        return x
      }
    } else {
      if (x.length > 1) {
        return x
      } else {
        if (y) {
          return [x[0], i]
        } else {
          return x
        }
      }
    }
  }, null)
}
