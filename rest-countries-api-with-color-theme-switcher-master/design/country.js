async function getCountry() {
    const url = await fetch("https://restcountries.com/v2/all");
    /*const url=await fetch("./data.json");*/
    const res = await url.json();
    /*console.log(res);*/
    res.forEach(element => {
        displayCountry(element)
    });
}
getCountry();

const countryEle = document.querySelector(".countries");
function displayCountry(data) {
    const country = document.createElement("div");
    country.classList.add("country");
    /*country.onclick.add("javascript:clickinner()");*/
    /*country.href = `/countryDetail.html?name=${data.name.common}`*/
    country.innerHTML = ` <div class="country-flag">
    <img src="${data.flag}" alt="">
    </div>
    <div class="country-details">
    <h5 class="countryname"> ${data.name}</h5>
    <p><strong>Population: </strong> ${data.population.toLocaleString('en-IN')}</p>
    <p class="flag-region"><strong>Region: </strong> ${data.region}</p>
    <p><strong>Capital: </strong> ${data.capital}</p>
    </div>`;
    countryEle.appendChild(country);
    country.addEventListener("click", () => {
        showDetailCountry(data);
    })
}

const filterEle = document.querySelector(".filter");
const optionsEle = document.querySelector(".options");
filterEle.addEventListener("click", () => {
    optionsEle.classList.toggle("hiddenOptions");
})

const regionEle = document.querySelectorAll(".region");
const flag_regionEle = document.getElementsByClassName("flag-region");
regionEle.forEach(ele => {
    ele.addEventListener("click", () => {
        Array.from(flag_regionEle).forEach(element => {
            if (element.innerText.includes(ele.innerText)) {
                element.parentElement.parentElement.style.display = "grid";
            }
            else {
                element.parentElement.parentElement.style.display = "none";
            }
        });
        /*console.log(ele.innerText);*/
    })
});

const searchEle = document.querySelector(".search");
console.log(searchEle);
const countryName = document.getElementsByClassName("countryname");
searchEle.addEventListener("input", () => {
    Array.from(countryName).forEach(element => {
        /*console.log(element.innerText)*/
        if (element.innerText.toLowerCase().includes(searchEle.value.toLowerCase())) {
            element.parentElement.parentElement.style.display = "grid";
        }
        else {
            element.parentElement.parentElement.style.display = "none";
        }
    });
})
const backEle = document.querySelector("#box");
console.log(backEle);
const countryDescription = document.querySelector(".countryDescription");
console.log(countryDescription);
backEle.addEventListener("click", () => {
    countryDescription.classList.toggle("show");
})

const description = document.querySelector(".description")
/*const Name = document.querySelector(".head-name");*/
const flagImage = document.querySelector('.description img')
const countryNameH1 = document.querySelector('.head-name')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.coun-region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.border-countries')

function showDetailCountry(data) {
    countryDescription.classList.toggle("show");
    /*description.innerHTML += `
                <div class="left-des">
                    <img src="${data.flag}" alt="">
                </div>
                <div class="right-des">
                    <h1>${data.name}</h1>
                    <div class="subpart">
                        <div class="innerLeft-des">
                            <p><strong>Native Name: </strong> ${data.nativeName}</p>
                            <p><strong>Population: </strong> ${data.population.toLocaleString('en-IN')}</p>
                            <p><strong>Region: </strong> ${data.region}</p>
                            <p><strong>Sub Region: </strong> ${data.subregion}</p>
                            <p><strong>Capital: </strong> ${data.capital}</p>
                        </div>
                        <div class="innerRight-des">
                            <p><strong>Top Level Domain: </strong> ${data.topLevelDomain.map(ele => ele)}</p>
                            <p><strong>Currencies: </strong> ${data.currencies.map(ele => ele.name)}</p>
                            <p><strong>Languages: </strong> ${data.languages.map(ele => ele.name)}</p>
                        </div> 
                    </div> 
                    <p class="border"><strong>Border Countries: </strong>${data.borders.map(ele=>ele)}</p>
                </div>` ;*/
    flagImage.src = data.flags.svg;
    countryNameH1.innerText = data.name;
    nativeName.innerText = data.nativeName;
    population.innerText = data.population.toLocaleString('en-IN')
    region.innerText = data.region;
    topLevelDomain.innerText = data.topLevelDomain.map(ele => ele);
    if (data.capital) {
        capital.innerText = data.capital;
    }
    if (data.subregion) {
        subRegion.innerText = data.subregion
    }
    if (data.currencies) {
        currencies.innerText = data.currencies.map((currency) => currency.name)
    }

    if (data.languages) {
        languages.innerText = Object.values(data.languages.map(ele => ele.name))
    }

    /*console.log(data);*/
    if (data.borders) {

        data.borders.forEach((border) => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                .then((res) => res.json())
                .then(([borderCountry]) => {
                    /*console.log(borderCountry)*/
                    const borderCountryTag = document.createElement('p')
                    borderCountryTag.innerText = borderCountry.name.common
                    /*borderCountryTag.href = `country.html?name=${borderCountry.name.common}`*/
                    borderCountries.append(borderCountryTag)
                })
        })
    }
}
/*const border = document.querySelector(".border");
/*border.addEventListener("load", () => {
    myFunc(data);
});
console.log(border);
function myFunc(data) {
    if ('borders' in data) {
        border.innerHTML =
            `<p><strong>Border Countries: </strong>${data.borders.map(ele=>ele)}</p>`;
            console.log('hello');
    }
}*/