/* *** Krav ***
    - En Country “mall” som ska innehålla
    - En constructor med 3 parametrar och 3 egenskaper
        - Namnet på landet
        - Landets tidszon
        - URL till landets flagga
    - Minst 1 prototyp-metod
        - Metoden ska returnera den nuvarande tiden i landet i det här formatet: tt:mm, tex 10:34. (Du behöver inte räkna med halvtimmar som finns i vissa tidszoner.)
    - Hämta alla länder med restcountry API:et och välj ut 3 stycken random. 
    - Skapa ett instansobjekt av Country för varje land du hämtar. 
    - Använd html-elementen för att presentera infon.

    För G:
    - Du har med alla punkter.
    - Appen fungerar utan error.
    - Tiden visas korrekt i de allra flesta fall

    För VG:
    - Du har använt arrays och for-loopar för att hantera Country instansobjekten
    - Tiden visas korrekt i samtliga fall 
    - Koden är strukturerad på ett sätt som är logiskt och lätt att följa. (Upplägg och namngivning)
    - Koden är tydligt kommenterad 
*/

/* ***** ELEMENTS ***** */
const sectionElements = document.querySelectorAll('main section');

/* ***** API ***** */
const url = 'https://restcountries.eu/rest/v2/all'
// const url = 'https://restcountries.eu/rest/v2/name/denmark' //TODO: REMOVE! TESTING TIMEZONES

// TODO: Add try-catch when parsing from json
// Adding filter to only include the name, flag and timezone of the countries in the response
fetch(`${url}?fields=name;flag;timezones`).then(response => response.json()).then(handleResponse).catch(handleError);

/* Response-handling */
function handleResponse (responseData) {
    // reponseData.length === 250 (0-249)
    // console.log(responseData.length);

    // console.log(responseData);
    for (let i = 0; i < 3; i++) {
        //
        let randomNumber = Math.floor(Math.random() * responseData.length);

        // TODO: FIX? If several timezones are available, the first(lowest UTC) timezone will always be used.
        let newCountry = new Country(responseData[randomNumber].flag, responseData[randomNumber].name, responseData[randomNumber].timezones[0]);

        console.log(newCountry);

        /* Adding the country to the DOM */
        /* Showing the flag of the country on the DOM */
        sectionElements[i].children[0].setAttribute('src', `${newCountry.flagUrl}`);

        /* Showing the name of the country on the DOM */
        sectionElements[i].children[1].textContent = `${newCountry.name}`;

        /* Showing the current time in the country on the DOM */
        sectionElements[i].children[2].textContent = newCountry.showTime();
        // newCountry.showTime();
    }
}

/* Error-handling */
function handleError (err) {
    // TODO: Improve!
    console.error(err.message);
};

/* ***** COUNSTRUCTOR ***** */
function Country (_flagUrl, _name, _timezone) {
    this.flagUrl = _flagUrl;
    this.name = _name;
    this.timezone = _timezone;
}

Country.prototype.showTime = function () {
    // Getting the current time in GMT+0100
    let currentDate = new Date();
    // Getting the current hours in UTC
    let currentTimeUTC = currentDate.getUTCHours();
    let currenTimeMinutes = currentDate.getMinutes();
    // TODO: REMOVE! Used while developing
    // console.log(currentDate);
    // console.log(currentTimeUTC);

    // Defining a variable that will be used to display the current hour in the local timezone after calculating difference from UTC
    let localTimezoneHours = null;
    // Creating a new string containing the hourly difference from UTC in the local timezone
    let localUtcDifference = this.timezone.substr(4,2);

    // Calculating the current hour in the local timezone.
    switch(this.timezone[3]) {
        case '+':
            localTimezoneHours = currentTimeUTC + Number(localUtcDifference);
            break;
        case '-':
            localTimezoneHours = currentTimeUTC - Number(localUtcDifference);
            break;
        default:
            localTimezoneHours = currentTimeUTC;
            break;
    }

    // Evaluating if the local timezone has enterd a new day or is one day behind
    if (localTimezoneHours < 0) {
        // If the localtimezone has a negative value, the country is still on the previous day
        localTimezoneHours = 24 + localTimezoneHours;
    } else if (localTimezoneHours > 24) {
        // If the localtimezone has value greater than 24, the country has entered a new day
        localTimezoneHours = localTimezoneHours - 24;
    };

    // Converting the local time from type Number into type String
    let localTimezoneHoursStr = localTimezoneHours.toString();
    // Evalutating if the string only contains one digit, adding a 0 before if it does.
    if (localTimezoneHoursStr.length === 1) {
        localTimezoneHoursStr = `0${localTimezoneHoursStr}`;
    };

    // Defining a new string containing both the hours and minutes of the local timezone HH:MM
    let currentTime = `${localTimezoneHoursStr}:${currenTimeMinutes}`;

    // Returning the string
    return currentTime;
}