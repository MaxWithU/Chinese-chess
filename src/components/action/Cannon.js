export default function (mtx, item) {
  let a = mtx[item.y].map((it, i) => `${i}_${item.y}`)
  mtx.forEach((it, i) => {
    a.push(`${item.x}_${i}`)
  })
  let b = new Set(a)
  console.log(b)
}
