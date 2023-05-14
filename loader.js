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

    createCategoryList()


    const payload = localStorage.getItem("payload")
    const payload_parse = JSON.parse(payload)

    const intro = document.getElementById("intro")
    if (localStorage.getItem("access")) {
        intro.innerText = payload_parse.email
        
        let navbarRight = document.getElementById("navbar-right")
        let newLi = document.createElement("li")
        newLi.setAttribute("class", "nav-item")
        
        let logoutBtn = document.createElement("button")
        logoutBtn.setAttribute("class", "nav-link btn")
        logoutBtn.innerText = '로그아웃'
        logoutBtn.setAttribute("onclick", "logout()")
    
        newLi.appendChild(logoutBtn)
    
        navbarRight.appendChild(newLi)
    
        let loginButton = document.getElementById("login-button")
        loginButton.style.display = 'none'

        if (payload_parse.is_admin == true) {
            const admin_category_create = document.getElementById("admin_category_create")
            admin_category_create.style.display = "block"
        }
    }
}

// 카테고리 가져오기
async function getCategoryList() {
    const response = await fetch('https://lucedude.link/product/category/');
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
        aElement.setAttribute("onclick",`categoryProductFeed(${aElement.value})`)
        aElement.textContent = all_category[i].name;
        liElement.appendChild(aElement);
    }
}

// 카테고리별 상품 보기
function categoryProductFeed(category_id) {
    window.location.href = `/product_categoryproduct.html?category_id=${category_id}`
}

// 로그아웃
function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("payload");
    localStorage.removeItem("token");
    alert('로그아웃 하셨습니다.')

    window.location.reload()
}

injectNavbar() 
