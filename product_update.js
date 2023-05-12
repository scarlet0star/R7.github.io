window.onload = () => {
    createCategoryOptions()
    createCategoryList()
    console.log("로딩");
}

//카테고리 가져오기
async function getCategoryList() {
    const response = await fetch('http://127.0.0.1:8080/product/category/');
    const data = await response.json();
    console.log(data)
    return data;
}


// 카테고리 리스트
async function createCategoryList() {
    const all_category = await getCategoryList();

    const categories = document.getElementById('categories');

    for (let i = 0; i < all_category.length; i++) {
        const liElement = document.createElement('li')
        categories.appendChild(liElement);

        const aElement = document.createElement('a')
        aElement.className = "dropdown-item";
        aElement.value = all_category[i].id;
        aElement.href = `product/category/${all_category[i].id}/`
        aElement.textContent = all_category[i].name;
        liElement.appendChild(aElement);
    }
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

//등록
async function handleProductCreate() {
    console.log('등록')

    let token = localStorage.getItem('access')
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

    const response = await fetch('http://127.0.0.1:8080/product/create/', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    console.log(data);
    if (response.status == 200) { 
        alert('등록 성공')
        location.reload();
    } else {
        alert('실패')
    }
    
}


//수정
async function handleProductUpdate() {
    console.log('수정')

    let token = localStorage.getItem('access')
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

    for (let i = 0; i < image.length; i++) {
        formData.append('images', image[i]);
    }

    console.log(formData.getAll)

    const response = await fetch('http://127.0.0.1:8080/product/create/', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        method: 'PUT',
        body: formData
    });
    const data = await response.json();
    console.log(data);

}



fetch("./navbar.html").then(response => {
    return response.text()
})
    .then(data => {
        document.querySelector("header").innerHTML = data;
    })
