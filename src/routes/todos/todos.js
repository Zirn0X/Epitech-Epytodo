const jwt = require("jsonwebtoken")
const middleware = require("../../middleware/auth")
const { create_todo, get_all_todo, get_specific_todo, modify_todo, delete_todo } = require("./todos.query")

module.exports = function (app) {
    app.get('/todos', middleware, (req, res) => {
        get_all_todo(res)
    })
    app.post('/todos', middleware, (req, res) => {
        const result = jwt.verify(req.headers.authorization, process.env.SECRET);
        const obj = {
            due_time: req.body["due_time"],
            title: req.body["title"],
            description: req.body["description"],
            status: req.body["status"],
            user_id: result.id
        }
        create_todo(res, obj)
    })
    app.get('/todos/:id', middleware, (req, res) => {
        get_specific_todo(res, req.params.id)
    })
    app.put('/todos/:id', middleware, (req, res) => {
        const obj = {
            due_time: req.body["due_time"],
            title: req.body["title"],
            description: req.body["description"],
            status: req.body["status"]
        }
        modify_todo(res, req.params.id, obj);
    })
    app.delete('/todos/:id', middleware, (req, res) => {
        delete_todo(res, req.params.id)
    })
}