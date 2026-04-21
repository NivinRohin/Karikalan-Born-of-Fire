const BUFFER_SIZE = 1024;
const randomBuffer = new Uint32Array(BUFFER_SIZE);
let currentIndex = BUFFER_SIZE;

function refillBuffer() {
  globalThis.crypto.getRandomValues(randomBuffer);
  currentIndex = 0;
}

/**
 * Returns a cryptographically secure random float between 0 (inclusive) and 1 (exclusive).
 * Uses a pre-filled buffer to maintain performance in high-frequency loops.
 * @returns {number}
 */
export function getSecureRandom() {
  if (currentIndex >= BUFFER_SIZE) {
    refillBuffer();
  }
  const val = randomBuffer[currentIndex++];
  // 4294967296 is 2^32, which ensures the result is in [0, 1)
  return val / 4294967296;
}
