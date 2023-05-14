// window.onload = () => {
//     console.log("로딩");
// }


//등록
async function handlePostCreate() {
    console.log("등록");

    let access = localStorage.getItem("access");
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    console.log(formData.getAll);

    const response = await fetch("https://lucedude.link/articles/api/posts/", {
        headers: {
            Authorization: `Bearer ${access}`,
        },
        method: "POST",
        body: formData,
    });
    const data = await response.json();
    console.log(data);
    console.log(response.status);

    if (response.status == 201) {
        if (confirm("등록 완료!\n계속 등록 하시겠습니까?")) {
            return false;
        } else {
            window.location.href = "post_list.html";
        }
    } else {
        alert("잘못 된 요청입니다.");
    }
}
