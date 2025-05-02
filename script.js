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
 
let addReaderStoriesToWebsite = (articleList) => {
  const localNewsDiv = document.getElementById("local-news");

  articleList.forEach(article => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add('card', 'mb-3', 'local-news');

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
    contentCol.classList.add('col-md-8');

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');

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