import React from 'react'
import { useState } from 'react'
import dayjs from 'dayjs'

import './App.css'

import { groupBy } from './utils/groupBy'
import { isFilterBy } from './utils/isFilterBy'
import { categoryToString, formatLastModified } from './utils/custom'
import { useFetch } from './hooks/useFetch'

function displayArticleDate(filterBy, date) {
  return filterBy !== 'date' ? dayjs(date).format('MM/DD/YYYY') : null
}

function App() {
  const { status, data, error } = useFetch('/articles')
  const [group, setGroup] = useState({})
  const [filterBy, setFilterBy] = useState('date')

  React.useEffect(() => {
    data.articles?.sort((a, b) => a.date < b.date)
    setGroup(groupBy(data.articles, filterBy))
  }, [data.articles, filterBy])

  return (
    <div>
      <div className='badges'>
        <label>Filter by:</label>
        <div className={isFilterBy(filterBy, 'date')} onClick={() => setFilterBy('date')}>
          Date
        </div>
        <div className={isFilterBy(filterBy, 'source')} onClick={() => setFilterBy('source')}>
          Source
        </div>
        <div className={isFilterBy(filterBy, 'bias_rating')} onClick={() => setFilterBy('bias_rating')}>
          Bias
        </div>
      </div>
      <div style={{ fontSize: '0.8em', textDecoration: 'underline', display: 'inline' }}>
        last {data.articles?.length} articles
      </div>
      <div style={{ display: 'inline', fontSize: '0.8em' }}>
        {' '}
        | updated: {formatLastModified(data['last_modified'])}
      </div>

      <div>
        {status === 'error' && <div>{error}</div>}
        {status === 'fetching' && <span>Loading.....</span>}
        {status === 'fetched' &&
          Object.keys(group).map((category, idx) => {
            return (
              <div key={idx}>
                <h1
                  style={{
                    marginLeft: 20,
                    marginRight: 20,
                    textAlign: 'center',
                    marginBottom: 20,
                    textTransform: 'capitalize',
                  }}
                >
                  {categoryToString(category)}
                </h1>
                <div className='grid'>
                  {/* TODO: Make it explicit that group is a component state or that we are mapping it */}
                  {/* I guess make it explicit that we are rendering group and not data */}
                  {group[category].map((article) => {
                    return (
                      <div key={article.id} className='box'>
                        <div
                          style={{ fontSize: '0.9em', color: '#b5179e', fontWeight: 700, marginBottom: 10 }}
                        >
                          <span>{article.source}</span>
                          <span style={{ textTransform: 'capitalize' }}>
                            &nbsp;{renderBiasRating(article.bias_rating)}
                          </span>
                        </div>
                        <div style={{ textAlign: 'left', marginBottom: 20 }}>
                          <h3 style={{ display: 'inline' }}>
                            <a href={article.url}>{article.title}</a>
                          </h3>
                          <p style={{ paddingLeft: 15, fontSize: '0.9em', display: 'inline' }}>
                            {article.description}
                          </p>
                          <p
                            style={{ opacity: '0.7', color: '#3a0ca3', fontWeight: '700', fontSize: '0.9em' }}
                          >
                            {displayArticleDate(filterBy, article.date)}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

function renderBiasRating(bias_rating) {
  if (!bias_rating) return

  return <>({bias_rating})</>
}

export default App
