//import {instance} from "./axios"
import axios from 'axios'

var BaseUrlLink = 'https://dev.zimou.dev/api/v1'
class CommandsApi {
  async getCommands() {
    var result = null
    var config = {
      method: 'get',
      url: 'https://dev.zimou.dev/api/v1/orders',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    }

    axios(config)

    await axios(config).then((response) => (result = response))

    return Promise.resolve(result.data.data)
  }
  async getCommand(id) {
    var result = null
    var config = {
      method: 'get',
      url: 'https://dev.zimou.dev/api/v1/orders/' + id,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    }
    await axios(config).then((response) => (result = response))
    return Promise.resolve(result.data.data)
  }

  async confirmCommand(id) {
    var result = null

    var config = {
      method: 'get',
      url: 'https://dev.zimou.dev/api/v1/orders',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    }
    await axios(config).then((response) => (result = response))

    return Promise.resolve()
  }

  async failedCommand(id) {
    var config = {
      method: 'put',
      url: 'https://dev.zimou.dev/api/v1/orders',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    }

    await axios(config).then((response) => (result = response))
    return Promise.resolve()
  }
  async cancelCommmand(id) {
    var config = {
      method: 'get',
      url: BaseUrlLink + '/orders/1/status',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    }

    await axios(config).then((response) => (result = response))
    return Promise.resolve()
  }
}

export const commandsApi = new CommandsApi()
