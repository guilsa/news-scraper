-- How to use this command
-- sqlite < ./scripts/backup/restore_db_dump_sources.sql

.open sources.db
.read ../data/dump_bias_sources_12152021.sql
.quit

-- for more info:
-- https://www.prisma.io/dataguide/sqlite/importing-and-exporting-data-in-sqlite