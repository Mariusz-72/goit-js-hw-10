'use strict';
console.log('Starting script');
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_iPaBzyy1iOjvPQNHzNKNExHWu1HC402dvsZ3klFHj2GCZBHTFhAkZ1tIADh4TvP';

function fetchBreeds(callback) {
  //funkcja ładująca wybraną rasę
  axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
        const breeds = response.data;
        console.log('Breeds:', breeds); 
      callback(null, breeds);
    })

    .catch(error => {
      callback(error, null);
    });
}

function fetchCatByBreed(breedId, callback) {
  axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      const catData = response.data[0];
      const { url, breed } = catData;
      const catInfo = {
        url,
        breed: breed[0],
      };
      callback(null, catInfo);
    })
    .catch(error => {
      callback(error, null);
    });
}
export { fetchBreeds, fetchCatByBreed };
