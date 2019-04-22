import {observable, action} from 'mobx'

class AppStore {
  @observable
  list = []

  @observable
  timer = 0

  @action
  setList(data){
    this.list = data
  }

  @action
  resetTimer() {
    this.timer = 0
  }

  @action
  tick() {
    this.timer += 1
  }
}

const appStore = new AppStore()
export {appStore}