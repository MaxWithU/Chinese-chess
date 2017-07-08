export default function (matrix, start, end) {
  function range (start, end) {
    return Array(Math.abs(end - start) - 1).fill().map((v, i) => Math.min(++start, ++end))
  }
  if (Array.from(new Set([start.x, start.y, end.x, end.y])).length === 3) {
    return start.x === end.x ? range(start.y, end.y).some((i) => matrix.get(i)[start.x]) : range(start.x, end.x).some((i) => matrix.get(start.y)[i])
  } else {
    return false
  }
}
