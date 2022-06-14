const db = require("../../config/db")
const jwt = require("jsonwebtoken")

exports.get_all_todo = function(res) {
    db.query('SELECT * FROM todo', function (err, result) {
        if (err) throw (err)
        res.send(result);
    })
};

exports.get_user_todo = function(res, id) {
    db.query('SELECT * FROM todo WHERE user_id = ?', id, function (err, result) {
        if (err) throw(err)
        res.send(result);
    })
};

exports.get_specific_todo = function(res, id) {
    db.query('SELECT * FROM todo WHERE id = ?', id, function(err, result) {
        if (err) throw(err)
        res.send(result);
    })
};

exports.create_todo = function(res, obj) {
    db.query('INSERT INTO todo SET ?', obj, function(err, result) {
        if (err) throw (err)
        res.send(result);
    })
};

exports.modify_todo = function(res, id, obj) {
    db.query('UPDATE todo SET ? WHERE id ?', obj, id, function(err, result) {
        if (err) throw (err)
    })
    db.query('SELECT * FROM todo WHERE id = ?', id, function(err, result) {
        res.send(result);
    })
};

exports.delete_todo = function(res, id) {
    db.query('DELETE FROM todo WHERE id = ?', id, function(err, result) {
        if (err) throw (err);
        res.status(200).json({msg: `Successfully deleted record number : ${id}`});
    });
}