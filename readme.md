# About this Project

I often get my mainstream news from memeorandum.com. When there's a need to learn more about a publication (ie NYT), I use mediabiasfactcheck.com to check where they skew ideologically, their history, factual accuracy and who they are funded by. This app scrapes daily news and media bias information, then cross references this data to user. It's a work in progress. As a user, you should be able to filter by factual reporting and credibility rating very soon!

## Built with

I decided to prototype this with sqlite, without the use of any ORM. SQL is a wonderful technology. Writing raw queries was important to me for this project. Also, there was no need for a db type-system at this point. I've [researched](https://gist.github.com/guilsa/0cdd1258c46edf3112b2cc50af03fc8c) new node.js db tool options, but have punted on that for now. Would consider picking MySQL over PostgreSQL if the available db drivers have nicer and cleaner JS syntax 😋.

What's being used now:

- node/express
- better-sqlite3
- scrape-it
- node-cron
- create-react-app
- react
- odroid n2 (hardware)
- diet-pi (debian operating system)

# Getting Started

- Currently, the repo comes with a sqlite db dump (`/v1/news.db`).
  - Feel free to delete `news.db` if you want to start from scratch.
    - You will then need to empty out [blacklist.txt](https://github.com/guilsa/news-scraper/blob/main/v1/blacklist.txt). This step would go away if we add a `makefile`.
- To scrape/fetch news articles, [run the article scraper manually or start the cron job](https://github.com/guilsa/news-scraper/#scrapers).
- Deployment is done to a separate raspberry-pi style box.

## Prerequisites

- Node 16.11.0
- I like to manage my Node versions with nvm.

## Installation

For the time being, for starting the front-end server, manually uncomment the BASE_URL `localhost:3000` inside [useFetch.js](https://github.com/guilsa/news-scraper/blob/main/v1/frontend/src/hooks/useFetch.js) - you'll need the commented out one.

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

#### To run it manually:

- `cd v1`
- Run the article scraper with `node articlesScrapeSave.mjs`
- Run the media bias scraper with `node biasScrapeSave.mjs`

#### To run it as a job:

- `cd v1`
- Start the node-cron script with `node /v1/cron.js` - that's it!

Once the job is running, to circumvent themit terminating after closing a ssh connection, I use a window/shell manager caled [screen](https://www.gnu.org/software/screen/). More info [here](https://gist.github.com/jctosta/af918e1618682638aa82).

## Querying the database:

Access db:

```
sqlite3 -readonly news.db
```

Changing output formats:

```
.mode column
.headers on
```

Example questions we can ask:

```
select count(*) from articles where source='New York Times';
select articles.title, articles.source, sources.bias_rating as bias_rating from articles left join sources on articles."source" = sources."name" where articles.title like lower('%woke%');
```

...which if you're curious, the result is:

```
title                                                     source      bias_rating
--------------------------------------------------------  ----------  -----------
Republicans' New Obsession Is Fighting ‘Woke Capitalism’  Gizmodo     LEFT
Fighting Behind Enemy Lines: Three Tactics for Resisting  Minding Th
Public University Offers Professors Cash To Go Woke       Washington  RIGHT
Happy ‘woke’ 2022, Democrats.  With democracy in the bal  USA Today   LEFT-CENTER
Navy training goes woke: Boot camp to include classes on  Daily Mail  RIGHT
The woke lives of college girls                           Washington  RIGHT
EXCLUSIVE: Meet The Seattle Schools Woke Indoctrination   The Daily   Conspiracy
Critics of ‘woke’ capitalism are wrong                    Financial
Why are Democrats struggling with working class voters?   Washington  LEFT-CENTER
Md. state Sen. Will Smith missed the Oscars.  He woke up  Washington  LEFT-CENTER
Disney Goes Woke, Will No Longer Say ‘Boys And Girls’ Wi  OutKick     RIGHT-CENTE
Daily Wire to make conservative kids' shows to rival ‘wo  Washington  LEFT-CENTER
Woke North Carolina medical student who is trans rights   Daily Mail  RIGHT
Sen. Rick Scott Says The ‘Woke Left’ Is The ‘Greatest Da  HuffPost
Student hides from ‘woke mob’ in bathroom as angry prote  Fox News    RIGHT
Woke Ariz. diversity activists falsely accuse black DJ o  New York P  RIGHT-CENTE
Corporate welfare, not woke tweets, is the problem with   Washington  RIGHT
Double Standards: Princeton Turns Blind Eye To Plagiaris  Washington  RIGHT
```

#### Copy DB from remote to host:

```
scp user@host:path/file_name.db ./filename.db
```

## Data QA & Challenges

`articlesScrapeSave.mjs` is set up to retry on failed attempts and afterwards it will blacklist the url.

The wonderful folks at mediabiasfactcheck.com do not want you scraping their website as they have valuable information (if you want, consider supporting them!). They auto-scramble the html and therefore you should expect inconsistencies from the scraper's parsing logic. To circumvent this, check out [Database Backup Scripts](https://github.com/guilsa/news-scraper/#database-backup-scripts). That's my recommended workflow for cleaning up the media bias data - after exporting the db file, you will want to open it in your text editor of choice, make your batch edits, then use the import script to insert the data back.

### Deployment Workflow

Everything is set up to run on my local LAN, especially since I started this with sqlite.

- To continuously run all systems (cron job, backend and frontend servers), I use an odroid n2 single-board-computer running on a DietPi. I highly recommend using the DietPi for linux related learning (ie. self-hosting, dev-ops, etc).
- The machine runs headless (no monitor, boots directly to terminal) and is plugged directly into the router.
- The box is exposed to other computers in the LAN (local domain name resolution) using avahi-daemon.

## Database Backup Scripts

- Export/import bash scripts are available, located in `/v1/scripts/backup`
- Export saves to the `/data/` folder
- Import loads to the `/v1/news.db` database

## PM2 Commands:

As opposed to restart, which kills and restarts the process, reload achieves a 0-second-downtime reload. To reload an app:

```
pm2 reload <app_name>
```

Logs:

```
# Display all apps logs in realtime
pm2 logs

#CLI dashboard:
pm2 monit
```

# Contributions

TBD. If you can, please support these and other projects by contributing what you can to honor their work:

- [DietPi](https://dietpi.com/)
- [Media Bias/Fact Check](https://mediabiasfactcheck.com/)

# Todo

- Add logging to cron job
- Add PM2 DietPi setup and common commands
- Add .env files (workflow improvement for `how to point dev to prod database`)
- Add favorite column to sources (media bias) table
- Fix auto-increment from articles table (https://www.sqlite.org/faq.html#q1)
  - Articles are being displayed to the user out of order
- Add pagination and infinite scroll
- Allow users to filter by factual reporting and credibility rating
- Add `makefile`, it should clean `blacklist.txt` and auto install everything
- Add `package.json` script to start it all in parallel with a single command
- Remove inline css
- QA and fix and clean install & dev set up issues
- Make the express app simpler (shouldn't have used the express application generator)
  - Probably decouple db read/write logic from scrapper
  - Add [12-factor](https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786)
  - System folder structure should be:
    - cron
    - scripts (for backup)
      - utils
    - data
    - backend
      - db
    - frontend
- Add updatedAt in sources table as well
- Migrate out out of sqlite
  - Consider [MySQL node.js drivers](https://stackoverflow.com/questions/30545749/how-to-provide-a-mysql-database-connection-in-single-file-in-nodejs) for their simplicity
  - Would unblock making it deployable to a PaaS (ie. Heroku, etc)
- Add darkmode

# Ideas

- Scrape articles and run google translate
- Extract keywords and key phrases using tensorflow (ie retext-keywords)
- Sentiment analysis (npm natural, python pattern)
- Cross-reference news article (or from a special keyword extraction of it) to youtube search results for that particular day
