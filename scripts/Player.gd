extends CharacterBody2D

const SPEED = 400.0
const JUMP_VELOCITY = -500.0

# Movement constants for smooth acceleration and friction
const ACCELERATION = 2000.0
const FRICTION = 3000.0
const AIR_ACCELERATION = 1000.0
const AIR_FRICTION = 500.0

# Dash constants
const DASH_SPEED = 1200.0
const DASH_DURATION = 0.15

# Jump buffer constants
const JUMP_BUFFER_TIME = 0.1

# State variables
var dash_timer = 0.0
var dash_direction = 0.0
var jump_buffer_timer = 0.0
var dash_key_was_pressed = false

# Combat and Health
var health = 100
var knockback = Vector2.ZERO
const KNOCKBACK_RECOVERY = 1500.0

# Veeram Meter / Tiger Mode
var veeram_meter: float = 0.0
var is_tiger_mode: bool = false
var tiger_mode_timer: float = 0.0
const MAX_VEERAM: float = 100.0
const VEERAM_DECAY_RATE: float = 5.0
const TIGER_MODE_DURATION: float = 5.0

# Weapon System
enum WeaponType { SWORD, SPEAR }
var current_weapon = WeaponType.SWORD

var weapons = {
	WeaponType.SWORD: {
		"damage": 10,
		"duration": 0.2,
		"cooldown": 0.4,
		"range_scale": 1.0,
		"color": Color(1, 1, 0, 1) # Yellow
	},
	WeaponType.SPEAR: {
		"damage": 15,
		"duration": 0.4,
		"cooldown": 0.8,
		"range_scale": 2.0,
		"color": Color(0.5, 0.5, 1.0, 1) # Light blue
	}
}

var attack_timer = 0.0
var attack_cooldown_timer = 0.0
var facing_direction = 1.0 # 1.0 for right, -1.0 for left
var q_key_was_pressed = false

# Get the gravity from the project settings to be synced with RigidBody nodes.
var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")

@onready var flip_pivot = $FlipPivot
@onready var attack_area = $FlipPivot/AttackArea
@onready var attack_visual = $FlipPivot/AttackVisual

func _ready():
	add_to_group("player")

func _physics_process(delta):
	# Update Veeram / Tiger Mode
	if is_tiger_mode:
		tiger_mode_timer -= delta
		if tiger_mode_timer <= 0:
			is_tiger_mode = false
			veeram_meter = 0.0 # Reset meter after mode ends
	else:
		# Decay Veeram Meter
		if veeram_meter > 0:
			veeram_meter = max(0.0, veeram_meter - VEERAM_DECAY_RATE * delta)

	# Update timers
	if jump_buffer_timer > 0:
		jump_buffer_timer -= delta
	if dash_timer > 0:
		dash_timer -= delta
	if attack_timer > 0:
		attack_timer -= delta
		if attack_timer <= 0:
			# End attack
			attack_area.monitoring = false
			attack_visual.visible = false
	if attack_cooldown_timer > 0:
		attack_cooldown_timer -= delta

	var on_floor = is_on_floor()

	# Add the gravity.
	if not on_floor:
		velocity.y += gravity * delta

	# Process Knockback recovery
	if knockback != Vector2.ZERO:
		knockback = knockback.move_toward(Vector2.ZERO, KNOCKBACK_RECOVERY * delta)

	# Only allow input if not heavily knocked back
	if knockback.length() > 500:
		velocity.x = knockback.x
		if knockback.y != 0:
			velocity.y = knockback.y
			knockback.y = 0
		move_and_slide()
		return

	# Handle jump input and buffering
	if Input.is_action_just_pressed("ui_accept") or Input.is_action_just_pressed("ui_up"):
		jump_buffer_timer = JUMP_BUFFER_TIME

	# Execute jump if buffered and on floor
	if jump_buffer_timer > 0 and on_floor:
		velocity.y = JUMP_VELOCITY
		jump_buffer_timer = 0.0 # Consume jump buffer

	# Handle Weapon Switching (Q key)
	var q_key_is_pressed = Input.is_physical_key_pressed(KEY_Q)
	if q_key_is_pressed and not q_key_was_pressed:
		if current_weapon == WeaponType.SWORD:
			current_weapon = WeaponType.SPEAR
		else:
			current_weapon = WeaponType.SWORD
	q_key_was_pressed = q_key_is_pressed

	# Get the input direction
	var direction = Input.get_axis("ui_left", "ui_right")

	# Update facing direction for attacks
	if direction != 0:
		facing_direction = direction

	# Scale the hitbox and visual based on facing direction and active weapon range
	flip_pivot.scale.x = facing_direction * weapons[current_weapon]["range_scale"]

	# Handle Dash input
	var dash_key_is_pressed = Input.is_physical_key_pressed(KEY_SHIFT)
	if dash_key_is_pressed and not dash_key_was_pressed and dash_timer <= 0 and dash_direction == 0:
		if direction != 0:
			dash_direction = direction
		else:
			dash_direction = facing_direction
		dash_timer = DASH_DURATION
	dash_key_was_pressed = dash_key_is_pressed

	# Handle Attack input (Z key)
	if Input.is_physical_key_pressed(KEY_Z) and attack_cooldown_timer <= 0:
		var w_stats = weapons[current_weapon]
		attack_timer = w_stats["duration"]
		attack_cooldown_timer = w_stats["cooldown"]
		attack_area.monitoring = true
		attack_visual.visible = true
		attack_visual.modulate = w_stats["color"]

	# Movement logic
	var current_speed = SPEED * 1.5 if is_tiger_mode else SPEED
	var current_dash_speed = DASH_SPEED * 1.5 if is_tiger_mode else DASH_SPEED

	if dash_timer > 0:
		# Overwrite velocity during dash, ignore gravity temporarily
		velocity.x = dash_direction * current_dash_speed
		velocity.y = 0
	else:
		# Reset dash direction when not dashing
		dash_direction = 0.0

		# Smooth acceleration and deceleration depending on air state
		var current_acceleration = ACCELERATION if on_floor else AIR_ACCELERATION
		var current_friction = FRICTION if on_floor else AIR_FRICTION

		if direction != 0:
			velocity.x = move_toward(velocity.x, direction * current_speed, current_acceleration * delta)
		else:
			velocity.x = move_toward(velocity.x, 0, current_friction * delta)

		# Apply light knockback smoothly if present
		if knockback != Vector2.ZERO:
			velocity.x += knockback.x
			if knockback.y != 0:
				velocity.y += knockback.y
				knockback.y = 0

	move_and_slide()

func take_damage(amount, kb_vector):
	health -= amount
	knockback = kb_vector
	if health <= 0:
		get_tree().reload_current_scene()

func _on_attack_area_body_entered(body):
	# If body is an enemy, hit them
	if body.has_method("take_damage") and body != self:
		var base_dmg = weapons[current_weapon]["damage"]
		var dmg = base_dmg * 2 if is_tiger_mode else base_dmg
		var knockback_force = Vector2(facing_direction * (1500.0 if is_tiger_mode else 1000.0), -200.0)
		body.take_damage(dmg, knockback_force)

		# Increase Veeram Meter if not already in Tiger Mode
		if not is_tiger_mode:
			veeram_meter = min(MAX_VEERAM, veeram_meter + 25.0)
			if veeram_meter >= MAX_VEERAM:
				is_tiger_mode = true
				tiger_mode_timer = TIGER_MODE_DURATION
