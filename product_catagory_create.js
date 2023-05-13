// 
const payload = localStorage.getItem("payload")
const payload_parse = JSON.parse(payload)

if (!localStorage.getItem("access")) {
    alert('로그인이 필요합니다!')
    window.history.back()
} else if (payload_parse.is_admin == false) {
    alert('관리자만 접근 가능합니다.')
    window.history.back()
}


//등록
async function handleProductCategoryCreate() {
    let access = localStorage.getItem('access')
    const name = document.getElementById('name').value;
    const is_used = document.getElementById('is_used').checked;
    
    const formData = new FormData();
    formData.append("name", name)
    formData.append("is_used", is_used)
    
    console.log(formData.getAll)
    
    const response = await fetch('http://3.36.40.49/product/category/create/', {
        headers: {
            'Authorization': `Bearer ${access}`,
        },
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    console.log(data);
    if (response.status == 200) {
        alert('등록 완료!')
        location.reload();
    } else if (response.status == 400) {
        alert('내용을 입력해 주세요.')
        location.reload();
    } else if (response.status == 403) {
        alert('관리자만 접근 가능합니다.')
        location.reload();
    } else {
        alert('잘못 된 접근입니다.')
        location.reload();
    }
}

window.onload = () => {
    console.log("로딩되었습니다.");
}
