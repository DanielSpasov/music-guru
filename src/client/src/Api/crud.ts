import axios from 'axios';

export default class Crud {
  async get(url: string, params?: any) {
    const { data } = await axios.get(url, {
      headers: {},
      params: { ...params }
    });
    return data;
  }

  async post(url: string, params?: any, body?: any) {
    const { data } = await axios.post(url, body, {
      headers: {},
      params: { ...params }
    });
    return data;
  }

  async patch(url: string, params?: any, body?: any) {
    const { data } = await axios.patch(url, body, {
      headers: {},
      params: { ...params }
    });
    return data;
  }

  async del(url: string, params?: any) {
    const { data } = await axios.delete(url, {
      headers: {},
      params: { ...params }
    });
    return data;
  }

  async put(url: string, params?: any, body?: any) {
    const { data } = await axios.put(url, body, {
      headers: {},
      params: { ...params }
    });
    return data;
  }
}
