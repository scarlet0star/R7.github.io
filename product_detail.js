// 
const payload = localStorage.getItem("payload")
const payload_parse = JSON.parse(payload)
const userId = payload_parse.user_id

if (!localStorage.getItem("access")) {
    alert('로그인이 필요합니다!')
    window.history.back()
}


async function getProduct(productId) {
    const response = await fetch(`http://3.36.40.49/product/${productId}/`,
    )

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}

window.onload = async function () {
    createCategoryOptions()

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product_id');
    console.log(productId)

    const response = await getProduct(productId);
    console.log(response)


    const productImage = document.getElementById("product-image")
    const productTitle = document.getElementById("product-title")
    const productContent = document.getElementById("product-content")
    const productPrice = document.getElementById("product-price")
    const productBargain = document.getElementById("product-bargain")
    const productPlace = document.getElementById("product-place")
    const productCategory = document.getElementById("product-category")
    const productViews = document.getElementById("product-views")
    const productTransaction_status = document.getElementById("product-transaction_status")
    const productRefreshed_at = document.getElementById("product-refreshed_at")
    const productCreated_at = document.getElementById("product-created_at")
    const productBookmark = document.getElementById("product-bookmark")
    const productIs_hide = document.getElementById("product-is_hide")

    productTitle.innerText = response.title
    productContent.innerText = response.content
    productPrice.innerText = numberWithCommas(response.price) + " 원"

    if (response.bargain == true) {
        productBargain.innerText = "가격제안 가능"
    } else {
        productBargain.innerText = "가격제안 불가"
    }
    productPlace.innerText = "거래 가능 지역 : " + response.place

    for (let i = 0; i < response.category.length; i++) {
        const aElement = document.createElement('p')
        aElement.value = response.category[i].id
        aElement.setAttribute("onclick", `categoryFilter(${response.category[i].id})`)
        aElement.textContent = response.category[i].name


        productCategory.appendChild(aElement);
    }

    productViews.innerText = response.views + "회"
    if (response.transaction_status == 0) {
        productTransaction_status.innerText = "구매 가능"
    }
    if (response.transaction_status == 1) {
        productTransaction_status.innerText = "예약중"
    }
    if (response.transaction_status == 2) {
        productTransaction_status.innerText = "판매 완료"
    }
    //////////////////////////////////////////////////////////////////
    productRefreshed_at.innerText = response.refreshed_at
    productCreated_at.innerText = response.created_at
    productBookmark.innerText = response.bookmark
    productIs_hide.innerText = response.is_hide


    const newImage = document.createElement("img")
    if (response.images.length == 0) {
        newImage.setAttribute("src", `https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99F519345EE1ED620D`)
        newImage.setAttribute("class", "img-fluid")
    } else {
        newImage.setAttribute("src", `http://127.0.0.1:8080${response.images[0].image}`)
        newImage.setAttribute("style", "width:250px; height:250px;")
        newImage.style.objectFit = "cover"
    }
    productImage.appendChild(newImage)


    // 수정/삭제 버튼 관련
    // 보여주고 못누르게하기
    // if (response.user == userId) {
    //     const productUpdateBtn = document.getElementById('product_update')
    //     const productDeleteBtn = document.getElementById('product_delete')
    //     productUpdateBtn.setAttribute("onclick", `productUpdate(${productId})`)
    //     productDeleteBtn.setAttribute("onclick", `productDelete(${productId})`)
    // } else {
    //     const productUpdateBtn = document.getElementById('product_update')
    //     const productDeleteBtn = document.getElementById('product_delete')
    //     productUpdateBtn.setAttribute("onclick", "alert('권한이 없습니다')")
    //     productDeleteBtn.setAttribute("onclick", "alert('권한이 없습니다')")
    // }

    // 내 글만 보이기
    if (response.user == userId) {
        const productUpdateBtn = document.getElementById('product_update')
        const productDeleteBtn = document.getElementById('product_delete')
        productUpdateBtn.style.display = "block"
        productDeleteBtn.style.display = "block"
        productUpdateBtn.setAttribute("onclick", `productUpdate(${productId})`)
        productDeleteBtn.setAttribute("onclick", `productDelete(${productId})`)
    
    } else {
        const productUpdateBtn = document.getElementById('product_update')
        const productDeleteBtn = document.getElementById('product_delete')
        productUpdateBtn.style.display = "none"    
        productDeleteBtn.style.display = "none"            
    }

}


function productUpdate(product_id) {
    window.location.href = `/product_update.html?product_id=${product_id}`
}


async function productDelete(product_id) {
    if (confirm('삭제하시겠습니까?')) {
        let access = localStorage.getItem('access')
        const response = await fetch(`http://3.36.40.49/product/${product_id}`, {
            headers: {
                'Authorization': `Bearer ${access}`,
            },
            method: 'DELETE',
        })
        if (response.status == 204) {
            alert('삭제되었습니다.')
            window.location.href = 'index.html'
        } else {
            alert('권한이 없습니다!')
            window.location.href = 'index.html'
            
        }
    } else {
        // 취소 버튼을 눌렀을 경우
        return false;
    }
}


function categoryFilter(category_id) {
    window.location.href = `/product_category_filter.html?category_id=${category_id}`
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

fetch("./navbar.html").then(response => {
    return response.text()
})
    .then(data => {
        document.querySelector("header").innerHTML = data;
    })
