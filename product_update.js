//카테고리 선택 옵션
async function createCategoryOptions() {
  const categories = await getCategoryList();
  const selectElement = document.getElementById("category");

  for (let i = 0; i < categories.length; i++) {
    const optionElement = document.createElement("option");
    optionElement.value = categories[i].id;
    optionElement.textContent = categories[i].name;
    selectElement.appendChild(optionElement);
  }
}

//수정
async function handleProductUpdate(product_id) {
  console.log("수정");

  let access = localStorage.getItem("access");
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const price = parseInt(document.getElementById("price").value);
  const image = document.getElementById("image").files;
  const is_free = document.getElementById("is_free").checked;
  const bargain = document.getElementById("bargain").checked;
  const place = document.getElementById("place").value;
  const category = Array.from(
    document.getElementById("category").selectedOptions
  ).map((option) => option.value);

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("price", price);
  formData.append("is_free", is_free);
  formData.append("bargain", bargain);
  formData.append("place", place);
  category.forEach((category_id) => formData.append("category", category_id));
  console.log(image);
  for (let i = 0; i < image.length; i++) {
    formData.append("images", image[i]);
  }

  console.log(formData.getAll);

  const response = await fetch(`https://lucedude.link/product/${product_id}/`, {
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
    window.location.href = `/product_detail.html?product_id=${product_id}`;
  } else {
    alert("잘못 된 요청입니다.");
  }
}

window.onload = async function () {
  await createCategoryOptions();
  console.log("로딩");

  // 유저 확인용
  const payload = localStorage.getItem("payload");
  console.log(payload);
  const payload_parse = JSON.parse(payload);
  console.log(payload_parse.user_id);
  userId = payload_parse.user_id;
  //

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("product_id");
  console.log(productId);

  const response = await getProduct(productId);
  console.log(response);

  let token = localStorage.getItem("access");
  const title = document.getElementById("title");
  const content = document.getElementById("content");
  const price = document.getElementById("price");
  const image = document.getElementById("image");
  const is_free = document.getElementById("is_free");
  const bargain = document.getElementById("bargain");
  const place = document.getElementById("place");

  const categoriesIds = response.category.map((category) => category.id);

  const categoryIdToSelect = categoriesIds;
  console.log(response.category);
  const categorySelect = document.getElementById("category");
  categoryIdToSelect.forEach((id) => {
    const option = categorySelect.querySelector(`option[value="${id}"]`);
    if (option) {
      option.selected = true;
    }
  });

  title.value = response.title;
  content.value = response.content;
  price.value = response.price;
  image.files = response.images[0];
  console.log(response)
  console.log(response.images[0])
  is_free.checked = response.is_free;
  bargain.checked = response.bargain;
  place.value = response.place;


  // for (let i = 0; i < image.length; i++) {
  //     formData.append('images', image[i]);
  // }

  const productUpdateBtn = document.getElementById("product_update");
  productUpdateBtn.setAttribute("onclick", `handleProductUpdate(${productId})`);
};

async function getProduct(productId) {
  const response = await fetch(`https://lucedude.link/product/${productId}/`);

  if (response.status == 200) {
    response_json = await response.json();
    return response_json;
  } else {
    alert(response.status);
  }
}
