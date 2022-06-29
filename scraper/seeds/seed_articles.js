/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('articles').del()
  await knex('articles').insert([
    {
      title: '‘This is a bombshell’: Trump aides left speechless by Hutchinson testimony',
      source: 'CNN',
      description:
        "(CNN)Aides to former President Donald Trump were left speechless amid the first half of Cassidy Hutchinson's testimony on Tuesday, acknowledging to CNN that her testimony was “a bombshell” with potentially huge repercussions for Trump.",
      url: 'https://www.cnn.com/2022/06/28/politics/trump-blindsided-january-6-hearing/',
      date: '2022-06-29',
      createdAt: '2022-06-29T05:01:48.792Z',
      citations:
        'CNN; Washington Post; Robert Reich; Bloomberg; emptywheel; CBS News; Fox News; New York Times; The Nation; The Hill; NBC News; CNBC; Voice of America; Raw Story; Insider; Ringside at the Reckoning; Gizmodo; Big League Politics; Rolling Stone; Uniic Media; Lucian Truscott Newsletter; New York Times; Washington Times; PolitiFact; Occupy Democrats; USA Today; HotAir; Los Angeles Times; Global Community Weekly; RADAR; American Greatness; Zandar Versus The Stupid; Common Dreams; WTOP News',
    },
    {
      title: 'Statement by President Biden on the Tragic Loss of Life in San Antonio, Texas',
      source: 'The White House',
      description:
        'The tragic loss of life in San Antonio, Texas that took place yesterday is horrifying and heartbreaking.  Our prayers are with those who lost their lives, their loved ones, as well as those still fighting for their lives.',
      url: 'http://www.memeorandum.com/220628/p46#a220628p46',
      date: '2022-06-29',
      createdAt: '2022-06-29T05:01:48.810Z',
      citations: 'The White House; New York Times; Associated Press',
    },
    {
      title: 'Tens of thousands of monkeypox vaccines rushed to clinics',
      source: 'Washington Post',
      description:
        'White House pushes new strategy as cases climb  —  The Biden administration will begin sending out tens of thousands of vaccine doses to clinics nationwide in an effort to control a record U.S. monkeypox outbreak that many experts …',
      url: 'https://www.washingtonpost.com/health/2022/06/28/monkeypox-vaccination-strategy-us/',
      date: '2022-06-29',
      createdAt: '2022-06-29T05:01:48.803Z',
      citations:
        'Washington Post; New York Times; European Commission; The White House; who.int; CDC; Reuters; STAT; KLFY-TV; ABC News; KSLTV.com; The Daily Caller; Washington Examiner; Politico',
    },
    {
      title: 'Trump Is In Deep, Deep, Deep, Deep Trouble',
      source: 'Commentary Magazine',
      description:
        "The testimony this afternoon of Cassidy Hutchinson, the aide to Trump chief of staff Mark Meadows, cannot be dismissed.  If what she has testified to, sworn under oath, is not countered or contradicted by Meadows or Trump's White House counsel Pat Cippolone …",
      url: 'https://www.commentary.org/john-podhoretz/trump-is-in-deep-deep-deep-deep-trouble/',
      date: '2022-06-29',
      createdAt: '2022-06-29T05:01:48.794Z',
      citations: 'Commentary Magazine; Talking Points Memo',
    },
    {
      title: "Live results: It's primary night in America",
      source: 'HotAir',
      description:
        "There are no marquee races on the schedule, no high-stakes proxy wars involving Trump on one side and some prominent “disloyal” Republican on the other.  —  Although I'll probably find an excuse to declare Ron DeSantis the evening's big winner anyway for some reason or another tomorrow.",
      url: 'https://hotair.com/allahpundit/2022/06/28/live-results-its-primary-night-in-america-n479410',
      date: '2022-06-29',
      createdAt: '2022-06-29T05:01:48.806Z',
      citations: 'HotAir; Politico; Fox News; Washington Examiner',
    },
    {
      title: 'Where Are The Men Who Should Be Held to Account?',
      source: 'Vicky Ward Investigates',
      description:
        'Jeffrey Epstein may be dead, but the power structure that enabled him endures—and the 2022 Cannes Film Festival is Exhibit A that his activities continue without him  —  “Vicky Ward Investigates” is reader-funded and entirely ad-free.',
      url: 'https://vickyward.substack.com/p/where-are-the-men-who-should-be-held',
      date: '2022-06-29',
      createdAt: '2022-06-29T05:01:48.801Z',
      citations: 'Vicky Ward Investigates; Fortune; Substack',
    },
    {
      title: 'Cassidy Hutchinson Held Their Manhoods Cheap',
      source: 'The Bulwark',
      description:
        'They all knew.  But only the 26-year-old staffer would testify about it under oath.  —  This afternoon a 26-year-old former assistant showed more courage and integrity than an entire administration full of grown-ass adults who were purportedly working …',
      url: 'https://www.thebulwark.com/cassidy-hutchinson-held-their-manhoods-cheap/',
      date: '2022-06-29',
      createdAt: '2022-06-29T05:01:48.794Z',
      citations: 'The Bulwark; Washington Post; Washington Examiner',
    },
    {
      title: "Trump White House attorney disputes Cassidy Hutchinson's testimony about handwritten note",
      source: 'ABC News',
      description:
        'Hutchinson testified before the House Jan. 6 committee Tuesday.  —  Former Trump White House lawyer Eric Herschmann is claiming that a handwritten note regarding a potential statement …',
      url: 'https://abcnews.go.com/US/trump-white-house-attorney-disputes-cassidy-hutchinsons-testimony/story?id=85898838',
      date: '2022-06-29',
      createdAt: '2022-06-29T05:01:48.769Z',
      citations: 'ABC News; The Daily Wire; Mercury News; Insider',
    },
    {
      title: 'Former White House aide delivers shocking testimony about out-of-control Trump on Jan. 6',
      source: 'Politico',
      description:
        "Minutes before Donald Trump took the stage at an Ellipse rally on Jan. 6, 2021, he urged the Secret Service to remove security magnetometers to let in people with weapons because “they're not here to hurt me …",
      url: 'https://www.politico.com/news/2022/06/28/jan-6-meadows-hutchinson-trump-00042779',
      date: '2022-06-29',
      createdAt: '2022-06-29T05:01:48.781Z',
      citations:
        "Politico; The Atlantic; Reuters; CNN; CBS News; NBC News; NBC News; New York Times; The Hill; New York Times; Washington Post; MSNBC; Washington Times; Wall Street Journal; HotAir; Florida Phoenix; Politico; New York Times; USA Today; Politico; Los Angeles Times; Axios; Washington Post; RedState; Associated Press; New York Times; Insider; Axios; NPR Illinois; Insider; Mother Jones; Ace of Spades HQ; TheBlaze; Insider; Reuters; HuffPost; The Gateway Pundit; Vox; NBC News; Washington Post; NBC News; New York Magazine; Washington Post; The Texas Tribune; Metro.co.uk; KVIA-TV; CBS News; Slate; Washington Times; RedState; NPR; Power Line; THE FIRST LIGHT REPORT; The Gateway Pundit; Raw Story; Rolling Stone; Public Notice; Latino Rebels; The Daily Signal; Fortune; Talking Points Memo; Discourse Blog; Voice of America; The Daily Wire; Raw Story; The Gateway Pundit; Daily Kos; The Intercept; CBS News; Associated Press; CNBC; The Guardian; We Are Speaking; After all my years as a journalist; SpyTalk; Al Jazeera; New Republic; Patterico's Pontifications; The Daily Wire; NPR; Washington Post; Raw Story; CNN; Mother Jones; American Prospect; Breitbart; The Daily Caller; Los Angeles Times; CBS News; Roll Call; Washington Examiner; New York Times; Raw Story; Musing About Books, Law, and Politics; Daily Kos; Los Angeles Times; Los Angeles Times; Los Angeles Times; Insider; PoliticusUSA; CNBC; The Moderate Voice; RADAR; Occupy Democrats; RedState; Just The News; USA Today; Washington Examiner; Deseret News; UPI; The Daily Wire; CNN; Twitchy; Iowa Starting Line; Politico; Bloomberg; Outside the Beltway; KSLTV.com; PoliticusUSA; Mediaite; Newsy; Rolling Stone; Raw Story; HuffPost; Bloomberg; Insider; The Guardian; Associated Press",
    },
    {
      title: '‘New York’ Mag Had Good Reason to Cancel the ‘Canceled Teen’ Story',
      source: 'Gawker',
      description:
        'In the impoverished ecosystem of contemporary print media, New York magazine has styled itself as a venue for rigorous, often wry, and overtly left-leaning journalism.  More playful than The Atlantic.  Less conservative than The Atlantic.',
      url: 'https://www.gawker.com/media/new-york-mag-had-good-reason-to-cancel-the-canceled-teen-story',
      date: '2022-06-29',
      createdAt: '2022-06-29T05:01:48.806Z',
      citations: 'Gawker',
    },
    {
      title: 'Statement by President of the Republic of Finland Sauli Niinistö on 28 June 2022',
      source: 'Presidentti',
      description:
        'Office of the President of the Republic of Finland  —  Press release 41/2022  —  Today in Madrid, before the beginning of the NATO Summit, we had a thorough meeting with President …',
      url: 'https://www.presidentti.fi/en/news/statement-by-president-the-republic-of-finland-sauli-niinisto-on-28-june-2022/',
      date: '2022-06-29',
      createdAt: '2022-06-29T05:01:48.808Z',
      citations: 'Presidentti; Defense One; Foreign Policy; Washington Examiner; Euractiv; Politico',
    },
    {
      title: 'A lawyer for Virginia Thomas said she would not testify to the House panel.',
      source: 'New York Times',
      description:
        "A lawyer for Virginia Thomas, the wife of Supreme Court Justice Clarence Thomas and a supporter of President Donald J. Trump's efforts to stay in power after the 2020 election, told the House select committee investigating …",
      url: 'https://www.nytimes.com/2022/06/28/us/ginni-thomas-emails-jan-6-hearing.html',
      date: '2022-06-29',
      createdAt: '2022-06-29T05:01:48.789Z',
      citations: 'New York Times',
    },
    {
      title: 'Eastman drops bid to block phone records from Jan. 6 committee',
      source: 'Politico',
      description:
        "The former Trump lawyer is increasingly the subject of legal scrutiny.  —  John Eastman, an architect of Donald Trump's last-ditch bid to subvert the 2020 election, has dropped a lawsuit aimed at blocking the Jan. 6 select committee from obtaining his phone records.",
      url: 'https://www.politico.com/news/2022/06/28/eastman-phone-records-from-jan-6-committee-00043072',
      date: '2022-06-29',
      createdAt: '2022-06-29T05:01:48.795Z',
      citations: 'Politico; Bloomberg; Insider; CBS News; Raw Story',
    },
    {
      title: 'GOP Election Denier Tina Peters Loses Colorado Secretary Of State Primary',
      source: 'HuffPost',
      description:
        'The Mesa County clerk who was under indictment for tampering with voting machines lost to a Republican who acknowledged the 2020 vote was legitimate.  —  Pam Anderson, a Republican who acknowledged that Joe Biden …',
      url: 'https://www.huffpost.com/entry/tina-peters-election-denier-colorado-elections_n_62bb5316e4b05653163958a6',
      date: '2022-06-29',
      createdAt: '2022-06-29T05:01:48.804Z',
      citations:
        'HuffPost; New York Times; Insider; CBS News; Mother Jones; The Guardian; Washington Times; Just The News; The Colorado Sun; FOX31 Denver; Detroit Free Press',
    },
    {
      title:
        'Poll: Confidence in Supreme Court collapses as just 33% agree with decision to overturn Roe v. Wade',
      source: 'Yahoo News',
      description:
        'A new Yahoo News/YouGov poll shows that more than six in 10 Americans (61%) now have little or no confidence in the Supreme Court after its decision Friday to overturn Roe v. Wade …',
      url: 'https://news.yahoo.com/poll-confidence-in-supreme-court-collapses-as-just-33-agree-with-decision-to-overturn-roe-v-wade-090021689.html',
      date: '2022-06-29',
      createdAt: '2022-06-29T05:01:48.809Z',
      citations: 'Yahoo News; Townhall',
    },
    {
      title: 'Giuliani on Defensive After Uproar Over Assault Claim',
      source: 'New York Times',
      description:
        'Two days after Rudy Giuliani claimed a worker had assaulted him at a Staten Island supermarket, the once-vaunted former mayor was spending Tuesday morning like many men his age: complaining about his aches and pains.',
      url: 'https://www.nytimes.com/2022/06/28/nyregion/rudy-giuliani-eric-adams-investigation-ny.html',
      date: '2022-06-29',
      createdAt: '2022-06-29T05:01:48.798Z',
      citations: 'New York Times; New York Daily News; New York Post; Lede Progress',
    },
    {
      title: 'Trump-backed Rep. Mary Miller defeats Rep. Rodney Davis in new Illinois district',
      source: 'NBC News',
      description:
        "Miller raised eyebrows over the weekend when she called the Supreme Court's decision to overturn Roe v. Wade a “victory for white life.”  Her campaign said she misspoke.  —  Rep. Mary Miller defeated …",
      url: 'https://www.nbcnews.com/politics/2022-election/mary-miller-defeats-rodney-davis-illinois-rcna35575',
      date: '2022-06-29',
      createdAt: '2022-06-29T05:01:48.796Z',
      citations:
        'NBC News; HuffPost; The Hill; Washington Examiner; The Daily Beast; Politico; Breitbart; Roll Call; The Gateway Pundit; The Daily Caller; Just The News',
    },
    {
      title: 'The Case for Prosecuting Donald Trump Just Got Much Stronger',
      source: 'The Dispatch',
      description:
        "New testimony may have produced a smoking gun.  —  I confess that I've been skeptical that the January 6 committee would produce evidence that Donald Trump was directly criminally responsible for the attack on the Capitol.",
      url: 'https://frenchpress.thedispatch.com/p/the-case-for-prosecuting-donald-trump',
      date: '2022-06-29',
      createdAt: '2022-06-29T05:01:48.787Z',
      citations:
        'The Dispatch; The Hill; Newsy; Breitbart; Washington Post; New York Times; The Daily Caller; USA Today',
    },
    {
      title: 'Supreme Court Revives Republican-Drawn Voting Map in Louisiana',
      source: 'New York Times',
      description:
        "A federal judge had ordered lawmakers to redraw the state's six congressional districts to include two in which Black voters were in the majority.  — Give this article- - - Read in app  —  WASHINGTON — The Supreme Court …",
      url: 'https://www.nytimes.com/2022/06/28/us/supreme-court-louisiana-voting-map.html',
      date: '2022-06-29',
      createdAt: '2022-06-29T05:01:48.807Z',
      citations:
        'New York Times; Associated Press; Reuters; Washington Examiner; Washington Post; Vox; UPI; The Hill; NBC News; Louisiana Illuminator; SCOTUSblog; The Daily Caller; Political Wire; Just The News; KLFY-TV; TheGrio; CNN; NPR; RedState',
    },
    {
      title:
        'Attorney General Ken Paxton says he will defend Texas sodomy law if Supreme Court revisits Lawrence vs. Texas',
      source: 'Houston Chronicle',
      description:
        'Texas Attorney General Ken Paxton last week seemingly expressed support for the Supreme Court potentially overturning past rulings on cases involving the LGBTQ community following the downfall of Roe v. Wade on Friday.',
      url: 'https://www.chron.com/politics/article/Texas-abortion-ken-paxton-sodomy-law-gay-marriage-17271966.php',
      date: '2022-06-29',
      createdAt: '2022-06-29T05:01:48.802Z',
      citations: 'Houston Chronicle',
    },
    {
      title: "Cassidy Hutchinson's Testimony Should Be the End of Donald Trump",
      source: 'New Yorker',
      description:
        "Regardless of the legal obstacles to convicting the former President, Hutchinson's testimony reconfirmed that he must never again be allowed anywhere near power.  —  On Tuesday morning, Hunter Biden started trending on social media …",
      url: 'https://www.newyorker.com/news/our-columnists/cassidy-hutchinsons-testimony-should-be-the-end-of-donald-trump',
      date: '2022-06-29',
      createdAt: '2022-06-29T05:01:48.790Z',
      citations: 'New Yorker; ABC News; Associated Press',
    },
    {
      title: 'Trump Aides Watch Testimony and Brace for Damage',
      source: 'New York Times',
      description:
        'A “stunning two hours” raises fears of political and legal consequences for the former president.  — Give this article- - - Read in app  —  WASHINGTON — Devastating new testimony by a former White House aide describing …',
      url: 'https://www.nytimes.com/2022/06/28/us/politics/trump-truth-social-jan-6-hearing-twitter.html',
      date: '2022-06-29',
      createdAt: '2022-06-29T05:01:48.788Z',
      citations: 'New York Times; Politico; PoliticusUSA',
    },
  ])
}
