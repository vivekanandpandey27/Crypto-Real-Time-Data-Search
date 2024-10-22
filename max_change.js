let response = await fetch('https://api.coincap.io/v2/assets');
    let data = await response.json();
let coin_name2 = 'ethereum';
   
     //Searching desired coin 
    let coinArray = data.data;
    let max_c = 0;
    let max_c_index = -1;

    for(let key  in coinArray)
    {
        if(Math.abs(coinArray[key].changePercent24Hr) > Math.abs(max_c))
        {
            max_c = coinArray[key].changePercent24Hr;
            max_c_index = key;
        }
    }
console.log(max_c);
console.log(coinArray[max_c_index]);