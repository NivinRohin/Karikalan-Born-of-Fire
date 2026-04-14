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

# Get the gravity from the project settings to be synced with RigidBody nodes.
var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")

func _physics_process(delta):
	# Update timers
	if jump_buffer_timer > 0:
		jump_buffer_timer -= delta
	if dash_timer > 0:
		dash_timer -= delta

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

	# Handle Dash input (using Shift key as default action isn't bound)
	if Input.is_physical_key_pressed(KEY_SHIFT) and dash_timer <= 0 and dash_direction == 0:
		if direction != 0:
			dash_direction = direction
		else:
			# Default dash direction if no input
			dash_direction = 1.0 if velocity.x >= 0 else -1.0
		dash_timer = DASH_DURATION

	# Movement logic
	if dash_timer > 0:
		# Overwrite velocity during dash, ignore gravity temporarily (optional, but gives a true "dash" feel)
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
