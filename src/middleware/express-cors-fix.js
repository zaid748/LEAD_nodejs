module.exports = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
  // Responde a solicitudes preflight OPTIONS de inmediato
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
}; 