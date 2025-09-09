const createCategoryButtons = (categories) => {
    const allButton = `
    <li>
      <button id="cat-btn-all" onclick="showAllPlants()" 
        class="category-btn w-full text-left px-3 py-2 rounded hover:bg-green-100 bg-green-700 text-white">
        All Trees
      </button>
    </li>`;

    const categoryButtons = categories.map(
        (cat) => `
      <li>
        <button id="cat-btn-${cat.id}" onclick="loadPlantsByCategory(${cat.id})" 
          class="category-btn w-full text-left px-3 py-2 rounded hover:bg-green-100">
          ${cat.category_name}
        </button>
      </li>`
    ).join("");

    return allButton + categoryButtons;
};

const manageSpinner = (status) => {
    document.getElementById("spinner").classList.toggle("hidden", !status);
    document.getElementById("plants-container").classList.toggle("hidden", status);
};

const removeActive = () => {
    document.querySelectorAll(".category-btn")
        .forEach(btn => btn.classList.remove("bg-green-700", "text-white"));
};


let allPlants = []; 

const loadCategories = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json();
    const categories = data.categories;
    displayCategories(categories);
    
    await loadAllPlants(categories);
};

const loadAllPlants = async (categories) => {
    manageSpinner(true);
    allPlants = [];
    for (const cat of categories) {
        const resCat = await fetch(`https://openapi.programming-hero.com/api/category/${cat.id}`);
        const catData = await resCat.json();
        allPlants = allPlants.concat(catData.plants);
    }
    displayPlants(allPlants.slice(0,6));
    manageSpinner(false);
};


const showAllPlants = () => {
    removeActive();
    document.getElementById("cat-btn-all").classList.add("bg-green-700", "text-white");
    displayPlants(allPlants);
};

const displayPlantDetails = (plant) => {
  const modalContent = document.getElementById("details-container");

  modalContent.innerHTML = `
    <h2 class="mb-2 text-xl font-bold">${plant.name}</h2>
    <img src="${plant.image}" alt="${plant.name}" 
         class="object-cover w-60 sm:w-full mb-3 rounded-lg h-60" />

    <p><strong>Category:</strong> ${plant.category}</p>
    <p><strong>Price:</strong> ৳${plant.price}</p>
    <p class="mt-2 text-gray-600">${plant.description}</p>
  `;

  document.getElementById("plant_modal").showModal();
};


const loadPlantsByCategory = (id) => {
  manageSpinner(true);
  removeActive();
  document.getElementById(`cat-btn-${id}`).classList.add("bg-green-700", "text-white");
  const categoryName = document.getElementById(`cat-btn-${id}`).innerText.trim();

  const filtered = allPlants.filter(p => p.category === categoryName);

  displayPlants(filtered);

  setTimeout(() => manageSpinner(false), 300);
};




const loadPlantDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
    const details = await res.json();
    displayPlantDetails(details.plants);
};


const displayCategories = (categories) => {
    const container = document.getElementById("categories");
    container.innerHTML = `<ul>${createCategoryButtons(categories)}</ul>`;
};

const displayPlants = (plants) => {
    const container = document.getElementById("plants-container");
    container.innerHTML = "";

    if (!plants || plants.length === 0) {
        container.innerHTML = `
      <div class="text-center col-span-full py-10">
        <p class="text-lg text-gray-400">🌱 No plants available.</p>
      </div>`;
        return;
    }
    plants.forEach(plant => {
        const card = document.createElement("div");
        card.className = "p-4 bg-white shadow-md product-card rounded-xl";
        card.innerHTML = `
    <div class="product-image h-60 w-full bg-gray-200 rounded-lg mb-2">
      <img src="${plant.image}" alt="${plant.name}" class="w-full h-full object-cover rounded-lg" />
    </div>
    <h4 onclick="loadPlantDetails(${plant.id})" 
        class="text-lg font-bold cursor-pointer text-green-700 ">
      ${plant.name}
    </h4>
    <p class="text-sm text-gray-600">${plant.description.slice(0, 60)}...</p>
    
    <div class="flex items-center justify-between mt-2">
      <span class="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
        ${plant.category}
      </span>
      <p class="font-bold">৳${plant.price}</p>
    </div>

    <button onclick="addToCart('${plant.name}', ${plant.price})"
      class="btn btn-success btn-sm mt-2 w-full bg-green-700 text-white rounded-lg py-1">
      Add to Cart
    </button>
  `;
        container.appendChild(card);
    });

};

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const addToCart = (name, price) => {
    cart.push({ name, price });
    saveCart();
    updateCart();
};

const removeFromCart = (i) => {
    cart.splice(i, 1);
    saveCart();
    updateCart();
};

const updateCart = () => {
    const cartBox = document.getElementById("cart-items");
    cartBox.innerHTML = "";
    let total = 0;

    cart.forEach((item, i) => {
        total += item.price;
        cartBox.innerHTML += `
      <li class="flex justify-between bg-green-100 items-center px-5 rounded-xl py-2">
        <span>${item.name} <br/>৳ ${item.price}</span>
        <button onclick="removeFromCart(${i})" class="text-black text-xl">❌</button>
      </li>`;
    });

    document.getElementById("cart-total").innerText = "৳" + total;
};

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};
loadCategories();
updateCart();