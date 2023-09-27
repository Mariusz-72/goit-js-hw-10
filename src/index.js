


import axios from 'axios';
axios.defaults.headers.common['x-api-key'] = 'live_iPaBzyy1iOjvPQNHzNKNExHWu1HC402dvsZ3klFHj2GCZBHTFhAkZ1tIADh4TvP';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const breedSelect = document.getElementById('breed-select');
const loader = document.getElementById('loader');



const slim = new SlimSelect({              //zainicjowanie SLimSelect
    select: '#breed-select',
    placeholder: 'Select a breed...',
})
