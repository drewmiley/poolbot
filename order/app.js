document.getElementById('run').onclick = () => run();

const getSelectedValue = (id) => {
	const e = document.getElementById(id);
	return e.value;
}

const getSelectedCheckbox = (id) => {
    const e = document.getElementById(id);
    return e.checked;
}

const getSelectedOrderParams = (id) => {
    return {
        isSelected: getSelectedCheckbox(`${id}Selected`),
        hadBreak: getSelectedCheckbox(`${id}HadBreak`)
    }
}

const run = () => {
    console.log('Running');
    const initialOptions = {
        teamAreAway: getSelectedCheckbox('teamAreAway'),
        isSecondHalf: getSelectedCheckbox('isSecondHalf'),
        numberOfReserves: parseInt(getSelectedValue('numberOfReserves'))
    }
    const team = orderPlayers();
    const options = team
        .map(player => player.initial.toLowerCase())
        .reduce((accOptions, playerInitial) => (
            { ...accOptions, [playerInitial]: getSelectedOrderParams(playerInitial) }
        ), initialOptions);
    selectOrder(options, team);
}