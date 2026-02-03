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

function clearTableValues() {
	const tdElements = document.getElementsByTagName("td");
	[...Array(tdElements.length).keys()].forEach(i => tdElements[i].innerText = "");
}

function displayTableValues(frameNumbers, selectedPermutation, framesInHalf) {
	const tdElements = document.getElementsByTagName("td");
	[...Array(frameNumbers.length).keys()].forEach(i => {
		tdElements[2 * i].innerText = selectedPermutation[i];
		tdElements[2 * i + 1].innerText = framesInHalf[i] ? ' (Br)' : '';
	});
}

function clearText() {
	document.getElementById('errorText').innerText = '';
	['One', 'Two', 'Three', 'Four', 'Five', 'Six'].forEach(number => {
		document.getElementById(`order${number}`).innerText = '';
		document.getElementById(`orderTable${number}`).innerText = '';
	})
	// document.getElementById('orderOne').innerText = '';
	// document.getElementById('orderTwo').innerText = '';
	// document.getElementById('orderThree').innerText = '';
	// document.getElementById('orderFour').innerText = '';
	// document.getElementById('orderFive').innerText = '';
	// document.getElementById('orderSix').innerText = '';

	clearTableValues();
}

function selectOrder(options, players) {
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

	frameNumbers.forEach((number, i) => {
		document.getElementById(`order${number}`).innerText = `${selectedPermutation[i]}${framesInHalf[i] ? ' (Br)' : ''}`;
		document.getElementById(`orderTable${number}`).innerText = `${selectedPermutation[i]}${framesInHalf[i] ? ' (Br)' : ''}`;
	});

	displayTableValues(frameNumbers, selectedPermutation, framesInHalf);

	console.log('Done');
}