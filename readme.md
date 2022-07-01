# About

I often get my mainstream news from memeorandum.com.

Have you ever wanted to more about a publication? For example, how they skew ideologically, their history, factual accuracy and who they are funded by?

This app scrapes daily news from memeorandum.com and mediabiasfactcheck.com, then cross references this data to make it consumable to news junks.

What's being used now:

- node/express
- better-sqlite3
- knex.js
- scrape-it
- node-cron
- create-react-app
- odroid n2 (hardware)
- diet-pi (debian)

# Prerequisites

- Node 16.11.0 via nvm.
- Deployment is done to a separate Raspberry-Pi style box.

# Install & start dev servers

This is a monorepo for 3 services.

To install everything at once, use: `npm run setup:all`. Then start dev servers with: `npm run dev-watch`.

# Scrapers:

There are 2 scraper services: articles and bias. Make sure you enter the `scraper` folder, then:

- To schedule re-runs every 30 mins: `npm run start:cron`.
- To run scrapers individually, run either `npm run scrape:articles` or `npm run scrape:bias`.

# Querying the scraped news dataset:

Enter the database folder, then access db:

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

## Copy database from remote to host:

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

## Easy

- Make the express app simpler (shouldn't have used the express application generator)

## Med

- Datetime bug: before day ends, backend seems to think its 2022-07-01, I expect 2022-06-30 (in articles' date column)
- Refactorings
  - Db migration automation should be done from database, not scraper
  - Bring /services/bias up to parity with /services/articles
  - Refactor scraper retry (ie. axios has built in functionality for this)
- Remove inline css
- Enable foreign key support

## Hard

- Expand scraper to enumerate list of urls
- Db model updates
  - Add favorite column to sources (media bias) table
  - Add citations table to help articles table store list of citations
- Add proper logging to all services (scraper cron task, backend, etc)
- Add darkmode

# Ideas

- Migrate out out of sqlite
  - Consider [MySQL node.js drivers](https://stackoverflow.com/questions/30545749/how-to-provide-a-mysql-database-connection-in-single-file-in-nodejs) for their simplicity
  - Would unblock making it deployable to a PaaS (ie. Heroku, etc)
- Run articles through google translate
  - Option: store articles in db or process data in real-time
- Extract keywords and key phrases using tensorflow (ie retext-keywords)
- Sentiment analysis (npm natural, python pattern)
- Cross-reference news article (or from a special keyword extraction of it) with youtube search results for that particular day
- Create an admin ui to manage the scraper
- Add a message queue based system (ie custom or redis) to manage async tasks
- Add updatedAt in sources table as well

# Learnings

Database Best Practices

- Have a schema migration strategy
  - Reproducibility, automation and version control
  - In general, we want to automate the creation of database schemas for development and testing and have version control and roll things back/forward/latest.
  - Use tools like Knex.js and have `db:migrate` and `db:seed` npm scripts.
  - Knex.js comes with an `init` command which creates a db config file template with dev/staging/prod settings for db initialization based on the given `process.env` settings. You can interact with something like `dotenv` from here.
  - For more examples and best practices, check out Alembic's or Knex.js' docs and their respective migration pages.

### Take advantage of NPM scripts

**Pre and Post scripts**

Create "pre" and "post" scripts and NPM will automatically run them in order. So running "start" will automatically run "prestart" if you have that, etc.

**Config field**

It's possible to pass environment variables using the "config" field in your `package.json` file. Note that this is great but "encourages confusing and non-12-factor-app-compliant patterns".
