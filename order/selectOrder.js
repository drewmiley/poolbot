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

	const reserves = [...Array(options.numberOfReserves).keys()].map(index => {
		return {
			initial: `R${index + 1}`,
			frameOptions: options.isSecondHalf ? [0, 1, 2, 3, 4] : [0, 1, 2, 3, 4, 5],
			numberOfBreaks: 0.5
		}
	})

	return halfPlayers.concat(reserves);
}

const getFramesInHalf = (teamAreAway, isSecondHalf) => {
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
	let unhappyFrames = 0;
	for (let i = 0; i < playersWithBreaksAssigned.length; i++) {
		const frameIsCorrect = playersWithBreaksAssigned.find(player => player.initial == framePermutation[i]).frameOptions.includes(i);
		unhappyFrames += !frameIsCorrect ? 1 : 0;
		if (unhappyFrames > 1) return null;
	}
	return { framePermutation, perfect: !unhappyFrames };
}

const selectPermutation = framePermutationsWithScore => {
	const perfectPermutations = framePermutationsWithScore.filter(perm => perm.perfect);
	if (perfectPermutations.length) {
		const index = Math.floor(Math.random() * perfectPermutations.length);
		return perfectPermutations[index].framePermutation;
	} else {
		const index = Math.floor(Math.random() * framePermutationsWithScore.length);
		return framePermutationsWithScore[index].framePermutation;
	}
}

const getRefOrderFromSelectedPermutation = (selectedPermutation, isSecondHalf, frameNumbers) => {
	const frameNumbersWithLowerCase = frameNumbers.map(number => number.toLowerCase());
		// TODO: Rewrite this in a neater way
	// TODO: Use similar approach to below
	    // const options = team
        // .map(player => player.initial.toLowerCase())
        // .reduce((accOptions, playerInitial) => (
        //     { ...accOptions, [playerInitial]: getSelectedOrderParams(playerInitial) }
        // ), initialOptions);
	const refOptions = isSecondHalf ? {
		isSecondHalf: true,
		one: selectedPermutation[0],
		two: selectedPermutation[1],
		three: selectedPermutation[2],
		four: selectedPermutation[3],
		five: selectedPermutation[4]
	} : {
		isSecondHalf: false,
		one: selectedPermutation[0],
		two: selectedPermutation[1],
		three: selectedPermutation[2],
		four: selectedPermutation[3],
		five: selectedPermutation[4],
		six: selectedPermutation[5]
	}
	const refOrder = selectRef(refOptions, refPlayers(), render = false);
	return refOrder;
}

function clearText() {
	document.getElementById('errorText').innerText = '';
	['One', 'Two', 'Three', 'Four', 'Five', 'Six'].forEach(number => {
		document.getElementById(`orderTable${number}`).innerText = '';
	})
}

// TODO: Pull out calculateOrderValues function as part of selectOrder
function selectOrder(options, players, withRef) {
	clearText();

	console.log("SELECT ORDER");
	console.log(options);
	console.log(players);

	const halfPlayers = getHalfPlayers(players, options);

	if (halfPlayers.length != (options.isSecondHalf ? 5 : 6)) {
		document.getElementById('errorText').innerText = 'Wrong number of players selected - please modify options';
		return;
	}

	const framesInHalf = getFramesInHalf(options.teamAreAway, options.isSecondHalf);

	console.log(halfPlayers);
	console.log(framesInHalf);

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
		document.getElementById('errorText').innerText = 'No order found - please re-run to find another';
		return;
	}

	const selectedPermutation = selectPermutation(bestFramePermutations);

	// Potential TODO: Add * if person gets their preference
	const frameNumbers = options.isSecondHalf ?
		['One', 'Two', 'Three', 'Four', 'Five'] :
		['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

	const refOrder = options.numberOfReserves ? null : getRefOrderFromSelectedPermutation(selectedPermutation, options.isSecondHalf, frameNumbers);
	console.log(refOrder);

	if (!options.numberOfReserves && withRef) {
		const refOrder = getRefOrderFromSelectedPermutation(selectedPermutation);
		console.log(refOrder);

		frameNumbers.forEach((number, i) => {
			// TODO: Correct this using refTable${number}
			document.getElementById(`orderTable${number}`).innerHTML = `<b>${selectedPermutation[i]}</b> ${refOrder[i]}${framesInHalf[i] ? ' (Br)' : ''}`;
		});

	} else {
		frameNumbers.forEach((number, i) => {
			document.getElementById(`orderTable${number}`).innerText = `${selectedPermutation[i]}${framesInHalf[i] ? ' (Br)' : ''}`;
		});
	}

	console.log('Done');
}