// const getInitialAllocation = initialArray => {
// 	if (!initialArray.length) return null;
// 	if (initialArray.length == 1) return initialArray[0].initial;
// 	if (initialArray.length == 2 && [0, 2].includes(initialArray.filter(player => player.wouldPreferToRef).length)) return Math.random() < 0.5 ? initialArray[0].initial : initialArray[1].initial;
// 	if (initialArray.length == 2 && initialArray.filter(player => player.wouldPreferToRef).length == 1) return initialArray.find(player => player.wouldPreferToRef).initial;
// }

// const getInitialsNotAllocatedJoinedUnlessPlayingFrame = (notAllocatedInitials, cannotRefInitials) =>
// 	notAllocatedInitials.filter(initial => !cannotRefInitials.includes(initial)).join('/');

function selectOrder(options, players) {
	console.log(options);
	console.log(players);
	// const playing = [
	// 	players.find(player => player.initial == one),
	// 	players.find(player => player.initial == two),
	// 	players.find(player => player.initial == three),
	// 	players.find(player => player.initial == four),
	// 	players.find(player => player.initial == five),
	// 	players.find(player => player.initial == six)
	// ];

	// const wantsToRefOptions = [
	// 	[...playing[1].preferenceBefore ? [playing[1]] : []],
	// 	[...!playing[0].preferenceBefore ? [playing[0]] : [], ...playing[2].preferenceBefore ? [playing[2]] : []],
	// 	[...!playing[1].preferenceBefore ? [playing[1]] : [], ...playing[3].preferenceBefore ? [playing[3]] : []],
	// 	[...!playing[2].preferenceBefore ? [playing[2]] : [], ...playing[4].preferenceBefore ? [playing[4]] : []],
	// 	[...!playing[3].preferenceBefore ? [playing[3]] : [], ...playing[5].preferenceBefore ? [playing[5]] : []],
	// 	[...!playing[4].preferenceBefore ? [playing[4]] : []]
	// ];

	// const cannotRefOptions = [
	// 	[playing[0].initial, ...!playing[1].preferenceBefore ? [playing[1].initial] : []],
	// 	[playing[1].initial, ...playing[0].preferenceBefore ? [playing[0].initial] : [], ...!playing[2].preferenceBefore ? [playing[2].initial] : []],
	// 	[playing[2].initial, ...playing[1].preferenceBefore ? [playing[1].initial] : [], ...!playing[3].preferenceBefore ? [playing[3].initial] : []],
	// 	[playing[3].initial, ...playing[2].preferenceBefore ? [playing[2].initial] : [], ...!playing[4].preferenceBefore ? [playing[4].initial] : []],
	// 	[playing[4].initial, ...playing[3].preferenceBefore ? [playing[3].initial] : [], ...!playing[5].preferenceBefore ? [playing[5].initial] : []],
	// 	[playing[5].initial, ...playing[4].preferenceBefore ? [playing[4].initial] : []]
	// ]

	// const initialAllocation = wantsToRefOptions.map(getInitialAllocation);

	// const initialsNotAllocatedFrame = playing.map(player => player.initial).filter(initial => !initialAllocation.includes(initial));

	// const fullAllocation = initialAllocation.map((initial, index) =>
	// 	initial ||
	// 	getInitialsNotAllocatedJoinedUnlessPlayingFrame(initialsNotAllocatedFrame, cannotRefOptions[index]) ||
	// 	players.filter(player => !cannotRefOptions[index].includes(player.initial)).map(player => player.initial).join('/')
	// );

	// document.getElementById('orderOne').innerText = `${fullAllocation[0]}${initialAllocation[0] ? ' *' : ''}`;
	// document.getElementById('orderTwo').innerText = `${fullAllocation[1]}${initialAllocation[1] ? ' *' : ''}`;
	// document.getElementById('orderThree').innerText = `${fullAllocation[2]}${initialAllocation[2] ? ' *' : ''}`;
	// document.getElementById('orderFour').innerText = `${fullAllocation[3]}${initialAllocation[3] ? ' *' : ''}`;
	// document.getElementById('orderFive').innerText = `${fullAllocation[4]}${initialAllocation[4] ? ' *' : ''}`;
	// document.getElementById('orderSix').innerText = `${fullAllocation[5]}${initialAllocation[5] ? ' *' : ''}`;

	document.getElementById('orderOne').innerText = 'ONE';
	document.getElementById('orderTwo').innerText = 'TWO';
	document.getElementById('orderThree').innerText = 'THREE';
	document.getElementById('orderFour').innerText = 'FOUR';
	document.getElementById('orderFive').innerText = 'FIVE';
	document.getElementById('orderSix').innerText = 'SIX';
	console.log('Done');
}