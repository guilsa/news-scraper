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
