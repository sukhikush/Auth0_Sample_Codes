require('dotenv').config()

const ManagementClient = require('auth0').ManagementClient

const auth0Client = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'update:users'
})

const users = [
  {
    id: 'auth0|6135a22714f3a0006acbe0a8',
    blocked: true
  }
]

async function blockUser () {
  for (let index = 0; index < users.length; index++) {
    const user = users[index]
    await auth0Client
      .updateUser({ id: user.id }, { blocked: user.blocked })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err.message)
        console.log('Error Update user', user)
      })
  }
}

blockUser()
