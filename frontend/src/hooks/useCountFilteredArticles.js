import { useState, useEffect } from 'react'

function useCountFilteredArticles(group) {
  const [length, setLength] = useState(0)

  useEffect(() => {
    setLength(0)
    Object.keys(group).forEach((category) => {
      group[category].forEach((article) => {
        setLength((prev) => prev + 1)
      })
    })
  }, [group])

  return length
}

export { useCountFilteredArticles }
