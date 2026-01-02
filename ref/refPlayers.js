// const player = (initial, preferenceBeforeInit, wouldPreferToRef) => {
// 	return {
// 		initial,
// 		preferenceBefore: preferenceBeforeInit === null ? Math.random() < 0.5 : preferenceBeforeInit,
// 		wouldPreferToRef
// 	}
// }

// const players = () => [
// 	player('CC', null),
// 	player('DD', false),
// 	player('DM', false, true),
// 	player('DW', false),
// 	player('JC', true),
// 	player('ND', true, true),
// 	player('PC', true),
// 	player('After', false),
// 	player('Before', true),
// 	player('Either', null)
// ]

const getPreferenceSuffix = preferenceBefore => {
	if (preferenceBefore === null) {
		return "(Either)";
	} else if (preferenceBefore === false) {
		return "(A)";
	} else if (preferenceBefore === true) {
		return "(B)";
	}
}

const getRefHTML = player => {
	const preferenceSuffix = getPreferenceSuffix(player.preferenceBefore);
	return `<option value="${player.initial}">` +
		`${player.initial} ${preferenceSuffix}` +
	`</option>`;
}

const players = fullPlayers.refPlayers;

['one', 'two', 'three', 'four', 'five', 'six'].forEach(index => {
	players.forEach(player => {
		// TODO: Add REF HTML
	})
})

console.log(players())