const getWantToRefOptions = (playing) => {
	const middleFrames = playing
		.map((d, i) => i)
		.filter(i => i != 0 && i != playing.length - 1);
	const firstWantToRefOption = playing[1].preferenceBefore ? [playing[1]] : [];
	const middleWantsToRefOptions = middleFrames.map(i => {
		return [
			...!playing[i - 1].preferenceBefore ? [playing[i - 1]] : [],
			...playing[i + 1].preferenceBefore ? [playing[i + 1]] : []
		];
	});
	const lastWantsToRefOption = !playing[playing.length - 2].preferenceBefore ? [playing[playing.length - 2]] : [];
	return [].concat([firstWantToRefOption], middleWantsToRefOptions, [lastWantsToRefOption]);
}

const getCannotRefOptions = (playing, isSecondHalf) => {
	const middleFrames = playing
		.map((d, i) => i)
		.filter(i => i != 0 && i != playing.length - 1);
	const firstCannotRefOption = [
		playing[0].initial,
		...!playing[1].preferenceBefore ? [playing[1].initial] : []
	];
	const middleCannotRefOptions = middleFrames.map(i => {
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
	document.getElementById('refOne').innerText = '';
	document.getElementById('refTwo').innerText = '';
	document.getElementById('refThree').innerText = '';
	document.getElementById('refFour').innerText = '';
	document.getElementById('refFive').innerText = '';
	document.getElementById('refSix').innerText = '';
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