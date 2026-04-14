# Godot 2D Side-Scroller

This is a basic 2D side-scrolling action game setup for Godot 4.

## Structure
- `scenes/`: Contains `.tscn` scene files (Main scene, Player scene, Enemy scene).
- `scripts/`: Contains `.gd` GDScript files (Player and Enemy logic).
- `assets/`: Contains image assets for sprites and hitboxes.

## Features
- **Player Controller:** Fast mobile action game feel with smooth acceleration, air control, jump buffering, and dash functionality (short horizontal burst).
- **Combat System:** Attack with the `Z` key to hit enemies, applying damage and knockback. The player can also take damage and die (reloading the scene).
- **Enemy AI System:** Highly reusable enemy class utilizing `@export` variables for stats (health, speed, damage). Enemies actively track the player, walk towards them, and perform attacks when in range.
- **Death Animations:** Enemies feature a simple fade and scale Tween animation upon dying.
- **Physics:** Gravity affects characters when not on the floor, and a static floor provides collision.

## How to Run

1. Open Godot Engine (version 4.x).
2. Click **Import** and navigate to this folder.
3. Select the `project.godot` file and click **Import & Edit**.
4. Press the **Play** button (`F5`) in the top-right corner to run the `Main.tscn` scene.

## Controls
- **Move:** Arrow keys (`Left`, `Right`)
- **Jump:** `Spacebar` or `Up` arrow
- **Dash:** `Shift` key
- **Attack:** `Z` key
