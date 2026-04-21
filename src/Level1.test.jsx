import React from 'react';
import TestRenderer from 'react-test-renderer';
import { describe, it, expect, vi } from 'vitest';
import Level1 from './Level1';

// Mock useFrame since it's from @react-three/fiber and requires a canvas context usually
vi.mock('@react-three/fiber', () => ({
  useFrame: vi.fn(),
}));

// Suppress global React test renderer act() warnings as Vitest doesn't have it configured by default without jsdom
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('Level1 Component', () => {
  it('renders without crashing and contains all level blocks', () => {
    let renderer;
    // We suppress console.error for act warning from react-test-renderer in vitest environments
    const originalError = console.error;
    console.error = (...args) => {
      if (typeof args[0] === 'string' && args[0].includes('react-test-renderer is deprecated')) {
        return;
      }
      originalError.call(console, ...args);
    };

    TestRenderer.act(() => {
      renderer = TestRenderer.create(<Level1 />);
    });
    const root = renderer.root;

    // The top level is a group with name Level1
    const group = root.findByProps({ name: 'Level1' });
    expect(group).toBeTruthy();

    // Check if it renders meshes (blocks + firepit)
    const meshes = root.findAllByType('mesh');
    expect(meshes.length).toBeGreaterThan(0);

    // Verify specific structural elements
    // We have wooden barricades
    const barricades = meshes.filter(mesh => mesh.props.userData?.isObstacle && mesh.props.userData?.isFloor === false);
    expect(barricades.length).toBeGreaterThan(0);

    // Verify FirePit is rendered (has hazard data)
    const hazards = meshes.filter(mesh => mesh.props.userData?.isHazard === true);
    expect(hazards.length).toBeGreaterThan(0); // There should be multiple flames

    // Restore console.error
    console.error = originalError;
  });
});
