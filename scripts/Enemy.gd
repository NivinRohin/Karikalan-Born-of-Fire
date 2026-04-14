extends CharacterBody2D
class_name Enemy

@export var max_health: int = 30
@export var speed: float = 150.0
@export var attack_range: float = 80.0
@export var attack_damage: int = 10
@export var attack_cooldown: float = 1.0
@export var attack_duration: float = 0.2

var health: int
var knockback: Vector2 = Vector2.ZERO
const KNOCKBACK_RECOVERY: float = 1500.0

var attack_cooldown_timer: float = 0.0
var attack_timer: float = 0.0
var is_dead: bool = false
var facing_direction: float = 1.0

var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")

@onready var sprite = $Sprite2D
@onready var attack_visual = $AttackVisual

func _ready():
	health = max_health

func _physics_process(delta):
	if is_dead:
		return

	# Update timers
	if attack_cooldown_timer > 0:
		attack_cooldown_timer -= delta
	if attack_timer > 0:
		attack_timer -= delta
		if attack_timer <= 0:
			attack_visual.visible = false

	if not is_on_floor():
		velocity.y += gravity * delta

	# Process knockback
	if knockback != Vector2.ZERO:
		knockback = knockback.move_toward(Vector2.ZERO, KNOCKBACK_RECOVERY * delta)
		velocity.x = knockback.x
		if knockback.y != 0:
			velocity.y = knockback.y
			knockback.y = 0
		move_and_slide()
		return # Stunned while taking heavy knockback

	# Stop moving horizontally by default
	velocity.x = 0

	# AI Logic: Find player
	var players = get_tree().get_nodes_in_group("player")
	if players.size() > 0:
		var target = players[0]
		var distance_to_target = global_position.distance_to(target.global_position)
		var direction_to_target = sign(target.global_position.x - global_position.x)

		# Update facing
		if direction_to_target != 0:
			facing_direction = direction_to_target
			attack_visual.position.x = 64 * facing_direction
			attack_visual.scale.x = facing_direction

		if distance_to_target <= attack_range:
			# Close enough to attack
			if attack_cooldown_timer <= 0:
				perform_attack(target)
		else:
			# Walk towards player
			velocity.x = direction_to_target * speed

	move_and_slide()

func perform_attack(target):
	attack_cooldown_timer = attack_cooldown
	attack_timer = attack_duration
	attack_visual.visible = true

	# Apply damage and knockback to player
	var kb_force = Vector2(facing_direction * 800.0, -300.0)
	if target.has_method("take_damage"):
		target.take_damage(attack_damage, kb_force)

func take_damage(amount, knockback_vector):
	if is_dead:
		return

	health -= amount
	knockback = knockback_vector

	if health <= 0:
		die()

func die():
	is_dead = true
	attack_visual.visible = false
	# Disable collision
	$CollisionShape2D.set_deferred("disabled", true)

	# Simple death animation using Tween
	var tween = create_tween()
	tween.tween_property(sprite, "modulate:a", 0.0, 0.5)
	tween.parallel().tween_property(sprite, "scale", Vector2.ZERO, 0.5)
	tween.tween_callback(queue_free)
