const getOrderHTML = playerInitial => {
	const lowerCaseInitial = playerInitial.toLowerCase();
	const html = `${playerInitial} ` +
		`Selected: <input type="checkbox" id="${lowerCaseInitial}Selected"> ` +
		`Had Break (if 2nd): <input type="checkbox" id="${lowerCaseInitial}HadBreak">`;
	return html;
}

const players = orderPlayers;

players().forEach(player => {
	const container = document.getElementById("selectors");
	let newPlayerOption = document.createElement("div");
	newPlayerOption.innerHTML = getOrderHTML(player.initial);
	container.append(newPlayerOption);
})

console.log(players())