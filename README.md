# 🕸️ Web Scraping Project for Tunisianet & Amazon

Welcome to the Web Scraping Project for Tunisianet and Amazon. This project is designed to extract product information, such as titles, prices, ratings, and other relevant data, from the **Tunisianet** and **Amazon websites**. The scraped data is stored in a JSON file for easy access and analysis.

## 🔋 Features

👉 **Multi-Page Scraping:** Automatically navigates and extracts data across multiple pages.

👉 **Data Extraction:** Scrapes product titles, prices, ratings, reviews, and more.

👉 **JSON Output:** Saves the scraped data in a structured JSON format.

👉 **Customizable Selectors:** Easily modify the code to scrape different elements or websites.

## ⚙️ Technologies Used

- **Scraping Tool:** [Puppeteer](https://pptr.dev/) for headless browser automation.
- **File System:** [fs](https://nodejs.org/api/fs.html) module for file handling in Node.js.

## 🖥️ Prerequisites

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## 🚀 Installation

1. Clone the repository:

```bash
 git clone https://github.com/aminejguirim10/web_scraping.git
```

2. Navigate to the project directory:

```bash
 cd web_scraping
```

3. Install the dependencies:

```bash
npm install
```

## 🌐 Scraping Details

This project scrapes data from two primary websites:

- **Tunisianet:** Scrapes product information from the gaming laptops section, including titles, references, descriptions, prices, availability, and images.

To run the scraper for Tunisianet, use the following commands:

```bash
cd tunisianet
```

```bash
node scrape.js
```

- **Amazon:** Scrapes bestseller products, including titles, prices, ratings, reviews, and images.

To run the scraper for Amazon, use the following commands:

```bash
cd amazon
```

```bash
node scrape.js
```

## 🚶 Contributing

Contributions are welcome! Please open an issue or submit a pull request.
