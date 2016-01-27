/**
 * EventEmitter nodejs
 */
import EventEmitter from 'events';
const Emitter = new EventEmitter();
EventEmitter.defaultMaxListeners = 100;
export {Emitter as EventManager};
