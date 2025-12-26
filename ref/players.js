const player = (initial, preferenceBeforeInit, wouldPreferToRef) => {
	return {
		initial,
		preferenceBefore: preferenceBeforeInit === null ? Math.random() < 0.5 : preferenceBeforeInit,
		wouldPreferToRef
	}
}

const players = () => [
	player('DD', false),
	player('DM', false, true),
	player('DW', false),
	player('JC', true),
	player('LW', false),
	player('ND', true, true),
	player('PC', true),
	player('PW', null),
	player('RH', false),
	player('SF', false)
]

console.log(players())