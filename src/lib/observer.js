export default function Observable() {
  let observers = [];

  const subscribe = (fn) => observers.push(fn);

  const unsubscribe = (fn) => {
    observers.filter((subscriber) => subscriber !== fn);
  };

  const notify = () => {
    observers.forEach((observer) => observer());
  };

  return { subscribe, unsubscribe, notify };
}
