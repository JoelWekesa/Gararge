//? code to generate random 6 numbers
const random = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports = {
	random,
};

//? End
