const buttonsContainer = document.getElementById("buttonsContainer");

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

const { year, make, model } = getQueryParams();

Papa.parse("../data/Vehicles.csv", {
  download: true,
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  complete: function (results) {
    const data = results.data;

    const matches = data.filter(
      (v) =>
        String(v.year).trim() === year.trim() &&
        String(v.make).trim() === make.trim() &&
        String(v.model).trim() === model.trim()
    );

    if (matches.length === 0) {
      buttonsContainer.innerHTML = "No products found for this vehicle.";
      return;
    }

    const productTypes = [
      ...new Set(matches.map((v) => v["product Type"].trim())),
    ];

    productTypes.forEach((type) => {
      const match = matches.find((v) => v["product Type"].trim() === type);
      const button = document.createElement("button");
      button.textContent = type;
      button.onclick = () => window.open(match.url, "_blank");
      buttonsContainer.appendChild(button);
    });
  },
});
