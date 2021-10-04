const axios = require("axios");
const cheerio = require("cheerio");

const extractLinks = async (url) => {
  try {
    // Fetching HTML
    const response = await axios.get(url);

    const html = response.data;

    // Using cheerio to extract <a> tags
    const $ = cheerio.load(html);

    const linkObjects = $("a");
    // this is a mass object, not an array

    // Collect the "href" and "title" of each link and add them to an array
    const links = [];
    linkObjects.each((index, element) => {
      links.push({
        text: $(element).text(), // get the text
        href: $(element).attr("href"), // get the href attribute
      });
    });

    return links;
    // do something else here with these links, such as writing to a file or saving them to your database
  } catch (error) {
    console.log("Error");
  }
};

const comparePages = async (urlOne, urlTwo) => {
  const startUrl = await extractLinks(urlOne);
  const destUrl = urlTwo.split("/").pop();

  for (let i = 0; i < startUrl.length; i++) {
    if (
      startUrl[i].href !== undefined &&
      startUrl[i].href.split("/").pop() === destUrl
    ) {
      return true;
    }
  }

  return false;
};

module.exports = { comparePages };
