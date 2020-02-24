function randomizedUser(user) {
  let noSpaceName = checkWhiteSpace(user)
  return getRandomLastName(noSpaceName)
}

function checkWhiteSpace(user) {
  let result = ''
  for (let i = 0; i < user.length; i++) {
    const word = user[i]
    if (word != ' ') {
      result += word
    }
  }
  return result
}

function getRandomLastName(user) {
  let randomWord = ''
  for (let i = 0; i < 3; i++) {
    randomWord += String(Math.floor(Math.random() * 10))
  }
  return user + '-' + randomWord
}

module.exports = randomizedUser
