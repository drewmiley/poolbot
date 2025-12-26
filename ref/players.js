const player = (initial, preferenceBeforeInit, wouldPreferToRef) => {
	return {
		initial,
		preferenceBefore: preferenceBeforeInit === null ? Math.random() < 0.5 : preferenceBeforeInit,
		wouldPreferToRef
	}
}

const players = () => [
	player('CC', null),
	player('DD', false),
	player('DM', false, true),
	player('DW', false),
	player('JC', true),
	player('ND', true, true),
	player('PC', true),
	player('After', false),
	player('Before', true),
	player('Either', null)
]

console.log(players())