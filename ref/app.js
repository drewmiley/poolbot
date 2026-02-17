document.getElementById('run').onclick = () => run();

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
    const team = refPlayers();
    selectRef(options, team);
}