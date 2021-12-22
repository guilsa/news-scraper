# About this Project

I often get my political news from memeorandum.com. When there's a need to learn more about a print or online publication (ie NYT, etc), I love using mediabiasfactcheck.com to check ideology, history, factual accuracy and who they are funded by (very important). This app scrapes daily news and media bias information, then cross references this data to user. It's a work in progress.

## Built with

I decided to prototype this with sqlite. It's been an amazing experience, but probably needs to be migrated to PostgreSQL sometime.

- node/express
- better-sqlite3
- scrape-it
- node-cron
- create-react-app
- react

# Getting Started

## Prerequisites

- Node 16.11.0
 - I like to manage my Node versions with nvm.

## Installation

For the time being, for starting the front-end server, manually uncomment the BASE_URL `localhost:3000` inside useFetch.js (you'll need that one instead of the other).

### Back-end server:
- `cd v1`
- `npm install`
- `npm run dev`

### Front-end server:
- `cd v1/frontend`
- `npm install`
- `npm run start`

### Scrapers:

They can be initiated manually or via the cron job (only articlesScrapeSave for now).

From `/v1/`:

- Run the article scraper with `node articlesScrapeSave.mjs`
- Run the media bias scraper with `node biasScrapeSave.mjs`

## Db Backup Scripts

Bash scripts are located in `/v1/scripts/backup`. They save to the `/data/` folder.

# Todo

- daily cron
- Add darkmode
- Add infinite scroll
- Add lastUpdated in sources table as well
- Remove inline css (https://codesandbox.io/s/bold-booth-0qcq0?file=/src/App.css)
- System folder structure should be
  - cron
  - scripts (for backup)
    - utils
  - data
  - backend
    - db
  - frontend
  - Make v2 of the backend app simpler [1]
- Think about a test workflow to run main scripts under new db without having to redo shit
  - That may be why we want to decouple db read/write logic from scrapper
  - This way we can have a ENV file or something that dictates what should run
    - Add 12-factor config [1]
- Consider switching to MySQL to learn general node/db best practices from the web

"abstract any connection details"

[1] https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786

[2] https://stackoverflow.com/questions/30545749/how-to-provide-a-mysql-database-connection-in-single-file-in-nodejs

# Ideas

- scrape articles and run google translate
- extract keywords and key phrases using tensorflow (ie retext-keywords)
- sentiment analysis (npm natural, python pattern)
- cross-reference news article (or from a special keyword extraction of it) to youtube search results for that particular day
