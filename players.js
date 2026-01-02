console.log("PLAYERS")

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

const orderPlayer = (initial, breakPreferences, firstHalfPreferences, secondHalfPreferences) => {
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

const refPlayer = (initial, preferenceBeforeInit, wouldPreferToRef) => {
	return {
		initial,
		preferenceBeforeInit,
		preferenceBefore: preferenceBeforeInit === null ? Math.random() < 0.5 : preferenceBeforeInit,
		wouldPreferToRef
	}
}

// TODO: Make this more readable. Set each player individually

const orderPlayers = () => [
	orderPlayer('CC', [1], [EARLY, MIDDLE], [EARLY, MIDDLE]),
	orderPlayer('DD', [1], [MIDDLE, LATE], [EARLY, MIDDLE]),
	orderPlayer('DM', [0, 1], [MIDDLE, LATE], [MIDDLE, LATE]),
	orderPlayer('DW', [1], [EARLY, MIDDLE, LATE], [EARLY, MIDDLE, LATE]),
	orderPlayer('JC', [0, 1], [MIDDLE], [EARLY]),
	orderPlayer('ND', [2], [MIDDLE, LATE], [MIDDLE, LATE]),
	orderPlayer('PC', [1], [EARLY, MIDDLE], [EARLY, MIDDLE, LATE])
]

const refPlayers = () => [
	refPlayer('CC', null),
	refPlayer('DD', false),
	refPlayer('DM', false, true),
	refPlayer('DW', false),
	refPlayer('JC', true),
	refPlayer('ND', true, true),
	refPlayer('PC', true),
	// TODO: PASS AS ADDITIONAL ARRAY
	refPlayer('After', false),
	refPlayer('Before', true),
	refPlayer('Either', null)
]

const fullPlayers = { orderPlayers, refPlayers };