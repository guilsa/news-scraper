import React from 'react'
import { useState } from 'react'

function reMap(key, arr) {
  const map = new Map()
  arr.forEach((item) => {
    const { name, ...others } = item
    map.set(name, others)
  })
  return map
}

function App() {
  const [articles, setArticles] = useState([])
  const [bias, setBias] = useState(new Map())

  // console.log('sourceMap', sourceMap)

  React.useEffect(() => {
    fetch('http://localhost:3000/sources')
      .then((res) => res.json())
      .then(
        (result) => {
          console.log('sources', result)
          setBias(reMap('name', result))
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
            <div style={{ fontSize: '1em', color: 'gray' }}>
              <span>{article.source}</span>
              <span style={{ textTransform: 'capitalize' }}>
                &nbsp;({bias.get(article.source)?.bias_rating.toLowerCase()})
                {/* {bias.get(article.source)?.factual_reporting.toLowerCase()}) */}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default App
