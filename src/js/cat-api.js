'use strict';                                              
console.log('Starting script');         //info w konsoli o starcie skryptu
import Notiflix from 'notiflix';                       // import biblioteki Notiflixa (obsługa komunikatów i stylów css)
import 'notiflix/dist/notiflix-3.2.6.min.css';

import axios from 'axios';                                // import axiosa - biblioteki do odbsługi żądań http
axios.defaults.headers.common['x-api-key'] =
  'live_gQPE7aYHC2JxC4HJyzOTAX1mVK6khrVWlpVjNkVhfmBPwZbTUygmmJXQmL0FI4FQ';

function fetchBreeds(callback) {                                   // deklaracja funkcji do obsługi danych z API
    return axios
    .get('https://api.thecatapi.com/v1/breeds')              // wysłanie żądania aby pobrać dane z API o rasach kotów
    .then(response => {                                    // jak żądanie będzie z sukcesem to odpowiedź ma być przetworzona
        return response.data;                                      // zawracane dane o rasach kotów
    })

    .catch(error => {                                       // obsługa błędu
        console.log('fetchBreeds error', error.response);         // wyświetlenie błędu w konsoli
        return Promise.reject(error);                          // odrzucenie promisa z błedem
    });
}

function fetchCatByBreed(breedId, callback) {                               // delaracja funkcji do ściągania obrazków kotów
    return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)        // wysłanie żądania get  aby pobrać z API danego kota
    .then(response => response.data[0])                                        // przetwarzanie tego żądania  - pobranie pierwszego obrazu
    .catch(error => {
            console.log('fetchCatByBreed error', error.response);           // obsługa błędu , podobnie
            return Promise.reject(error);
    });
}
export { fetchBreeds, fetchCatByBreed };                                //eksport funkcji do użycia w pliku index.js
