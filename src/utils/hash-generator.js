const createHash = () => {
  var chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  var text = ''

  for (var i = 0; i < 100; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return text
}

export { createHash }
