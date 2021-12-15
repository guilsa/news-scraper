# Todo

- Then add timestamp to articles scrape + table
  - Then partition off articles into sections for each day and ensure they are ordered
- System folder structure should be
  - cron
  - scripts (for backup)
    - utils
  - data
  - backend
    - db
  - frontend
- Think about a test workflow to run main scripts under new db without having to redo shit
  - That may be why we want to decouple db read/write logic from scrapper
  - This way we can have a ENV file or something that dictates what should run
    - Add 12-factor config [1]
- Make v2 of the backend app simpler [1]
- Consider switching to MySQL to learn general node/db best practices from the web


"abstract any connection details"

[1] https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786

[2] https://stackoverflow.com/questions/30545749/how-to-provide-a-mysql-database-connection-in-single-file-in-nodejs

# Ideas

- infinite scroll
- daily cron
- extract keywords and key phrases using tensorfloe (ie retext-keywords)
- sentiment analysis (npm natural, python pattern)
- use puppeteer as a blacklist prevention measure [1]
- cross-reference news article (or from a special keyword extraction of it) to youtube search results for that particular day

[1] https://github.com/lewisdonovan/google-news-scraper/commit/3ee797a737ab9248956df513fee247f1f75442ed
