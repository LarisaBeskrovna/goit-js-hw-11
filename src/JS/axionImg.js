import axios from 'axios';
import Notiflix from 'notiflix';

const URL = 'https://pixabay.com/api/';
const API_KEY = '36583088-3efc413f562b1d456ac479a3a';

export async function fetchImages(options) {
  let parameters = new URLSearchParams(options);
  const images = await axios.get(`${URL}?key=${API_KEY}&${parameters}`);
  if (parameters.page === 1 && images.data.totalHits != 0) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images!`);
  };
   
    return images.data;
  }
 