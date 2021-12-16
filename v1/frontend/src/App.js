import React from 'react'
import { useState } from 'react'
import './App.css'

import { groupBy } from './utils/groupBy'
import { useFetch } from './hooks/useFetch'

function App() {
  const { status, data, error } = useFetch('/articles')
  const [group, setGroup] = useState({})

  React.useEffect(() => {
    data.sort((a, b) => a.date < b.date)
    setGroup(groupBy(data, 'date'))
  }, [data])

  return (
    <div>
      <header style={{ marginLeft: 20 }}>{data?.length} articles</header>
      <div>
        {status === 'error' && <div>{error}</div>}
        {status === 'fetching' && <span>Loading.....</span>}
        {status === 'fetched' &&
          Object.keys(group)?.map((category) => {
            return (
              <div>
                <h1 style={{ marginLeft: 20, marginRight: 20, textAlign: 'center', marginBottom: 20 }}>
                  {category}
                </h1>
                <div key={category} className='grid'>
                  {group[category].map((article) => {
                    return (
                      <div key={article.id} className='box'>
                        <div style={{ textAlign: 'left', paddingBottom: 10 }}>
                          <h3>
                            <a href={article.url}>{article.title}</a>
                          </h3>
                          <p style={{ fontSize: '0.9em' }}>{article.description}</p>
                          <div style={{ fontSize: '1em', color: 'gray' }}>
                            <span>{article.source}</span>
                            <span style={{ textTransform: 'capitalize' }}>
                              &nbsp;{renderBiasRating(article.bias_rating)}
                            </span>
                          </div>
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
