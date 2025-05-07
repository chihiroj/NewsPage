window.onload = (event) => {

  fetch(`http://localhost:8080/api/v1/article` , {
    method: 'GET'
  })
  .then(response => {
    if(!response.ok){
      throw new Error('Failed to get article list');
    }
    return response.json();
  })
  .then(data => {
    console.log('Article list: ' ,data);
    addReaderStoriesToWebsite(data);
  })
  .catch(error =>{
    console.error('Error: ', error);
  });
}

let deleteArticle = (id) => {
  fetch(`http://localhost:8080/api/v1/article/${id}` , {
    method: 'DELETE'
  })
  .then(response => {
    if(!response.ok){
      throw new Error('Failed to delete');
    }
    deleteArticleFromHtml(id);
  })
  .catch(error => {
    console.error('Error: ', error);
  });
}

let deleteArticleFromHtml = (articleId) => {
  const articleDiv = document.getElementById(articleId);
  articleDiv.remove();
}

let createDeleteButton = (contentCol, article) => {
  const deleteButtonWrapper = document.createElement('div');
  deleteButtonWrapper.classList.add('delete-button-wrapper');
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button','btn');
  deleteButton.dataset.id = article.id;
  deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-trash3" viewBox="0 0 16 16">
                      <path
                        d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>`;

  contentCol.appendChild(deleteButtonWrapper);
  deleteButtonWrapper.appendChild(deleteButton);

  deleteButton.addEventListener('click' , (event) => {
    deleteArticle(article.id);
  });
}
 
let addReaderStoriesToWebsite = (articleList) => {
  const localNewsDiv = document.getElementById("local-news-wrapper");

  articleList.forEach(article => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add('row', 'card', 'mb-3', 'local-news-article');
    cardDiv.id = article.id;

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row','g-0');

    const imgCol = document.createElement('div');
    imgCol.classList.add('col-md-2');

    const imgElement = document.createElement('img');
    imgElement.classList.add('img-fluid', 'rounded-start');
    imgElement.src = article.img_url;
    imgElement.alt = article.title;

    imgCol.appendChild(imgElement);

    const contentCol = document.createElement('div');
    contentCol.classList.add('col-md-10');

    createDeleteButton(contentCol , article);
    
    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body','local-news-article');

    const titleElement = document.createElement('h5');
    titleElement.classList.add('card-title');
    const titleLink = document.createElement('a');
    titleLink.classList.add('blacklink');
    titleLink.href = '#';
    titleLink.textContent = article.title;

    titleElement.appendChild(titleLink);

    const descriptionElement = document.createElement('p');
    descriptionElement.classList.add('card-text');
    descriptionElement.textContent = article.contents;

    cardBodyDiv.appendChild(titleElement);
    cardBodyDiv.appendChild(descriptionElement);

    contentCol.appendChild(cardBodyDiv);

    rowDiv.appendChild(imgCol);
    rowDiv.appendChild(contentCol);

    cardDiv.appendChild(rowDiv);

    localNewsDiv.appendChild(cardDiv);
  
  });

}