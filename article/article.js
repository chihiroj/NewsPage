const storageKey = 'article-reactions';


window.onload = (event) => {

  //Get article with id in URL from backend.
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  console.log(id);

  fetch(`http://localhost:8080/api/v1/article/${id}`, {
    method: 'GET'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to get article');
      }
      return response.json();
    })
    .then(data => {
      console.log('Article: ', data);
      addReaderStoryToWebsite(data);
      createLikeButton(data.id);
      setupCommentSection(data.id);
    })
     .catch(error => {
      console.error('Error: ', error);
    });
}

//Add article to frontend.
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
  contents.id = "contents";
  contents.textContent = article.contents;

  articleWrapper.appendChild(title);
  articleWrapper.appendChild(name);
  articleWrapper.appendChild(img);
  articleWrapper.appendChild(contents);
}

let createLikeButton = (articleId) => {
  const likeButtonWrapper = document.getElementById('button-wrapper');
  const likeButton = document.createElement('button');
  likeButton.classList.add('social-button');

  likeButton.textContent = "❤️";
  likeButton.id = `like-button-${articleId}`;
  likeButtonWrapper.appendChild(likeButton);

  likeButton.addEventListener('click', () => {
    const reactions = getReactions();
    if (reactions[articleId] === 'like') {
      delete reactions[articleId];
    } else {
      reactions[articleId] = 'like';
    }
    saveReactions(reactions);
    updateButtons(articleId, likeButton, document.querySelector(`#dislike-button-${articleId}`));

  });

  createDislikeButton(articleId);

  updateButtons(articleId, likeButton, document.querySelector(`#dislike-button-${articleId}`));

}

  let createDislikeButton = (articleId) => {
    const buttonWrapper = document.getElementById('button-wrapper');
    const dislikeButton = document.createElement('button');
    dislikeButton.classList.add('social-button');
    dislikeButton.id = `dislike-button-${articleId}`;
    dislikeButton.textContent = "💔";

    buttonWrapper.appendChild(dislikeButton);

    dislikeButton.addEventListener('click', () => {
      const reactions = getReactions();
      if (reactions[articleId] === 'dislike') {
        delete reactions[articleId];  
      } else {
        reactions[articleId] = 'dislike';  
      }
      saveReactions(reactions);
      updateButtons(articleId, document.querySelector(`#like-button-${articleId}`), dislikeButton);
    });

    updateButtons(articleId, document.querySelector(`#like-button-${articleId}`), dislikeButton);
  }

let getReactions = () => {
  return JSON.parse(localStorage.getItem(storageKey)) || {};
}

let saveReactions = (reactions) => {
  localStorage.setItem(storageKey, JSON.stringify(reactions));

}

let updateButtons = (articleId, likeButton, dislikeButton) => {
  const reactions = getReactions();
  const state = reactions[articleId];

  likeButton.textContent = state === 'like' ? '❤️ Liked' : '❤️ Like';
  dislikeButton.textContent = state === 'dislike' ? '💔 Disliked' : '💔 Dislike';
}

const commentStrategy = 'article-comments';
 
let getComments = ()=>{
  return JSON.parse(localStorage.getItem(commentStrategy)) || {};
}

//Save comments in local storage.
let saveComments = (comments) => {
  localStorage.setItem(commentStrategy, JSON.stringify(comments));
}

//Load comments from local storage and create HTML.
let loadComments = (articleId) => {
  const comments = getComments();
  const articleComments = comments[articleId] || [];
  const commentsWrapper = document.getElementById('comments-wrapper');

  commentsWrapper.innerHTML = '';

  articleComments.forEach(comment => {
    const p = document.createElement('p');
    const hr = document.createElement('hr');
    p.classList.add ("comment");
    p.textContent = comment;
    commentsWrapper.appendChild(p);
    commentsWrapper.appendChild(hr);
});
}

let setupCommentSection = (articleId) =>{
  const submitButton = document.getElementById('submit-comment');
  const commentInput = document.getElementById('comment-input');

  submitButton.addEventListener('click', () => {
    const commentText = commentInput.value.trim();
    if (commentText === '') return;

    const comments = getComments();
    if (!comments[articleId]) {
        comments[articleId] = [];
    }
    comments[articleId].push(commentText);

    saveComments(comments);
    commentInput.value = '';
    loadComments(articleId);
});



loadComments(articleId);
}