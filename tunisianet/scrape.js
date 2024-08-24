import puppeteer from "puppeteer";
import fs from "fs";

const getTotalPages = async (page) => {
  const url = "https://www.tunisianet.com.tn/681-pc-portable-gamer";
  await page.goto(url);

  const totalPages = await page.evaluate(() => {
    // Get all pagination elements
    const paginationElements = document.querySelectorAll(
      ".pagination .page-list li a"
    );

    // Get all page numbers and convert them to integers
    const pages = Array.from(paginationElements).map((element) =>
      parseInt(element.textContent.trim())
    );

    // Filter out NaN values and get the maximum page number
    return Math.max(...pages.filter((page) => !isNaN(page)));
  });
  return totalPages;
};

const scrape = async () => {
  // Launch the browser and open a new page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Get the total number of pages
  const totalPages = await getTotalPages(page);
  const all_pcs = [];
  let currentPage = 1;

  while (currentPage <= totalPages) {
    const url = `https://www.tunisianet.com.tn/681-pc-portable-gamer?page=${currentPage}`;
    // Go to the next page
    await page.goto(url);

    const pcs = await page.evaluate(() => {
      const pcsElements = document.querySelectorAll(".product-miniature");
      return Array.from(pcsElements).map((pc) => {
        const titleElement = pc.querySelector(".product-title a");
        const title =
          titleElement && titleElement.textContent
            ? titleElement.textContent.trim()
            : "N/A";

        const refernceElement = pc.querySelector(".product-reference");
        const reference =
          refernceElement && refernceElement.textContent
            ? refernceElement.textContent.trim()
            : "N/A";

        const descriptionElement = pc.querySelector(
          ".product-description div a"
        );
        const description =
          descriptionElement && descriptionElement.textContent
            ? descriptionElement.textContent.trim()
            : "N/A";

        const priceElement = pc.querySelector(
          ".product-price-and-shipping .price"
        );
        const price =
          priceElement && priceElement.textContent
            ? priceElement.textContent.trim()
            : "N/A";

        const linkElement = pc.querySelector(".product-title a");
        const link =
          linkElement && linkElement.getAttribute("href")
            ? linkElement.getAttribute("href").trim()
            : "N/A";

        const stockElement = pc.querySelector("#stock_availability span");
        const stock =
          stockElement && stockElement.textContent
            ? stockElement.textContent.trim()
            : "N/A";

        const imageElement = pc.querySelector(".center-block.img-responsive");
        const image =
          imageElement && imageElement.getAttribute("src")
            ? imageElement.getAttribute("src")
            : "N/A";
        return {
          title,
          reference,
          description,
          price,
          link,
          stock,
          image,
        };
      });
    });

    // Add the scraped data to the all_pcs array
    all_pcs.push(...pcs);
    console.log(`Scraped page ${currentPage}`);
    currentPage++;
  }

  // Save the data to a JSON file named pcs.json
  fs.writeFileSync("pcs.json", JSON.stringify(all_pcs, null, 2));
  console.log("Data scraped successfully");

  await browser.close();
};

scrape();
