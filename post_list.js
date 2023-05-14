// 게시글 불러오기
async function loadPosts() {
    const response = await fetch("https://lucedude.link/articles/api/posts/", {
        method: "GET",
    });

    response_json = await response.json();
    response_json_array = response_json.results;

    console.log(response_json_array)

    const posts = document.getElementById("posts");

    response_json_array.forEach((post) => {
        const newPost = document.createElement("tr");
        
        const newPostTitle = document.createElement("td");
        newPostTitle.setAttribute("onclick", `postDetail(${post.id})`);
        newPostTitle.innerText = post.title
        newPostTitle.style = "border-bottom: 1px solid black; cursor: pointer; width: 300px"
        
        // 이름 같이 안옴
        // const newPostUser = document.createElement("td");
        // newPostUser.innerText = post.
        
        newPost.appendChild(newPostTitle);
        posts.appendChild(newPost);
    });
}

// 상세페이지 보기
function postDetail(post_id) {
    window.location.href = `/post_detail.html?post_id=${post_id}`;
}

window.onload = async function () {
    await loadPosts();
};

// 숫자 콤마 정규식
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
