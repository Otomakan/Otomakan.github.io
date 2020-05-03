const fs = require('fs')

const allAnimals = []
fs.readdirSync(__dirname).forEach(file => {
	if (file.match(/.png/)) {
		// console.log(file.substr(4, file.length-4))
		// fs.rename(file, file.substr(4), ()=>{
			console.log(file.substr(0, file.length-4))
			allAnimals.push(file.substr(0, file.length-4))
		// })
	}
});

console.log(allAnimals)