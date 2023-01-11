import "../../static/style.css";

function handleRoutes() {
  if (location.hash === "#home") {
    displayHomePage();
  } else if (location.hash === "#posting") {
    displayPostingPage();
  } else if (location.hash === "#board") {
    displayBoardPage();
  }
}

window.addEventListener("hashchange", handleRoutes);
//call handleRoutes initially as well so that the page loads with the correct page displayed
handleRoutes();

function displayPostingPage() {
  document.getElementById("app").innerHTML = `
  
  `;
  document.getElementById("postBtn").addEventListener("click", postData);
}

function displayBoardPage() {
  document.getElementById("app").innerHTML = "<h1>Board</h1>";
  //fetch posted data and display it on the page
  fetch("/getBoardData")
    .then((response) => response.json())
    .then((data) => {
      let boardContent = "<ul>";
      data.forEach((item) => {
        boardContent += `<li>${item}</li>`;
      });
      boardContent += "</ul>";
      document.getElementById("app").innerHTML += boardContent;
    });
}

function postData() {
  // send a post request to the server with the post content
  const postContent = document.getElementById("postContent").value;
  // use fetch API to post data
  fetch("/post", {
    method: "POST",
    body: JSON.stringify({ content: postContent }),
    headers: { "Content-Type": "application/json" },
  }).then(() => {
    alert("post successful");
  });
}

let sum = (document.querySelector("#app").innerHTML = `
<section class="post-btn-wrapper">
  <button class="post-btn">
    <span>게시글 작성하기</span>
  </button>
</section>
<section class="uploaded-contents-container">
</section>

<nav>
      <a href="#home">Home</a>
      <a href="#posting">Posting</a>
      <a href="#board">Board</a>
    </nav>
    <h1>Posting</h1>
    <form>
        <textarea id="postContent"></textarea>
        <button id="postBtn">Post</button>
    </form>
`);
