const axios = require('axios');

class CrawlerClient {
  constructor(serverUrl = 'http://localhost:3000') {
    this.serverUrl = serverUrl;
  }

  async crawlWebsite(url) {
    try {
      const response = await axios.post(`${this.serverUrl}/crawl`, { url });
      this._displaySitemap(response.data.sitemap);
    } catch (error) {
      console.error('Crawl failed:', error.response?.data || error.message);
    }
  }

  _displaySitemap(sitemap) {
    console.log('Site Crawl Results:');
    for (const [page, links] of Object.entries(sitemap)) {
      console.log(`${page}:`);
      links.forEach(link => console.log(`- ${link}`));
    }
  }
}

// Allow running directly from command line
if (require.main === module) {
  const url = process.argv[2];
  if (!url) {
    console.log('Please provide a URL to crawl');
    process.exit(1);
  }
  
  const client = new CrawlerClient();
  client.crawlWebsite(url);
}

module.exports = CrawlerClient;