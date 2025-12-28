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
			initial: `R${i + 1}`,
			frameOptions: options.isSecondHalf ? [0, 1, 2, 3, 4] : [0, 1, 2, 3, 4, 5],
			numberOfBreaks: 0.5
		}
	})

	return halfPlayers.concat(reserves);
}

const getPlayersAssignedBreaks = (players, frames) => {
	const playersWithWeighting = players.reduce((acc, player) => {
		const playerArray = [...Array(player.numberOfBreaks * 2).keys()].map(_ => player.initial);
		return acc.concat(playerArray)
	}, []);
	const numberOfBreaks = frames.filter(hasBreak => hasBreak).length;
	let breaks = [];
	// TODO: Can I remove while loop here?
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
	}
	return unhappyFrames <= 1 ? { framePermutation, perfect: !unhappyFrames } : null;
}

const selectPermutation = framePermutationsWithScore => {
	const perfectPermutations = framePermutationsWithScore.filter(perm => perm.perfect);
	const index = perfectPermutations.length ? Math.floor(Math.random() * perfectPermutations.length) : Math.floor(Math.random() * framePermutationsWithScore.length)
	return perfectPermutations.length ? perfectPermutations[index].framePermutation : framePermutationsWithScore[index].framePermutation;
}

function clearText() {
	document.getElementById('errorText').innerText = '';
	document.getElementById('orderOne').innerText = '';
	document.getElementById('orderTwo').innerText = '';
	document.getElementById('orderThree').innerText = '';
	document.getElementById('orderFour').innerText = '';
	document.getElementById('orderFive').innerText = '';
	document.getElementById('orderSix').innerText = '';
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

	// TODO: Neater way of writing that 
	let framesInHalf = [];
	if (options.teamAreAway && !options.isSecondHalf) {
		framesInHalf = [true, false, true, false, true, false];
	} else if (!options.teamAreAway && !options.isSecondHalf) {
		framesInHalf = [false, true, false, true, false, true];
	} else if (options.teamAreAway && options.isSecondHalf) {
		framesInHalf = [true, false, true, false, true];
	} else if (!options.teamAreAway && options.isSecondHalf) {
		framesInHalf = [false, true, false, true, false];
	}

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

	document.getElementById('orderOne').innerText = `${selectedPermutation[0]}${framesInHalf[0] ? ' (B)' : ''}`;
	document.getElementById('orderTwo').innerText = `${selectedPermutation[1]}${framesInHalf[1] ? ' (B)' : ''}`;
	document.getElementById('orderThree').innerText = `${selectedPermutation[2]}${framesInHalf[2] ? ' (B)' : ''}`;
	document.getElementById('orderFour').innerText = `${selectedPermutation[3]}${framesInHalf[3] ? ' (B)' : ''}`;
	document.getElementById('orderFive').innerText = `${selectedPermutation[4]}${framesInHalf[4] ? ' (B)' : ''}`;
	if (!options.isSecondHalf) {
		document.getElementById('orderSix').innerText = `${selectedPermutation[5]}${framesInHalf[5] ? ' (B)' : ''}`;
	}
	console.log('Done');
}