const API_URL = 'http://localhost:5000';

const coins = document.querySelector('#container');

( async function getCoinsInfo(){
    try {
        const res = await fetch(`${API_URL}/coins`,{'mode' : 'cors'});
        const data = await res.json();
        console.log(data);

        data.forEach((coin) => {
            console.log('coin', coin)
            const card = document.createElement('div');
            card.classList.add('card');
            
            const name = coin.name;
            const price = coin.price;
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
} )()
