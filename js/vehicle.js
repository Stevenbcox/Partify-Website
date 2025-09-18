let vehicleData = [];

Papa.parse("../data/Vehicles.csv", {
  download: true,
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  complete: function (results) {
    vehicleData = results.data;
    populateYears();
  },
});

function populateYears() {
  const yearSelect = document.getElementById("year");
  yearSelect.innerHTML = "<option value=''>Select Year</option>";
  const years = [...new Set(vehicleData.map((v) => String(v.year)))].sort();
  years.forEach((y) => yearSelect.add(new Option(y, y)));
  yearSelect.onchange = populateMakes;
}

function populateMakes() {
  const year = document.getElementById("year").value;
  const makeSelect = document.getElementById("make");
  const modelSelect = document.getElementById("model");
  makeSelect.innerHTML = "<option value=''>Select Make</option>";
  modelSelect.innerHTML = "<option value=''>Select Model</option>";
  if (!year) return;
  const makes = [
    ...new Set(
      vehicleData.filter((v) => String(v.year) === year).map((v) => v.make)
    ),
  ];
  makes.forEach((m) => makeSelect.add(new Option(m, m)));
  makeSelect.onchange = populateModels;
}

function populateModels() {
  const year = document.getElementById("year").value;
  const make = document.getElementById("make").value;
  const modelSelect = document.getElementById("model");
  modelSelect.innerHTML = "<option value=''>Select Model</option>";
  if (!year || !make) return;
  const models = [
    ...new Set(
      vehicleData
        .filter((v) => String(v.year) === year && v.make === make)
        .map((v) => String(v.model))
    ),
  ];
  models.forEach((m) => modelSelect.add(new Option(m, m)));
}

function findVehicle() {
  const year = document.getElementById("year").value;
  const make = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  if (!year || !make || !model) {
    alert("Please select Year, Make, and Model.");
    return;
  }
  document.getElementById(
    "result"
  ).innerHTML = `You selected: <b>${year} ${make} ${model}</b>`;
}

function goToRoute() {
  const year = document.getElementById("year").value;
  const make = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  if (!year || !make || !model) {
    alert("Please select Year, Make, and Model.");
    return;
  }
  window.location.href = `route.html?year=${encodeURIComponent(
    year
  )}&make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}`;
}

function goToSelected() {}
