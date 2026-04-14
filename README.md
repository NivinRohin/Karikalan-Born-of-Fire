# Godot 2D Side-Scroller

This is a basic 2D side-scrolling action game setup for Godot 4.

## Structure
- `scenes/`: Contains `.tscn` scene files (Main scene, Player scene, Enemy scene).
- `scripts/`: Contains `.gd` GDScript files (Player, Enemy, and Main logic).
- `assets/`: Contains lightweight image assets for sprites, hitboxes, and parallax backgrounds.

## Features
- **Player Controller:** Fast mobile action game feel with smooth acceleration, air control, jump buffering, and dash functionality (short horizontal burst).
- **Weapon System:** Press `Q` to swap between the fast, short-range Sword and the slower, long-range Spear. The hitbox scales dynamically.
- **Combat System:** Attack with the `Z` key to hit enemies, applying damage and knockback.
- **Health UI & Game Loop:** The player features a health system tracked via a minimal, bold `ProgressBar` UI. When the player's health depletes, the level restarts. The goal is to defeat all 3 enemies in the level and then reach the Gate at the end of the side-scrolling level to trigger the "LEVEL COMPLETE" screen.
- **Veeram Meter:** Striking enemies fills the Veeram Meter (orange bar), which decays over time. Filling the meter activates "Tiger Mode" for 5 seconds, boosting movement speed, dash speed, and applying a 2x damage and knockback multiplier.
- **Enemy AI System:** Highly reusable enemy class utilizing `@export` variables for stats (health, speed, detection range, damage). Enemies remain idle until detecting the player, then walk towards them and perform attacks when in range.
- **Level Design & Physics:** A side-scrolling level with lightweight Parallax Backgrounds, static one-way collision platforms, and gravity.

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
- **Switch Weapon:** `Q` key

## Exporting to Android APK

To export this game to Android, follow these steps:

### 1. Required SDK Setup
1. Download and install **Android Studio**.
2. Open Android Studio, go to the SDK Manager, and install the **Android SDK**, **Android SDK Command-line Tools**, **CMake**, and **NDK (Side by side)**.
3. Set up a Java Development Kit (**JDK 17** is recommended for Godot 4).
4. Generate a debug keystore using the command line: `keytool -keyalg RSA -genkeypair -alias androiddebugkey -keypass android -keystore debug.keystore -storepass android -dname "CN=Android Debug,O=Android,C=US" -validity 9999 -deststoretype pkcs12`.
5. Open Godot, go to **Editor > Editor Settings > Export > Android**, and link the paths to your Android SDK, JDK, and the generated Debug Keystore.

### 2. Export Settings
1. In Godot, go to **Project > Install Android Build Template**.
2. Go to **Project > Export**, click **Add...**, and select **Android**.
3. Under the **Architectures** section of the export menu, ensure `arm64-v8a` is checked (standard for modern Android devices).
4. Set a Unique Name (e.g., `com.yourname.sidescroller`) in the **Package** section.
5. Click **Export Project** and save your `.apk` file.

### 3. Performance Tips for Low-End Devices
- **Renderer:** Go to Project Settings and ensure the renderer is set to **Compatibility** (OpenGL 3) rather than Forward+ (Vulkan), as it performs much better on older mobile GPUs.
- **Assets:** Keep texture sizes small and avoid heavy uncompressed audio files. Use the provided Python scripts to generate simple pixel/color blocks.
- **Physics:** Keep physics shapes simple (use `RectangleShape2D` or `CircleShape2D` instead of complex polygons).
- **Lighting/Shadows:** Disable 2D lighting and shadows if they are not strictly necessary.
- **Processing:** Disable `_process` and `_physics_process` on enemies that are far off-screen.
