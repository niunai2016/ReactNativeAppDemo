/**
 * 列表页服务
 */
import BaseService from './base-service';

export default class ListService extends BaseService {
  /**
   * 获取列表
   * @return {Promise<void>}
   */
  async getList() {
    const res = await this.postJson('qryList.do', {})

    return res;
  }
}