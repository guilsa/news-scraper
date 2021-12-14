import React from 'react'
import { useState } from 'react'

function App() {
  const [articles, setArticles] = useState([])

  React.useEffect(() => {
    fetch('http://localhost:3000')
      .then((res) => res.json())
      .then(
        (result) => {
          console.log('results', result)
          setArticles(result)
        },
        (error) => {
          throw error
        }
      )
  }, [])

  return (
    <div className='App' style={{ marginTop: 50, marginLeft: 600, marginRight: 600 }}>
      <header>{articles.length} articles</header>
      {articles.map((article) => {
        return (
          <div key={article.id} style={{ textAlign: 'left' }}>
            <h3>
              <a href={article.url}>{article.title}</a>
            </h3>
            <p>{article.description}</p>
            <p style={{ font: '1em', color: 'gray' }}>{article.source}</p>
          </div>
        )
      })}
    </div>
  )
}

export default App
