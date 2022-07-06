# Table of Contents

Hey! Welcome to my news scraper project. I've been using it to practice more Node.js develpoment, database best practices, devops and some interesting React and JavaScript concepts (ie. infinite scroll, data filtering, component architecture). Please checkout the [Learnings](#learnings) sections for more.

[About](#about)
[Prerequisites](#prerequisites)
[Install & start dev servers](#install--start-dev-servers)
[Scrapers](#scrapers)
[Querying the scraped news dataset](#querying-the-scraped-news-dataset)
[Database Backup Scripts](#database-backup-scripts)
[Data QA & Challenges](#data-qa--challenges)
[Deployment Workflow](#deployment-workflow)
[Environment Variables](#environment-variables)
[PM2 Commands](#pm2-commands)
[Todo](#todo)
[Learnings](#learnings)
[Contributions](#contributions)

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

# Todo

## Easy

- Make the express app simpler (shouldn't have used the express application generator)

## Med

- Add totalCitations column (or article_details table)
- Add ability to query all articles with a minimum amount of total citations
  - Add a get historic days url route
  - Limit /articles response by total citations
- User can limit to the top n articles per day
- Datetime bug: before day ends, backend seems to think its 2022-07-01, I expect 2022-06-30 (in articles' date column)
- Db migration automation should be done from database, not scraper
- Bring /services/bias up to parity with /services/articles
- Db model updates

  - Add favorite publication table (need user auth)
    - Add a like column to sources (media bias) table in the meantime

- Refactor scraper retry (ie. axios has built in functionality for this)
- Remove inline css

## Hard

- Expand scraper to enumerate list of urls
- Add proper logging to all services (scraper cron task, backend, etc)
- Add darkmode
- Add url params to infinite scroll so that views are sharable

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

If this was a blog post, what would I write?

### Infinite Scroll Limitations

Apply filters before, not after, your paginated results.

There might be ways around this, but there are some interesting consequences if you do choose to use infinite scroll. For example, any filtering needs to be applied at the SQL query level, not in your Express.js middlelayer or in the frontend. The reason being, say that a fetch for articles is limited to 30 items at a time. And say that you chose to apply a custom filter after you've queried for the paginated results - and the filter removes articles that received less than 10 citations. Well, if the backend finds none, it only searched the paginated results. At this point, the user can't put through a call to fetch for more.

### Database Best Practices

Have a schema migration strategy! Think of the power of db reproducibility, automation and version control.

In general, we want to automate the creation of database schemas for development and testing and have version control and roll things back/forward/latest.

Use tools like Knex.js and have `db:migrate` and `db:seed` npm scripts. Knex.js comes with an `init` command which creates a db config file template with dev/staging/prod settings for db initialization based on the given `process.env` settings. You can interact with something like `dotenv` from here.

For more examples and best practices, check out Alembic's or Knex.js' docs and their respective migration pages.

### Take advantage of NPM scripts

**Pre and Post scripts**

Create "pre" and "post" scripts and NPM will automatically run them in order. So running "start" will automatically run "prestart" if you have that, etc.

**Config field**

It's possible to pass environment variables using the "config" field in your `package.json` file. Note that this is great but "encourages confusing and non-12-factor-app-compliant patterns".

### Component mocking with manual data injection may help improve developer confidence

If you're rapid developing and prototyping and aren't doing TDD, or setting up a UI building framework like Storybook is simply too much at the moment, consider keeping handy a .json file export of some of your database models so that you can inject them into your components to test new use cases. You can bypass all the backend data fetching process and select exactly the piece of data that you want. We increase our testing confidence when we can limit to fewer items and check if they load properly, then if this first test passes, we can return to loading thousands of items at once.

```
{
    "title": "What the Joe Rogan podcast controversy says about the online misinformation ecosystem",
    "description": "An open letter urging Spotify to crack down on COVID-19 misinformation has gained the signatures of more than a thousand doctors, scientists and health professionals spurred by growing concerns …",
    "date": "2022-01-21",
    "url": "https://www.npr.org/2022/01/21/1074442185/joe-rogan-doctor-covid-podcast-spotify-misinformation",
    "source": "NPR",
    "createdAt": "2022-01-22T01:00:01.764Z"
  },
  {
    "title": "Trump Allies Are Still Feeding the False 2020 Election Narrative",
    "description": "Fifteen months after they tried and failed to overturn the 2020 election, the same group of lawyers and associates is continuing efforts to decertify the vote, feeding a false narrative.  — Give this article- - - Read in app",
    "date": "2022-04-18",
    "url": "https://www.nytimes.com/2022/04/18/us/politics/trump-allies-election-decertify.html",
    "source": "New York Times",
    "createdAt": "2022-04-18T21:00:01.495Z"
  }
```

### Project Organization: Component Naming Convention & Folder Structure

A well defined file and folder structure diminishes cognitive overload. Clutter impedes scalability and dev experience.

If you enjoy taxonomies and why they work, hopefully you'll enjoy this...

```
/src/
  /components
    App.js
    ForgotPassword.js
    HeaderBar.js
    PreAuth.js
    ...
    ...
    /Articles
      /SubComponentAForArticles.js
      /SubComponentBForArticles.js
      /BiasRating.js
      /Article.js
      /index.js (exports Articles or ArticleList)
    /common/
      /Button.js
      /Questions.js
      ...
    /__tests__
      /article.test.js
      /button.test.js
      /questions.test.js
```

Let's now explain the folder structure that we have above.

_Hint: To glance at all responses below, open the readme.md in raw view so that all collapsible items are visible and searchable._

#### Question:

How can I make good use of my root folder (ie. `/src/`)?

<details>
	<summary>Answer</summary>

If it feels miscellaneous, but not a "common component", or it doesn't have sub-components, the component probably belogs in the root folder.

Take advantage of that space and add critical user or layout related components.

</details>

#### Question:

Where to place components that contain sub-components?

<details>
	<summary>Answer</summary>

Sub-components should be place alongside their parents as separate files either inside the `/src/components/ComponentName/` folder or if the component is critical and not monolithic, place everything inside one file in root `/src/ComponentName.js` (there is a benefit here explained below).

</details>

#### Question:

Where to place custom stylesheets?

<details>
	<summary>Answer</summary>

Inside a flat folder structure in `/src/styles/` (ie. `/src/styles/ComponentFoo.scss`). The advantage of it not containing sub-folders is that of navigability and scalability.

</details>

#### Question:

What exactly is a shared or common component? Where to place it?

<details>
	<summary>Answer</summary>

Common components are common UI "building blocks" (think lower-level views) that: a) don't import or consume many other components; and b) aren't too domain specific (so it _can_ be related to the business, but should be generic).

The `/src/components/common` folder should be flat and not contain any level of folder nesting.

Common components should be moved to `/src/components/common/ComponentA.js` (a `/common/` or shared folder).

Examples in the first category include Button, DateInput, Footer, Modal.

Examples in the second category include DeleteCategory, ActivateCard and CommonQuestionFields.

It's plausable that you'll have a smaller amount of business specific generic items in your commons folder, but this is a nice place to put them.

</details>

#### Question:

Is there a good use case for _not_ making separare files for a sub-component?

<details>
	<summary>Answer</summary>

I think so... You may want to avoid creating separate files for your sub-components when: a) the parent component should belong to commons folder; b) the sub-components themselves are "non-common".

Imagine for instance that you have `Questions.js` with some _non-common_ sub-components EnumField, CompanyType, PhotoIdField, etc. So here, the sub-components aren't used elsewhere. The trade-off is that `/src/components/common/` is kept in a flat and clean and can scale to hundreds of files.

If you need an entire folder, move it to `/src/components/ComponentA/`.

</details>

#### Question:

Can I have multiple components with the same name?

<details>
	<summary>Answer</summary>

Yes, sub-components should. For example, `Card.js` can be a unique name for two unique parent components. So `/src/components/ComponentA/Card.js` and `/src/components/ComponentB/Card.js`

You shouldn't have to name the file as `SubComponentCard.js` even though `Card` is a sub-component of something else. That's why folders exists.

</details>

#### Question:

Where to place the `__tests__` folder? How to name the test files?

<details>
	<summary>Answer</summary>

Keep them next to your components folder. More importantly, **your tests filenames should be lowercase** - it helps unclutter things when searching many files by name.

</details>

#### Question:

How can I differentiate between component names with plural nouns versus collection of views?

<details>
	<summary>Answer</summary>

- Does the component hold a collection of distinct or identical things?
  - If distinct, it's fine to use plural and export that name.
  - If identical, include a suffix like `List` or `ListView`
  - It's fine to export a component named `Settings` as that's a common and recognizable name and does not include a collection or a list of identical things. An example component name `SystemPreferences` is not the same as `PreferenceList` component because inside we have a collection of distinct things.

</details>

# Contributions

TBD. If you can, please support these and other projects by contributing what you can to honor their work:

- [DietPi](https://dietpi.com/)
- [Media Bias/Fact Check](https://mediabiasfactcheck.com/)
