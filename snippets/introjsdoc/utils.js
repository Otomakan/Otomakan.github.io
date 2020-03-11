/**
 * @returns string
 */
const getRandomVeganAdjective = () => {
	const veganAdjectives = [
		'cruelty free',
		'green',
		'vegan',
	];
	const randomSeed = Math.floor(Math.random()* veganAdjectives.length);
	return veganAdjectives[randomSeed];
};
module.exports = {
	getRandomVeganAdjective
};