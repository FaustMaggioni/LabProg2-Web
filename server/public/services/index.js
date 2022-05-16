const todayURL = `https://lab-prog2-web.vercel.app/`;

const coins = document.querySelector("#container");

const STEP = 10;
let from = 0;
let to = from + STEP;

async function getCoinsInfo(fromParam, toParam) {
  try {
    const res = await fetch(`api/coins/?from=${fromParam}&to=${toParam}`, {
      method: "GET",
      mode: "cors",
    });

    console.log(res);

    from = from + STEP;
    to = from + STEP;

    const data = await res.json();

    data.forEach((coin) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const { name, price, image, id } = getCoinAttributes(coin);
      card.id = id;
      const title = document.createElement("p");
      title.textContent = name;

      const visual_price = document.createElement("p");
      visual_price.classList.add("price");
      visual_price.textContent = `$${price}`;

      const logo = document.createElement("img");
      logo.src = image;
      logo.classList.add("coin-info");

      appendToCard(card, title, visual_price, logo);
      setCardListener(card);

      coins.appendChild(card);
    });
  } catch (error) {
    console.log(error);
  }
}

getCoinsInfo(from, to);

const loadMoreBtn = document.querySelector("#loadmore");
loadMoreBtn.addEventListener("click", () => getCoinsInfo(from, to));

function getCoinAttributes(coin) {
  const isActual = window.location.href === todayURL;

  return {
    name: coin.name,
    price: isActual ? coin.price : coin.price_last_week,
    image: coin.image,
    id: coin.id,
  };
}

function appendToCard(card, ...childrens) {
  childrens.forEach((item) => {
    card.appendChild(item);
  });
}

function setCardListener(card) {
  card.addEventListener("click", () => {
    sessionStorage.setItem("id", card.id);
    window.location.href = `/coin.html`;
  });
}
