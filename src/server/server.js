const express = require('express');
const WebCrawler = require('./crawler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/crawl', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const crawler = new WebCrawler(url);
    await crawler.crawl();
    const sitemap = crawler.generateSitemap();

    res.json({
      message: 'Crawl completed',
      sitemap: sitemap
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Crawl failed', 
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Crawler server running on port ${PORT}`);
});