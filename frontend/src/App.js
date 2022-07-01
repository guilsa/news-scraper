import React from 'react'
import { useState } from 'react'

import ArticleList from './ArticleList'

import { useFetch } from './hooks/useFetch'

import './styles/App.css'

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
        <ArticleList articles={articles} />
      </div>
    </div>
  )
}

export default App
