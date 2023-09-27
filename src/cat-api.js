import axios from 'axios';

function fetchBreeds(callback) {                              //funkcja ładująca wybraną rasę
    axios
        .get('http://api.thecatapi.com/v1/breeds')
        .then((response) => {
            const breeds = response.data;
            callback(null, breeds);
        })
       
        .catch((error) => {
            callback(error, null);
        });
}

function fetchCatByBreed(breedId, callback) {
    axios
        .get('https://api.thecatapi.com/v1/images/serch?breed_ids=${breedId}')
        .then((response) => {
            const catData = response.data[0];
            const { url, breed, description, temperament } = catData;
            const catInfo = {
                url,
                name: breed.name,
                description,
                temperament,

            };
            callback(null, catInfo);
        })
        .catch((error) => {
            callback(error, null);
        });
}
export { fetchBreeds, fetchCatByBreed };