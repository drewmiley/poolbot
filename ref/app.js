document.getElementById('run').onclick = () => run();

const getSelectedValue = (id) => {
	const e = document.getElementById(id);
	return e.value;
}

const getSelectedCheckbox = (id) => {
    const e = document.getElementById(id);
    return e.checked;
}

const run = () => {
    console.log('Running');
    const options = {
        isSecondHalf: getSelectedCheckbox('isSecondHalf'),
    	one: getSelectedValue('one'),
    	two: getSelectedValue('two'),
    	three: getSelectedValue('three'),
    	four: getSelectedValue('four'),
    	five: getSelectedValue('five'),
    	six: getSelectedValue('six')
    }
    const team = players();
    selectRef(options, team);
}