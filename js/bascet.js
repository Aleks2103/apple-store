let bascet = document.getElementsByClassName('bascet');
const allBtnPrimary = document.querySelectorAll('.btn-primary');
let cartContentList = document.getElementsByClassName('add-card');
let numItems = document.querySelector('.numItems');
let fullPrice = document.querySelector('.fullPrice')
let numAllItens = document.querySelector('.numAllItems')
let price = 0;
const randomId = () => {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
const priceWithoutSpaces = (str) => {
	return str.replace(/\D+/g,"");
};
const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};
const plusFullPrice = (currentPrice) => {
	return price += currentPrice;
};
const minusFullPrice = (currentPrice) => {
	return price -= currentPrice;
};
let printNumItems = () => {
    let prodLenth = document.getElementsByClassName('add-card')[0].children.length;
    numItems.textContent = prodLenth;
    numAllItens.textContent = prodLenth;
    // productsListLength > 0 ? cart.classList.add('active') : cart.classList.remove('active');
};
const printFullPrice = () => {
	fullPrice.textContent = `${normalPrice(price)} $`;
};
const generateCart = (img, title, price, id) => {
    return `
    <div class="bascet-prod-card" id="${id}">
    <img src="${img}" alt="">
     <div class="body-bas-cart">
         <h5>${title}</h5>
         <div class="b-prise">${normalPrice(price)} $</div>
     </div>
     <button class="arrow-left">-</button>
     <h5 class='countItemInCard'>0</h5>
     <button class="arrow-right">+</button>
     <button class="close-card">X</button>
    </div> 
    `;
};

// const deleteProducts = (productParent) => {
// 	let id = productParent.querySelector('.bascet-prod-card').id;
// 	document.querySelector(`.bascet-prod-card[data-id="${id}"]`).querySelector('.close-card');
	
// 	let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.b-prise').textContent));
// 	minusFullPrice(currentPrice);
// 	printFullPrice();
// 	productParent.remove();

// 	printNumItems();
// };

allBtnPrimary.forEach(el => {
	el.closest('.card').setAttribute('data-id', randomId());

	el.addEventListener('click', (e) => {
		e.stopPropagation()
		let self = e.currentTarget;
		let parent = self.closest('.card');
		let id = parent.dataset.id;
		let img = parent.querySelector('.card-img-top').getAttribute('src');
		let title = parent.querySelector('.card-title').textContent;
		let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.card-text').textContent));
		plusFullPrice(priceNumber);
		cartContentList[0].insertAdjacentHTML('afterbegin', generateCart(img, title, priceNumber, id));
		printNumItems();
		console.log(self)
		self.classList.toggle('disabled')
		console.log(self)
		let close = document.querySelector('.close-card');
		close.addEventListener('click', (event) => {
		if(event.target.classList.contains('close-card')) {
        event.target.parentElement.remove()
    		};
		})
		let originalPrise = priceWithoutSpaces(document.querySelector('.b-prise').textContent)
		let arrowLeft = document.querySelector('.arrow-left');
		let arrowRight = document.querySelector('.arrow-right');
		let countItemInCard = document.querySelector('.countItemInCard');
		arrowLeft.addEventListener('click', (e) => {
			if(!(+countItemInCard.textContent == 0)){
			countItemInCard.innerHTML = +countItemInCard.innerHTML -1;
			numAllItens.innerHTML = +numAllItens.innerHTML -1;
			let getTotalPrise = priceWithoutSpaces(document.querySelector('.fullPrice').textContent)
			let dPrise = document.querySelector('.b-prise').textContent;
			let plusPris = +priceWithoutSpaces(dPrise) - +priceWithoutSpaces(originalPrise);
			document.querySelector('.b-prise').textContent = normalPrice(plusPris)
			fullPr = +getTotalPrise - +originalPrise;
			console.log(getTotalPrise)
			document.querySelector('.fullPrice').textContent = normalPrice(fullPr) + '$'
			}
		})
		arrowRight.addEventListener('click', (e) =>{
			countItemInCard.innerHTML = +countItemInCard.innerHTML +1;
			numAllItens.innerHTML = +numAllItens.innerHTML +1;
			let dPrise = document.querySelector('.b-prise').textContent;
			let plusPris = +priceWithoutSpaces(dPrise) + +priceWithoutSpaces(originalPrise);
			document.querySelector('.b-prise').textContent = normalPrice(plusPris)
			let getTotalPrise = priceWithoutSpaces(document.querySelector('.fullPrice').textContent)
			fullPr = +getTotalPrise + +originalPrise;
			console.log(getTotalPrise)
			document.querySelector('.fullPrice').textContent = normalPrice(fullPr) + '$'
		})
		printFullPrice();
		
		
	});
});

const hiddenBascet = document.querySelector('.bascet');
hiddenBascet.addEventListener('click', (e) =>{
    document.getElementsByClassName('cardBascet')[0].classList.toggle('hidden')
})



