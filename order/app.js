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
    // TODO: Add programmatic setting of players, inc. gp/GP. Probably using spread operator.
    const options = {
        teamAreAway: getSelectedCheckbox('teamAreAway'),
        isSecondHalf: getSelectedCheckbox('isSecondHalf'),
    	cc: getSelectedOrderParams('cc'),
        dd: getSelectedOrderParams('dd'),
        dm: getSelectedOrderParams('dm'),
        dw: getSelectedOrderParams('dw'),
        jc: getSelectedOrderParams('jc'),
        nd: getSelectedOrderParams('nd'),
        pc: getSelectedOrderParams('pc'),
    	numberOfReserves: parseInt(getSelectedValue('numberOfReserves'))
    }
    const team = players();
    selectOrder(options, team);
}