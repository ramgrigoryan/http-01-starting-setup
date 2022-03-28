const posts = document.querySelector(".posts");
const singlePost = document.getElementById("single-post");

const xhr = new XMLHttpRequest();
xhr.open("GET","https://jsonplaceholder.typicode.com/posts");
xhr.onload = function (){
    const listOfPosts = JSON.parse(xhr.response);
    for(const post of listOfPosts){
        const postEl = document.importNode(singlePost.content,true);
        console.log(postEl);
        postEl.querySelector("h2").textContent = post.title;
        postEl.querySelector("p").textContent = post.body;
        posts.append(postEl);
    }
}
xhr.send();