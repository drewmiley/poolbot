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

const getPreferenceSuffix = preferenceBeforeInit => {
	if (preferenceBeforeInit === null) {
		return "(Either)";
	} else if (preferenceBeforeInit === false) {
		return "(A)";
	} else if (preferenceBeforeInit === true) {
		return "(B)";
	}
}

const getEmptyRefHTML = () => {
	return "<option value=\"\">--</option>";
}

const getRefHTML = player => {
	const preferenceSuffix = getPreferenceSuffix(player.preferenceBeforeInit);
	return `<option value="${player.initial}">` +
		`${player.initial} ${preferenceSuffix}` +
	`</option>`;
}

const getReservesRefHTML = () => {
	return "<option value=\"After\">After (A)</option>" +
		"<option value=\"Before\">Before (B)</option>" +
		"<option value=\"Either\">Either (E)</option>"
}

const players = fullPlayers.refPlayers;

['one', 'two', 'three', 'four', 'five', 'six'].forEach(index => {
	// TODO: CAN I TIDY THIS UP?
	const container = document.getElementById("selectors");
	let newRefOption = document.createElement("div");
	let innerHTML = "";
	innerHTML += `${index.toUpperCase()} `;
	innerHTML += `<select name="${index}" id="${index}">`;
	innerHTML += getEmptyRefHTML();
	players().forEach(player => {
		innerHTML += getRefHTML(player);
	})
	// TODO: Remove reserves
	// innerHTML += getReservesRefHTML();
	innerHTML += "</select>";
	newRefOption.innerHTML = innerHTML;
	container.append(newRefOption);
})

console.log(players())