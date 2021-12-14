import React from 'react'
import { useState } from 'react'

const fetchBiasRating = (sources, article) => {
  // console.log('sources', sources)
  // console.log('article', article.source)
  // const results = []
  let res
  sources.forEach((source) => {
    console.log(source.bias_rating)
    if (source.name === article) {
      return source.bias_rating
      //   res = source.bias_rating
    }
  })
  // res = sources.filter((s) => s.name === article)
  // console.log('res', res)
  return ''
}

function App() {
  const [articles, setArticles] = useState([])
  const [sources, setSources] = useState([])

  React.useEffect(() => {
    fetch('http://localhost:3000/sources')
      .then((res) => res.json())
      .then(
        (result) => {
          console.log('sources', result)
          setSources(result)
        },
        (error) => {
          throw error
        }
      )
  }, [])

  React.useEffect(() => {
    fetch('http://localhost:3000')
      .then((res) => res.json())
      .then(
        (result) => {
          console.log('articles', result)
          setArticles(result)
        },
        (error) => {
          throw error
        }
      )
  }, [])

  // articles.map((a) => fetchBiasRating(sources, a))

  return (
    <div className='App' style={{ marginTop: 50, marginLeft: 450, marginRight: 450 }}>
      <header>{articles.length} articles</header>
      {articles.map((article) => {
        return (
          <div key={article.id} style={{ textAlign: 'left', paddingBottom: 10 }}>
            <h3>
              <a href={article.url}>{article.title}</a>
            </h3>
            <p>{article.description}</p>
            <p style={{ font: '1em', color: 'gray' }}>{article.source}</p>
            <p>Bias rating: {fetchBiasRating(sources, article)}</p>
          </div>
        )
      })}
    </div>
  )
}

export default App
