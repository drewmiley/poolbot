const getOrderHTML = playerInitial => {
	const lowerCaseInitial = playerInitial.toLowerCase();
	const html = "<div>" +
		`${playerInitial} ` +
		`Selected: <input type="checkbox" id="${lowerCaseInitial}Selected">` +
		`Had Break (if 2nd): <input type="checkbox" id="${lowerCaseInitial}HadBreak">` +
	"</div>";
	return html;
}

const players = orderPlayers;

players().forEach(player => {
	// TODO: Fix div soup
	const container = document.getElementById("selectors");
	let newPlayerOption = document.createElement("div");
	newPlayerOption.innerHTML = getOrderHTML(player.initial);
	container.append(newPlayerOption);
})

console.log(players())