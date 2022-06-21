#!/bin/bash

# README
# Q: How to call this file?
# A: bash ./scripts/backup/filename.sh
# More info:
# https://www.prisma.io/dataguide/sqlite/importing-and-exporting-data-in-sqlite

echo Backup development or production database?:
read folder

echo What table do you want to backup?
read tablename

date=$(date +'%m%d%Y')
echo Starting backup...
sqlite3 <<EOS
.open ../${folder}/news.db
.output ../dump/dump_${tablename}_${date}.sql
.dump ${tablename}
.quit
EOS
echo ${tablename} backed up successfully...



