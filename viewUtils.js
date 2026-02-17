const getSelectedValue = (id) => {
	const e = document.getElementById(id);
	return e.value;
}

const getSelectedCheckbox = (id) => {
    const e = document.getElementById(id);
    return e.checked;
}

function setElementText(elementId, text) {
	document.getElementById(elementId).innerText = text;
}

function setElementDisabled(elementId, disabled) {
	document.getElementById(elementId).disabled = disabled;
}

const setErrorText = text => setElementText('errorText', text);

function clearRefText() {
	document.getElementById('errorText').innerText = '';
	['One', 'Two', 'Three', 'Four', 'Five', 'Six'].forEach(number => {
		document.getElementById(`ref${number}`).innerText = '';
	})
}

function clearOrderText() {
	document.getElementById('errorText').innerText = '';
	document.getElementById('orderTableHead').innerText = '';
	document.getElementById('refTableHead').innerText = '';
	['One', 'Two', 'Three', 'Four', 'Five', 'Six'].forEach(number => {
		document.getElementById(`orderTable${number}`).innerText = '';
		document.getElementById(`refTable${number}`).innerText = '';
	})
}

function setOrderTableHeaderText() {
	setElementText('orderTableHead', 'Pl.');
	setElementText('refTableHead', 'Ref');
}

function getRetainedOrder(frameNumbers) {
	return frameNumbers.map(frameNumber => {
		return document.getElementById(`orderTable${frameNumber}`).innerText.split(" ")[0]
	})
}