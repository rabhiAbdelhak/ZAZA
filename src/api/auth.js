import axios from 'axios'
const users = [
  {
    id: '5e86809283e28b96d2d38537',
    avatar: '/static/user-chen_simmons.png',
    email: 'cs@mailinator.com',
    name: 'Chen Simmons',
    password: '12345678',
  },
]

class AuthApi {
  async login({ email, password }) {
    var data = JSON.stringify({
      email: email,
      password: password,
    })

    var config = {
      method: 'post',
      url: 'https://api-manager.zimou.dev/api/v1/auth/login',
      headers: {
        Authorization: 'Bearer 62438|gIbEllz27evbKCmYLIJkAuo1oxgQgb6nsjeQ9RCE',
        'Content-Type': 'application/json',
      },
      data: data,
    }
    var result = null
    await axios(config)
      .then((responce) => (result = responce))
      .catch((err) => (result = err.response))

    return new Promise((resolve, reject) => {
      try {
        // Find the user
        //const user = users.find((_user) => _user.email === email);

        if (result.status === 404) {
          reject(new Error(result.data.message))
          return
        }

        // Create the access token
        const accessToken = result.data

        resolve(accessToken)
      } catch (err) {
        console.error('[Auth Api]: ', err)
        reject(new Error('Internal server error'))
      }
    })
  }

  // async register({ email, name, password }) {
  //   await wait(1000);

  //   return new Promise((resolve, reject) => {
  //     try {
  //       // Check if a user already exists
  //       let user = users.find((_user) => _user.email === email);

  //       if (user) {
  //         reject(new Error('User already exists'));
  //         return;
  //       }

  //       user = {
  //         id: generateResourceId(),
  //         avatar: null,
  //         email,
  //         name,
  //         password
  //       };

  //       users.push(user);

  //       const accessToken = sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  //       resolve(accessToken);
  //     } catch (err) {
  //       console.error('[Auth Api]: ', err);
  //       reject(new Error('Internal server error'));
  //     }
  //   });
  // }

  // me(accessToken) {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       // Decode access token
  //       const { userId } = decode(accessToken);

  //       // Find the user
  //       const user = users.find((_user) => _user.id === userId);

  //       if (!user) {
  //         reject(new Error('Invalid authorization token'));
  //         return;
  //       }

  //       resolve({
  //         id: user.id,
  //         avatar: user.avatar,
  //         email: user.email,
  //         name: user.name
  //       });
  //     } catch (err) {
  //       console.error('[Auth Api]: ', err);
  //       reject(new Error('Internal server error'));
  //     }
  //   });
  // }
}

import { dropshipFetch } from './axios'

export function changePassword({ password, oldPassword }) {
  return dropshipFetch.put('/auth/update-password', {
    old_password: oldPassword,
    password,
    password_confirmation: password,
  })
}

export async function login({ email, password }) {
  const { data } = await dropshipFetch.post('/auth/login', {
    email,
    password,
  })
  return data.access_token
}

export async function loginWithToken({ token }) {
  const { data } = await dropshipFetch.post('/redirect', {
    token,
  })

  return data.access_token
}
