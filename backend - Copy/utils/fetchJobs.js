const fetch = require('node-fetch'); // if you're not using native fetch in Node

const fetchJobsFromAPI = async (query) => {
  const url = `https://jsearch.p.rapidapi.com/search?query=${query}&page=1&num_pages=1`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '342bf28b20mshc6c53308129d5b5p1333f5jsn65ee3aee90a8', // ✅ Secure way using .env
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

module.exports = fetchJobsFromAPI;