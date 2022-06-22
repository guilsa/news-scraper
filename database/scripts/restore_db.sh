#!/bin/bash

# README
# Q: How to call this file?
# A: bash ./scripts/backup/filename.sh

echo What sqlite file to open?
read sqlitefile

echo What .sql file to restore?
read file

echo Starting restore...
sqlite3 <<EOS
.open ${sqlitefile}
.read ../dump/${file}
.quit
EOS
echo ${file} restored successfully...

# More info
# -- https://www.prisma.io/dataguide/sqlite/importing-and-exporting-data-in-sqlite

# Misc README
# 
# Old example, accessing sqlite directly from CLI
# sqlite < ./scripts/backup/restore_db_dump_sources.sql
# then script would look like
# .open sources.db
# .read ../data/dump_bias_sources_12152021.sql
# .quit