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