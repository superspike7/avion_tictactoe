export default function Player(marker) {
  let score = 0;
  return {
    score: () => score,
    marker: (() => marker)(),
    addScore: () => score++,
  };
}
