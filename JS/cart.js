$(document).ready(function () {
    // Initialize cartProducts as an empty array
    var cartProducts = [];
  
    function addToCart(product) {
      cartProducts.push(product);
      updateCart();
    }
  
    $("body").on("click", ".fa-cart-shopping", function () {
      var productId = $(this).data("product-id");
      var product = vanityProducts.find((p) => p.id === productId);
      addToCart(product);
      showAddedToCartMessage();
    });
  
    function updateCart() {
      // Clear the cart-prod section
      $("#cart-prod .row").empty();
  
      // Loop through cartProducts and add them to the cart
      for (var i = 0; i < cartProducts.length; i++) {
        var product = cartProducts[i];
        ProductList(product);
      }
  
      // Show or hide the empty cart message
      if (cartProducts.length === 0) {
        $("#empty-cart").show();
      } else {
        $("#empty-cart").hide();
      }
    }
  
    function ProductList(product) {
      var prod = `
        <div class="col-lg-12 p-2">
          <h4 class="modal-title">${product.name}</h4>
          <div class="p-3">
            <img src="${product.src}" alt="${product.name}" class="w-100">
            <h6 class="p-3 text-center">Price: Rs.${product.price}</h6>
          </div>
          <div class="p-3">
            <button class="subs-btn p-2">PROCEED TO CHECKOUT</button>
          </div>
        </div>
      `;
  
      $("#cart-prod .row").append(prod);
    }
  
    // Load vanityProducts and update the cart when the page loads
    $.ajax({
      url: "../JSON/vanity.json",
      dataType: "json",
      success: function (data) {
        vanityProducts = data.vanity;
        updateCart(); // Update the cart on page load
      },
      error: function () {
        console.log("Error loading JSON data");
      },
    });
  
    // Show added to cart message temporarily
    function showAddedToCartMessage() {
      var added = `<i class="fa-solid fa-circle-check"></i>`;
      $("#item-added").html(added + " Item added to cart").css("color", "green");
      setTimeout(function () {
        $("#item-added").text("").css("color", "initial");
      }, 2000); // Clear the message after 2 seconds
    }
  });
  