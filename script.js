const coin = document.querySelector("#Search");

const deatils = document.querySelector("#price_deatils");

const image = document.querySelector("#img");

const submit = document.querySelector("#submit");

const coin_symbol_field = document.querySelector("#coin_symbol_field");

const Result_area = document.querySelector("#Result_area");

const animation = document.querySelector("#animation");

const price_change = document.querySelector("#price_change");

const change_percentage = document.querySelector("#change_percentage");

const most_positive_24h = document.querySelector("#most_positive_24h");

const most_negative_24h = document.querySelector("#most_negative_24h");

const trend_price_deatils = document.querySelector("#trend_price_deatils");

const trend_price_change = document.querySelector("#trend_price_change");

const img_most_positive_24h = document.querySelector("#img_most_positive_24h");

const trend_coin_name = document.querySelector("#trend_coin_name");

const img_most_negative_24h = document.querySelector("#img_most_negative_24h");

const trend_coin_symbol = document.querySelector("#trend_coin_symbol");

const neg_trend_coin_symbol = document.querySelector("#neg_trend_coin_symbol");

const neg_trend_coin_name = document.querySelector("#neg_trend_coin_name");

const neg_trend_price_deatils = document.querySelector("#neg_trend_price_deatils");

const neg_trend_price_change = document.querySelector("#neg_trend_price_change");

const Right = document.querySelector("#Right");

const Left = document.querySelector("#Left");

async function get() 
{
    // Start Animation Until Loading Done
    Result_area.classList.remove('flex');
    Result_area.classList.remove('flex-col');
    Result_area.classList.add('hidden');
    animation.classList.remove('hidden');

    //Coin Price Fetching 
    let coin_name = coin.value.toLowerCase();

    let a = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin_name}&vs_currencies=usd`);
    let b = await a.json();
    let x = b[coin_name];
    let y = x['usd'];
    

    //Coin Symbol Fetching
    let coin_name2 = coin_name;  
    let response = await fetch('https://api.coincap.io/v2/assets');
    let data = await response.json();

   
     //Searching desired coin 
    let coin2 = data.data.find(c => c.name.toLowerCase() === coin_name2.toLowerCase());
    


    //API for searching Coin Image
    let coin_symbol = coin2['symbol'];  // You can use the symbol of the cryptocurrency
    let d = await fetch('https://min-api.cryptocompare.com/data/all/coinlist');
    let e = await d.json();
    let image_url = `https://www.cryptocompare.com${e.Data[coin_symbol].ImageUrl}`;
    
    

    //Resetting Result Area 
    Result_area.classList.add('flex');
    Result_area.classList.add('flex-col');
    Result_area.classList.remove('hidden');
    animation.classList.add('hidden');

    let change_24h = coin2['changePercent24Hr'];
    if(change_24h > 0) change_percentage.classList.add('text-green-600');
    else change_percentage.classList.add('text-red-600');
    change_percentage.innerHTML = change_24h+" %";

    coin_symbol_field.innerHTML = coin_symbol;
    price_deatils.innerHTML = "Price : "+y+" USD ";
    image.src = image_url;
    
}

async function util() 
{
    let response = await fetch('https://api.coincap.io/v2/assets');
    let data = await response.json();
   
    //Searching desired coin 
    let coinArray = data.data;
    let max_c = 0;
    let max_c_index = -1;

    for(let key  in coinArray)
    {
        if(parseFloat(coinArray[key].changePercent24Hr) > (max_c))
        {
            max_c = coinArray[key].changePercent24Hr;
            max_c_index = key;
        }
    }

    //Update Animation Price
    Left.classList.add('shadow-green-500');
    

       setTimeout(function() {
           Left.classList.remove('shadow-green-500');
       }, 1000);

    let x = coinArray[max_c_index]
    trend_price_deatils.innerHTML = "Price : "+x.priceUsd + " USD";
    trend_price_change.innerHTML = "Change : " + x.changePercent24Hr + " %";    
    
    let coin_symbol = x['symbol'] // You can use the symbol of the cryptocurrency

    let coin_name = x['id'];

    trend_coin_name.innerHTML = coin_name;
    trend_coin_symbol.innerHTML = coin_symbol;

    let d = await fetch('https://min-api.cryptocompare.com/data/all/coinlist');
    let e = await d.json();
    let image_url = `https://www.cryptocompare.com${e.Data[coin_symbol].ImageUrl}`;


    img_most_positive_24h.src = image_url;

}

async function util2() 
{
    let response = await fetch('https://api.coincap.io/v2/assets');
    let data = await response.json();
   
    //Searching desired coin 
    let coinArray = data.data;
    let max_c = 1000000000;
    let max_c_index = -1;

    for(let key  in coinArray)
    {
        if(parseFloat(coinArray[key].changePercent24Hr) < (max_c))
        {
            max_c = coinArray[key].changePercent24Hr;
            max_c_index = key;
        }
    }

   
       Right.classList.add('shadow-red-500');
    

       setTimeout(function() {
           Right.classList.remove('shadow-red-500');
       }, 1000);
  

    

    let x = coinArray[max_c_index]
    neg_trend_price_deatils.innerHTML = "Price : "+x.priceUsd + " USD";
    neg_trend_price_change.innerHTML = "Change : " + x.changePercent24Hr + " %";    
    
    let coin_symbol = x['symbol'] // You can use the symbol of the cryptocurrency

    let coin_name = x['id'];
    neg_trend_coin_symbol.innerHTML = coin_symbol;
    neg_trend_coin_name.innerHTML = coin_name;

    let d = await fetch('https://min-api.cryptocompare.com/data/all/coinlist');
    let e = await d.json();
    let image_url = `https://www.cryptocompare.com${e.Data[coin_symbol].ImageUrl}`;


    img_most_negative_24h.src = image_url;
}

setInterval(util2, 20000);
setInterval(util, 20000);
util();
util2();
submit.addEventListener("click",get);


