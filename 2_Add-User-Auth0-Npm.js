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
    user_id: '006f46dc-42c1-4b61-a189-f7899af2b797',
    email: 'test@test.com',
    password: 'Nexsales@123',
    connection: 'market-place-tam-sam-beta',
    verify_email: true,
    email_verified: true,
    name: 'Conner Knepley',
    user_metadata: {
      firstName: 'Conner',
      lastName: 'Knepley',
      companyName: 'premier international',
      emailDomain: 'nexsales.com'
    }
  }
]

async function main () {
  for (let index = 0; index < users.length; index++) {
    const user = users[index]
    let data = await auth0Client.createUser(user).catch(err => {
      console.log(err.message)
      console.log('Error creating user', user)
    })
    console.log(data)
  }
}

main()
