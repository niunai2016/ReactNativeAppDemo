/**
 * 提供基础配置信息
 * constants.js 提供如服务器地址、分页数量、设备类型、设备号、版本号等配置
 */
import { Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'

export default {
  serverUrl: 'http://127.0.0.1:3600/portal',
  pageSize: 10,
  deviceType: Platform.OS.toUpperCase(),
  deviceNo: DeviceInfo.getUniqueID().replace('-').substr(0, 12),
  versionName: DeviceInfo.getVersion(), //也可写死如'1.0.0'
}