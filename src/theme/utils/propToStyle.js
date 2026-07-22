export default function propsToStyle(propName) {
  return function (props) {
    const propValue = props[propName];
    if (typeof propValue === 'string' || typeof propValue === 'number') {
      return { [propName]: propValue };
    }
  };
}
