const temperateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

let target = "Mumbai";

const fetchData = async (target) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key= 89a662c0b69f4798a2e144524220912&q=${target}`;

    const response = await fetch(url);

    const data = await response.json();

    // console.log(data);

    const {
      current: {
        temp_c,
        condition: { text, icon },
      }, //data destructuring
      location: { name, localtime },
    } = data;

    // updateDom(data.current.temp_c, data.location.name);
    updateDom(temp_c, name, localtime, icon, text);
  } catch (error) {
    alert("Please put valid Location!");
  }
};

const updateDom = (temperate, city, time, emoji, text) => {
  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];
  const exactDay = getFullDayName(new Date(exactDate).getDay());

  temperateField.innerText = temperate;
  cityField.innerText = city;
  dateField.innerText = `${exactTime} - ${exactDay} ${exactDate}`;
  emojiField.src = emoji;
  weatherField.innerText = text;
};

fetchData(target);

function getFullDayName(num) {
  switch (num) {
    case 0:
      return "Sunday";
      break;

    case 1:
      return "Monday";
      break;

    case 2:
      return "Tuesday";
      break;

    case 3:
      return "Wednesday";
      break;

    case 4:
      return "Thursday";
      break;

    case 5:
      return "Friday";
      break;

    case 6:
      return "Saturday";
      break;

    default:
      return "Dont Know";
  }
}

const search = (e) => {
  e.preventDefault();

  target = searchField.value;
  fetchData(target);
};

form.addEventListener("submit", search);
