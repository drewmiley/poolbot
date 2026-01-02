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

const orderPlayer = ({ initial, preferredNumberOfBreaks, firstHalfPreferences, secondHalfPreferences }) => {
	const numberOfBreaks = preferredNumberOfBreaks.reduce((acc, val) => acc + val) / preferredNumberOfBreaks.length;
	const firstHalfOptions = getFirstHalfOptions(firstHalfPreferences);
	const secondHalfOptions = getSecondHalfOptions(secondHalfPreferences);
	return {
		initial,
		numberOfBreaks,
		firstHalfOptions,
		secondHalfOptions
	}
}

const refPlayer = ({ initial, refPreferenceBeforeInit, wouldPreferToRef }) => {
	return {
		initial,
		preferenceBeforeInit: refPreferenceBeforeInit,
		preferenceBefore: refPreferenceBeforeInit === null ? Math.random() < 0.5 : refPreferenceBeforeInit,
		wouldPreferToRef
	}
}

const CC = {
	initial: 'CC',
	refPreferenceBeforeInit: null,
	preferredNumberOfBreaks: [1],
	firstHalfPreferences: [EARLY, MIDDLE],
	secondHalfPreferences: [EARLY, MIDDLE]
};

const DD = {
	initial: 'DD',
	refPreferenceBeforeInit: false,
	preferredNumberOfBreaks: [1],
	firstHalfPreferences: [MIDDLE, LATE],
	secondHalfPreferences: [EARLY, MIDDLE]
};

const DM = {
	initial: 'DM',
	refPreferenceBeforeInit: false,
	wouldPreferToRef: true,
	preferredNumberOfBreaks: [0, 1],
	firstHalfPreferences: [MIDDLE, LATE],
	secondHalfPreferences: [MIDDLE, LATE]
};

const DW = {
	initial: 'DW',
	refPreferenceBeforeInit: false,
	preferredNumberOfBreaks: [1],
	firstHalfPreferences: [EARLY, MIDDLE, LATE],
	secondHalfPreferences: [EARLY, MIDDLE, LATE]
};

const JC = {
	initial: 'JC',
	refPreferenceBeforeInit: true,
	preferredNumberOfBreaks: [0, 1],
	firstHalfPreferences: [MIDDLE],
	secondHalfPreferences: [EARLY]
};

const ND = {
	initial: 'ND',
	refPreferenceBeforeInit: true,
	wouldPreferToRef: true,
	preferredNumberOfBreaks: [2],
	firstHalfPreferences: [MIDDLE, LATE],
	secondHalfPreferences: [MIDDLE, LATE]
};

const PC = {
	initial: 'PC',
	refPreferenceBeforeInit: true,
	preferredNumberOfBreaks: [1],
	firstHalfPreferences: [EARLY, MIDDLE],
	secondHalfPreferences: [EARLY, MIDDLE, LATE]
};

const fullListOfPlayers = [CC, DD, DM, DW, JC, ND, PC];

const reserveRefs = [
	refPlayer({ initial: 'Res. After', refPreferenceBeforeInit: false }),
	refPlayer({ initial: 'Res. Before', refPreferenceBeforeInit: true }),
	refPlayer({ initial: 'Res. Either', refPreferenceBeforeInit: null })
];

const orderPlayers = () => fullListOfPlayers.map(orderPlayer);

const refPlayers = () => fullListOfPlayers.map(refPlayer).concat(reserveRefs);

const fullPlayers = { orderPlayers, refPlayers };