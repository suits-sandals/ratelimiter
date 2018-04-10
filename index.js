var redis = require('redis'),
    client = redis.createClient();

module.exports = {
  detect: function (req, res, next, params) {
    let date = new Date();
    let userIP = params.block || req.headers['x-forwarded-for'] || req.ip;

    client.hmget(`${userIP}`, 'tries', 'date', 'set', function (err, val){
      if (err) throw err;

      if (val[0] !== null) {

        let cacheDate = new Date(val[1]);
        let timeDiff = Math.round( ( (params.lockout) - (date - cacheDate) ) / 60000);

        if (val[0] >= params.max) {
          val[2] == 'true' ? null : ( client.hmset(`${userIP}`, 'date', `${date}`, 'set', 'true'), client.expire(`${userIP}`, params.lockout/1000) );
          return res.status(429).json({ message: `${params.message}. Please try again in ${timeDiff} minutes.` });
        }

        client.hincrby(`${userIP}`, 'tries', '1');
      } else {
        client.hmset(`${userIP}`, 'tries', '1', 'date', `${date}`, 'set', 'false');
        client.expire(`${userIP}`, params.lockout/1000);
      }
      next();
    });
  }
}
