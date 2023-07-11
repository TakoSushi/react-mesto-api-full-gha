const allowedCors = [
  'https://kuzora-petr.nomoredomains.work',
  'http://kuzora-petr.nomoredomains.work',
  'www.kuzora-petr.nomoredomains.work',
  'http://localhost:3001',
  'http://192.168.1.144:3001/',
  'http://192.168.1.144:3001',
  'http://192.168.1.144:3001/sign-in',
  'http://192.168.1.144:3001/sign-in/',
  'http://192.168.1.144:3001/sign-up/',
  'http://192.168.1.144:3001/sign-up',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
