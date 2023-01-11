// Data
const data = {
  home: {
    title: "Home",
    content: "Welcome to my SPA",
    nav: "/home" || "/",
  },
  posts: {
    title: "All Posts",
    content: '<ul id="post-list"></ul>',
    nav: "/posts",
    postList: [],
  },
  post: {
    title: "",
    content: "",
    nav: `/posts/post`,
    postId: "",
  },
};

// Fetch the post data from the server
function fetchPostData(postId) {
  fetch(`https://my-json-server.typicode.com/typicode/demo/posts/${postId}`)
    .then((response) => response.json())
    .then((post) => {
      data.post.title = post.title;
      data.post.content = post.body;
      data.post.postId = post.id;
    });
}

// Client-side routing
window.addEventListener("hashchange", function () {
  const route = window.location.hash.substr(1);
  let [_, page, postId] = route.split("/");
  page = page || "home";

  if (page === "post") {
    fetchPostData(postId);
  } else {
    data.post.postId = "";
  }

  updateView(page);
});

// Templating
function updateView(page) {
  const app = document.getElementById("app");
  const { title, content } = data[page];
  app.innerHTML = `
  <div>${Object.values(data).map(
    (link) => `<li><a href="${link.nav}">${link.title}</a></li>`
  )}</div>
  <h1>${title}</h1>
  ${content}`;
  if (page === "posts") {
    updatePostList();
  } else if (page === "post" && data.post.postId) {
    const postContent = document.createElement("div");
    postContent.innerHTML = data.post.content;
    app.appendChild(postContent);
  }
}

function updatePostList() {
  fetch("https://my-json-server.typicode.com/typicode/demo/posts")
    .then((response) => response.json())
    .then((posts) => {
      data.posts.postList = posts;
      const postList = document.getElementById("post-list");
      postList.innerHTML = "";
      posts.forEach((post) => {
        const postEl = document.createElement("li");
        postEl.innerHTML = `<a href="#/post/${post.id}">${post.title}</a>`;
        postList.appendChild(postEl);
      });
    });
}

// Initial view
updateView(window.location.hash.substr(1) || "home");
