const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1440396",
  key: "ad8518072393fd6314a8",
  secret: "a577fad7730c2a6670af",
  cluster: "ap1",
  useTLS: true,
});

class LivechatController {
  static async livechat (req, res, next) {
    try {
      await pusher.trigger("chat", "message", {
        username: req.body.username,
        message: req.body.message
    });
    res.status(200).json({
      message: "Message sent successfully"
    });
    } catch (err) {
      next(err)
    }
  }
}

module.exports = LivechatController;
