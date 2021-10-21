const API_URL = 'http://localhost:5000';

const coins = document.querySelector('#container');

const baseURL = 'http://127.0.0.1:5500/frontend/';
const todayURL = `${baseURL}index.html`;

(async function getCoinsInfo(){
    try {
        const res = await fetch(`${API_URL}/coins`,{'mode' : 'cors'});
        const data = await res.json();
        
        const isActual = window.location.href === todayURL;

        data.forEach((coin) => {
            console.log('coin', coin)
            const card = document.createElement('div');
            card.classList.add('card');
            
            const name = coin.name;
            const price = (isActual ? coin.price : coin.price_last_week).toFixed(2);
            const image = coin.image;

            const title = document.createElement('p');
            title.textContent = name;

            const visual_price = document.createElement('p');
            visual_price.classList.add('price');
            visual_price.textContent = `$${price}`;

            const logo = document.createElement('img');
            logo.src = image;

            card.appendChild(title);
            card.appendChild(visual_price);
            card.appendChild(logo);

            coins.appendChild(card);
        })
    } catch (error) {
        console.log(error)
    } 
})()