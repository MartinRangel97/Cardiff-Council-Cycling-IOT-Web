const database = require('../database')
const bcrypt = require('bcrypt')

exports.createUser = function (email, password) {
  return new Promise((resolve, reject) => {
    database.getDatabase().user.findOne({
      where: {
        email: email
      }
    }).then(user => {
      if (user) {
        reject(new Error(' Email address is already taken'))
      }
    }).then(() => {
      // Hash the password
      return bcrypt.hash(password, 10)
    }).then(hashedPassword => {
      // Add the user to the database
      database.getDatabase().user.create({
        email: email,
        password: hashedPassword
      }).then(() => {
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  })
}
