'use strict';
console.log('Starting script');
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_iPaBzyy1iOjvPQNHzNKNExHWu1HC402dvsZ3klFHj2GCZBHTFhAkZ1tIADh4TvP';

function fetchBreeds(callback) {
  //funkcja ładująca wybraną rasę
    return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
        return response.data;
       
    })

    .catch(error => {
        console.log('fetchBreeds error', error.response);
        return Promise.reject(error);
    });
}

function fetchCatByBreed(breedId, callback) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
      .catch(error => {
          console.log('fetchCatByBreed error', error.response);
          return Promise.reject(error);
    });
}
export { fetchBreeds, fetchCatByBreed };
