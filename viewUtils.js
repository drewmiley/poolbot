function setElementText(elementId, text) {
	document.getElementById(elementId).innerText = text;
}

function clearRefText() {
	document.getElementById('errorText').innerText = '';
	['One', 'Two', 'Three', 'Four', 'Five', 'Six'].forEach(number => {
		document.getElementById(`ref${number}`).innerText = '';
	})
}