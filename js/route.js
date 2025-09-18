// Utility to get query parameters
function getQueryParams() {
  const params = {};
  location.search
    .substring(1)
    .split("&")
    .forEach((pair) => {
      const [key, value] = pair.split("=");
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
  return params;
}

const params = getQueryParams();
const year = params.year;
const make = params.make;
const model = params.model;

const buttonsContainer = document.getElementById("buttonsContainer");

// Load vehicles.json
fetch("../data/vehicles.json")
  .then((res) => res.json())
  .then((data) => {
    // Filter by selected vehicle
    const matches = data.filter(
      (v) => String(v.year) === year && v.make === make && v.model === model
    );

    if (matches.length === 0) {
      buttonsContainer.innerHTML = "No products found for this vehicle.";
      return;
    }

    // Remove duplicate product types (just in case)
    const productTypes = [...new Set(matches.map((v) => v.productType))];

    // Create a button for each product type
    productTypes.forEach((type) => {
      // Find the URL for this product type
      const match = matches.find((v) => v.productType === type);
      const button = document.createElement("button");
      button.textContent = type;
      button.onclick = () => {
        window.open(match.url, "_blank"); // Open in new tab
      };
      buttonsContainer.appendChild(button);
    });
  });
