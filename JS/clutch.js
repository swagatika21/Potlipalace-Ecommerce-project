$(document).ready(function ()
 {
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
            <div class="p-3 col-lg-6" >
            <img src="${product.src}" alt="${product.name}" class="w-100">
            <h6 class="p-3 text-center">Price: Rs.${product.price}</h6>
            </div>
            <div class="p-3 col-lg-6" >
            <p>${product.Desc}</p>
            </div>
             
            </div>
            <div class="modal-footer ">
            <i class="fa-regular fa-heart p-2 fa-2x disabled-icon" ></i>
            <button  class="subs-btn p-2"><a href="./buynow.html">BUY NOW</a></button>
             <i class="fa-solid fa-cart-shopping fa-2x p-2"></i>
            </div>
          </div>
        </div>
      </div>
    `;
    $("body").append(modalHtml);

    $(`#${modalId}`).modal("show");
  }

  var clutchProducts;
  $.ajax({
    url: "../JSON/clutch.json",
    dataType: "json",
    success: function (data) {
      clutchProducts = data.clutch;
      var container = $("#clutch-products-container");

      for (var i = 0; i < clutchProducts.length; i++) {
        var product = clutchProducts[i];
        var productHtml = `
          <div class="col-lg-3 col-md-4 p-4">
            <div class="card mb-3">
              <img src="${product.src}" class="card-img-top" alt="${product.name}">
              <div class="middle">
                <button class="subs-btn view-product-btn" data-product-id="${product.id}">VIEW PRODUCT</button>
              </div>
              <div class="card-body">
                <h5 class="card-title">${product.name}
                </h5>
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

  $(document).on("click", ".view-product-btn", function () {
    var productId = $(this).data("product-id");
    var product = clutchProducts.find((p) => p.id === productId);
    displayProductModal(product);
  });
});
