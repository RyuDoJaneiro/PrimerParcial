const Task = require("../src/models/task");
const User = require("../src/models/user");
const jwt = require("jsonwebtoken");
const ctrlHome = {};

ctrlHome.getHome = async (req, res) =>
{
        // const userId = jwt.verify(token, process.env.SECRET);
        const tasks = await Task.find({isActive: true, userId: req.user._id});
        return res.render("index", {tasks});
}

module.exports = ctrlHome;