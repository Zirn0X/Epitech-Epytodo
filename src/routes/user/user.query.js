const db = require('../../config/db')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs/dist/bcrypt');

exports.user_all_info = function(res, id) {
    db.query('SELECT * FROM user WHERE id = ?', id, function(err, result, fields) {
           if (result.length === 0) {
               res.status(404).json({msg:"Not found"});
               return;
           }
           res.status(200).json(result);
    });
};

exports.user_all_info_byemail = function(res, email) {
    db.query('SELECT * FROM user WHERE email = ?', email, function(err, result, fields) {
           if (err) throw err;
           res.status(200).json(result);
    });
};

exports.user_all_todo = function(res, id) {
    db.query('SELECT * FROM todo where user_id = ?', [id], function(err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.status(200).json(result);
    });
};

exports.info_id_email = function(res, id, email) {
    db.query('SELECT * FROM user where id = ?', [id], function(err, result, fields) {
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            db.query('SELECT * FROM user where email = ?', [email], function(err, result, fields) {
                res.status(200).json(result);
            });
        }
    });
};

exports.delete_user = function(res, id) {
    db.query('DELETE FROM user WHERE id = ?', [id], function(err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.status(200).json(result);
    });
};

exports.update_user = function(res, id, email, passwd, name, first_name) {
    db.query('UPDATE `user` SET email = ?, password = ?, name = ?, firstname = ? WHERE id = ?', [email, passwd, name, first_name, id], function(err, result, fields) {
        if (err) throw (err)
    });
    db.query('SELECT * FROM user WHERE id  = ?', [id], function(err, result, fields) {
        res.status(200).json(result);
    });
};

exports.register = function(res, mail, password, name, firstname) {
    db.execute('INSERT INTO `user` (email, password, name, firstname) VALUES (?, ?, ?, ?)', [mail, password, name, firstname], function(err, results, fields) {
        if (err) {
            if (err.errno === 1062) {
                res.status(409).json({msg:"Account already exists"});
            } else {
                res.status(500).json({msg: "Internal server error"});
            }
        }
        const token = jwt.sign({id: results.insertId}, process.env.SECRET);
        res.status(200).send({token});
    })
}

exports.check_user_exist_mail = function(res, email, password) {
    db.query('SELECT * FROM user WHERE email = ?', [email], function(err, result, fields) {
        if (result.length === 0) {
            res.status(404).json({msg:"Not found"});
        } else {
            bcrypt.compare(password, (result[0].password), function (error, results) {
                const token = jwt.sign({id: result[0].id}, process.env.SECRET)
                res.status(200).send({token});
            })
        }
    });
};
