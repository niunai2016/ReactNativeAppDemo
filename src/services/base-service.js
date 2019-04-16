/**
 * 基础服务类封装
 * BaseService
 */
import fetchIntercept from 'fetch-intercept'
import constants from '../common/constants';
import ServiceError from '../common/service-error';
import code from '../common/code';

const fetchApi = fetch; // eslint-disable-line

fetchIntercept.register({
  request: function (url, config) {
    return [url, config];
  },
  requestError: function (error) {
    return Promise.reject(error);
  },
  response: function (res) {
    return res;
  },
  responseError: function (error) {
    return Promise.reject(error);
  }
});

export default class BaseService {
  constructor(props){
    if(props && props.showLoading){
      this.showLoading = props.showLoading;
    }
    if(props && props.hideLoading){
      this.hideLoading = props.hideLoading;
    }
  }

  async request(method, url, params, errorMsgIndex, showLoading = true, acceptType = 'application/json') {
    // 如果url不全，则自动补全
    if(url.indexOf('http://') < 0 && url.indexOf('https://') < 0){
      url = constants.serverUrl + '/' + url;
    }

    if(showLoading  && this.showLoading){
      this.showLoading();
    }

    let res = null

    try {
      const options = {
        method: method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
          'accept': acceptType,
          'Cache-Control': 'no-cache'
        }
      }

      if(method === 'POST' || method === 'PUT') {
        params.DeviceType = constants.deviceType
        params.DeviceNo = constants.deviceNo

        options.body = JSON.stringify(params || {})
      }

      res = await fetchApi(url, options)
    } catch (e) {
      if(this.hideLoading){
        this.hideLoading()
      }

      throw new ServiceError(code.REQUEST_FAILED, '网络请求失败')
    }

    if(res.status && res.status >= 200 && res.status < 300) {
      const contentType = res.headers.get('Content-Type')

      if(this.hideLoading){
        this.hideLoading();
      }

      if(contentType.indexOf('text/plain') >= 0 || contentType.indexOf('text/html') >= 0){
        return res.text()
      }else{
        const responseJson = await res.json();
        if (responseJson && !responseJson.jsonError) {
          return responseJson
        } else {
          throw new ServiceError(responseJson.jsonError[0]._exceptionMessageCode || code.REQUEST_FAILED, responseJson.jsonError[0]._exceptionMessage);
        }
      }
    } else {
      if(this.hideLoading){
        this.hideLoading();
      }

      if (res.status === 401) {
        throw new ServiceError(code.REQUEST_TIMEOUT, res.data.message);
      } else if (res.ok) {
        try {
          const responseJson = await res.json();
          const { message } = responseJson;
          throw new ServiceError(code.REQUEST_FAILED, message);
        } catch (e) {
          throw new ServiceError(code.REQUEST_FAILED, '服务未知错误');
        }
      }
    }
  }

  /**
   * GET 后台数据
   * @param url
   * @param errorMsg 报错消息
   * @returns {Promise<*>}
   */
  async fetchJson(url, errorMsg, showLoading = true){
    return await this.request('GET', url, null, errorMsg, showLoading)
  }

  /**
   * POST请求
   * @param url
   * @param params
   * @param errorMsg 报错消息
   * @returns {Promise.<void>}
   */
  async postJson(url, params, errorMsg, showLoading = true){
    return await this.request('POST', url, params, errorMsg, showLoading)
  }

}