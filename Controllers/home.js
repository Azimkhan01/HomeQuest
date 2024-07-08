const { user } = require("../Database/signupUsers");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { v4: uuidv4 } = require("uuid");
const home = async (req, res) => {
    let { email, password } = await req.body;
    const myPlaintextPassword = await password;
    const someOtherPlaintextPassword = await password;

    //   console.log(email + " " + password);

    if ((await email) == "" || (await password) == "") {
        await res.render("login", {
            error: "Email or Password is Empty",
        });
    } else if (await user.find({ email: email })) {
        bcrypt.genSalt(saltRounds, async function (err, salt) {
            bcrypt.hash(myPlaintextPassword, salt, async function (err, hash) {
                let query = await user.find({ email: email });
                // console.log(query);
                if ((await query) == "") {
                    await res.render("login", {
                        error: "Mail is not registered",
                    });
                } else if (await query) {
                    bcrypt.compare(
                        myPlaintextPassword,
                        query[0]["password"],
                        async function (err, result) {
                            // result == true
                            //   console.log("myplaintext:"+myPlaintextPassword+"   hash:"+hash + "  result:" + result+"  mongoquerypass:"+query[0]["password"]);
                            if (result) {
                                await res.cookie("data", {
                                    uuid: uuidv4(),
                                    hash: hash,
                                    email: email,
                                });
                                await res.render("home");
                            } else {
                                await res.render("login", {
                                    error: "Password is wrong!!!",
                                });
                            }
                        }
                    );
                }
            });
        });
    } else {
        await res.render("login", {
            error: "Something is wrong wait and try again or call 7678084267",
        });
    }
};
module.exports = { home };
