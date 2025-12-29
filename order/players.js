const EARLY = "early";
const MIDDLE = "middle";
const LATE = "late";

const getFrameOptions = (preferences, isSecondHalf) => {
	return preferences.reduce((acc, preference) => {
		switch (preference) {
			case EARLY:
				return acc.concat([0, 1]);
			case MIDDLE:
				return acc.concat([2, 3]);
			case LATE:
				return acc.concat(isSecondHalf ? [4] : [4, 5]);
		}
	}, []);
}

const getFirstHalfOptions = firstHalfPreferences => getFrameOptions(firstHalfPreferences, false);

const getSecondHalfOptions = secondHalfPreferences => getFrameOptions(secondHalfPreferences, true);

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