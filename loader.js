// 네비게이션바
async function injectNavbar() {
    fetch("./navbar.html").then(response => {
        return response.text()
    })
    .then(data => {
        document.querySelector("header").innerHTML = data;
    })

    let navbarHtml = await fetch("./navbar.html")
    let data = await navbarHtml.text()
    document.querySelector("header").innerHTML = data;

    createCategoryOptions()
}

// 카테고리 가져오기
async function getCategoryList() {
    const response = await fetch('http://3.36.40.49/product/category/');
    const data = await response.json();
    console.log(data)
    return data;
}

// 카테고리 리스트
async function createCategoryOptions() {
    const all_category = await getCategoryList();

    const categories = document.getElementById('categories');

    for (let i = 0; i < all_category.length; i++) {
        const liElement = document.createElement('li')
        categories.appendChild(liElement);

        const aElement = document.createElement('a')
        aElement.className = "dropdown-item";
        aElement.value = all_category[i].id;
        aElement.setAttribute("onclick",`categoryProductFeed(${aElement.value})`)
        aElement.textContent = all_category[i].name;
        liElement.appendChild(aElement);
    }
}

// 카테고리별 상품 보기
function categoryProductFeed(category_id) {
    window.location.href = `http://127.0.0.1:5500/product_categoryproduct.html?category_id=${category_id}`
}

// 로그아웃
function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("payload");
    localStorage.removeItem("token");
    alert('로그아웃 하셨습니다.')
}

injectNavbar()
