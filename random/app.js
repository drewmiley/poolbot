document.getElementById('run').onclick = () => run();

const getSelectedValue = (id) => {
	const e = document.getElementById(id);
	return e.value;
}

const run = () => {
    console.log('Running');
    const max = parseInt(getSelectedValue('number'));
    const result = Math.ceil(Math.random() * max);
	document.getElementById('randomResult').innerText = result;
	console.log('Done');
}