import { useEffect, useRef, useReducer } from 'react'

const BASE_URL = 'http://' + process.env.REACT_APP_HOST + ':3000'

// source: https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/

export const useFetch = (url) => {
  // With useRef, we can set and retrieve mutable values at ease and its
  // value persists throughout the component’s lifecycle.
  // Here, our cache is now in our useFetch hook with an empty object as
  // an initial value.
  const cache = useRef({})

  const initialState = {
    status: 'idle',
    error: null,
    data: {},
  }

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'FETCHING':
        return { ...initialState, status: 'fetching' }
      case 'FETCHED':
        return { ...initialState, status: 'fetched', data: action.payload }
      case 'FETCH_ERROR':
        return { ...initialState, status: 'error', error: action.payload }
      default:
        return state
    }
  }, initialState)

  useEffect(() => {
    let cancelRequest = false
    if (!url) return

    const fetchData = async () => {
      dispatch({ type: 'FETCHING' })
      if (cache.current[url]) {
        const data = cache.current[url]
        dispatch({ type: 'FETCHED', payload: data })
      } else {
        try {
          const response = await fetch(BASE_URL + url)
          const data = await response.json()
          cache.current[url] = data
          if (cancelRequest) return
          dispatch({ type: 'FETCHED', payload: data })
        } catch (error) {
          if (cancelRequest) return
          dispatch({ type: 'FETCH_ERROR', payload: error.message })
        }
      }
    }

    fetchData()

    return function cleanup() {
      // Here, we set cancelRequest to true after having defined it
      // inside the effect. So, before we attempt to make state changes,
      // we first confirm if the component has been unmounted. If it has
      // been unmounted, we skip updating the state and if it hasn’t
      // been unmounted, we update the state. This will resolve the React
      // state update error, and also prevent race conditions in our
      // components.

      // More info:
      // Fetch implements the Promise API, in the sense that it could be
      // resolved or rejected. If our hook tries to make an update while
      // the component has unmounted because of some Promise just got
      // resolved, React would return Can't perform a React state update
      // on an unmounted component.
      cancelRequest = true
    }
  }, [url])

  return state
}
