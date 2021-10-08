// Current date

let currentDate = new Date();

let weekdays = [
  "Sunday",
  "Monday",
  "Thursday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let weekdaysShort = ["Sun", "Mon", "Thu", "Wed", "Thu", "Fri", "Sat"];

let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

let day = weekdays[currentDate.getDay()];
let date = currentDate.getDate();
date = `0${date}`.slice(-2);
let month = months[currentDate.getMonth()];
month = `0${month}`.slice(-2);
let year = currentDate.getFullYear();
year = year.toString().slice(-2);

let hours = currentDate.getHours();
hours = `0${hours}`.slice(-2);
let minutes = currentDate.getMinutes();
minutes = `0${minutes}`.slice(-2);
let seconds = currentDate.getSeconds();
seconds = `0${seconds}`.slice(-2);

let displayDate = document.querySelector("#current-date");
displayDate.innerHTML = `${day}, ${date}.${month}.${year} ${hours}:${minutes}:${seconds}`;

let futureDays = [];
let futureDates = [];
let futureMonths = [];

let ids = ["#future-1", "#future-2", "#future-3", "#future-4", "#future-5"];

for (let i = 0; i < 5; i++) {
  currentDate.setDate(currentDate.getDate() + 1);
  futureDays[i] = weekdaysShort[currentDate.getDay()];
  futureDates[i] = currentDate.getDate();
  futureDates[i] = `0${futureDates[i]}`.slice(-2);
  futureMonths[i] = months[currentDate.getMonth()];
  futureMonths[i] = `0${futureMonths[i]}`.slice(-2);
  let future = document.querySelector(ids[i]);
  future.innerHTML = `${futureDays[i]} </ br> ${futureDates[i]}.${futureMonths[i]}`;
}

// Current city
let conditions = [
  "Thunderstorm",
  "Drizzle",
  "Rain",
  "Snow",
  "Mist",
  "Smoke",
  "Haze",
  "Dust",
  "Fog",
  "Sand",
  "Dust",
  "Ash",
  "Squall",
  "Tornado",
  "Clear",
  "Clouds",
];

let messages = [
  "enjoy a tea and a good book at home!",
  "lorem ipsum dolor sit amet!",
  "don't forget your umbrella!",
  "gloves and a cap might be a good idea!",
  "lorem ipsum dolor sit amet!",
  "lorem ipsum dolor sit amet!",
  "lorem ipsum dolor sit amet!",
  "lorem ipsum dolor sit amet!",
  "lorem ipsum dolor sit amet!",
  "lorem ipsum dolor sit amet!",
  "lorem ipsum dolor sit amet!",
  "lorem ipsum dolor sit amet!",
  "lorem ipsum dolor sit amet!",
  "lorem ipsum dolor sit amet!",
  "have a wonderful day!",
  "lorem ipsum dolor sit amet!",
];

let pictures = [
  "thunderstorm",
  "drizzle",
  "rain",
  "snow",
  "fog",
  "fog",
  "fog",
  "fog",
  "fog",
  "placeholder",
  "placeholder",
  "placeholder",
  "placeholder",
  "placeholder",
  "sun",
  "clouds",
];

function showTemperature(response) {
  let location = response.data.name;
  let temperatureCurrent = Math.round(response.data.main.temp);
  let temperatureMin = Math.round(response.data.main.temp_min);
  // let temperatureMax = Math.round(response.data.main.temp_max);
  // let precipitation = "";
  let humidity = response.data.main.humidity;
  let windspeed = Math.round(response.data.wind.speed);
  let descriptionMain = response.data.weather[0].main;
  let description = response.data.weather[0].description;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = location;
  if (location.length > 6) {
    currentCity.style.fontSize = `${
      (1 / location.length) * 300 + 0.5 * location.length
    }pt`;
  } else {
    currentCity.style.fontSize = "50pt";
  }
  // let tempMin = document.querySelector("#today-min");
  // tempMin.innerHTML = temperatureMin;
  let tempMax = document.querySelector("#today-max");
  tempMax.innerHTML = temperatureCurrent;
  // let precip = document.querySelector("#today-precipitation");
  // precip.innerHTML = precipitation;
  let humid = document.querySelector("#today-humidity");
  humid.innerHTML = humidity;
  let wind = document.querySelector("#today-wind");
  wind.innerHTML = windspeed;
  let message = document.querySelector("#today-message");
  let picture = document.querySelector("#today-picture");
  if (conditions.includes(descriptionMain)) {
    message.innerHTML = `${description} - ${
      messages[conditions.indexOf(descriptionMain)]
    }`;
    picture.src = `images/${pictures[conditions.indexOf(descriptionMain)]}.jpg`;
  } else {
    message.innerHTML = description;
  }
}

function defaultLocation() {
  axios
    .get(`${apiRoot}${apiPath}?q=${defaultCity}&appid=${apiKey}&units=${unit}`)
    .then(showTemperature);
}

function changeLocation(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  if (searchCity.value !== "") {
    axios
      .get(
        `${apiRoot}${apiPath}?q=${searchCity.value}&appid=${apiKey}&units=${unit}`
      )
      .then(showTemperature);
  }
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  axios
    .get(
      `${apiRoot}${apiPath}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`
    )
    .then(showTemperature);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function randomLocation(event) {
  event.preventDefault();
  let cities = [
    "Yamoussoukro",
    "Abu Dhabi",
    "Abuja",
    "Accra",
    "Adamstown",
    "Addis Ababa",
    "Sana'a",
    "Algiers",
    "Alofi",
    "Amman",
    "Amsterdam",
    "The Hague",
    "Andorra la Vella",
    "Ankara",
    "Antananarivo",
    "Apia",
    "Ashgabat",
    "Asmara",
    "Asunción",
    "Athens",
    "Avarua",
    "Baghdad",
    "Baku",
    "Bamako",
    "Bandar Seri Begawan",
    "Bangkok",
    "Bangui",
    "Banjul",
    "Basseterre",
    "Beijing",
    "Beirut",
    "Belgrade",
    "Belmopan",
    "Berlin",
    "Bern",
    "Bishkek",
    "Bissau",
    "Cape Town",
    "Bogotá",
    "Plymouth",
    "Brasília",
    "Bratislava",
    "Brazzaville",
    "Bridgetown",
    "Brussels",
    "Bucharest",
    "Budapest",
    "Buenos Aires",
    "Cairo",
    "Canberra",
    "Caracas",
    "Castries",
    "Podgorica",
    "Charlotte Amalie",
    "Chișinău",
    "Cockburn Town",
    "Sri Jayawardenepura Kotte",
    "Conakry",
    "Copenhagen",
    "Dakar",
    "Damascus",
    "Dodoma",
    "Dhaka",
    "Dili",
    "Djibouti",
    "Doha",
    "Douglas",
    "Dublin",
    "Dushanbe",
    "El Aaiún",
    "Flying Fish Cove",
    "Freetown",
    "Funafuti",
    "Gaborone",
    "George Town",
    "Georgetown",
    "Georgetown",
    "Gibraltar",
    "Gitega",
    "Guatemala City",
    "Gustavia",
    "Hagåtña",
    "Hamilton",
    "Hanoi",
    "Harare",
    "Hargeisa",
    "Havana",
    "Helsinki",
    "Honiara",
    "Islamabad",
    "Jakarta",
    "Jamestown",
    "Jerusalem",
    "Ramallah",
    "Juba",
    "Kabul",
    "Kampala",
    "Kathmandu",
    "Khartoum",
    "Kigali",
    "Kingston",
    "Kingston",
    "Kingstown",
    "Kinshasa",
    "Kuala Lumpur",
    "Kuwait City",
    "Kyiv",
    "La Paz",
    "Libreville",
    "Lilongwe",
    "Lima",
    "Lisbon",
    "Ljubljana",
    "Lobamba",
    "Lomé",
    "London",
    "Luanda",
    "Lusaka",
    "Luxembourg",
    "Madrid",
    "Majuro",
    "Malabo",
    "Malé",
    "Managua",
    "Manama",
    "Manila",
    "Maputo",
    "Mariehamn",
    "Marigot",
    "Maseru",
    "Mata Utu",
    "Mexico City",
    "Minsk",
    "Mogadishu",
    "Monaco",
    "Monrovia",
    "Montevideo",
    "Moroni",
    "Moscow",
    "Muscat",
    "Nairobi",
    "Nassau",
    "Naypyidaw",
    "N'Djamena",
    "New Delhi",
    "Ngerulmud",
    "Niamey",
    "Nicosia",
    "Nouakchott",
    "Nouméa",
    "Nuku'alofa",
    "Nur-Sultan",
    "Nuuk",
    "Oranjestad",
    "Oslo",
    "Ottawa",
    "Ouagadougou",
    "Pago Pago",
    "Palikir",
    "Panama City",
    "Papeete",
    "Paramaribo",
    "Paris",
    "Philipsburg",
    "Phnom Penh",
    "Port Louis",
    "Port Moresby",
    "Port of Spain",
    "Port Vila",
    "Port-au-Prince",
    "Porto-Novo",
    "Prague",
    "Praia",
    "Pristina",
    "Pyongyang",
    "Quito",
    "Rabat",
    "Reykjavík",
    "Riga",
    "Riyadh",
    "Road Town",
    "Rome",
    "Roseau",
    "Saipan",
    "San José",
    "San Juan",
    "San Marino",
    "San Salvador",
    "Santiago",
    "Santo Domingo",
    "São Tomé",
    "Sarajevo",
    "Seoul",
    "Singapore",
    "Skopje",
    "Sofia",
    "South Tarawa",
    "St. George's",
    "St. Helier",
    "St. John's",
    "Saint Peter Port",
    "St. Pierre",
    "Stanley",
    "Stepanakert",
    "Stockholm",
    "Sukhumi",
    "Suva",
    "Taipei",
    "Tallinn",
    "Tashkent",
    "Tbilisi",
    "Tegucigalpa",
    "Tehran",
    "Thimphu",
    "Tirana",
    "Tiraspol",
    "Tokyo",
    "Tórshavn",
    "Tripoli",
    "Tskhinvali",
    "Tunis",
    "Ulaanbaatar",
    "Vaduz",
    "Valletta",
    "The Valley",
    "Vatican City",
    "Victoria",
    "Vienna",
    "Vientiane",
    "Vilnius",
    "Warsaw",
    "Washington",
    "Wellington",
    "West Island",
    "Willemstad",
    "Windhoek",
    "Yaoundé",
    "Yaren",
    "Yerevan",
    "Zagreb",
  ];
  let randomCity = cities[Math.floor(Math.random() * cities.length)];
  axios
    .get(`${apiRoot}${apiPath}?q=${randomCity}&appid=${apiKey}&units=${unit}`)
    .then(showTemperature);
}

let apiRoot = "https://api.openweathermap.org/";
let apiPath = "data/2.5/weather";
let apiKey = "210d99196a88b9257ed8cb3535a0a0c5";
let unit = "metric";
let defaultCity = "Vienna";

defaultLocation();

// Change location button
let buttonChange = document.querySelector("#button-change");
buttonChange.addEventListener("click", changeLocation);

// Current location button
let buttonCurrent = document.querySelector("#button-current");
buttonCurrent.addEventListener("click", currentLocation);

// Random location button
let buttonRandom = document.querySelector("#button-random");
buttonRandom.addEventListener("click", randomLocation);

// Temperature unit
function changeToFahrenheit(event) {
  event.preventDefault;
  let temperatures = document.querySelectorAll(".temperatures");
  for (let i = 0; i < temperatures.length; i++) {
    temperatures[i].innerHTML = Math.round(
      temperatures[i].innerHTML * (9 / 5) + 32
    );
    celsius.classList.remove("selected");
    fahrenheit.classList.add("selected");
  }
}

function changeToCelsius(event) {
  event.preventDefault;
  let temperatures = document.querySelectorAll(".temperatures");
  for (let i = 0; i < temperatures.length; i++) {
    temperatures[i].innerHTML = Math.round(
      (temperatures[i].innerHTML - 32) * (5 / 9)
    );
    fahrenheit.classList.remove("selected");
    celsius.classList.add("selected");
  }
}

let selectFahrenheit = document.querySelector("#fahrenheit");
selectFahrenheit.addEventListener("click", changeToFahrenheit);

let selectCelsius = document.querySelector("#celsius");
selectCelsius.addEventListener("click", changeToCelsius);
