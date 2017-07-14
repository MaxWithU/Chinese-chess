export default function (matrix, start, end) {
  function range (start, end) {
    return Array(Math.abs(end - start) - 1).fill().map((v, i) => Math.min(++start, ++end))
  }
  if (start.x - end.x === 0 || start.y - end.y === 0) {
    return start.x === end.x
    ? !range(start.y, end.y).some((i) => matrix[i][start.x])
    : !range(start.x, end.x).some((i) => matrix[start.y][i])
  } else {
    return false
  }
}
