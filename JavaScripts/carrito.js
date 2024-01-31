const btnCart = document.querySelector('.container-cart');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});

const cartEmpty = document.querySelector('.cart-empty');