import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Level1 from '../Level1';
import { useFrame } from '@react-three/fiber';

vi.mock('@react-three/fiber', () => ({
  useFrame: vi.fn(),
}));

describe('Level1 Component', () => {
  it('renders the main group', () => {
    const { container } = render(<Level1 />);
    const group = container.querySelector('group[name="Level1"]');
    expect(group).not.toBeNull();
  });

  it('renders all blocks and obstacles', () => {
    const { container } = render(<Level1 />);
    // Check for box geometries which represent the blocks
    // 5 start + 3 barricade + 7 segment1 + 3 raised + 8 corridor + 2 exit = 28 blocks
    const boxes = container.querySelectorAll('boxgeometry');
    expect(boxes.length).toBe(28);
  });

  it('renders the fire pit hazard', () => {
    const { container } = render(<Level1 />);
    // Check for cone geometries which represent the fire pit
    // startX=13 to endX=17 step 0.5 -> 9 cones
    const cones = container.querySelectorAll('conegeometry');
    expect(cones.length).toBe(9);
  });

  it('renders the correct materials', () => {
    const { container } = render(<Level1 />);
    // Blocks use meshStandardMaterial
    const standardMaterials = container.querySelectorAll('meshstandardmaterial');
    expect(standardMaterials.length).toBe(28);

    // Fire pit uses meshBasicMaterial
    const basicMaterials = container.querySelectorAll('meshbasicmaterial');
    expect(basicMaterials.length).toBe(9);
  });

  it('checks for mocked useFrame invocation on FirePit rendering', () => {
    // Render
    render(<Level1 />);

    // Check if useFrame from R3F was called (FirePit uses it)
    expect(useFrame).toHaveBeenCalled();
  });
});
