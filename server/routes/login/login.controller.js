const AdminsService = require('../../services/admins.service');
const adminsService = new AdminsService();

const config = require('../../../config/server.config');

const LoginController = function() {};
LoginController.prototype.start = function(req, res, next, wsInstance) {
  adminsService.getByCreds(req.body)
  .then(
    user => {
      if(user){
        res.cookie(config.cookies.userId, user._id, { expires: 0, path: '/', secure: false });
        console.log('cookie created', config.cookies)
        res.status('200').send({ user: user });
      }
      else {
        res.clearCookie(config.cookies.userId);
        res.status(401).send({error: 'User not found'});
      }
    }
  )
  .catch(next)
}

module.exports = LoginController;
