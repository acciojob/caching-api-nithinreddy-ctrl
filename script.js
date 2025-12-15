const fetchButton = document.getElementById("fetch-button");
const resultsDiv = document.getElementById("results");

const cache = new Map();

const fetchData = async () => {
  const cacheKey = "apiData";

  if (cache.has(cacheKey)) {
    const cachedValue = cache.get(cacheKey);

    if (Date.now() - cachedValue.timestamp < 60000) {
      console.log("Serving data from cache");
      return cachedValue.data;
    }
  }

  console.log("Making API call");
  const response = await fetch("https://opentdb.com/api.php?amount=3");
  const data = await response.json();

  cache.set(cacheKey, {
    timestamp: Date.now(),
    data: data,
  });

  return data;
};

const displayData = (data) => {
  const question = data.results[0].question;
  resultsDiv.textContent = question;
};

fetchButton.addEventListener("click", async () => {
  const data = await fetchData();
  displayData(data);
});
