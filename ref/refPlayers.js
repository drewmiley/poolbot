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
	innerHTML += "</select>";
	newRefOption.innerHTML = innerHTML;
	container.append(newRefOption);
})

console.log(players())