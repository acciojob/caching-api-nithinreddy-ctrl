const fetchButton = document.getElementById("fetch-button");
const resultsDiv = document.getElementById("results");

const cache = new Map();

const fetchData = async () => {
  const cacheKey = "trivia";

  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < 60000) {
    console.log("Serving data from cache");
    return cached.data;
  }

  // ❗ Important: delete expired cache
  cache.delete(cacheKey);

  console.log("Making API call");
  const response = await fetch("https://opentdb.com/api.php?amount=3");
  const data = await response.json();

  cache.set(cacheKey, {
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
