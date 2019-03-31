const database = require('../database')
const bcrypt = require('bcrypt')

exports.createUser = async (email, password) => {
  let user = await database.getDatabase().user.findOne({
    where: {
      email: email
    }
  })
  if (user) {
    throw (new Error(' Email address is already taken'))
  } else {
    let hashedPassword = await bcrypt.hash(password, 10)
    try {
      return database.getDatabase().user.create({
        email: email,
        password: hashedPassword
      })
    } catch (error) {
      throw error
    }
  }
}
