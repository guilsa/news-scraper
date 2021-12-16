import { useState, useEffect } from 'react'

const BASE_URL = 'http://localhost:3000'

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(false)
  const [apiData, setApiData] = useState(null)
  const [serverError, setServerError] = useState(null)

  useEffect(() => {
    setIsLoading(true)

    fetch(BASE_URL + url)
      .then((res) => res.json())
      .then(
        (result) => {
          setApiData(result)
          setIsLoading(false)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.error('err', error)
          setIsLoading(false)
          setServerError(error)
        }
      )
  }, [url])

  return { apiData, isLoading, serverError }
}

export { useFetch }
