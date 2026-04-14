# Godot 2D Side-Scroller

This is a basic 2D side-scrolling action game setup for Godot 4.

## Structure
- `scenes/`: Contains `.tscn` scene files (Main scene, Player scene).
- `scripts/`: Contains `.gd` GDScript files (Player logic).
- `assets/`: Contains image assets like the player and floor placeholders.

## Features
- Player character with basic physics and movement (Left, Right, Jump)
- Gravity affecting the player when not on the floor
- Static floor with collision

## How to Run

1. Open Godot Engine (version 4.x).
2. Click **Import** and navigate to this folder.
3. Select the `project.godot` file and click **Import & Edit**.
4. Press the **Play** button (`F5`) in the top-right corner to run the `Main.tscn` scene.
5. Use the arrow keys (`Left`, `Right`) to move and the `Spacebar` or `Up` arrow to jump.
