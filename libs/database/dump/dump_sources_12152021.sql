PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE sources
(
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    bias_rating TEXT,
    factual_reporting TEXT,
    country TEXT,
    media_type TEXT,
    popularity TEXT,
    mbfc_credibility_rating TEXT
);
INSERT INTO sources VALUES('NKyV19ppREHQdbctteKz+U9BrJk+IQrzZ4MPOAt6jEI=','Wall Street Journal','RIGHT-CENTER','MOSTLY FACTUAL','MOSTLY FACTUAL','USA (45/180 Press Freedom)','Newspaper','HIGH CREDIBILITY');
INSERT INTO sources VALUES('XEaQTzpPZ/arbsdby/KHBonONwgUYaqsQ41HuIDenb4=','The Guardian','LEFT-CENTER','MIXED','MIXED','United Kingdom (33/180 Press Freedom)','Newspaper','MEDIUM CREDIBILITY');
INSERT INTO sources VALUES('5a17FjVvMJHWXaq0sH63OLPU89FgLMsfoyPSlC0GReg=','San Francisco Chronicle','LEFT-CENTER','HIGH','HIGH','USA (44/180 Press Freedom)','Newspaper','HIGH CREDIBILITY');
INSERT INTO sources VALUES('fzJmKZyCACiB+gQXGtivRASgNv2+Wui8KJms+OWoVeQ=','Rolling Stone','LEFT','HIGH','USA (44/180 Press Freedom)','Magazine','High Traffic','HIGH CREDIBILITY');
INSERT INTO sources VALUES('VvPHctJ5Vb7Gask3QnW4O68Xro89BSFAc0PaCN43aFs=','Washington Post','LEFT-CENTER','MOSTLY FACTUAL','MOSTLY FACTUAL','USA (45/180 Press Freedom)','Newspaper','HIGH CREDIBILITY');
INSERT INTO sources VALUES('CzXYi8uAmhgVA3MYl5uojP0zUEZPI5XCuaez15kEuOk=','Yahoo News','LEFT-CENTER','HIGH','HIGH','USA (45/180 Press Freedom)','Website','HIGH CREDIBILITY');
INSERT INTO sources VALUES('v8/TXKaE5kmiJg8L326XVX0DTqESpcnIBzJQWp6VY7Y=','New York Times','LEFT-CENTER','HIGH','HIGH','USA (45/180 Press Freedom)','Newspaper','HIGH CREDIBILITY');
INSERT INTO sources VALUES('kAHLj0ikO2GGqcUQeFlJx/bMgFenABWCJ3UiSlJvZgk=','Press Watch','','','','','','');
INSERT INTO sources VALUES('XIjezQpqK0mDJIHsXc7IlDa728qMgrwHghyn5LTqYtg=','CT Insider','','','','','','');
INSERT INTO sources VALUES('38h38GiXm9N8QxrI4RQnqvvVhC3x1yaIYea7fQtm9mk=','Riverfront Times','LEFT','','','','','');
INSERT INTO sources VALUES('wH5ol0JOaIbwZV6JLP7IhmAtHLafFYIp7b7Pi/ESluU=','The Daily Signal','RIGHT','MOSTLY FACTUAL','USA (45/180 Press Freedom)','Website','Medium Traffic','HIGH CREDIBILITY');
INSERT INTO sources VALUES('qa86VagjqfKfzteZJJl0HKU9GtTyOXv0Tvm3GlbAzl8=','Kellyforalaska','','','','','','');
INSERT INTO sources VALUES('hPGwP/5EZNV43MUSzprzVJ9d03ZNG7d7QOF6KyiDU9k=','Commentary Magazine','MOSTLY FACTUAL','','USA 45/180','','','');
INSERT INTO sources VALUES('Jp90KpH45/GqSTynNaIoa8J4tCChR2P1GiUg7eaW76E=','American Greatness','RIGHT','MIXED','MIXED','USA (44/180 Press Freedom)','Website','MEDIUM CREDIBILITY');
INSERT INTO sources VALUES('WRocV2tBNCQeBQu0tQuZZ9sB8Bw/GrwdoOtXKkBOkbE=','Milwaukee Journal Sentinel','LEFT-CENTER','USA (44/180 Press Freedom)','USA (44/180 Press Freedom)','Newspaper','Medium Traffic','HIGH CREDIBILITY');
INSERT INTO sources VALUES('pNtMJFT1A7BdRzQibAJqqRMyxjdEDqvXiG+vUzBKhVE=','The Hill','LEAST BIASED','MOSTLY FACTUAL','MOSTLY FACTUAL','USA (45/180 Press Freedom)','Newspaper','HIGH CREDIBILITY');
INSERT INTO sources VALUES('01gzRBqZBhFewPc7ioAeObN+XWKpIJe1zsvCL+C7vZE=','Mediaite','LEFT','MOSTLY FACTUAL','USA (44/180 Press Freedom)','Website','High Traffic','HIGH CREDIBILITY');
INSERT INTO sources VALUES('M7k0ds9ZejMwZTtmpliYPYkqwmS11gKaLcZCubHzCHA=','Time','LEFT-CENTER','HIGH','HIGH','USA (45/180 Press Freedom)','Magazine','HIGH CREDIBILITY');
INSERT INTO sources VALUES('fALihU38W+OAtE1j2YRL3eRuKRaOZvCjiDP780GVO7E=','ABC News','LEFT-CENTER','HIGH','HIGH','USA (45/180 Press Freedom)','TV Station','HIGH CREDIBILITY');
INSERT INTO sources VALUES('4NMo7xxae4nFdgp//BCnTTUebFKLsk0XqA2jGiLNZmM=','NBC News','LEFT-CENTER','HIGH','HIGH','USA (45/180 Press Freedom)','TV Station','HIGH CREDIBILITY');
INSERT INTO sources VALUES('2vM12CUuI3gE1L5UKqDR9cLIIUu0JDbBuSYtgPEVlDg=','New York Post','RIGHT-CENTER','MIXED','MIXED','USA (45/180 Press Freedom)','Newspaper','MEDIUM CREDIBILITY');
INSERT INTO sources VALUES('EK1MOHNjb6i82UNJPMW0sX4WSn9X4waxJP9vGp880ms=','Slate','LEFT','HIGH','HIGH','USA (45/180 Press Freedom)','Website','HIGH CREDIBILITY');
INSERT INTO sources VALUES('2JdhzR6h4D5PpnY46cS8ZjN4ZVZosQ5r/sRDF7ZBmn0=','Media Matters for America','LEFT','HIGH','USA (44/180 Press Freedom)','Organization/Foundation','Medium Traffic','HIGH CREDIBILITY');
INSERT INTO sources VALUES('fXYqRXOa2VCeCTeIm52WfEf4MTbatkhwWTnzMQWEIHk=','MSNBC','LEFT','MIXED','MIXED','USA (45/180 Press Freedom)','TV Station','MEDIUM CREDIBILITY');
INSERT INTO sources VALUES('VZYf2MWiqHzTZ9JLbs66StZYtsqbzPBbSdr6giT//KA=','Insider','LEFT-CENTER','HIGH','HIGH','USA (44/180 Press Freedom)','Website','HIGH CREDIBILITY');
INSERT INTO sources VALUES('qqCLZAMt9iWH9aU9mhcDMUp66zbdgs7wdTSd5FaZp1w=','Axios','LEFT-CENTER','HIGH','HIGH','USA (45/180 Press Freedom)','Website','HIGH CREDIBILITY');
INSERT INTO sources VALUES('ghzX3Mv3OqccSG7LtLkJ+cN4KrURYVFe3rnMIe/RhHg=','Politico','LEFT-CENTER','HIGH','HIGH','USA (44/180 Press Freedom)','Website','HIGH CREDIBILITY');
INSERT INTO sources VALUES('I/EYytw1FDk6ucKKoz1XNaRvZKL+SnX/1Rsi9tfGDt8=','National Review','RIGHT','MOSTLY FACTUAL','MOSTLY FACTUAL','USA (44/180 Press Freedom)','Magazine','HIGH CREDIBILITY');
INSERT INTO sources VALUES('V3A1GTkctkvytkfWuwXsJct50PvjuxfqQID+fNDosSk=','Reuters','LEAST BIASED','VERY','VERY','HIGH','United Kingdom (34/180 Press Freedom)','HIGH');
INSERT INTO sources VALUES('40VUKbE6y1IgaVtODv6POvscTeZHmOcE8cysMIGOksw=','The Atlantic','LEFT-CENTER','HIGH','HIGH','USA (45/180 Press Freedom)','Magazine','HIGH CREDIBILITY');
INSERT INTO sources VALUES('bLiKfl29AI4t69mia6NbtdSaFu6JLrpbBJ9WwbCfXFU=','Associated Press','LEAST BIASED','VERY','VERY','HIGH','USA (44/180 Press Freedom)','HIGH');
INSERT INTO sources VALUES('sIhClvM82z0Ub6Qi2qiH9vNJ/322iKqfaRl/joLpGLg=','The White House','LEFT-CENTER','MOSTLY FACTUAL','','','','');
INSERT INTO sources VALUES('+3rM//jG+OqbA8ke5VdtDQgIDpujWRjYAarrYCDbyIw=','YouTube','','','','','','');
INSERT INTO sources VALUES('17C76jqTUiLEGYw44wsus+ER0R3qh/pTVH6sHIpP8Ds=','WORLD','','','','','','');
INSERT INTO sources VALUES('u5IyPM9rx1R9uc4QzzgynPB5xbR+8RQkHk4jBZGYnI0=','Young America’s Foundation (YAF)','RIGHT','HIGH','USA 48/180','','','');
INSERT INTO sources VALUES('Hz1H2swaGaXvoirCfWk23L9XKVvQMFk/93mlJ71I2wI=','CNN','LEFT','MEDIUM CREDIBILITY','MIXED','USA (44/180 Press Freedom)','TV Station','MEDIUM CREDIBILITY');
INSERT INTO sources VALUES('v8rcDASOTrFPWhsq8UIVyG6VLqr36rjXG6UCa49Ydl8=','USA Today','LEFT-CENTER','HIGH','HIGH','USA (45/180 Press Freedom)','Newspaper','HIGH CREDIBILITY');
INSERT INTO sources VALUES('CzhxPbmQLjY/9Sus90V5fqZbuJ7ktejKbL59wyvhi0o=','Lewiston Sun Journal','Your Support is Essential','','','','','');
INSERT INTO sources VALUES('IlhoF5H+i2iOA3AjBnJZdiODVU4v8AwM1km9InowA2A=','BBC','LEFT-CENTER','HIGH','HIGH','United Kingdom (33/180 Press Freedom)','TV Station','HIGH CREDIBILITY');
INSERT INTO sources VALUES('xFQKpTZu4+31g1Du7j5wyD7DbKj7siIQO035Xccit5o=','NPR','LEFT-CENTER','VERY','VERY','HIGH','USA (45/180 Press Freedom)','HIGH');
INSERT INTO sources VALUES('6QK5Hep1GW4McX2rGOFUBvg2RoWnEtaexOLMQ8Vx3ZA=','News Blog, Riverfront Times','Your Support is Essential','','','','','');
INSERT INTO sources VALUES('APR/+UIbMuFI4y1WSq28fSJcPkZKL50GAtqdUMfYlBw=','Washington Examiner','RIGHT','MIXED','MIXED','USA (45/180 Press Freedom)','Newspaper','MEDIUM CREDIBILITY');
INSERT INTO sources VALUES('46K8QFxf4rK5PVncxRdXSRmpGIJ19Xig2MvKJpZb6J4=','The Daily Beast','Your Support is Essential','','','','','');
INSERT INTO sources VALUES('Pkiff6EVTE/I5nSvDeuT67iMWdYqr3GGByAnkEjUSts=','Ground Truths','Your Support is Essential','','','','','');
INSERT INTO sources VALUES('QJJwi9qdPGqbyRK7D2OUX0uQqb2ntm9uVPcSM/s9xoA=','WKMG','Your Support is Essential','','','','','');
INSERT INTO sources VALUES('Ij+lCpwk2+zckBUtHmAFbaL5PByzlOsv5zsWPMX1YLQ=','CNBC','MOSTLY FACTUAL','Left vs. Right Bias: How we rate the bias of media sources','USA 45/180','Failed Fact Checks','Mostly False','NFN-Low Biased Factual News');
INSERT INTO sources VALUES('sEJJM5pxxxveQMWhMvueSm61SI5pG1JS98DV0n6IA/Q=','New York Magazine','LEFT','HIGH','HIGH','USA (45/180 Press Freedom)','Magazine','HIGH CREDIBILITY');
INSERT INTO sources VALUES('S6xfJkQ6O5V92z5LXIsalsEDYBnwYVM7bm709+mrJ0Q=','Foundation for Economic Education','RIGHT-CENTER','MIXED','MIXED','USA (45/180 Press Freedom)','Organization/Foundation','MEDIUM');
INSERT INTO sources VALUES('dj/TNG4nwZfWSyfpRgClTBix/jY8lf6LM2XmEPXBIgE=','Mother Jones','LEFT-CENTER','HIGH','HIGH','USA (45/180 Press Freedom)','Magazine','HIGH CREDIBILITY');
INSERT INTO sources VALUES('Do2IkUc/WYnOZbTIHUEcoR5hXdnBmeQH1YZ0vTQNi14=','Vanity Fair','LEFT','MOSTLY FACTUAL','MOSTLY FACTUAL','USA (45/180 Press Freedom)','Magazine','HIGH CREDIBILITY');
INSERT INTO sources VALUES('/6cYaPFsqzuumCad1z97IsVW8BxRB7Pw55uXljbeDv0=','wusa9.com','HIGH','Left vs. Right Bias: How we rate the bias of media sources','USA 45/180','History','Failed Fact Checks','NFN-Low Biased Factual News');
INSERT INTO sources VALUES('AZ6nlSfNktzM0+jhBb2KjPqD0aRuKAkzfeTpqqchviY=','Washington Free Beacon','RIGHT','MIXED','MIXED','USA (45/180 Press Freedom)','Website','MEDIUM CREDIBILITY');
INSERT INTO sources VALUES('kRtlixuhInO1aKOFd5V5w68d6K3uNPjY6h8ixMh/zas=','Puck','Your Support is Essential','','','','','');
INSERT INTO sources VALUES('1+Ct5vH5C2QMxkBn6E0YOYOO8vuGkolhrF+eGShO+iQ=','BuzzFeed News','LEFT-CENTER','MOSTLY FACTUAL','MOSTLY FACTUAL','USA (45/180 Press Freedom)','Website','HIGH CREDIBILITY');
INSERT INTO sources VALUES('5UGDxs7PtN6Ar3P6uAnNryXhHiZzfofrKvqp9DSFRME=','Mirror.co.uk','Your Support is Essential','','','','','');
COMMIT;
