const today = new Date();
const day = today.getDate();
const month = (today.getMonth() + 1).toString().padStart(2, "0");
const year = today.getFullYear();
const updatedDate = `${day}/${month}/${year}`;

const country = [
  "Ireland",
  "Russia",
  "Latvia",
  "United Kingdom",
  "Ukraine",
  "Germany",
  "Spain",
  "France",
];

const displayData = (cases) => {
  const {
    Country = cases.country,
    capitalCity = cases.capital_city,
    confirmed = cases.confirmed,
    recovered = cases.recovered,
    deaths = cases.deaths,
    population = cases.population,
    lifeExpectancy = cases.life_expectancy,
    abbreviation = cases.abbreviation,
    update = updatedDate,
  } = cases;

  document.querySelector("tbody").insertAdjacentHTML(
    "beforeend",
    `
      <tr>
      <td>${Country}</td>
      <td>${capitalCity}</td>
      <td>${confirmed}</td>
      <td>${recovered}</td>
      <td>${deaths}</td>
      <td>${population}</td>
      <td>${lifeExpectancy}</td>
      <td>${abbreviation}</td>
      <td>${update}</td>
      </tr>
      `
  );
};

const getData = async () => {
  for (const item of country) {
    try {
      const response = await fetch(
        `https://covid-api.mmediagroup.fr/v1/cases?country=${item}`
      );
      const data = await response.json();
      displayData(data.All);
    } catch (err) {
      console.log(err);
    }
  }
};

getData();

const createCountryList = async () => {
  try {
    const response = await fetch("countries.json");
    const data = await response.json();
    document.getElementById("countryList").innerHTML = `
  <select onchange="loadByCountry(this.value)">
  <option>Choose a country</option>
  ${data
    .map((country) => {
      return `
          <option>${country}</option>
          `;
    })
    .join("")}
  </select>
  `;
  } catch (err) {
    console.log(err);
  }
};

createCountryList(country);

const loadByCountry = async (country) => {
  if (country !== "Choose a country") {
    try {
      const response = await fetch(
        `https://covid-api.mmediagroup.fr/v1/cases?country=${country}`
      );
      const data = await response.json();
      const cases = data.All;
      const {
        capitalCity = cases.capital_city,
        confirmed = cases.confirmed,
        recovered = cases.recovered,
        deaths = cases.deaths,
        population = cases.population,
        lifeExpectancy = cases.life_expectancy,
        abbreviation = cases.abbreviation,
        update = updatedDate,
      } = cases;
      document.querySelector("tbody").insertAdjacentHTML(
        "beforeend",
        `
        <tr>
        <td>${country}</td>
        <td>${capitalCity}</td>
        <td>${confirmed}</td>
        <td>${recovered}</td>
        <td>${deaths}</td>
        <td>${population}</td>
        <td>${lifeExpectancy}</td>
        <td>${abbreviation}</td>
        <td>${update}</td>
        </tr>

  `
      );
    } catch (err) {
      console.log(err);
    }
  }
};
