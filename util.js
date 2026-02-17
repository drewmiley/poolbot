const getFrameNumbersForHalf = isSecondHalf => {
	return  isSecondHalf ?
	['One', 'Two', 'Three', 'Four', 'Five'] :
	['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
}

const getFrameBreaksInHalf = (teamAreAway, isSecondHalf) => {
	if (teamAreAway && !isSecondHalf) {
		return [true, false, true, false, true, false];
	} else if (!teamAreAway && !isSecondHalf) {
		return [false, true, false, true, false, true];
	} else if (teamAreAway && isSecondHalf) {
		return [true, false, true, false, true];
	} else if (!teamAreAway && isSecondHalf) {
		return [false, true, false, true, false];
	}
}

const reserveOrderPlayerGenerator = isSecondHalf => index => {
	return {
		initial: `R${index + 1}`,
		frameOptions: isSecondHalf ? [0, 1, 2, 3, 4] : [0, 1, 2, 3, 4, 5],
		numberOfBreaks: 0.5
	}
}