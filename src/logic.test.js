import test from 'node:test';
import assert from 'node:assert';
import { CAMERA_CONFIG, LIGHTS_CONFIG, POST_PROCESSING_CONFIG } from './appConfig.js';
import { getFirePitFlames, getLevelData } from './levelUtils.js';

test('App Configuration', async (t) => {
  await t.test('CAMERA_CONFIG should have correct values', () => {
    assert.deepStrictEqual(CAMERA_CONFIG.position, [2, 0, 10]);
    assert.strictEqual(CAMERA_CONFIG.zoom, 100);
  });

  await t.test('LIGHTS_CONFIG should have ambient and point light settings', () => {
    assert.strictEqual(LIGHTS_CONFIG.ambient.intensity, 0.2);
    assert.strictEqual(LIGHTS_CONFIG.point.color, "#ff6600");
  });

  await t.test('POST_PROCESSING_CONFIG should have pixelation granularity', () => {
    assert.strictEqual(POST_PROCESSING_CONFIG.pixelation.granularity, 5);
  });
});

test('Level Utilities', async (t) => {
  await t.test('getFirePitFlames should generate correct number of flames', () => {
    // From 13 to 17 with 0.5 step: 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17 -> 9 flames
    const flames = getFirePitFlames(13, 17);
    assert.strictEqual(flames.length, 9);
  });

  await t.test('getFirePitFlames should assign colors correctly based on x position', () => {
    const flames = getFirePitFlames(13, 14);
    // 13 (red), 13.5 (orange), 14 (red)
    assert.strictEqual(flames[0].color, "#ff0000");
    assert.strictEqual(flames[1].color, "#ff8800");
    assert.strictEqual(flames[2].color, "#ff0000");
  });

  await t.test('getLevelData should return correct number of segments', () => {
    const levelData = getLevelData();
    // 1. start (0-4): 5
    // 2. barricade: floor(1) + mid(1) + top(1) = 3
    // 3. segment1 (6-12): 7
    // 4&5. firepit: 1
    // 6. raised (18-20): 3
    // 7. corridor (21-28): 8
    // 8. exit: floor(1) + door(1) = 2
    // Total: 5 + 3 + 7 + 1 + 3 + 8 + 2 = 29
    assert.strictEqual(levelData.length, 29);
  });

  await t.test('getLevelData should have an exit door at the end', () => {
    const levelData = getLevelData();
    const exitDoor = levelData.find(b => b.id === 'exit');
    assert.ok(exitDoor);
    assert.strictEqual(exitDoor.color, "#222222");
    assert.deepStrictEqual(exitDoor.args, [1, 2, 1]);
  });
});
