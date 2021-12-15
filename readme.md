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

# Ideas

- infinite scroll
- daily cron
- extract keywords and key phrases using tensorfloe (ie retext-keywords)
- sentiment analysis (npm natural, python pattern)
- use puppeteer as a blacklist prevention measure [1]
- cross-reference news article (or from a special keyword extraction of it) to youtube search results for that particular day

[1] https://github.com/lewisdonovan/google-news-scraper/commit/3ee797a737ab9248956df513fee247f1f75442ed
