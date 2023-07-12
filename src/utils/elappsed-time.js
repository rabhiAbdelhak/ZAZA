export const getElapsedTime = (date) => {
  const now = new Date()
  let ellapsedTime = now.getTime() - new Date(date).getTime()
  let seconds = Math.floor(ellapsedTime / 1000)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)
  let days = Math.floor(hours / 24)
  let weeks = Math.floor(days / 7)
  let months = Math.floor(weeks / 4.3)
  let years = Math.floor(months / 12)
  if (seconds < 60) {
    ellapsedTime = `${seconds}sec ago`
  } else if (minutes < 60) {
    ellapsedTime = `${minutes}mn ago`
  } else if (hours < 24) {
    ellapsedTime = `${hours}h ago`
  } else if (days < 7) {
    ellapsedTime = `${days} d${days > 1 ? 's' : ''} ago`
  } else if (weeks <= 4) {
    ellapsedTime = `${weeks} week${weeks > 1 ? 's' : ''} ago`
  } else if (months < 12) {
    ellapsedTime = `${months} month${months > 1 ? 's' : ''} ago`
  } else if (years >= 1) {
    ellapsedTime = `${years} year${years > 1 ? 's' : ''} ago`
  }
  return ellapsedTime
}
