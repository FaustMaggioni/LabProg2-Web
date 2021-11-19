const API_URL = '/api/coins';
const todayURL = `http://localhost:5000/index.html`;

const coins = document.querySelector('#container');

const STEP = 10;
let from = 0;
let to = from + STEP;

async function getCoinsInfo(fromParam,toParam){
    try {
        const res = await fetch(`${API_URL}/${fromParam}/${toParam}`,{ 
            'method' : 'GET',
            'mode' : 'cors',
        });

        from = from + STEP;
        to = from + STEP;
        
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
            logo.classList.add('coin-info')

            appendToCard(card, title, visual_price, logo);
            
            coins.appendChild(card);
        })
    } catch (error) {
        console.log(error)
    } 
}

getCoinsInfo(from,to);

const loadMoreBtn = document.querySelector('#loadmore');
loadMoreBtn.addEventListener('click', () => getCoinsInfo(from,to))

function getCoinAttributes(coin){
    const isActual = window.location.href === todayURL;

    return {
        name: coin.name,
        price: (isActual ? coin.price : coin.price_last_week).toFixed(2),
        image: coin.image,
    }
}

function appendToCard(card, ...childrens){
    childrens.forEach((item) => {
        card.appendChild(item);
    })
}