const capitalize = (str) => {
	return str[0].toUpperCase() + str.substr(1, str.length-1);
};

const addProduct = async (productName) => {
	try {
		console.log('product', productName);
		await fetch('/api/cart',{
			method:'post',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			// "Content-Type": "application/x-www-form-urlencoded",
			}, body: JSON.stringify({productName})});
		refreshProductList(); 
	} catch(e) {
		alert('Something went wrong adding a product'); 
	}
};

const getCart = async () => {
	try {
		const res = await fetch('/api/cart');
		console.log(res);
		const cartContent = await res.json();
		console.log(cartContent);
		return cartContent;
	} catch (e) {
		console.log(e);
	}
};

const createNewProductItem = (product) => {
	const newProductDiv = document.createElement('div');
	newProductDiv.innerHTML = capitalize(product.name) + ' ' + capitalize(product.type);
	const addProductButton = document.createElement('button');
	addProductButton.onclick = ()=>{addProduct(product.name);};
	addProductButton.innerHTML = '+';
	newProductDiv.appendChild(addProductButton);
	return newProductDiv;
};

const refreshProductList = async () => {
	const res = await fetch('/api/product/all');
	const allProducts = await res.json();
	const itemListDiv = document.getElementById('all-products');
	itemListDiv.innerHTML = '';
	allProducts.forEach((product)=> {
		const newProductDiv = createNewProductItem(product);
		itemListDiv.appendChild(newProductDiv);
	});
	displayCart();
};

const createNewCartItem = (productName, units) => {
	const newProductDiv = document.createElement('div');
	newProductDiv.innerHTML = capitalize(productName) + ': ' + units;
	return newProductDiv;
};

const displayCart = async () => {
	const cartItems = await getCart();
	const cartDiv = document.getElementById('cart');
	cartDiv.innerHTML = '';

	Object.keys(cartItems).forEach(productName => {
		const newCartItem = createNewCartItem(productName, cartItems[productName]);
		cartDiv.appendChild(newCartItem);
	});

};

(async ()=>{
	refreshProductList();
})();