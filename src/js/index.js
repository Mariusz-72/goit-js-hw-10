
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

const catInfo = document.querySelector('.cat-info');
let select;

Notiflix.Loading.standard('Loading...', {
    backgroundColor: 'rgba(0,0,0,0.8)',
});
window.addEventListener.apply('DOMContentLoaded', () => {
    Notiflix.Loading.standard('Loading data, please wait...', {
        backgroundColor: 'rgba(0,0,0,0.8)',
    });

    select = new SlimSelect({
        select: '.breed-select',
    });

    fetchBreeds()
        .then(breeds => {
            Notiflix.Loading.remove();
            select.setData(
                breeds.map(breed => ({
                    text: breed.name,
                    value: breed.id,
                }))
            );
        })
        .catch(error => {
            Notiflix.Loading.remove();
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
        });

});




    //const breedSelect = document.querySelector('#breed-select');
    //const catInfo = document.querySelector('.cat-info');


    //const slim = new SlimSelect({
    //  select: '#breed-select',
    //  placeholder: 'Select a breed..',
    //});

select.on('change', () => {
    const selectBreedId = select.selected();
    if (selectBreedId) {
        fetchCatByBreed(selectedBreedId)
            .then(catInfo => {
                updateCatInfo(catInfo);
            })
            .catch(error => {
                Notiflix.Notify.failure(
                    'Oops! Something went wrong! Try reloading the page!');
            });
    }
});



    function updateCatInfo(catInfo) {
        const { url, breed } = catInfo;
        catInfo.innerHTML = `
    <img src="${url}" alt="${breed.name}" />
    <div class="description">
    <h2>${breed.name}</h2>
    <p>${breed.description}</p>
    <p>${breed.temperament}</p>
    </div>
    `;
    }



