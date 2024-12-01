# webcrawler
Web Crawler Application

# Web Crawler Service

## Overview
A domain-limited web crawler service that generates a sitemap for a given website.

## Features
- Crawl entire websites within a single domain
- Generate comprehensive sitemaps
- RESTful API for crawling
- Dockerized deployment

## Prerequisites
- Node.js 18+
- Docker (optional)

## Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Service
### Local Development
```bash
npm start
```

### Docker
```bash
docker build -t web-crawler .
docker run -p 3000:3000 web-crawler
```

## Usage
Send a POST request to `/crawl` with a JSON body:
```json
{
  "url": "https://example.com"
}
```

## Limitations
- Crawls up to 3 levels deep
- Single domain restriction
- No external link following

## Testing
```bash
npm test
```