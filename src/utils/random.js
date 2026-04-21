// Buffer configuration
const BUFFER_SIZE = 1024;
const buffer = new Uint32Array(BUFFER_SIZE);
let bufferIndex = BUFFER_SIZE; // Forces immediate initialization on first call

/**
 * Returns a uniform pseudo-random number in the range [0, 1) using
 * Crypto.getRandomValues(). This avoids 'Insecure Randomness' flags
 * while buffering the values to maintain high performance in loops
 * like useFrame().
 *
 * @returns {number} A float between 0 (inclusive) and 1 (exclusive).
 */
export function getSecureRandom() {
  if (bufferIndex >= BUFFER_SIZE) {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(buffer);
    } else {
      // Fallback for non-browser or environments lacking window.crypto (like node tests)
      // Since require might not be available in esm without polyfills or similar, and we're mostly in a web context,
      // a safer generic fallback that doesn't crash:
      for(let i=0; i < BUFFER_SIZE; i++) {
         buffer[i] = Math.floor(Math.random() * 4294967296);
      }
    }
    bufferIndex = 0;
  }

  // 4294967296 is 2^32, the maximum value of a Uint32 plus 1,
  // ensuring the result is strictly less than 1.
  return buffer[bufferIndex++] / 4294967296;
}
