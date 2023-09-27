
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.getElementById('breed-select');
const loader = document.getElementById('loader');

const catInfo = document.querySelector('.cat-info');
const catImage = document.getElementById('cat-image');
const catName = document.getElementById('cat-name');
const catDescription = document.getElementById('cat-description');
const catTemperament = document.getElementById('cat-temperament');

const slim = new SlimSelect({
    select: '#breed-select',
    placeholder: 'Select a breed..',
});

function fetchBreedsData() {         //funkcja ładująca rasy
    loader.style.display = 'block';   //animacja ładowania
    fetchBreeds((error, breeds) => {
        if (error) {
            handleError(error);
        } else {
            slim.setData(breeds, 'id', 'name');
            breedSelect.addEventListener('change', onBreedSelectChange);
            loader.style.display = 'none';
        }
    });
}

function onBreedSelectChange() {
    const selectBreedId = slim.selected();
    if (selectedBreedId) {
        fetchCatByBreed(selectedbreedId, (error, catInfo) => {
            if (error) {
                handleError(error);
            } else {
                catImage.src = catInfo.url;
                catName.textContext = cat.breeds[0].name;
                catDescription.textContext = cat.breeds[0].description;
                catTemperament.textContext = cat.breeds[0].temperament;

                loader.style.display = 'none';
                catInfo.style.display = 'block';
            }
        });
    }
}

function handleError(error) {
    loader.style.display = 'none'
    Notiflix.Notify.failure('An error occurred. Pleasetry again.');
    console.error('Error:', error)
}

fetchBreedsData();



