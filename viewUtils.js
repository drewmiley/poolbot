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
	const frames = frameNumbers.map(frameNumber => {
		const frameNumberOrderInnerText = document.getElementById(`orderTable${frameNumber}`).innerText;
		const player = frameNumberOrderInnerText.split(" ")[0];
		const happy = frameNumberOrderInnerText.includes("*");
		return { player, happy };
	});
	const unhappyFrame = frames.map(frame => frame.happy).indexOf(false);
	return {
		framePermutation: frames.map(frame => frame.player),
		unhappyFrames: unhappyFrame === -1 ? null : unhappyFrame
	}
}