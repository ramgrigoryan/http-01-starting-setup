const posts = document.querySelector(".posts");
const singlePost = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchBtn = document.getElementById("fetch");

function sendHttpRequests(method, url, data) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.send(JSON.stringify(data));
  });
  return promise;
}

async function fetchPost() {
  const responseData = await sendHttpRequests(
    "GET",
    "https://jsonplaceholder.typicode.com/posts"
  );
  const listOfPosts = JSON.parse(responseData);
  for (const post of listOfPosts) {
    const postEl = document.importNode(singlePost.content, true);
    postEl.querySelector("h2").textContent = post.title;
    postEl.querySelector("p").textContent = post.body;
    posts.append(postEl);
  }
}

async function createPost(title,content) {
  const userId = Math.random();
  const post = {
    userId: userId,
    title: title,
    body: content
  };
  const newData = sendHttpRequests(
    "POST",
    "https://jsonplaceholder.typicode.com/posts",
    post
  );
}
form.addEventListener("submit",event=>{
    event.preventDefault();
    const title = event.currentTarget.querySelector("#title").value;
    const content = event.currentTarget.querySelector("#content").value;
    createPost(title,content);
});
fetchBtn.addEventListener("click",fetchPost);
