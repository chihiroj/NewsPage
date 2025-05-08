window.onload = (event) => {

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
  console.log(id);

  fetch(`http://localhost:8080/api/v1/article/${id}` , {
    method: 'GET'
  })
  .then(response => {
    if(!response.ok){
      throw new Error('Failed to get article');
    }
    return response.json();
  })
  .then(data => {
    console.log('Article: ' ,data);
    addReaderStoryToWebsite(data);
  })
  .catch(error =>{
    console.error('Error: ', error);
  });
}

let addReaderStoryToWebsite = (article) => {
  const articleWrapper = document.getElementById('article-wrapper');
  const title = document.createElement('h1');
  title.id = "title";
  title.textContent = article.title;

  const name = document.createElement('p');
  name.textContent = "By: " + article.user.name;

  const img = document.createElement('img');
  img.src = article.img_url;
  img.id = "image";

  const contents = document.createElement('p');
  contents.id ="contents";
  contents.textContent = article.contents;

  articleWrapper.appendChild(title);
  articleWrapper.appendChild(name);
  articleWrapper.appendChild(img);
  articleWrapper.appendChild(contents);
}
