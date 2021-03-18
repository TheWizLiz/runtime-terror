export function getFromStorage (key) {
  if (!key) {
    return null
  }
  try {
    const valueStr = localStorage.getItem(key)

    if (valueStr) {
      return JSON.parse(valueStr)
    }
    return null
  } catch (err) {
    console.log('Key not found...')
    return null
  }
}

export function setInStorage (key, obj) {
  if (!key) {
    console.error('Error: Key is missing')
  }

  try {
    localStorage.setItem(key, JSON.stringify(obj))
  } catch (err) {
    console.log(err)
  }
}

export function removeFromStorage (key) {
  if (!key) {
    console.error('Error: Key is missing')
  }

  try {
    localStorage.removeItem(key)
  } catch (err) {
    console.log(err)
  }
}