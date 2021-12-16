import React from 'react'
import './App.css'

import { useFetch } from './hooks/useFetch'

function App() {
  const { status, data, error } = useFetch('/articles')

  const articles = data

  return (
    <div>
      <header style={{ marginLeft: 20 }}>{articles?.length} articles</header>
      <div className='App'>
        {status === 'error' && <div>{error}</div>}
        {status === 'fetching' && <span>Loading.....</span>}
        {status === 'fetched' &&
          articles?.map((article) => {
            return (
              <div key={article.id}>
                <div className='box' style={{ textAlign: 'left', paddingBottom: 10 }}>
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
}

function renderBiasRating(bias_rating) {
  if (!bias_rating) return

  return <>({bias_rating})</>
}

export default App
