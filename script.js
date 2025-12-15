const fetchButton = document.getElementById("fetch-button");
const resultsDiv = document.getElementById("results");

const cache = new Map();
const CACHE_DURATION = 60 * 1000; // 1 minute
const API_URL = "https://opentdb.com/api.php?amount=3";

const fetchData = async () => {
  const cacheKey = API_URL;
  const cachedData = cache.get(cacheKey);
  const currentTime = Date.now();

  if (cachedData && currentTime - cachedData.timestamp < CACHE_DURATION) {
    console.log("Serving data from cache");
    return cachedData.data;
  }

  console.log("Making API call");

  const response = await fetch(API_URL);
  const data = await response.json();

  cache.set(cacheKey, {
    timestamp: currentTime,
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
