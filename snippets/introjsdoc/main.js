const { getRandomVeganAdjective } =  require('./utils');


/**
 * @typedef {Object} Food
 * @property {string} name - What the food should be called
 * @property {('meat' | 'veggie' | 'other')} type - The food's type
 */
/**
* This function turns a string into a veganized version of the food
* For example 'beef' will turn into 'vegan beef'
* @param {string} food the food item we want to veganize
* @returns {string} the veganized version of our food name
*/
function getVeganFood (food) {
	const veganizedFood = 'vegan ' + food;
	return  veganizedFood;
}

/**
 * This function will veganize your shopping list
 * It will turn every meat option into a veganized version of the meat
 * For example if we enter 
 * @param {Array<Food>} arrayOfFoods Your shopping list
 *  @returns {Array<Food>} the veganized version of our shopping list
 */
const veganizeManyFoods = (arrayOfFoods) => {
	return arrayOfFoods.map(food=> {
		if (food.type === 'veggie')
			console.log('this is a vegetable!');
		// VS Code automatically cheks if type is one of "meat", "veggie" or "other"
		if (food.type === 'cheese')
			food.name = getVeganFood('cheese');
		if(food.type === 'meat'){
			// VS Code send an error because the food object is not a string
			food.name = getVeganFood(food.name);
		}

		return food;
	});
};

// We can also comment variables and assign a type to them
/**
 * The list of items we want to purchase
 * @type {Array<Food>}
 */
const shoppingList = [
	{name:'steak', type: 'meat'},
	{name:'Chocolate Bar', type: 'snack'},
	{name:'Artichoke', type: 'veggie'}
];
/**
 * The vegan version of our shopping list
 * @type {Array<Food>}
 */
const veganShoppingList = veganizeManyFoods(shoppingList);
console.log(veganShoppingList);