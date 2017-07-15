export default function (mtx, item) {
  let a = new Set([
    `${item.x + 1}_${item.y}`,
    `${item.x - 1}_${item.y}`,
    `${item.x}_${item.y + 1}`,
    `${item.x}_${item.y - 1}`
  ])
  console.log(a)
  switch (item.camp) {
    case 'A': return a
    case 'B': return a
  }
}
