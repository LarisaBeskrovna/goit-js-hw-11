export function createMarcup(images) {
    return images
        .map(
          ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
          }) => {
          return `<div class="photo-card">
           <a class="gallery__item" href="${largeImageURL}">
    <img src="${webformatURL}" srcset ${largeImageURL} alt="${tags}" loading="lazy" /></a>
      <div class="info">
        <p class="info-item">
          <b>Likes ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads ${downloads}</b>
        </p>
      </div>
    </div> `;
          }
        )
        .join('');
    }