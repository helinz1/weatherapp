const url = 'https://api.openweathermap.org/data/2.5/';
const key = '53cafde91394473eaa5a57ec35bb1449';

const enterKeyCode = '13';

const setQuery = async (e) => {
    if(e.keyCode == enterKeyCode){
        getResult(searchBar.value);
    }
};

//Bir .then() içinde return edilen şey, bir sonraki .then()in parametresi olur otomatik olarak. Promise zinciri

const getResult = (cityName) => {
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
    fetch(query)
    .then(weather => {
        return weather.json();  //apiden gelen bilgiyi jsona döndür ve bir sonraki aşamaya return
    })
    .then(result => {  // yukarıdan gelen bilgiler yani
        displayResult(result);
    })
}

// const getResult = async (cityName) => {
//     let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
//     const response = await fetch(query);
//     const jsonData = await response.json();
//     displayResult(jsonData);
// };

const displayResult = (result) => {
    let city = document.querySelector('.city');
    city.innerText = `${result.name}, ${result.sys.country}`;

    let temp = document.querySelector('.temp');
    temp.innerText = `${Math.round(result.main.temp)}°C`

    let desc = document.querySelector('.description');
    desc.innerText = result.weather[0].description;

    let minmax = document.querySelector('.minmax');
    minmax.innerText = `${Math.round(result.main.temp_min)}°C / ${Math.round(result.main.temp_max)}°C`
}

const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keypress', setQuery);