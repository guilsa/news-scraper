import React from 'react'
import { useState } from 'react'
import './App.css'

import { useFetch } from './hooks/useFetch'

function renderArticles(value, key, map) {
  // console.log('value', value)
  return value?.map((article) => {
    console.log('article', article)
    return (
      <div key={article.id}>
        <div className='box' style={{ textAlign: 'left', paddingBottom: 10 }}>
          <h3>
            <a href={article.url}>{article.title}</a>
          </h3>
          <p style={{ fontSize: '0.9em' }}>{article.description}</p>
          <div style={{ fontSize: '1em', color: 'gray' }}>
            <span>{article.source}</span>
            <span style={{ textTransform: 'capitalize' }}>&nbsp;{renderBiasRating(article.bias_rating)}</span>
          </div>
        </div>
      </div>
    )
  })
}

function App() {
  const { status, data, error } = useFetch('/articles')
  const [articleGroup, setArticleGroup] = useState([])

  React.useEffect(() => {
    const groups = new Map()
    data.forEach((article) => {
      if (!groups.has(article.date)) {
        groups.set(article.date, [article])
      } else {
        const stack = groups.get(article.date)
        stack.push(article)
      }
      setArticleGroup(groups)
    })
  }, [data])

  return (
    <div>
      <header style={{ marginLeft: 20 }}>{data?.length} articles</header>
      <div className='App'>
        {status === 'error' && <div>{error}</div>}
        {status === 'fetching' && <span>Loading.....</span>}
        {status === 'fetched' && articleGroup.forEach(renderArticles)}
        {/* {status === 'fetched' &&
          articleGroups?.map((article) => {
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
          })} */}
      </div>
    </div>
  )
}

function renderBiasRating(bias_rating) {
  if (!bias_rating) return

  return <>({bias_rating})</>
}

export default App
