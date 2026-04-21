const EPSILON = 0.0001;

export const getFirePitFlames = (startX, endX) => {
  const flames = [];
  for (let i = startX; i <= endX + EPSILON; i += 0.5) {
    const isRed = Math.abs(i % 1) < EPSILON;
    flames.push({
      id: `flame-${i}`,
      position: [i, -2.5, 0],
      color: isRed ? "#ff0000" : "#ff8800"
    });
  }
  return flames;
};

export const getLevelData = () => {
  const blocks = [];
  const baseY = -2;

  // 1. Starting cell (x: 0 to 4)
  for (let i = 0; i <= 4; i++) {
    blocks.push({ id: `start-${i}`, position: [i, baseY, 0], type: 'block' });
  }

  // 2. Wooden barricade at x: 5
  blocks.push({ id: "barricade-floor", position: [5, baseY, 0], type: 'block' });
  blocks.push({
    id: "barricade",
    position: [5, baseY + 1, 0],
    color: "#8b5a2b",
    isFloor: false,
    isObstacle: true,
    type: 'block'
  });
  blocks.push({
    id: "barricade-top",
    position: [5, baseY + 2, 0],
    color: "#8b5a2b",
    isFloor: false,
    isObstacle: true,
    type: 'block'
  });

  // 3. Long stone floor segment (x: 6 to 12)
  for (let i = 6; i <= 12; i++) {
    blocks.push({ id: `segment1-${i}`, position: [i, baseY, 0], type: 'block' });
  }

  // 4 & 5. Fire pit gap (x: 13 to 17)
  blocks.push({
    id: "firepit",
    type: "firepit",
    startX: 13,
    endX: 17,
    y: baseY - 0.5,
    z: 0
  });

  // 6. Raised stone platform (x: 18 to 20)
  const raisedY = baseY + 1;
  for (let i = 18; i <= 20; i++) {
    blocks.push({ id: `raised-${i}`, position: [i, raisedY, 0], type: 'block' });
  }

  // 7. Final wide corridor (x: 21 to 28)
  for (let i = 21; i <= 28; i++) {
    blocks.push({ id: `corridor-${i}`, position: [i, raisedY, 0], type: 'block' });
  }

  // 8. Exit door at x: 29
  blocks.push({ id: "exit-floor", position: [29, raisedY, 0], type: 'block' });
  blocks.push({
    id: "exit",
    position: [29, raisedY + 1.5, 0],
    color: "#222222",
    args: [1, 2, 1],
    isFloor: false,
    isObstacle: true,
    type: 'block'
  });

  return blocks;
};
