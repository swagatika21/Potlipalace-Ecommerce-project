$(document).ready(function () {
  let cartProducts = [];

  var vanityProducts;
  $.ajax({
    url: "../JSON/vanity.json",
    dataType: "json",
    success: function (data) {
      vanityProducts = data.vanity;
      var container = $("#vanity-products-container");

      for (var i = 0; i < vanityProducts.length; i++) {
        var product = vanityProducts[i];
        var productHtml = `
          <div class="col-lg-3 col-md-4 p-4">
            <div class="card mb-3">
              <img src="${product.src}" class="card-img-top" alt="${product.name}">
              <div class="middle">
                <button class="subs-btn view-product-btn" data-product-id="${product.id}">VIEW PRODUCT</button>
              </div>
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">Price: Rs.${product.price}</p>
              </div>
            </div>
          </div>
        `;
        container.append(productHtml);
      }
    },
    error: function () {
      console.log("Error loading JSON data");
    },
  });

  var storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cartProducts = JSON.parse(storedCart);
  }

  function addToCart(product) {
    //console.log("am in add to cart" + product)
    if (product) {
      cartProducts.push(product);
      localStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  $("body").on("click", ".fa-cart-shopping", function () {
    var productId = $(this).data("product-id");
    var product = vanityProducts.find((p) => p.id === productId);
    addToCart(product);
    showAddedToCartMessage();
  });

  //product pop up
  function displayProductModal(product) {
    var modalId = `productModal${product.id}`;
    var modalHtml = `
        <div class="modal fade" id="${modalId}" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">${product.name}</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body d-lg-flex">
                <div class="p-3 col-lg-6">
                  <img src="${product.src}" alt="${product.name}" class="w-100">
                  <h6 class="p-3 text-center">Price: Rs.${product.price}</h6>
                </div>
                <div class="p-3 col-lg-6">
                  <p>${product.Desc}</p>
                </div>
              </div>
              <div class="modal-footer">
                <p id="item-added"></p>
                <i class="fa-regular fa-heart  p-2 fa-2x" ></i>
                <button class="subs-btn p-2">BUY NOW</button>
                <i class="fa-solid fa-cart-shopping fa-2x p-2" data-product-id="${product.id}"></i>
              </div>
            </div>
          </div>
        </div>
      `;

    $("body").append(modalHtml);

    $(`#${modalId}`).modal("show");
  }

  //product pop up
  $(document).on("click", ".view-product-btn", function () {
    var productId = $(this).data("product-id");
    var product = vanityProducts.find((p) => p.id === productId);
    displayProductModal(product);
  });

  //add to cart msg
  function showAddedToCartMessage() {
    let added = `<i class="fa-solid fa-circle-check"></i>`;
    $("#item-added")
      .html(added + " Item added to cart")
      .css("color", "green");

  }

  function ProductList(product, index) {
    if (product) {
      let prod = `
        <div class="col-md-4 p-2 cart-product " data-product-index="${index}">
          <h4 class="ms-3">${product.name}</h4>
          <div class="p-3">
            <img src="${product.src}" alt="${product.name}">
            <h6 class="p-2">Price: Rs.${product.price}</h6>
            <button class="subs-btn p-2 delete-product-btn">DELETE</button>
          </div>
        </div>
      `;
      $("#cart-prod").append(prod);
    }
  }
  
  function displayCartItems(cartProducts) {
    for (var i = 0; i < cartProducts.length; i++) {
      var product = cartProducts[i];
      ProductList(product, i);
    }
  }

  $("#cart-prod").on("click", ".delete-product-btn", function () {
    var $productRow = $(this).closest(".cart-product");
    var index = $productRow.data("product-index");
  
    if (index !== undefined) {
      cartProducts.splice(index, 1);
      $productRow.remove(); 
      localStorage.removeItem("cart"); // Clear the entire cart from local storage
      localStorage.setItem("cart", JSON.stringify(cartProducts)); // Add the updated cart items back
      //console.log("Item deleted");
    }
  });
  

  // Call displayCartItems
  if (window.location.pathname.endsWith("/Cart.html")) {
    displayCartItems(cartProducts);
  }
});
