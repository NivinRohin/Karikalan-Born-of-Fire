extends Node2D

@onready var health_label = $UI/HealthLabel
@onready var complete_label = $UI/CompleteLabel
var level_completed = false

func _ready():
	complete_label.visible = false

func _process(_delta):
	# Update player health UI
	var players = get_tree().get_nodes_in_group("player")
	if players.size() > 0:
		var player = players[0]
		health_label.text = "Player Health: " + str(player.health)
	else:
		health_label.text = "Player Health: 0"

	# Check for level completion
	if not level_completed:
		var enemies = get_tree().get_nodes_in_group("enemy")
		if enemies.size() == 0:
			level_completed = true
			complete_label.visible = true
