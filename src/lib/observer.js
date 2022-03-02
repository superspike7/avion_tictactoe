function Observable() {
  let observers = [];

  const subscribe = (fn) => observers.push(fn);

  const unsubscribe = (fn) => {
    observers.filter((subscriber) => subscriber !== fn);
  };

  const notify = (data) => {
    observers.forEach((observer) => observer(data));
  };

  return { subscribe, unsubscribe, notify };
}
