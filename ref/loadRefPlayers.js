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

['one', 'two', 'three', 'four', 'five', 'six'].forEach(index => {
	const container = document.getElementById("selectors");
	let newRefOption = document.createElement("div");
	const refOptions = refPlayers().map(getRefHTML);
	const innerHTML = `${index.toUpperCase()} ` +
		`<select name="${index}" id="${index}">` +
		getEmptyRefHTML() +
		refOptions +
		"</select>";
	newRefOption.innerHTML = innerHTML;
	container.append(newRefOption);
})

console.log(refPlayers())