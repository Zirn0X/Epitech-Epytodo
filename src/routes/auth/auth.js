const { register, check_user_exist_mail } = require('../user/user.query');

module.exports = function (app, bcrypt)  {
    app.post('/login', (req, res) => {
        const mail = req.body["email"];
        const pwd = req.body["password"];
        if (mail === undefined || pwd === undefined) {
            res.status(500).json({"msg":"Internal server error"});
        }
        check_user_exist_mail(res, mail, pwd);
    })
    app.post('/register', function (req, res) {
        const salt = bcrypt.genSaltSync(10);
        const mail = req.body["email"];
        const pwd = bcrypt.hashSync(req.body["password"], salt);
        const first_name = req.body["firstname"];
        const name = req.body["name"];

        if (mail === undefined || pwd === undefined || first_name === undefined ||
            name === undefined) {
            res.status(500).json({msg:"Internal server error"});
        }
        register(res, mail, pwd, name, first_name);
    })
}