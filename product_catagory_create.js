fetch("./navbar.html").then(response => {
    return response.text()
})
    .then(data => {
        document.querySelector("header").innerHTML = data;
    })


window.onload = () => {
    console.log("로딩");
    createCategoryList()
}

//카테고리 가져오기
async function getCategoryList() {
    const response = await fetch('http://127.0.0.1:8080/product/category/');
    
    const data = await response.json();
    console.log(data)
    return data;
}

//카테고리 리스트
async function createCategoryList() {
    const categoryAll = await getCategoryList();
    const divElement = document.getElementById('categories');

    for (let i = 0; i < categoryAll.length; i++) {
        const liElement = document.createElement('div');
        liElement.value = categoryAll[i].id;
        liElement.textContent = categoryAll[i].name;
        console.log(categoryAll[i].name)
        divElement.appendChild(liElement);
    }
}

//등록
async function handleProductCreate() {
    console.log('등록')

    let token = localStorage.getItem('access')
    const name = document.getElementById('name').value;
    const is_used = document.getElementById('is_used').value;
    
    const formData = new FormData();
    formData.append("name", name)
    formData.append("is_used", is_used)

    console.log(formData.getAll)

    const response = await fetch('http://127.0.0.1:8080/product/category/create/', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    console.log(data);

    location.reload();
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


