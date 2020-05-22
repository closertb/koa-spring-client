import { bind } from 'antd-doddle/decorator';

export default class MyOss {
  constructor() {
    this.client = null;
  }

  // 初始化Client
  async create({ accessKeyId, accessKeySecret }) {
    this.client = await import('ali-oss').then(({ default: OSS }) => new OSS({
      bucket: 'doddle',
      region: 'oss-cn-beijing',
      accessKeyId,
      accessKeySecret,
    }));
  }

  @bind
  async upload({ file, key, options = {} }) {
    try {
      const result = await this.client.put(key, file, options);
      return result;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  @bind
  async getList(dir = '') {
    try {
      const result = await this.client.list({
        prefix: dir
      });
      return result;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
