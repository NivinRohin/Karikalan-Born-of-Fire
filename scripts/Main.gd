extends Node2D

@onready var health_label = $UI/HealthLabel
@onready var health_bar = $UI/HealthBar
@onready var complete_label = $UI/CompleteLabel
@onready var veeram_meter = $UI/VeeramMeter
@onready var tiger_label = $UI/TigerLabel
var level_completed = false

func _ready():
	complete_label.visible = false
	tiger_label.visible = false

func _process(_delta):
	# Update player health and Veeram UI
	var players = get_tree().get_nodes_in_group("player")
	if players.size() > 0:
		var player = players[0]
		health_label.text = "Player Health: " + str(player.health)
		health_bar.value = player.health
		veeram_meter.value = player.veeram_meter
		tiger_label.visible = player.is_tiger_mode
	else:
		health_label.text = "Player Health: 0"
		health_bar.value = 0
		veeram_meter.value = 0
		tiger_label.visible = false

func _on_gate_body_entered(body):
	if body.is_in_group("player") and not level_completed:
		var enemies = get_tree().get_nodes_in_group("enemy")
		if enemies.size() == 0:
			level_completed = true
			complete_label.visible = true
