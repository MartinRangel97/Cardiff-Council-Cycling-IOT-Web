const database = require('../database')

exports.createUser = function (email, password) {
  return new Promise((resolve, reject) => {
    database.getDatabase().user.findOne({
      where: {
        email: email
      }
    }).then(user => {
      if (user) {
        reject(new Error(' Email address is already taken'))
      } else {
        database.getDatabase().user.create({
          email: email,
          password: password
        })
          .then(() => {
            resolve('Account Successfully Created')
          })
      }
    }).catch((err) => {
      reject(new Error(`Error: ${err.message}`))
    })
  })
}
