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
    // TODO: Add programmatic setting of players, inc. gp/GP.
    // TODO: Can i refactor this, probably using spread operator.
    const team = players();
    const teamInitials = team.map(player => player.initial);
    const initialOptions = {
        teamAreAway: getSelectedCheckbox('teamAreAway'),
        isSecondHalf: getSelectedCheckbox('isSecondHalf'),
        numberOfReserves: parseInt(getSelectedValue('numberOfReserves'))
    }
    const options = teamInitials.reduce((accOptions, playerInitial) => {
        const playerInitialToLowerCase = playerInitial.toLowerCase();
        accOptions[playerInitialToLowerCase] = getSelectedOrderParams(playerInitialToLowerCase);
        return accOptions;
    }, initialOptions);
    // const options = {
    //     teamAreAway: getSelectedCheckbox('teamAreAway'),
    //     isSecondHalf: getSelectedCheckbox('isSecondHalf'),
    // 	cc: getSelectedOrderParams('cc'),
    //     dd: getSelectedOrderParams('dd'),
    //     dm: getSelectedOrderParams('dm'),
    //     dw: getSelectedOrderParams('dw'),
    //     jc: getSelectedOrderParams('jc'),
    //     nd: getSelectedOrderParams('nd'),
    //     pc: getSelectedOrderParams('pc'),
    // 	numberOfReserves: parseInt(getSelectedValue('numberOfReserves'))
    // }
    // const team = players();
    selectOrder(options, team);
}