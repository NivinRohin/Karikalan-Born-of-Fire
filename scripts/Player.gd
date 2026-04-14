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

# Attack constants and state
const ATTACK_DURATION = 0.2
const ATTACK_COOLDOWN = 0.4
var attack_timer = 0.0
var attack_cooldown_timer = 0.0
var facing_direction = 1.0 # 1.0 for right, -1.0 for left

# Get the gravity from the project settings to be synced with RigidBody nodes.
var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")

@onready var flip_pivot = $FlipPivot
@onready var attack_area = $FlipPivot/AttackArea
@onready var attack_visual = $FlipPivot/AttackVisual

func _physics_process(delta):
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

	# Handle jump input and buffering
	if Input.is_action_just_pressed("ui_accept") or Input.is_action_just_pressed("ui_up"):
		jump_buffer_timer = JUMP_BUFFER_TIME

	# Execute jump if buffered and on floor
	if jump_buffer_timer > 0 and on_floor:
		velocity.y = JUMP_VELOCITY
		jump_buffer_timer = 0.0 # Consume jump buffer

	# Get the input direction
	var direction = Input.get_axis("ui_left", "ui_right")

	# Update facing direction for attacks
	if direction != 0:
		facing_direction = direction
		# Flip the pivot so attack area changes sides
		flip_pivot.scale.x = facing_direction

	# Handle Dash input (Fixing the continuous hold edge case)
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
		attack_timer = ATTACK_DURATION
		attack_cooldown_timer = ATTACK_COOLDOWN
		attack_area.monitoring = true
		attack_visual.visible = true

	# Movement logic
	if dash_timer > 0:
		# Overwrite velocity during dash, ignore gravity temporarily
		velocity.x = dash_direction * DASH_SPEED
		velocity.y = 0
	else:
		# Reset dash direction when not dashing
		dash_direction = 0.0

		# Smooth acceleration and deceleration depending on air state
		var current_acceleration = ACCELERATION if on_floor else AIR_ACCELERATION
		var current_friction = FRICTION if on_floor else AIR_FRICTION

		if direction != 0:
			velocity.x = move_toward(velocity.x, direction * SPEED, current_acceleration * delta)
		else:
			velocity.x = move_toward(velocity.x, 0, current_friction * delta)

	move_and_slide()

func _on_attack_area_body_entered(body):
	# If body is an enemy, hit them
	if body.has_method("take_damage") and body != self:
		var knockback_force = Vector2(facing_direction * 1000.0, -200.0)
		body.take_damage(10, knockback_force)
