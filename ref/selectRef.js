const getWantToRefOptions = (playing) => {
	const firstWantToRefOption = [...playing[1].preferenceBefore ? [playing[1]] : []];
	const middleWantsToRefOptions = [
		[...!playing[0].preferenceBefore ? [playing[0]] : [], ...playing[2].preferenceBefore ? [playing[2]] : []],
		[...!playing[1].preferenceBefore ? [playing[1]] : [], ...playing[3].preferenceBefore ? [playing[3]] : []],
		[...!playing[2].preferenceBefore ? [playing[2]] : [], ...playing[4].preferenceBefore ? [playing[4]] : []],
		[...!playing[3].preferenceBefore ? [playing[3]] : [], ...playing[5].preferenceBefore ? [playing[5]] : []],
	];
	const lastWantsToRefOption = [...!playing[4].preferenceBefore ? [playing[4]] : []];
	// TODO: Do depending on size of playing (5/6)
	const wantsToRefOptions = [
		[...playing[1].preferenceBefore ? [playing[1]] : []],
		[...!playing[0].preferenceBefore ? [playing[0]] : [], ...playing[2].preferenceBefore ? [playing[2]] : []],
		[...!playing[1].preferenceBefore ? [playing[1]] : [], ...playing[3].preferenceBefore ? [playing[3]] : []],
		[...!playing[2].preferenceBefore ? [playing[2]] : [], ...playing[4].preferenceBefore ? [playing[4]] : []],
		[...!playing[3].preferenceBefore ? [playing[3]] : [], ...playing[5].preferenceBefore ? [playing[5]] : []],
		[...!playing[4].preferenceBefore ? [playing[4]] : []]
	];
	return wantsToRefOptions;
}

const getCannotRefOptions = (playing, isSecondHalf) => {
	const firstCannotRefOption = [playing[0].initial, ...!playing[1].preferenceBefore ? [playing[1].initial] : []];
	const middleCannotRefOptions = [
		[playing[1].initial, ...playing[0].preferenceBefore ? [playing[0].initial] : [], ...!playing[2].preferenceBefore ? [playing[2].initial] : []],
		[playing[2].initial, ...playing[1].preferenceBefore ? [playing[1].initial] : [], ...!playing[3].preferenceBefore ? [playing[3].initial] : []],
		[playing[3].initial, ...playing[2].preferenceBefore ? [playing[2].initial] : [], ...!playing[4].preferenceBefore ? [playing[4].initial] : []],
		[playing[4].initial, ...playing[3].preferenceBefore ? [playing[3].initial] : [], ...!playing[5].preferenceBefore ? [playing[5].initial] : []],
	]
	const lastCannotRefOption = [playing[5].initial, ...playing[4].preferenceBefore ? [playing[4].initial] : []];
	// TODO: Do depending on size of playing (5/6)
	const cannotRefOptions = [
		[playing[0].initial, ...!playing[1].preferenceBefore ? [playing[1].initial] : []],
		[playing[1].initial, ...playing[0].preferenceBefore ? [playing[0].initial] : [], ...!playing[2].preferenceBefore ? [playing[2].initial] : []],
		[playing[2].initial, ...playing[1].preferenceBefore ? [playing[1].initial] : [], ...!playing[3].preferenceBefore ? [playing[3].initial] : []],
		[playing[3].initial, ...playing[2].preferenceBefore ? [playing[2].initial] : [], ...!playing[4].preferenceBefore ? [playing[4].initial] : []],
		[playing[4].initial, ...playing[3].preferenceBefore ? [playing[3].initial] : [], ...!playing[5].preferenceBefore ? [playing[5].initial] : []],
		[playing[5].initial, ...playing[4].preferenceBefore ? [playing[4].initial] : []]
	]
	return cannotRefOptions;
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
	document.getElementById('refOne').innerText = '';
	document.getElementById('refTwo').innerText = '';
	document.getElementById('refThree').innerText = '';
	document.getElementById('refFour').innerText = '';
	document.getElementById('refFive').innerText = '';
	document.getElementById('refSix').innerText = '';
}	

function selectRef({ isSecondHalf, one, two, three, four, five, six }, players) {
	clearText();

	if (!one || !two || !three || !four || !five || (!six && isSecondHalf)) {
		document.getElementById('errorText').innerText = 'Wrong number of players selected - please modify options';
		return;
	}
	if (six && isSecondHalf) {
		document.getElementById('errorText').innerText = 'SIX selected when 2nd half - please modify options';
		return;
	}

	const selectedPlayers = isSecondHalf ? [one, two, three, four, five] : [one, two, three, four, five, six];
	// TODO: Test for error case where same player has been selected
	const playing = selectedPlayers.map(selected => players.find(player => player.initial == selected));

	const wantsToRefOptions = getWantToRefOptions(playing);

	const cannotRefOptions = getCannotRefOptions(playing);

	const initialAllocation = wantsToRefOptions.map(getInitialAllocation);

	const initialsNotAllocatedFrame = playing.map(player => player.initial).filter(initial => !initialAllocation.includes(initial));

	const fullAllocation = initialAllocation.map((initial, index) =>
		initial ||
		getInitialsNotAllocatedJoinedUnlessPlayingFrame(initialsNotAllocatedFrame, cannotRefOptions[index]) ||
		players.filter(player => !cannotRefOptions[index].includes(player.initial)).map(player => player.initial).join('/')
	);

	// Potential TODO: Put this in a forEachLoop
	document.getElementById('refOne').innerText = `${fullAllocation[0]}${initialAllocation[0] ? ' *' : ''}`;
	document.getElementById('refTwo').innerText = `${fullAllocation[1]}${initialAllocation[1] ? ' *' : ''}`;
	document.getElementById('refThree').innerText = `${fullAllocation[2]}${initialAllocation[2] ? ' *' : ''}`;
	document.getElementById('refFour').innerText = `${fullAllocation[3]}${initialAllocation[3] ? ' *' : ''}`;
	document.getElementById('refFive').innerText = `${fullAllocation[4]}${initialAllocation[4] ? ' *' : ''}`;
	if (!isSecondHalf) {
		document.getElementById('refSix').innerText = `${fullAllocation[5]}${initialAllocation[5] ? ' *' : ''}`;
	}
	console.log('Done');
}