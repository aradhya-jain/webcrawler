const axios = require('axios');
const cheerio = require('cheerio');
const URL = require('url-parse');

class WebCrawler {
  constructor(baseUrl) {
    this.baseUrl = new URL(baseUrl);
    this.visitedUrls = new Set();
    this.siteMap = {};
  }

  async crawl(url = this.baseUrl.href, depth = 3) {
    // Prevent infinite crawling and respect domain
    if (depth === 0 || 
        this.visitedUrls.has(url) || 
        !this._isInDomain(url)) {
      return;
    }

    try {
      console.log(`Crawling: ${url}`);
      this.visitedUrls.add(url);

      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      
      // Store current page's links
      this.siteMap[url] = [];

      // Extract links
      $('a').each((i, link) => {
        const href = $(link).attr('href');
        const fullUrl = this._normalizeUrl(href, url);

        if (fullUrl && this._isInDomain(fullUrl) && !this.visitedUrls.has(fullUrl)) {
          this.siteMap[url].push(fullUrl);
          
          // Recursive crawl
          this.crawl(fullUrl, depth - 1);
        }
      });

    } catch (error) {
      console.error(`Error crawling ${url}: ${error.message}`);
    }

    return this.siteMap;
  }

  _isInDomain(url) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname === this.baseUrl.hostname;
    } catch {
      return false;
    }
  }

  _normalizeUrl(href, baseUrl) {
    if (!href) return null;

    // Handle relative and absolute URLs
    try {
      const absoluteUrl = new URL(href, baseUrl).href;
      // Remove fragment identifiers
      return absoluteUrl.split('#')[0];
    } catch {
      return null;
    }
  }

  generateSitemap() {
    const sitemap = {};
    for (const [page, links] of Object.entries(this.siteMap)) {
      sitemap[page] = links.map(link => link.replace(this.baseUrl.href, ''));
    }
    return sitemap;
  }
}

module.exports = WebCrawler;