const API_KEY = 'b45eba2ab6460466b581af175207a0e64ee9cfa35781238cd60e74ba9f20984c';
//const API_URL = `https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR&api_key=${API_KEY}`
const API_URL = 'http://localhost:3000/';

async function prueba(){
    try{ 
        const res = await fetch(API_URL, {
            'method' : 'GET',
            'mode': 'no-cors',
        })
        console.log(res)
    }catch(e){
        console.log(e);
    }
};

prueba();