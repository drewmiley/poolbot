const getHalfPlayers = (players, options) => {
	const halfPlayers = players
		.filter(player => options[player.initial.toLowerCase()].isSelected)
		.map(player => {
			const numberOfBreaks = player.numberOfBreaks - (options.isSecondHalf && options[player.initial.toLowerCase()].hadBreak ? 1 : 0);
			return {
				initial: player.initial,
				frameOptions: options.isSecondHalf ? player.secondHalfOptions : player.firstHalfOptions,
				numberOfBreaks: Math.max(numberOfBreaks, 0)
			};
		});

	const createReserveOrderPlayer = reserveOrderPlayerGenerator(options.isSecondHalf);
	const reserves = [...Array(options.numberOfReserves).keys()].map(createReserveOrderPlayer);

	return halfPlayers.concat(reserves);
}

const getPlayersAssignedBreaks = (players, frames) => {
	const playersWithWeighting = players.reduce((acc, player) => {
		// * 2 is a cheat to get everything to whole numbers, as number of breaks can only be integer or end in .5
		const playerArray = [...Array(player.numberOfBreaks * 2).keys()].map(_ => player.initial);
		return acc.concat(playerArray)
	}, []);
	const numberOfBreaks = frames.filter(hasBreak => hasBreak).length;
	let breaks = [];
	while (breaks.length < numberOfBreaks) {
		const remainingPlayersWithWeighting = playersWithWeighting.filter(player => !breaks.includes(player));
		const index = Math.floor(Math.random() * remainingPlayersWithWeighting.length);
		breaks.push(remainingPlayersWithWeighting[index]);
	}
	return breaks;
};

const getBestFramePermutations = (framePermutation, playersWithBreaksAssigned) => {
	let unhappyFrames = [];
	for (let i = 0; i < playersWithBreaksAssigned.length; i++) {
		const frameIsCorrect = playersWithBreaksAssigned.find(player => player.initial == framePermutation[i]).frameOptions.includes(i);
		if (!frameIsCorrect) unhappyFrames.push(i);
		if (unhappyFrames.length > 1) return null;
	}
	return { framePermutation, unhappyFrame: unhappyFrames.length === 1 ? unhappyFrames[0] : null };
}

const selectPermutation = framePermutationsWithScore => {
	const perfectPermutations = framePermutationsWithScore.filter(perm => perm.unhappyFrame === null);
	// TODO: This seems slighty untidy
	if (perfectPermutations.length) {
		const index = Math.floor(Math.random() * perfectPermutations.length);
		return perfectPermutations[index];
	} else {
		const index = Math.floor(Math.random() * framePermutationsWithScore.length);
		return framePermutationsWithScore[index];
	}
}

const getRefOrderFromSelectedPermutation = (selectedPermutation, isSecondHalf, frameNumbers) => {
	const refOptions = frameNumbers
		.map(number => number.toLowerCase())
        .reduce((accOptions, frameNumber, i) => (
            { ...accOptions, [frameNumber]: selectedPermutation[i] }
        ), { isSecondHalf });
	return calculateRefValues(refOptions, refPlayers());
}

function selectOrder(options, players, withRef, retainOrder) {
	const frameNumbers = getFrameNumbersForHalf(options.isSecondHalf);	

	const retainedOrder = retainOrder ? getRetainedOrder(frameNumbers) : null;

	clearOrderText();

	console.log("SELECT ORDER");
	console.log(options);
	console.log(players);

	const framesInHalf = getFrameBreaksInHalf(options.teamAreAway, options.isSecondHalf);

	const selectedPermutation = retainedOrder || calculateOrderValues(options, players, framesInHalf);

	if (!selectedPermutation) {
		setElementDisabled('reorderRef', true);
		return;
	}

	const refOrder = !options.numberOfReserves && !options.teamAreAway && withRef ?
		getRefOrderFromSelectedPermutation(selectedPermutation, options.isSecondHalf, frameNumbers) :
		null;
	setElementDisabled('reorderRef', !refOrder);
	console.log(refOrder);

	const orderTableRows = selectedPermutation.framePermutation
		.map((player, i) => `${player}${i === selectedPermutation.unhappyFrame ? '' : '* '}${framesInHalf[i] ? ' (Br)' : ''}`);

	if (refOrder) {
		setOrderTableHeaderText();
		frameNumbers.forEach((number, i) => {
			setElementText(`orderTable${number}`, orderTableRows[i]);
			setElementText(`refTable${number}`, refOrder[i]);
		});
	} else {
		frameNumbers.forEach((number, i) => {
			setElementText(`orderTable${number}`, orderTableRows[i]);
		});
	}

	console.log('Done');
}

function calculateOrderValues(options, players, framesInHalf) {
	const halfPlayers = getHalfPlayers(players, options);

	if (halfPlayers.length != (options.isSecondHalf ? 5 : 6)) {
		setErrorText('Wrong number of players selected - please modify options');
		return;
	}

	console.log(halfPlayers);

	const playersAssignedBreaks = getPlayersAssignedBreaks(halfPlayers, framesInHalf);

	const playersWithBreaksAssigned = halfPlayers.map(player => {
		const playerHasBreak = playersAssignedBreaks.includes(player.initial);
		return {
			initial: player.initial,
			frameOptions: player.frameOptions.filter(frameIndex => framesInHalf[frameIndex] === playerHasBreak)
		}
	});

	console.log(playersWithBreaksAssigned)

	const allPossibleFramePermuations = permutations(playersWithBreaksAssigned.map(player => player.initial));

	const bestFramePermutations = allPossibleFramePermuations
		.map(framePermuation => getBestFramePermutations(framePermuation, playersWithBreaksAssigned))
		.filter(framePermuation => framePermuation != null);

	console.log(allPossibleFramePermuations.length);

	console.log(bestFramePermutations);

	if (!bestFramePermutations.length) {
		setErrorText('No order found - please re-run to find another');
		return;
	}

	return selectPermutation(bestFramePermutations);
}