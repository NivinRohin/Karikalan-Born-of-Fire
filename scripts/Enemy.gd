extends CharacterBody2D

var health = 30
var knockback = Vector2.ZERO
const KNOCKBACK_RECOVERY = 1500.0

var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")

func _physics_process(delta):
	if not is_on_floor():
		velocity.y += gravity * delta

	# Apply and recover from knockback
	if knockback != Vector2.ZERO:
		knockback = knockback.move_toward(Vector2.ZERO, KNOCKBACK_RECOVERY * delta)

	# Only move from knockback since it's a simple enemy
	velocity.x = knockback.x
	# Keep vertical velocity for gravity, but add vertical knockback if present
	if knockback.y != 0:
		velocity.y = knockback.y
		# Once applied to velocity.y, clear the vertical component of the knockback
		# so gravity takes over smoothly
		knockback.y = 0

	move_and_slide()

func take_damage(amount, knockback_vector):
	health -= amount
	knockback = knockback_vector

	# Simple flash or reaction could go here
	if health <= 0:
		queue_free()
