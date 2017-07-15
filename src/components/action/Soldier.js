export default function (mtx, item) {
  let a = new Set()
  console.log('Soldier')
  switch (item.camp) {
    case 'A': if (item.y < 5) {
      a.add(`${item.x}_${item.y + 1}`)
    } else if (item.y === 5) {
      a.add(`${item.x}_${item.y + 1}`)
      a.add(`${item.x + 1}_${item.y}`)
      a.add(`${item.x - 1}_${item.y}`)
    } else {
      a.add(`${item.x}_${item.y - 1}`)
      a.add(`${item.x}_${item.y + 1}`)
      a.add(`${item.x + 1}_${item.y}`)
      a.add(`${item.x - 1}_${item.y}`)
    }
      console.log(a)
      return a
    case 'B': if (item.y > 4) {
      a.add(`${item.x}_${item.y - 1}`)
    } else if (item.y === 4) {
      a.add(`${item.x}_${item.y - 1}`)
      a.add(`${item.x + 1}_${item.y}`)
      a.add(`${item.x - 1}_${item.y}`)
    } else {
      a.add(`${item.x}_${item.y - 1}`)
      a.add(`${item.x}_${item.y + 1}`)
      a.add(`${item.x + 1}_${item.y}`)
      a.add(`${item.x - 1}_${item.y}`)
    }
      console.log(a)
      return a
  }
}
