const getWantToRefOptions = (playing) => {
	const firstWantToRefOption = playing[1].preferenceBefore ? [playing[1]] : [];
	const middleWantsToRefOptions = playing
		.map((d, i) => i)
		.filter(i => i != 0 && i != playing.length - 1)
		.map(i => {
			return [
				...!playing[i - 1].preferenceBefore ? [playing[i - 1]] : [],
				...playing[i + 1].preferenceBefore ? [playing[i + 1]] : []
			];
		});
	const lastWantsToRefOption = !playing[playing.length - 2].preferenceBefore ? [playing[playing.length - 2]] : [];
	return [].concat([firstWantToRefOption], middleWantsToRefOptions, [lastWantsToRefOption]);
}

const getCannotRefOptions = (playing, isSecondHalf) => {
	const firstCannotRefOption = [
		playing[0].initial,
		...!playing[1].preferenceBefore ? [playing[1].initial] : []
	];
	const middleCannotRefOptions = playing
		.map((d, i) => i)
		.filter(i => i != 0 && i != playing.length - 1)
		.map(i => {
			return [
				playing[i].initial,
				...playing[i - 1].preferenceBefore ? [playing[i - 1].initial] : [],
				...!playing[i + 1].preferenceBefore ? [playing[i + 1].initial] : []
			];
		});
	const lastCannotRefOption = [
		playing[playing.length - 1].initial,
		...playing[playing.length - 2].preferenceBefore ? [playing[playing.length - 2].initial] : []
	];
	return [].concat([firstCannotRefOption], middleCannotRefOptions, [lastCannotRefOption]);
}

const getInitialAllocation = initialArray => {
	if (!initialArray.length) return null;
	if (initialArray.length == 1) return initialArray[0].initial;
	if (initialArray.length == 2 && [0, 2].includes(initialArray.filter(player => player.wouldPreferToRef).length)) return Math.random() < 0.5 ? initialArray[0].initial : initialArray[1].initial;
	if (initialArray.length == 2 && initialArray.filter(player => player.wouldPreferToRef).length == 1) return initialArray.find(player => player.wouldPreferToRef).initial;
}

const getInitialsNotAllocatedJoinedUnlessPlayingFrame = (notAllocatedInitials, cannotRefInitials) =>
	notAllocatedInitials.filter(initial => !cannotRefInitials.includes(initial)).join('/');

function clearText() {
	document.getElementById('errorText').innerText = '';
	['One', 'Two', 'Three', 'Four', 'Five', 'Six'].forEach(number => {
		document.getElementById(`ref${number}`).innerText = '';
	})
}

function selectRef({ isSecondHalf, one, two, three, four, five, six }, players) {
	clearText();

	if (!one || !two || !three || !four || !five || (!six && !isSecondHalf)) {
		document.getElementById('errorText').innerText = 'Wrong number of players selected - please modify options';
		return;
	}
	if (six && isSecondHalf) {
		document.getElementById('errorText').innerText = 'SIX selected when 2nd half - please modify options';
		return;
	}

	const refValues = calculateRefValues({ isSecondHalf, one, two, three, four, five, six }, players)

	const frameNumbers = isSecondHalf ?
		['One', 'Two', 'Three', 'Four', 'Five'] :
		['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

	frameNumbers.forEach((number, i) => {
		document.getElementById(`ref${number}`).innerText = refValues[i];
	});

	console.log('Done');
}	

function calculateRefValues({ isSecondHalf, one, two, three, four, five, six }, players) {
	const selectedPlayers = isSecondHalf ? [one, two, three, four, five] : [one, two, three, four, five, six];
	if (new Set(selectedPlayers).size != selectedPlayers.length) {
		document.getElementById('errorText').innerText = 'Player has been selected more than once - please modify options';
		return;
	}
	const playing = selectedPlayers.map(selected => players.find(player => player.initial == selected));

	const wantsToRefOptions = getWantToRefOptions(playing);

	const cannotRefOptions = getCannotRefOptions(playing);

	const initialAllocation = wantsToRefOptions.map(getInitialAllocation);

	const initialsNotAllocatedFrame = playing.map(player => player.initial).filter(initial => !initialAllocation.includes(initial));

	const fullAllocation = initialAllocation.map((initial, index) =>
		initial ||
		getInitialsNotAllocatedJoinedUnlessPlayingFrame(initialsNotAllocatedFrame, cannotRefOptions[index]) ||
		selectedPlayers.filter(player => !cannotRefOptions[index].includes(player)).join('/')
	);

	return selectedPlayers.map((number, i) => {
		return `${fullAllocation[i]}${initialAllocation[i] ? ' *' : ''}`;
	})
}