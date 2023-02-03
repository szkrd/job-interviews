/* eslint-disable @typescript-eslint/no-explicit-any */
/* [not working] */

// webpack used to add the node native libs automatically, but that's not the case anymore
import { EventEmitter } from 'events';

class EventBus extends EventEmitter {}
const _eventBus = new EventBus();

// the default is 10, which is terribly low... probably using a single
// channel with different payloads would help, but that's a greater effort
_eventBus.setMaxListeners(Infinity);

// add new events here, if you really really have to do so
// (events are hard to track, so we use at least an enum, not a type of strings)
export enum EVENTBUS {
  FOO,
  BAR,
  BAZ,
}

type WhitelistedListenerMethods = 'addListener' | 'removeListener' | 'once';
type ListenerFunction = (event: EVENTBUS, listener: () => void) => void;

const wrapListenerFunction = (method: WhitelistedListenerMethods) => (eventName: EVENTBUS, payload: any) => {
  // not sure if I want to log subscriptions...
  _eventBus[method](String(eventName), payload);
};

// use a public interface, so that we can
// hide the freedom provided by the real event emitter
class PublicEventBus {
  on: ListenerFunction = wrapListenerFunction('addListener');

  off: ListenerFunction = wrapListenerFunction('removeListener');

  once: ListenerFunction = wrapListenerFunction('once');

  emit = (eventName: EVENTBUS, payload?: any) => {
    this.log('emit', EVENTBUS[eventName], payload);
    _eventBus.emit(String(eventName), payload);
  };

  // emitters may fire even after a listener has stopped listening,
  // but be extra careful what you are going to use delays for
  emitDelayed = (eventName: EVENTBUS, delay = 0, payload?: any) => {
    return setTimeout(() => this.emit(eventName, payload), delay);
  };

  private log(action: string, name: string, payload?: any) {
    if (!localStorage.getItemRaw('LOG_EVENTBUS')) {
      return;
    }
    console.info('%c%s', 'color: orange', `🚌 event bus ${action} "${name}"`, ...(payload || []));
  }
}

export const eventBus = new PublicEventBus();
