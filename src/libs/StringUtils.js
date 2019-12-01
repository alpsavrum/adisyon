import latinize from 'latinize';

const paramExtractor = () => {
  return window.location.pathname.replace('/','')
}

const modulate = (str) => {
  return latinize(str).toLowerCase();
}

const monetize = (str) => {
  return (str && str!=="") ? Number(str.split(' ')[0]) : Number.NaN;
}

export {
  paramExtractor,
  modulate,
  monetize,
}