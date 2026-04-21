import { test } from 'node:test';
import assert from 'node:assert';
import { getSecureRandom } from './random.js';

test('getSecureRandom returns values within [0, 1)', () => {
  for (let i = 0; i < 2000; i++) {
    const val = getSecureRandom();
    assert.ok(val >= 0, `Value ${val} should be >= 0`);
    assert.ok(val < 1, `Value ${val} should be < 1`);
  }
});

test('getSecureRandom returns different values', () => {
  const values = new Set();
  for (let i = 0; i < 100; i++) {
    values.add(getSecureRandom());
  }
  // Highly unlikely to get fewer than 90 unique values with CSPRNG
  assert.ok(values.size > 90, `Expected many unique values, got ${values.size}`);
});
