const EARLY = "early";
const MIDDLE = "middle";
const LATE = "late";

const getFrameOptions = (preferences, isSecondHalf) => {
	// TODO: Clean up this function
	let arr = [];
	if (preferences.includes(EARLY)) {
		arr.push(0, 1);
	}
	if (preferences.includes(MIDDLE)) {
		arr.push(2, 3);
	}
	if (preferences.includes(LATE)) {
		isSecondHalf ? arr.push(4, 5) : arr.push(4);
	}
	return arr;
}

const getFirstHalfOptions = firstHalfPreferences => getFrameOptions(firstHalfPreferences, false);

const getSecondHalfOptions = secondHalfPreferences => getFrameOptions(secondHalfPreferences, false);

const player = (initial, breakPreferences, firstHalfPreferences, secondHalfPreferences) => {
	const numberOfBreaks = breakPreferences.reduce((acc, val) => acc + val) / breakPreferences.length;
	const firstHalfOptions = getFirstHalfOptions(firstHalfPreferences);
	const secondHalfOptions = getSecondHalfOptions(secondHalfPreferences);
	return {
		initial,
		numberOfBreaks,
		firstHalfOptions,
		secondHalfOptions
	}
}

const players = () => [
	player('CC', [1], [EARLY, MIDDLE], [EARLY, MIDDLE]),
	player('DD', [1], [MIDDLE, LATE], [EARLY, MIDDLE]),
	player('DM', [0, 1], [MIDDLE, LATE], [MIDDLE, LATE]),
	player('DW', [1], [EARLY, MIDDLE, LATE], [EARLY, MIDDLE, LATE]),
	player('JC', [0, 1], [MIDDLE], [EARLY]),
	player('ND', [2], [MIDDLE, LATE], [MIDDLE, LATE]),
	player('PC', [1], [EARLY, MIDDLE], [EARLY, MIDDLE, LATE])
]

console.log(players())