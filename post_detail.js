//image
const payload = localStorage.getItem("payload");
const payload_parse = JSON.parse(payload);
const userId = payload_parse.user_id;

async function getPost(postId) {
    const response = await fetch(`https://lucedude.link/articles/api/posts/${postId}/`);

    if (response.status == 200) {
        response_json = await response.json();
        return response_json;
    } else {
        alert(response.status);
    }
}

window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("post_id");
    console.log(postId);

    const response = await getPost(postId);
    console.log(response);

    const postTitle = document.getElementById("post-title");
    const postContent = document.getElementById("post-content");

    postTitle.innerText = response.title;
    postContent.innerText = response.content;

    const postUpdateBtn = document.getElementById("post_update");
    const postDeleteBtn = document.getElementById("post_delete");
    postUpdateBtn.style.display = "block";
    postDeleteBtn.style.display = "block";
    postUpdateBtn.setAttribute("onclick", `postUpdate(${postId})`);
    postDeleteBtn.setAttribute("onclick", `postDelete(${postId})`);
    
};

function postUpdate(post_id) {
    window.location.href = `/post_update.html?post_id=${post_id}`;
}

async function postDelete(post_id) {
    if (confirm("삭제하시겠습니까?")) {
        let access = localStorage.getItem("access");
        const response = await fetch(
            `https://lucedude.link/articles/api/posts/${post_id}`,
            {
                headers: {
                    Authorization: `Bearer ${access}`,
                },
                method: "DELETE",
            }
        );
        if (response.status == 204) {
            alert("삭제되었습니다.");
            window.location.href = "post_list.html";
        } else {
            alert("권한이 없습니다!");
            window.location.href = "post_list.html";
        }
    } else {
        // 취소 버튼을 눌렀을 경우
        return false;
    }
}

function categoryFilter(category_id) {
    window.location.href = `/post_category_filter.html?category_id=${category_id}`;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
