import React from 'react'
import { useState } from 'react'
import './App.css'

import { useFetch } from './hooks/useFetch'

function reMap(key, arr) {
  const map = new Map()

  arr.forEach((item) => {
    const { name, ...others } = item
    map.set(name, others)
  })
  return map
}

function renderBias(bias, source) {
  if (bias.get(source) === undefined) return
  if (bias.get(source)?.bias_rating === '') return

  return <>({bias.get(source)?.bias_rating.toLowerCase()})</>
}

function App() {
  const [bias, setBias] = useState(new Map())

  const { apiData, isLoading, serverError } = useFetch('/articles')

  // console.log('apiData', apiData)

  // React.useEffect(() => {
  //   fetch('http://localhost:3000/sources')
  //     .then((res) => {
  //       if (res.status === 202) {
  //         throw new Error(res.status)
  //       } else return res.json()
  //     })
  //     .then(
  //       (result) => {
  //         console.log('sources', result)
  //         setBias(reMap('name', result))
  //       },
  //       (err) => {
  //         console.log('err', err)
  //       }
  //     )
  // }, [])

  // React.useEffect(() => {
  //   fetch('http://localhost:3000')
  //     .then((res) => {
  //       if (!res.ok) throw new Error(res.status)
  //       else return res.json()
  //     })
  //     .then(
  //       (result) => {
  //         console.log('articles', result)
  //         setArticles(result)
  //       },
  //       (err) => {
  //         console.log('err', err)
  //       }
  //     )
  // }, [])
  // console.log('serverError', serverError)
  return (
    <div>
      <header style={{ marginLeft: 20 }}>{apiData?.length} articles</header>
      <div className='App'>
        {isLoading && <span>Loading.....</span>}
        {!isLoading && serverError ? (
          <span>Error in fetching data ...</span>
        ) : (
          apiData?.map((article) => {
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
                      &nbsp;
                      {renderBias(bias, article.source)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default App
