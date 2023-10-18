const { getIp } = require("./getIp");
const { testIp } = require("./testIp")
const mongoose = require("mongoose");
const ip = require("./ipSchema");

function run() {
    getIp()
        .then((data) => {
            testIp(data).then((ips) => {
                console.log(ips);
                mongoose.connect("mongodb+srv://jv8110909191:ASas12.,@cluster0.m8dnfoi.mongodb.net/?retryWrites=true&w=majority")
                    .then(async () => {
                        const newIp = await ip.findById("652fda49944871c3301029ea");
                        newIp.ips = ips;
                        await newIp.save();
                        // console.log("updated");
                    }
                    )
                    .catch(err => console.log(err))
                    .finally(() => {
                        mongoose.connection.close();
                        setTimeout(() => {
                            run();
                        }, 60000)
                    })
            })
        })
}

run();



