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


/* ***** API ***** */
const url = 'https://restcountries.eu/rest/v2/all'

// TODO: Add try-catch when parsing from json
// Adding filter to only include the name, flag and timezone of the countries in the response
fetch(`${url}?fields=name;flag;timezones`).then(response => response.json()).then(handleResponse).catch(handleError);

/* Response-handling */
function handleResponse (responseData) {
    // reponseData.length === 250 (0-249)
    console.log(responseData.length);
    console.log(responseData);
}


/* Error-handling */
function handleError (err) {
    // TODO: Improve!
    console.error(err.message);
};