const posts = document.querySelector(".posts");
const singlePost = document.getElementById("single-post");

function sendHttpRequests (method,url){
    const promise = new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open(method,url);
        xhr.onload = function (){
            resolve(xhr.response);
        }
        xhr.send();
    })
    return promise;
}

async function fetchPost(){
    const responseData = await sendHttpRequests("GET","https://jsonplaceholder.typicode.com/posts");    
    const listOfPosts = JSON.parse(responseData);
        for(const post of listOfPosts){
            const postEl = document.importNode(singlePost.content,true);
            postEl.querySelector("h2").textContent = post.title;
            postEl.querySelector("p").textContent = post.body;
            posts.append(postEl);
        }
}
fetchPost();