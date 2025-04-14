const form = document.getElementById("foodForm");
const foodList = document.getElementById("foodList");

let foods = JSON.parse(localStorage.getItem("foods")) || [];

function renderFoods() {
  foodList.innerHTML = "";
  const today = new Date().toISOString().split("T")[0];

  foods.forEach((item, index) => {
    const li = document.createElement("li");
    const isExpired = item.expiry < today;

    li.className = isExpired ? "expired" : "";
    li.innerHTML = `
      <span>${item.name} – <strong>${item.expiry}</strong></span>
      <button onclick="removeItem(${index})">❌</button>
    `;

    foodList.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("foodName").value;
  const expiry = document.getElementById("expiryDate").value;

  if (!name || !expiry) return;

  foods.push({ name, expiry });
  localStorage.setItem("foods", JSON.stringify(foods));
  form.reset();
  renderFoods();
});

function removeItem(index) {
  foods.splice(index, 1);
  localStorage.setItem("foods", JSON.stringify(foods));
  renderFoods();
}

renderFoods();