/**
 * 一个JavaScript 事件消息总线
 */
import NotificationCenter from './notification-center';

export default class Event {
  static listen(eventName, callback, observer) {
    NotificationCenter.addNotification(eventName, callback, observer);
  }
  static emit(eventName, params) {
    NotificationCenter.postNotificationName(eventName, params);
  }
  static remove(eventName, observer) {
    NotificationCenter.removeNotification(eventName, observer);
  }
}