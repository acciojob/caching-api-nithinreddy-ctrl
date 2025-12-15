const fetchButton = document.getElementById("fetch-button");
const resultsDiv = document.getElementById("results");

const cache = new Map();

const fetchData = async () => {
  const url = "https://opentdb.com/api.php?amount=3";
  const cached = cache.get(url);

  if (cached && Date.now() - cached.timestamp < 60000) {
    console.log("Serving data from cache");
    return cached.data;
  }

  console.log("Making API call");
  const response = await fetch(url);
  const data = await response.json();

  cache.set(url, {
    timestamp: Date.now(),
    data: data
  });

  return data;
};

const displayData = (data) => {
  resultsDiv.textContent = data.results[0].question;
};

fetchButton.addEventListener("click", async () => {
  const data = await fetchData();
  displayData(data);
});
