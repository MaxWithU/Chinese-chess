export default function (mtx, item) {
  let a = new Set([
    '3_0', '4_0', '5_0',
    '3_1', '4_1', '5_1',
    '3_2', '4_2', '5_3',
    '3_7', '4_7', '5_7',
    '3_8', '4_8', '5_8',
    '3_9', '4_9', '5_9'
  ])
  let b = new Set()
  function Range (str) {
    a.has(str) && b.add(str)
  }
  Range(`${item.x}_${item.y + 1}`)
  Range(`${item.x}_${item.y - 1}`)
  Range(`${item.x + 1}_${item.y}`)
  Range(`${item.x - 1}_${item.y}`)
  console.log(b)
  return b
}
