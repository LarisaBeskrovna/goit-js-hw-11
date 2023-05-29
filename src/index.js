import axionImg from './JS/axionImg';
import Notiflix from 'notiflix';
import { createMarcup } from './JS/galary';
import button from './JS/button';
import './main.css';
import SimpleLightbox from "simplelightbox";
import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm";

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
  };
  
  const newImage = new axionImg();
  const loadBtn = new button({
    selector: '.load-more',
    isHidden: true,
  });
  
  refs.form.addEventListener('submit', onSubmitSearch);
  loadBtn.button.addEventListener('click', onLoadMore);
  refs.gallery.addEventListener('click', onClickOpenLightbox);
  
  function onSubmitSearch(event) {
    event.preventDefault();
  
    newImage.searchQuery = event.currentTarget.elements.searchQuery.value;
    newImage.resetPage();
    newImage
      .fetchImages()
      .then(({ hits, totalHits }) => {
        if (hits.length === 0 || newImage.searchQuery === '') {
          clearPage();
          loadBtn.hide();
          throw new Error();
        } else {
          console.log(hits);
          return hits;
        }
      })
      .then(hits => {
        clearPage();
        createImagesOnPage(hits);
        if (hits.length < newImage.per_page) {
          loadBtn.hide();
        } else {
          loadBtn.show();
        }
      })
      .catch(error => {
        console.log(error);
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      })
      .finally(() => refs.form.reset());
  }
  
  function createImagesOnPage(images) {
    const marcup = createMarcup(images)
    refs.gallery.insertAdjacentHTML('beforeend', marcup);
  }
  
  function onLoadMore() {
    loadBtn.disable();
    newImage
      .fetchImages()
      .then(({ hits }) => {
        if (hits.length === 0) {
          loadBtn.hide();
          throw new Error();
        }
        return hits;
      })
      .then(hits => {
        createImagesOnPage(hits);
        smoothScroll();
      })
      .then(() => loadBtn.enable())
      .catch(error => {
        console.log(error);
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      });
  }
  
  function clearPage() {
    refs.gallery.innerHTML = '';
  }
  
  function onClickOpenLightbox(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    
    new SimpleLightbox('.photo-card a', {captionsData:"alt", captionDelay:250});
  }


  
  function smoothScroll() {
    const { height: cardHeight } =
      refs.gallery.firstElementChild.getBoundingClientRect();
  
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
  
  function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      onLoadMore();
      loadBtn.hide();
    }
  }
  
  window.addEventListener('scroll', handleScroll);

