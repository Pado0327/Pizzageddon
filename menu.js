/****************
    
    Final Web Project
    Name: JaeJinKim
    Date: 06/24/2020
    Description: to load json file (pizza menu) to display items

*****************/

/**
 * Main function to load the pizza menu list including name, value, picture of each pizza
 * @param {*} pizzaItemLists
 */
function createPizzaList(pizzaItemLists) {
  for (let i = 0; i < pizzaItemLists.length; i++) {
    let ul = document.getElementById("pizzaList");
    let li = document.createElement("li");
    let img = document.createElement("img");
    let pizzaName = document.createElement("p");
    let pizzaValue = document.createElement("p");
    let btn = document.createElement("BUTTON");
    let t = document.createTextNode("Add to the Cart");

    // set attribute to the button element so that clicking add button
    // looks like it would do something.
    // btn.setAttribute("onclick", "alert('The item is added to the cart');");
    btn.addEventListener("click", function () {
      check(i, pizzaItemLists);
    });

    img.src = `images/pizza/${pizzaItemLists[i].images}`;
    pizzaName.innerHTML = pizzaItemLists[i].pizza_name;
    pizzaValue.innerHTML = pizzaItemLists[i].price;

    btn.appendChild(t);
    li.appendChild(img);
    li.appendChild(pizzaName);
    li.appendChild(pizzaValue);
    li.appendChild(btn);
    ul.appendChild(li);
  }
}

/**
 * Fake cart that add item to the cart and show which item the customer has added
 *
 * @param {*} i index to identify which pizza the customer add
 * @param {*} pizzaItemLists data from pizza menu Json.
 */
function check(i, pizzaItemLists) {
  let ul = document.getElementById("addeditem");
  let li = document.createElement("li");
  let pizza_name = document.createElement("span");
  pizza_name.innerHTML = pizzaItemLists[i].pizza_name;

  li.appendChild(pizza_name);
  ul.appendChild(li);
}

function load() {
  fetch("menuList.json")
    .then(function (result) {
      return result.json();
    })
    .then(function (data) {
      createPizzaList(data);
    });

  // show or  close the cart content
  document.getElementById("cartbtn").addEventListener("click", function () {
    let content = this.nextElementSibling;

    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });

  //clear all cart content
  document.getElementById("removeItem").addEventListener("click", function () {
    let items = document.getElementById("addeditem");
    let content = document.getElementById("cartcontent");

    //clear all cart content.
    while (items.firstChild) {
      items.removeChild(items.firstChild);
    }

    // close cart content after 1 sec.
    setTimeout(function () {
      content.style.display = "none";
    }, 1000);
  });
}

//	Add the event listener to run when the page is loaded
document.addEventListener("DOMContentLoaded", load);
