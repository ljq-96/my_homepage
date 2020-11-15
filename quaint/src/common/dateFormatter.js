function dateFormatter(time, connector, i) {
  const timeObj = typeof time === 'object' ? time : new Date(time)
  const year = timeObj.getFullYear()
  const month = timeObj.getMonth() + 1 < 10 ? '0' + (timeObj.getMonth() + 1) : timeObj.getMonth() + 1
  const date = timeObj.getDate() + 1 < 10 ? '0' + (timeObj.getDate() + 1) : timeObj.getDate() + 1
  return [year, month, date].splice(0, i || 3).join(connector || '-')
}

export default dateFormatter