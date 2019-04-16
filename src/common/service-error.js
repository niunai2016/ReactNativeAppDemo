/**
 * 服务报错处理
 */

export default class ServiceError extends Error{
  constructor(code, message){
    super(message);
    this.code = code;
    this.hash = Math.random() * 100000000000000000;
    this.signature = 'ServiceError';
  }
}