# About

I often get my mainstream news from memeorandum.com. When there's a need to learn more about a publication (ie NYT), I use mediabiasfactcheck.com to check where they skew ideologically, their history, factual accuracy and who they are funded by. This app scrapes daily news and media bias information, then cross references this data to user. It's a work in progress. As a user, you should be able to filter by factual reporting and credibility rating very soon!

This project is a prototype and will be archived and redone using a proper Node.js file structure, etc. It uses sqlite, without the use of any ORM. SQL is a wonderful technology. Writing raw queries was important to me for this project. Also, there was no need for a db type-system at this point. I've [researched](https://gist.github.com/guilsa/0cdd1258c46edf3112b2cc50af03fc8c) new node.js db tool options, but have punted on that for now. Would consider picking MySQL over PostgreSQL if the available db drivers have nicer and cleaner JS syntax 😋.

What's being used now:

- node/express
- better-sqlite3
- scrape-it
- node-cron
- create-react-app
- react
- odroid n2 (hardware)
- diet-pi (debian operating system)

# Prerequisites

- Node 16.11.0. I like to manage my Node versions with nvm.
- If you run any of the files that connect to the sqlite instance, it will create either `news-dev.db` or `news-prod.db` depending on the vars that's set. See Environment Variables section below for more info on that.
- Feel free to delete the db if you want to start from scratch.
  - You will then need to empty out [blacklist.txt](https://github.com/guilsa/news-scraper/blob/main/v1/blacklist.txt).
- To scrape/fetch news articles, [run the article scraper manually or start the cron job](https://github.com/guilsa/news-scraper/#scrapers).
- Deployment is done to a separate raspberry-pi style box.

# Install & start servers

Backend: `cd backend && npm install`
Frontend: `cd frontend && npm install`
Then run everything concurrently: `npm run dev-watch`

# Scrapers:

See scraper directory. They can be initiated manually or via the cron job (only `/services/articles.mjs` for now).

## To run it manually:

Go in folder, then:

- Article scraper `node articles.mjs`
- Bias scraper `node bias.mjs`

## To run it as a job:

- `cd scraper && node cron.js`

# Querying the scraped news dataset:

Go in folder, then access db:

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

## Copy dataset from remote to host:

```
scp user@host:path/file_name.db ./file_name.db
```

# Database Backup Scripts

- Export/import bash scripts are available, located in `/database/scripts`
- Export saves to the `/database/dump` folder

# Data QA & Challenges

`articles.mjs` is set up to retry on failed attempts and afterwards it will blacklist the url.

The wonderful folks at mediabiasfactcheck.com do not want you scraping their website as they have valuable information (if you want, consider supporting them!). They auto-scramble the html and therefore you should expect inconsistencies from the scraper's parsing logic. To circumvent this, check out [Database Backup Scripts](https://github.com/guilsa/news-scraper/#database-backup-scripts). That's my recommended workflow for cleaning up the media bias data - after exporting the db file, you will want to open it in your text editor of choice, make your batch edits, then use the import script to insert the data back.

# Deployment Workflow

Everything is set up to run on my local LAN, especially since I started this with sqlite.

- To continuously run all systems (cron job, backend and frontend servers), I use an odroid n2 single-board-computer running on a DietPi. I highly recommend using the DietPi for linux related learning (ie. self-hosting, dev-ops, etc).
- The machine runs headless (no monitor, boots directly to terminal) and is plugged directly into the router.
- The box is exposed to other computers in the LAN (local domain name resolution) using avahi-daemon.

# Environment Variables

PM2 is used with `production` environment variables set in `ecosystem.config.js`.

# PM2 Commands:

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

- Make the express app simpler (shouldn't have used the express application generator)
- Add darkmode
- Add logging to cron job
- Add favorite column to sources (media bias) table
- Fix auto-increment from articles table (https://www.sqlite.org/faq.html#q1)
  - Articles are being displayed to the user out of order
- Allow users to filter by factual reporting and credibility rating
- Remove inline css
- Add updatedAt in sources table as well
- Migrate out out of sqlite
  - Consider [MySQL node.js drivers](https://stackoverflow.com/questions/30545749/how-to-provide-a-mysql-database-connection-in-single-file-in-nodejs) for their simplicity
  - Would unblock making it deployable to a PaaS (ie. Heroku, etc)

# Ideas

- Scrape articles and run google translate
- Extract keywords and key phrases using tensorflow (ie retext-keywords)
- Sentiment analysis (npm natural, python pattern)
- Cross-reference news article (or from a special keyword extraction of it) to youtube search results for that particular day
