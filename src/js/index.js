
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

window.addEventListener('DOMContentLoaded', () => {

    const breedSelect = document.querySelector('.breed-select');
    const catInfo = document.querySelector('.cat-info');


    const slim = new SlimSelect({
        select: '.breed-select',
        placeholder: 'Select a breed..',
    });


    fetchBreeds((error, breeds) => {
        if (error) {
            console.error('Error', error);
        } else {
            slim.setData(breeds, 'id', 'name');
            breedSelect.addEventListener('change', () => {
                const selectedBreedId = slim.selected();
                if (selectedBreedId) {
                    fetchCatByBreed(selectedBreedId, (error, catInfo) => {
                        if (error) {
                            console.error('Error:', error);
                        } else {
                            updateCatInfo(catInfo);
                        }
                    });
                }
            });
            
        }
    });


    function updateCatInfo(catInfo) {
        const { url, breed } = catInfo;
        catInfo.innerHTML = `
    <img src="${url}" alt="${breed.name}" />
    <h2>${breed.name}</h2>
    <p>${breed.description}</p>
    <p>${breed.temperament}</p>
    `;
    }
});


