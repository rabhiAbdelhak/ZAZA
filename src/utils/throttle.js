export const throttle = (cb, delay = 1000) => {
  let shouldWait = false
  let waitingArgs
  let timeoutFunc = () => {
    if (waitingArgs === null) {
      shouldWait = false
    } else {
      waitingArgs = waitingArgs ? [...waitingArgs] : []
      cb(...waitingArgs)
      waitingArgs = null
      setTimeout(timeoutFunc, delay)
    }
  }
  return (...args) => {
    if (shouldWait) {
      waitingArgs = args
      return
    }
    args = args ? [...args] : []
    cb(...args)

    shouldWait = true
    setTimeout(timeoutFunc, delay)
  }
}
