const appSecret = require('./app-credentials')
const axios = require('axios')
const { pick } = require('lodash')
const fs = require('fs')
const csv = require('fast-csv')
const { clearScreenDown } = require('readline')

const asxiosCall = config =>
  axios
    .request(config)
    .then(resp => {
      return pick(resp, ['status', 'statusText', 'data'])
    })
    .catch(err => {
      return pick(err.response, ['status', 'statusText', 'data'])
    })

const getManagementApiToken = async () => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://innovation.auth0.com/oauth/token',
    headers: {
      'content-type': 'application/json'
    },
    data: JSON.stringify({
      client_id: appSecret[0].client_id,
      client_secret: appSecret[0].client_secret,
      audience: 'https://innovation.auth0.com/api/v2/',
      grant_type: 'client_credentials'
    })
  }

  let axiosCalResp = await asxiosCall(config)
  if (axiosCalResp.status == 200) {
    return axiosCalResp.data.access_token
  }
  console.log(axiosCalResp)
  return undefined
}

const getAuthorizationExtenToken = async app => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://innovation.auth0.com/oauth/token',
    headers: {
      'content-type': 'application/json'
    },
    data: JSON.stringify({
      client_id: app.client_id,
      client_secret: app.client_secret,
      audience: 'urn:auth0-authz-api',
      grant_type: 'client_credentials'
    })
  }

  let axiosCalResp = await asxiosCall(config)
  if (axiosCalResp.status == 200) {
    return axiosCalResp.data.access_token
  }
  console.log(axiosCalResp)
  return undefined
}

const getUserRole = async (app, user, token) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://innovation.us.webtask.io/adf6e2f2b84784b57522e3b19dfc9201/api/users/${user.user_id}/roles/calculate`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  let axiosCalResp = await asxiosCall(config)

  let appId = app.applicationId ?? app.client_id
  let roles = []
  if (axiosCalResp?.data)
    for (let role of axiosCalResp.data) {
      if (role.applicationId == appId) roles.push(role.name)
    }
  return roles.join(',')
}

const getUsers = async (app, token) => {
  if (!app.connection) {
    return 'Missing Connection'
  }

  //Fetching Authorization Token
  const auth_token = await getAuthorizationExtenToken(app)

  if (!auth_token) {
    console.log('\t\t - Authorization Token Not Found, Role will be skiped')
  }

  // Fetching Users
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://innovation.auth0.com/api/v2/users`,
    params: {
      q: `identities.connection:${app.connection}`,
      page: 0,
      fields:
        'user_id,created_at,updated_at,email,name,blocked,last_password_reset,last_login,last_ip,logins_count'
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  let axiosCalResp,
    usersData = []

  do {
    axiosCalResp = await asxiosCall(config)

    console.log(
      `\t\t Page ${config.params.page} : records ${axiosCalResp.data.length}`
    )

    if (auth_token) process.stdout.write('\t\t Fetching Roles.')
    for (let user in axiosCalResp.data) {
      if (auth_token) {
        axiosCalResp.data[user].roles = await getUserRole(
          app,
          axiosCalResp.data[user],
          auth_token
        )
        if (user % 5 == 0) {
          process.stdout.write('.')
        }
      }
      axiosCalResp.data[user].connection = app.connection
    }
    process.stdout.write('\n')
    config.params.page++
    usersData.push(...axiosCalResp.data)
  } while (axiosCalResp.data.length)

  console.log(`\n\t Total Users : ${usersData.length}`)
  return usersData
}

const writeDataToFile = (data, fileName) => {
  //Custom Object Seq
  objSeq = {
    user_id: '',
    created_at: '',
    updated_at: '',
    email: '',
    name: '',
    connection: '',
    roles: '',
    blocked: null,
    last_password_reset: '',
    last_login: '',
    last_ip: '',
    logins_count: ''
  }

  const csvStream = csv.format({ headers: true, objectMode: true }) // Include headers
  const writableStream = fs.createWriteStream(`${fileName}.csv`)

  return new Promise((resolve, reject) => {
    csvStream.pipe(writableStream).on('finish', () => {
      console.log('\t CSV file written successfully!')
      resolve('Done!')
    })

    for (let d of data) {
      let d1 = Object.assign({}, objSeq, d)
      d1.blocked ??= false
      csvStream.write(d1)
    }
    csvStream.end()
  })
}

const processApps = async () => {
  let auth_API_Token = await getManagementApiToken()
  if (!auth_API_Token) {
    console.log('\t\t - Unable to fetch auth API token')
    process.exit(1)
  }
  for (let app of appSecret) {
    console.log(`App - ${app.name}`)
    console.log(`\t Fetching Users`)
    let userObj = await getUsers(app, auth_API_Token)
    console.log(`\t Wiriting data to ${app.name}_Users`)
    await writeDataToFile(userObj, `${app.name}_Users`)
  }
}

;(async () => {
  await processApps()
})()

// {
//   "name": "RightLeads-V2",
//   "client_id": "4CHZAmrX2ygqGKCk6zWncM55ue7sgnfk",
//   "client_secret": "91cjFj-jOi8CYGudeMRHKrWGYVW2bEG4S_WoBb76WvtMNnuHhiR-_vlYBU640aSd",
//   "connection": "rightleads-v2-beta"
// }
// {
//   "name": "GoldMine",
//   "client_id": "vfkEoc8MHP3GZgxi42UAHBcBEG9TiJF4",
//   "client_secret": "DxMXAojjlEsN_8rMS4YXVg32B0KNjQbLRYvhRQBRzAq6HvRRTpyD5qpwEuS6RlEo",
//   "connection": "alt-rightleads",
//   "applicationId": "76BX9Ztg4ljbrI0mFzqYI6mN01mvoqRS"
// }
