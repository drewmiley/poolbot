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
    const team = players();
    const initialOptions = {
        teamAreAway: getSelectedCheckbox('teamAreAway'),
        isSecondHalf: getSelectedCheckbox('isSecondHalf'),
        numberOfReserves: parseInt(getSelectedValue('numberOfReserves'))
    }
    const options = team
        .map(player => player.initial.toLowerCase())
        // TODO: Can i refactor this, probably using spread operator.
        .reduce((accOptions, playerInitial) => {
            accOptions[playerInitial] = getSelectedOrderParams(playerInitial);
            return accOptions;
        }, initialOptions);
    selectOrder(options, team);
}