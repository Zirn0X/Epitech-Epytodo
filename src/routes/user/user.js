const {user_all_info, user_all_todo, info_id_email, delete_user, update_user, user_all_info_byemail} = require('./user.query');
const bcrypt = require('bcryptjs')
const middleware = require("../../middleware/auth");
const jwt = require("jsonwebtoken")

module.exports = function(app) {
    app.get('/user', middleware, (req, res) => {
        const result = jwt.verify(req.headers.authorization, process.env.SECRET);
        user_all_info(res, result.id)
    })
    app.get('/users/:id', middleware, (req, res) => {
        user_all_info(res, req.params.id)
    })
    app.get('/users/:email', middleware, (req, res) => {
        user_all_info_byemail(res, req.params.email);
    })
    app.get('/user/todos', middleware, (req, res) => {
        const result = jwt.verify(req.headers.authorization, process.env.SECRET);
        user_all_todo(res, result.id);
    });
    app.put('/user/:id', middleware, (req, res) => {
        var id = req.params.id;
        var mail = req.body["email"];
        var name = req.body["name"];
        var first_name = req.body["firstname"];
        var passwd = req.body["password"];

        if (id === undefined || mail === undefined || name === undefined  ||
        first_name === undefined || passwd === undefined) {
            res.status(500).json({"msg":"internal server error"});
            return;
        }
        passwd = bcrypt.hashSync(passwd, 10);
        update_user(res, id, mail, passwd, name, first_name);
    });

    app.delete('/user:id', middleware, (req, res) => {
        var id = req.params.id;
        delete_user(res, id);
    });
}
