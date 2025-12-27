const getBreaksAssigned = (players, frames) => {
	// TODO: Tidy up this function - give better name to function
	let playersWithWeighting = players.reduce((acc, player) => {
		const playerArray = [...Array(player.numberOfBreaks * 2).keys()].map(_ => player.initial);
		return acc.concat(playerArray)
	}, []);
	const numberOfBreaks = frames.filter(frame => frame).length;
	let breaks = [];
	while (breaks.length < numberOfBreaks) {
		let index = Math.floor(Math.random() * playersWithWeighting.length);
		let breakingPlayer = playersWithWeighting[index];
		breaks.push(breakingPlayer);
		playersWithWeighting = playersWithWeighting.filter(player => players != breakingPlayer);
	}
	return breaks;
};

const getFramePermutationWithScore = (framePermutation, playersWithBreaksAssigned, isSecondHalf) => {
	// TODO: Tidy up this function
	const numberOfFrames = isSecondHalf ? 5 : 6;
	let score = 0;
	for (let i = 0; i < numberOfFrames; i++) {
		const frameIsCorrect = playersWithBreaksAssigned.find(player => player.initial == framePermutation[i]).frameOptions.includes(i);
		score += frameIsCorrect ? 1 : 0;
	}
	return numberOfFrames - 1 <= score ? { framePermutation, score, perfect: numberOfFrames === score } : null;
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

	// TODO: Tidy up this function
	const halfPlayers = players
		.filter(player => {
			return options[player.initial.toLowerCase()].isSelected;
		})
		.map(player => {
			const numberOfBreaks = player.numberOfBreaks - (options.isSecondHalf && options[player.initial.toLowerCase()].hadBreak ? 1 : 0);
			return {
				initial: player.initial,
				frameOptions: options.isSecondHalf ? player.secondHalfOptions : player.firstHalfOptions,
				numberOfBreaks: Math.max(numberOfBreaks, 0)
			};
		});

	// TODO: Neater way of doing this
	for (let i = 0; i < options.numberOfReserves; i++) {
		let reserve = {
			initial: `R${i + 1}`,
			frameOptions: options.isSecondHalf ? [0, 1, 2, 3, 4] : [0, 1, 2, 3, 4, 5],
			numberOfBreaks: 0.5
		}
		halfPlayers.push(reserve);
	}

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

	const breaksAssigned = getBreaksAssigned(halfPlayers, framesInHalf);

	const playersWithBreaksAssigned = halfPlayers.map(player => {
		const playerHasBreak = breaksAssigned.includes(player.initial);
		return {
			initial: player.initial,
			frameOptions: player.frameOptions.filter(frameIndex => framesInHalf[frameIndex] === playerHasBreak)
		}
	});

	console.log(playersWithBreaksAssigned)

	const allPossibleFramePermuations = permutations(playersWithBreaksAssigned.map(player => player.initial));

	const framePermutationsWithScore = allPossibleFramePermuations
		.map(framePermuation => getFramePermutationWithScore(framePermuation, playersWithBreaksAssigned, options.isSecondHalf))
		.filter(framePermuation => framePermuation != null);

	console.log(allPossibleFramePermuations.length);

	console.log(framePermutationsWithScore);

	if (!framePermutationsWithScore.length) {
		document.getElementById('errorText').innerText = 'No order found - please re-run to find another';
		return;
	}

	// TODO: Maybe draw this out as function
	const perfectPermutations = framePermutationsWithScore.filter(perm => perm.perfect);

	const index = perfectPermutations.length ? Math.floor(Math.random() * perfectPermutations.length) : Math.floor(Math.random() * framePermutationsWithScore.length)
	const selectedPermuation = perfectPermutations.length ? perfectPermutations[index].framePermutation : framePermutationsWithScore[index].framePermutation;

	document.getElementById('orderOne').innerText = `${selectedPermuation[0]}${framesInHalf[0] ? ' (B)' : ''}`;
	document.getElementById('orderTwo').innerText = `${selectedPermuation[1]}${framesInHalf[1] ? ' (B)' : ''}`;
	document.getElementById('orderThree').innerText = `${selectedPermuation[2]}${framesInHalf[2] ? ' (B)' : ''}`;
	document.getElementById('orderFour').innerText = `${selectedPermuation[3]}${framesInHalf[3] ? ' (B)' : ''}`;
	document.getElementById('orderFive').innerText = `${selectedPermuation[4]}${framesInHalf[4] ? ' (B)' : ''}`;
	if (!options.isSecondHalf) {
		document.getElementById('orderSix').innerText = `${selectedPermuation[5]}${framesInHalf[5] ? ' (B)' : ''}`;
	}
	console.log('Done');
}