import React from 'react'
import { useState } from 'react'
import dayjs from 'dayjs'

import './App.css'

import { useFetch } from './hooks/useFetch'

function displayArticleDate(filterBy, date) {
  return filterBy !== 'date' ? dayjs(date).format('MM/DD/YYYY') : null
}

function App() {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)

  const paramsString = new URLSearchParams({
    page: page,
    limit: 30,
  })

  const { status, data, error } = useFetch('/articles?' + paramsString.toString())

  React.useEffect(() => {
    if (!data.results) return
    setArticles((oldArticles) => [...(oldArticles === [] ? [] : oldArticles), ...data.results])
  }, [setArticles, data.results])

  const filterBy = 'date'

  React.useEffect(() => {
    if (status === 'fetching') return
    function handleScroll(e) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setPage(page + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [page, status])

  return (
    <div>
      <label style={{ display: 'inline', fontSize: '0.8em' }}>
        updated: {new Date(data['last_modified'])?.toLocaleString()}
      </label>

      <div style={{ marginTop: 30 }}>
        {status === 'error' && <div>{error}</div>}
        {status === 'fetching' && <span>Loading.....</span>}
        {articles?.map((article) => {
          return (
            <div key={article.id} className='box'>
              <div style={{ fontSize: '0.9em', color: '#b5179e', fontWeight: 700, marginBottom: 10 }}>
                <span>{article.source}</span>
                <span style={{ textTransform: 'capitalize' }}>
                  &nbsp;{renderBiasRating(article.bias_rating)}
                </span>
              </div>
              <div style={{ textAlign: 'left', marginBottom: 20 }}>
                <h3 style={{ display: 'inline' }}>
                  <a href={article.url}>{article.title}</a>
                </h3>
                <p style={{ paddingLeft: 15, fontSize: '0.9em', display: 'inline' }}>{article.description}</p>
                <p style={{ opacity: '0.7', color: '#3a0ca3', fontWeight: '700', fontSize: '0.9em' }}>
                  {displayArticleDate(filterBy, article.date)}
                </p>
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
