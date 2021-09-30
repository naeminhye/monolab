export const recursiveSearch = (
  obj: any,
  searchKey: string,
  results: Array<any> = []
): Array<any> => {
  const r = results
  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    if (key === searchKey && typeof value !== 'object') {
      r.push(value)
    } else if (typeof value === 'object') {
      recursiveSearch(value, searchKey, r)
    }
  })
  return r
}

export const generateUniqueKey = (prefix: string): string => {
  return `${prefix}_${new Date().getTime()}`
}
