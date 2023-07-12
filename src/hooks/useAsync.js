import * as React from 'react'

const defaultInitialState = { status: 'idle', data: null, error: null }

export function useAsync(initialState) {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  })

  const [state, setState] = React.useReducer(
    (s, a) => ({ ...s, ...a }),
    initialStateRef.current,
  )

  const setData = React.useCallback(
    (data) => setState({ data, status: 'resolved' }),
    [],
  )

  const setError = React.useCallback(
    (error) => setState({ error, status: 'rejected' }),
    [],
  )

  const reset = React.useCallback(() => setState(initialStateRef.current), [])

  const run = React.useCallback(
    async (promise) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,
        )
      }
      setState({ status: 'pending' })
      return promise.then(
        (data) => {
          setData(data)
          return data
        },
        (error) => {
          setError(error)
          return Promise.reject(error)
        },
      )
    },
    [setData, setError],
  )

  const { status, data, error } = state

  return {
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  }
}
