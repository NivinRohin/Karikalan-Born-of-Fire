# Godot 2D Side-Scroller

This is a basic 2D side-scrolling action game setup for Godot 4.

## Structure
- `scenes/`: Contains `.tscn` scene files (Main scene, Player scene).
- `scripts/`: Contains `.gd` GDScript files (Player logic).
- `assets/`: Contains image assets like the player and floor placeholders.

## Features
- Fast mobile action game feel with smooth acceleration and deceleration.
- Air control to allow adjustments while jumping/falling.
- Jump buffering for responsive platforming.
- Dash functionality (short horizontal burst).
- Gravity affecting the player when not on the floor.
- Static floor with collision.

## How to Run

1. Open Godot Engine (version 4.x).
2. Click **Import** and navigate to this folder.
3. Select the `project.godot` file and click **Import & Edit**.
4. Press the **Play** button (`F5`) in the top-right corner to run the `Main.tscn` scene.

## Controls
- **Move:** Arrow keys (`Left`, `Right`)
- **Jump:** `Spacebar` or `Up` arrow
- **Dash:** `Shift` key
