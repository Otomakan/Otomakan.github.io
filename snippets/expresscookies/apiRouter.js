
const express = require('express');
const router = express.Router();


router.get('/product/all', (req, res) => {
	// This array simulates our database
	const allProducts = [
		{name: 'blue cheese', type:'cheese'},
		{name: 'brocolli', type: 'vegetable'},
		{name: 'cookie', type: 'snack'}
	];
	res.status(200).send(allProducts);
});

// 
router.post('/cart', (req, res) => {
	console.log('body');
	console.log(req.body);
	const cart = req.session.cart;
	const productName = req.body.productName;
	// Fancy trick to do += 1 on an object and set value to one if the key doesn't exist
	cart[productName] = -~ cart[productName];
	return res.status(200).send('success');
});

router.get('/cart', (req, res) => {
	const cart = req.session.cart;
	res.status(200).send(cart);
});
// 
router.post('/checkout', (req, res)=> {
	// Checking out code...
	// We want to clear the cookies 
	res.clearCookie('userId');
});

module.exports = router;