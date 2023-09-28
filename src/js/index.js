
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
window.addEventListener('DOMContentLoaded', () => {                                // ładowanie całej strony
    Notiflix.Loading.standard('Loading data, please wait...', {          // komunikat o ładowaniu strony
        backgroundColor: 'rgba(0,0,0,0.8)',
    });

    select = new SlimSelect({                                               // utworzenie listy rozwijanej
        select: '.breed-select',
    });

    fetchBreeds()                                                                      // pobranie danych o rasach
        .then(breeds => {
            Notiflix.Loading.remove();                                                 // usunięcie komunikatu "loading"
            select.setData(                                                           // wypełnienie listy rozwijanej danymi o rasach
                breeds.map(breed => ({
                    text: breed.name,
                    value: breed.id,
                }))
            );
        })
        .catch(error => {
            Notiflix.Loading.remove();                                                                // usunięcie napisu "loading" i wyświetlenie komunikatu o błędzie
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
        });


    select.onChange = () => {                                                                   // nasłuch na zmianę w liście rozwijanej
        const selectedBreedId = select.selected();                                 // pobranie wybranej rasy kota
        if (selectedBreedId) {       
            fetchCatByBreed(selectedBreedId)                                  // mająd ID pobieramy info o danej rasie
                .then(catData => {
                    updateCatInfo(catData);                                           // wyświetlenie info o kocie na stronie
                })
                .catch(error => {
                
                    Notiflix.Notify.failure(                                           // wyświetlenie komunikatu o błędzie
                        'Oops! Something went wrong! Try reloading the page!');
                });
        }
    };
});
    

    function updateCatInfo(catData) {                                          // funkcja aktualizująca info o kocie na stronie
        const { url, breed } = catData;
        catInfo.innerHTML = `
    <img src="${url}" alt="${breed.name}" />
    <div class="description">
    <h2>${breed.name}</h2>
    <p>${breed.description}</p>
    <p>${breed.temperament}</p>
    </div>
    `;
    }



