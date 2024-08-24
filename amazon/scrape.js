import puppeteer from "puppeteer";
import fs from "fs";

const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = "https://www.amazon.fr/gp/bestsellers";
  await page.goto(url);

  const bestsellers = await page.evaluate(() => {
    const bestsellers = document.querySelectorAll(".a-carousel-card");

    return Array.from(bestsellers).map((bestseller) => {
      const priceElement = bestseller.querySelector(
        "._cDEzb_p13n-sc-price_3mJ9Z"
      );
      const price =
        priceElement && priceElement.textContent
          ? priceElement.textContent.trim()
          : "N/A";

      const titleElement = bestseller.querySelector(
        ".p13n-sc-truncate-desktop-type2"
      );
      const title =
        titleElement && titleElement.getAttribute("title")
          ? titleElement.getAttribute("title").trim()
          : "N/A";

      const reviewsElement = bestseller.querySelector(".a-size-small");
      const reviews =
        reviewsElement && reviewsElement.textContent
          ? reviewsElement.textContent.trim()
          : "N/A";

      const imageElement = bestseller.querySelector("img");
      const image =
        imageElement && imageElement.getAttribute("src")
          ? imageElement.getAttribute("src").trim()
          : "N/A";

      const ratingElement = bestseller.querySelector(
        ".a-icon-star-small span.a-icon-alt"
      );
      const rating = ratingElement
        ? ratingElement.textContent.trim().split(" ")[0]
        : "N/A";

      return {
        title,
        price,
        reviews,
        image,
        rating,
      };
    });
  });

  fs.writeFileSync("bestsellers.json", JSON.stringify(bestsellers, null, 2));
  console.log("Data scraped successfully");

  await browser.close();
};

scrape();
