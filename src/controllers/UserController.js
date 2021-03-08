class SessionController {
  async oAuth(req, res) {
    res.status(200).json(req.user.id);
  }
}


module.exports = new SessionController();