const content = document.querySelector('.content');

function getPageId() {
    const id = sessionStorage.getItem('id');
    return id;
}

async function getSingleCoinData() {
    const id = getPageId();
    const res = await fetch(`api/coin/${id}`,{ 
        'method' : 'GET',
        'mode' : 'cors',
    });
    const coinInfo = await res.json();
    console.log(coinInfo)
    const { name, image, marketRank, date, description, price, priceLastWeek} = coinInfo;
    const title = document.querySelector('.title');
    title.innerText = name;
    const todayPrice = document.createElement('h2');
    todayPrice.innerText = `Precio hoy: ${price}`
    const oldPrice = document.createElement('h2');
    oldPrice.innerText = `Precio hace 7 dias: ${priceLastWeek}`
    const rank = document.createElement('h5');
    rank.innerText = `Ranking en el mercado: ${marketRank}`;
    const icon = document.createElement('img');
    icon.src = image;
    icon.id = 'bigicon';
    const releaseDate = document.createElement('h3');
    releaseDate.innerText = date && `Fecha de creacion ${date}`
    const coinDescription = document.createElement('p');
    coinDescription.innerHTML = description;
    addToContent(rank, todayPrice, oldPrice, icon, releaseDate, coinDescription);
}

function addToContent(...args) {
    for (let i in args) {
        content.appendChild(args[i]);
    }
}

getSingleCoinData();