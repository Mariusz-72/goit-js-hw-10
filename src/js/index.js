
import SlimSelect from 'slim-select';                            //import narzędzi
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

const catInfo = document.querySelector('.cat-info');         // wskazanie miejsca na stronie gdzie będą wyświetlane informacje o kotach
let select;                                                             // zmienna do obsługi listy

Notiflix.Loading.standard('Loading...', {       // wyświetlenie komunikatu "loadnig"
    backgroundColor: 'rgba(0,0,0,0.8)',
});
window.addEventListener('DOMContentLoaded', () => {
  // ładowanie całej strony
  Notiflix.Loading.standard('Loading data, please wait...', {
    // komunikat o ładowaniu strony
    backgroundColor: 'rgba(0,0,0,0.8)',
  });

  select = new SlimSelect({
    select: '.breed-select',
    events: {
      afterChange: data => {
        const selectedBreedId = data[0].value;
        if (selectedBreedId) {
          fetchCatByBreed(selectedBreedId)
            .then(catData => {
              console.log(catData);
              updateCatInfo(catData);
            })
            .catch(error => {
              Notiflix.Notify.failure(
                'Oops! Something goes wrong! Try to reload this page!'
              );
            });
        }
      },
    },
  });

  fetchBreeds() // pobranie danych o rasach
    .then(breeds => {
      Notiflix.Loading.remove(); // usunięcie komunikatu "loading"
      select.setData(
        // wypełnienie listy rozwijanej danymi o rasach
        breeds.map(breed => ({
          text: breed.name,
          value: breed.id,
        }))
      );
    })
    .catch(error => {
      Notiflix.Loading.remove(); // usunięcie napisu "loading" i wyświetlenie komunikatu o błędzie
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });

  function updateCatInfo(catData) {
    // funkcja aktualizująca info o kocie na stronie
    const { url, breeds } = catData;
    catInfo.innerHTML = `
    <img src="${url}" alt="${breeds.name}" />
    <div class="description">
    <h2>${breeds.name}</h2>
    <p>${breeds.description}</p>
    <p>${breeds.temperament}</p>
    </div>
    `;
  }
});


