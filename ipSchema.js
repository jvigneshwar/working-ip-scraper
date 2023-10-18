const mongoose = require("mongoose");

const ipSchema = new mongoose.Schema({
    ips: Array
});
const ip = mongoose.model('ip', ipSchema);
module.exports = ip