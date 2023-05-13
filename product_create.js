window.onload = () => {
    console.log("로딩");
}
if (!localStorage.getItem("access")) {
    alert('로그인이 필요합니다!')
    window.history.back()
}

// 카테고리 가져오기
async function getCategoryList() {
    const response = await fetch('http://3.36.40.49/product/category/');
    const data = await response.json();
    console.log(data)
    return data;
}

//카테고리 선택 옵션
async function createCategoryOptions() {
    const categories = await getCategoryList();
    const selectElement = document.getElementById('category');

    for (let i = 0; i < categories.length; i++) {
        const optionElement = document.createElement('option');
        optionElement.value = categories[i].id;
        optionElement.textContent = categories[i].name;
        selectElement.appendChild(optionElement);
    }
}

createCategoryOptions()

//등록
async function handleProductCreate() {
    console.log('등록')

    let access = localStorage.getItem('access')
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const price = parseInt(document.getElementById('price').value);
    const image = document.getElementById('image').files;
    const is_free = document.getElementById('is_free').checked;
    const bargain = document.getElementById('bargain').checked;
    const place = document.getElementById('place').value;
    const category = Array.from(document.getElementById('category').selectedOptions).map(option => option.value);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('price', price);
    formData.append('is_free', is_free);
    formData.append('bargain', bargain);
    formData.append('place', place);
    category.forEach(category_id => formData.append('category', category_id));
    console.log(image)
    for (let i = 0; i < image.length; i++) {
        formData.append('images', image[i]);
    }
    
    console.log(formData.getAll)

    const response = await fetch('http://3.36.40.49/product/create/', {
        headers: {
            'Authorization': `Bearer ${access}`,
        },
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    console.log(data);

    if (response.status == 200) {
        if (confirm('등록 완료!\n계속 등록 하시겠습니까?')) {
            return false
        } else {
            window.location.href = 'index.html'
        }
    } else {
        alert('잘못 된 요청입니다.')
    }
}
