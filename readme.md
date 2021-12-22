# About this Project

I often get my political news from memeorandum.com. When there's a need to learn more about a print or online publication (ie NYT, etc), I love using mediabiasfactcheck.com to check ideology, history, factual accuracy and who they are funded by (very important). This app scrapes daily news and media bias information, then cross references this data to user. It's a work in progress.

## Built with

I decided to prototype this with sqlite, without the use of any ORM. SQL is a beautiful technology, we should strive for less abstractions (ie. lets us write raw queries). There's also no need for a db type-system at this point. So far, it's been an amazing experience. But it probably needs to be migrated to MySQL or PostgreSQL sometime so that I learn proper back-end database best-practices like `12-factor config`.

I've [researched](https://gist.github.com/guilsa/0cdd1258c46edf3112b2cc50af03fc8c) some node.js db tools for this project but have punted on that for now. Would consider picking MySQL over PostgreSQL if the available db drivers have nice and clean JS syntax.

Finally here's what has in use today:

- node/express
- sqlite (better-sqlite3)
- scrape-it
- node-cron
- create-react-app
- react
- odroid n2 (hardware)
- diet-pi (debian operating system)

# Getting Started

- Currently the repo comes with a sqlite db dump (`/v1/news.db`). Feel free to delete that file if you want to start from scratch. 
- To scrape/fetch news articles, run the article scraper manually (see `node articlesScrapeSave.mjs` below) or start the cron job (instructions below as well). I have this as a background worker process on a separate raspberry pi style linux box).

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

They can be initiated manually or via the cron job (only `articlesScrapeSave.mjs` for now).

To run it manually, from `/v1/`:

- Run the article scraper with `node articlesScrapeSave.mjs`
- Run the media bias scraper with `node biasScrapeSave.mjs`

To run it continuously, from `/v1/`:

- Start the cron job with `node /v1/cron.js` - that's it!

## Data QA & Challenges

The wonderful folks at mediabiasfactcheck.com do not want you scraping their website as they have valuable information (if you want, consider supporting them!). They auto-scramble the html and therefore you should expect inconsistencies from the scraper's parsing logic. To circumvent this, check out the _Database Backup Scripts_ section here. That's my recommended workflow for quickly cleansing the incoming data, if you will - after exporting the db file, you will want to open it in your text editor of choice, make your batch edits, then use the import script to insert the data. If you have other suggestions, send them over.

### Deployment Workflow

Everything is set up to run on my local LAN, especially since I started this with sqlite.

- To continuously run all systems (cron job, backend and frontend servers), I use an odroid n2 single-board-computer running on a DietPi. I highly recommend using the DietPi for linux related learning (ie. self-hosting, dev-ops, etc).
- The machine runs headless (no monitor, boots directly to terminal) and is plugged directly into the router. 
- Once the processes are running, to circumvent them terminating once the ssh connection closes, I use [screen](https://www.gnu.org/software/screen/), it's a window/shell manager. More info on how to operate it [here](https://gist.github.com/jctosta/af918e1618682638aa82).
- The box is exposed to other computers in the LAN (local domain name resolution) using avahi-daemon.

## Database Backup Scripts

- Export/import bash scripts are available, located in `/v1/scripts/backup`
- Export saves to the `/data/` folder
- Import loads to the `/v1/news.db` database

# Contributions

TBD. If you can, please support these and other projects by contributing what you can to honor their work:

- [DietPi](https://dietpi.com/)
- [Media Bias/Fact Check](https://mediabiasfactcheck.com/)

# Todo

- Add pagination and infinite scroll
- Add darkmode
- Add updatedAt in sources table as well
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

[1] https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786

[2] https://stackoverflow.com/questions/30545749/how-to-provide-a-mysql-database-connection-in-single-file-in-nodejs

# Ideas

- scrape articles and run google translate
- extract keywords and key phrases using tensorflow (ie retext-keywords)
- sentiment analysis (npm natural, python pattern)
- cross-reference news article (or from a special keyword extraction of it) to youtube search results for that particular day
