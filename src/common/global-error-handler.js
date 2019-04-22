import code from './code';
import Event from './event'

export function handleErrors(error){
  if(error && error.signature && error.signature === 'ServiceError') {
    defaultServiceErrorHandler(error);
  }else{
    defaultErrorHandler(error);
  }
}

function defaultServiceErrorHandler(error){
  if(error && error.code === code.SESSION_TIMEOUT){
    Event.emit('GLOBAL_ERROR', {
      type: 'SESSION_TIMEOUT'
    })
  }else if(error && error.message) {
    Event.emit('GLOBAL_ERROR', {
      type: 'SERVICE_ERROR',
      message: error.message
    })
  }else {
    Event.emit('GLOBAL_ERROR', {
      type: 'SERVICE_ERROR',
      message: '服务出错，请稍后再试.'
    })
  }
}

function defaultErrorHandler(error){
  if(error && error.message) {
    Event.emit('GLOBAL_ERROR', {
      type: 'SERVICE_ERROR',
      message: error.message
    })
  }else {
    Event.emit('GLOBAL_ERROR', {
      type: 'SERVICE_ERROR',
      message: '服务出错，请稍后再试.'
    })
  }
}