//수정
async function handlePostUpdate(post_id) {
    console.log("수정");

    let access = localStorage.getItem("access");
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    console.log(formData.getAll);
    console.log(post_id);

    const response = await fetch(`https://lucedude.link/articles/api/posts/${post_id}/`, {
        headers: {
            Authorization: `Bearer ${access}`,
        },
        method: "PUT",
        body: formData,
    });
    const data = await response.json();
    console.log(data);

    if (response.status == 200) {
        alert("수정 완료!");
        window.location.href = `/post_detail.html?post_id=${post_id}`;
    } else {
        alert("잘못 된 요청입니다.");
    }
}

window.onload = async function () {
    console.log("로딩");

    // 유저 확인용
    const payload = localStorage.getItem("payload");
    console.log(payload);
    const payload_parse = JSON.parse(payload);
    console.log(payload_parse.user_id);
    userId = payload_parse.user_id;
    //

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("post_id");
    
    console.log(postId);
    const response = await getPost(postId);
    console.log(response);

    const title = document.getElementById("title");
    const content = document.getElementById("content");

    title.value = response.title;
    content.value = response.content;
    console.log(postId);
    const postUpdateBtn = document.getElementById("post_update");
    postUpdateBtn.setAttribute("onclick", `handlePostUpdate(${postId})`);
};

async function getPost(postId) {
    const response = await fetch(`https://lucedude.link/articles/api/posts/${postId}/`);

    if (response.status == 200) {
        response_json = await response.json();
        return response_json;
    } else {
        alert(response.status);
    }
}
