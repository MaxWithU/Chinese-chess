export default function range (start, end) {
  return Array(Math.abs(end - start) + 1).fill().map((v, i) => Math.min(start++, ++end))
}
