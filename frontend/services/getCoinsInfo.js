const API_URL = 'http://localhost:5000/coins';

const coins = document.querySelector('#container');

const baseURL = 'http://127.0.0.1:5500/frontend/';
const todayURL = `${baseURL}index.html`;

(async function getCoinsInfo(){
    try {
        const res = await fetch(API_URL,{ 'mode' : 'cors' });
        const data = await res.json();
        
        data.forEach((coin) => {
            const card = document.createElement('div');
            card.classList.add('card');
            
            const { name, price, image } = getCoinAttributes(coin);

            const title = document.createElement('p');
            title.textContent = name;

            const visual_price = document.createElement('p');
            visual_price.classList.add('price');
            visual_price.textContent = `$${price}`;

            const logo = document.createElement('img');
            logo.src = image;

            appendToCard(card, title, visual_price, logo);
            
            coins.appendChild(card);
        })
    } catch (error) {
        console.log(error)
    } 
})()

function getCoinAttributes(coin){
    try {
        const isActual = window.location.href === todayURL;
        const name = coin.name;
        const price = (isActual ? coin.price : coin.price_last_week).toFixed(2);
        const image = coin.image;

        return {
            name,
            price,
            image
        }
    } catch (error) {
        throw new Error(error)
    }
}

function appendToCard(card, ...childrens){
    childrens.forEach((item) => {
        card.appendChild(item);
    })
}