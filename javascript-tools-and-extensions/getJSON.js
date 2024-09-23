// getJSON.js

const fetch = require('node-fetch');

const getJSON = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error: ', error);
    throw error;
  }
};

module.exports = getJSON;
