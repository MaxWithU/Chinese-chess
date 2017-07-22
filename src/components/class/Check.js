import curryPick from '../utils/curryPick.js'
export default function () {
  return curryPick((...arg) => {
    return [...arg]
  })
}
