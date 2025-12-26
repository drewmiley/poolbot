document.getElementById('run').onclick = () => run();

const getSelectedValue = (id) => {
	const e = document.getElementById(id);
	return e.value;
}

const run = () => {
    console.log('Running');
    const options = {
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