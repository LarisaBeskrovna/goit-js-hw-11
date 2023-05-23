import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const key = '36583088-3efc413f562b1d456ac479a3a';

export default class axionImg {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }
  async fetchImages() {
    const paramSearch = new URLSearchParams({
      key: key,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: this.per_page,
    });

    const response = await axios.get(`${URL}?${paramSearch}`);

    this.incrementPage();
   
    return response.data;
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}