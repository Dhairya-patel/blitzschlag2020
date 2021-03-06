const os = require('os');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const device = require('express-device');
const mongoose = require('mongoose');
const objectID = require('objectid');

// const uri = String(process.env.MONGODB_URI);
const uri = String(process.env.MONGODB_URI);
let { userModel } = require('./model.js');
let { idModel } = require('./idModel');
let loginValid = require('./loginvalid');
let eventRegister = require('./eventRegister');
let signupvalid = require('./Signupvalidation');
let mobAndPinValid = require('./mobileAndPinValid');
let modelEvent = require('./modelEventSociety');
let mailer = require('./mailer');
let paymodel = require('./paymodel');
let moderator = require('./moderator');

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(cors());

app.use(helmet());

app.use(device.capture());

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    dbName: 'Blitzschlag20'
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
    console.log('Connected to the database');
});

app.post('*', (req, res) => {
    alert(`We'll be back soon!`);
    res.send({
        status: false,
        message: 'Unavailable',
    })
});

app.post('/login', (req, res) => {
    let userLoginData = req.body;
    loginValid.userValid(userLoginData).then(function(result) {
        if (result) {
            if (result === 1) {
                // console.log('Incorrect Blitz Pin');
                res.send({
                    status: false,
                    message: 'Incorrect PIN!',
                });
            } else {
                // console.log(result);
                res.send({
                    status: true,
                    data: result
                });
            }
        } else {
            // console.log('User not registered');
            res.send({
                status: false,
                message: 'User not Registered!',
            })
        }
    });
});

app.post('/signup', (req, res) => {
    let userInput = req.body;
    let user = new userModel(userInput);
    signupvalid.signUpValid(userInput).then(function(valid) {
        if (valid === undefined) {
            res.send({
                status: false,
                message: "You are already Registered!"
            });
        } else {
            mobAndPinValid.nameValidation(userInput.firstName).then(function(trueFirstName) {
                if (trueFirstName) {
                    mobAndPinValid.nameValidation(userInput.lastName).then(function(trueLastName) {
                        if (trueLastName) {
                            mobAndPinValid.phonenumber(userInput.mob).then(function(result) {
                                if (result) {
                                    mobAndPinValid.validatePIN(userInput.blitzPIN).then(function(result) {
                                        if (result) {
                                            // console.log('true pin');
                                            signupvalid.retrieveBlitzID().then(function(result2) {
                                                if (result2) {
                                                    user.blitzID = result2.blitzCount + 1;
                                                    signupvalid.userSave(user).then((result3) => {
                                                        if (result3) {
                                                            result2.blitzCount += 1;
                                                            signupvalid.updateBlitzID(result2).then((result4) => {
                                                                if (result4) {
                                                                    mailer.main(result3).then(() => {
                                                                            // res.send({
                                                                            //     status: true,
                                                                            //     data: result3
                                                                            // });
                                                                        })
                                                                        .catch(e=>{console.log(e); console.log('MAIL NOT SENT TO: ', result3.blitzID)})
                                                                        res.send({
                                                                            status: true,
                                                                            data: result3
                                                                        });
                                                                } else {
                                                                    res.send({
                                                                        status: false,
                                                                        message: "Internal Error!"
                                                                    });
                                                                }
                                                            });
                                                        } else {
                                                            res.send({
                                                                status: false,
                                                                message: "Internal Error!"
                                                            });
                                                        }
                                                    });
                                                } else {
                                                    res.send({
                                                        status: false,
                                                        message: "Internal Error!"
                                                    });
                                                }
                                            });
                                        } else {
                                            // console.log('false pin');
                                            res.send({
                                                status: false,
                                                message: "Invalid Pin!"
                                            });
                                        }
                                    });
                                } else {
                                    // console.log('false mobile num');
                                    res.send({
                                        status: false,
                                        message: "Incorrect Mobile Number!"
                                    });
                                }
                            });
                        } else {
                            res.send({
                                status: false,
                                message: "Invalid Last Name!"
                            });
                        }
                    });
                } else {
                    res.send({
                        status: false,
                        message: "Invalid Firstname!"
                    });
                }
            });

        }
    });
});

app.post('/events', (req, res) => {
    let eventReg = req.body;

    let eventObj = new modelEvent.eventModel();
    eventRegister.validate(eventReg).then(function(flag) {
        if (flag !== undefined) {
            // console.log('valid ids');
            eventRegister.retrieveTeamID().then(function(counts) {
                if (counts) {
                    eventObj.teamID = counts.teamCount + 1;
                    eventReg.teamID = eventObj.teamID;
                    eventRegister.retrieveCategoryDetails(eventReg.eventID).then(function(category) {
                        if (category) {
                            eventObj.socID = category.socID;
                            eventObj.socName = category.socName;
                            eventObj.eventID = category.eventID;
                            eventObj.eventName = category.eventName;
                            eventObj.teamName = eventReg.teamName;
                            eventObj.teamSize = eventReg.teamSize;

                            eventReg.eventName = category.eventName;
                            eventRegister.checkExistingTeam(eventReg.blitzID, eventReg.eventName).then(function(alreadyRegistered) {
                                if (alreadyRegistered === false) {
                                    let multipleDocs = [];


                                    eventRegister.retrieveUsers(eventReg.blitzID).then(function(users) {
                                        if (users) {
                                            for (id in eventReg.blitzID) {
                                                let obj = new modelEvent.eventModel(eventObj);
                                                // console.log(id);
                                                obj.blitzID = eventReg.blitzID[id];
                                                obj._id = new objectID();
                                                obj.firstName = users[id].firstName;
                                                obj.mob = users[id].mob;
                                                // console.log(obj);
                                                multipleDocs.push(obj);
                                            }
                                            // console.log('multipleDocs', multipleDocs);
                                            modelEvent.eventModel.insertMany(multipleDocs);
                                            let counter = {
                                                teamCount: counts.teamCount + 1
                                            };
                                            eventRegister.updateTeamID(counter).then(function(result) {
                                                if (result) {
                                                    eventRegister.updateUser(eventReg).then(function(x) {
                                                        if (x) {
                                                            res.send({
                                                                status: true,
                                                                data: counter.teamCount
                                                            });
                                                            console.log('updated team id');
                                                            users.forEach(user => {
                                                                mailer.eventMail(user, counter.teamCount, eventReg.eventName).catch(err => {
                                                                    console.log(err);
                                                                });
                                                            });

                                                        } else {
                                                            res.send({
                                                                status: false,
                                                                message: "Not registered for the event!"

                                                            });

                                                        }
                                                    });
                                                } else {
                                                    res.send({
                                                        status: false,
                                                        message: "Internal Error"
                                                    });
                                                }
                                            });

                                        } else {
                                            res.send({
                                                status: false,
                                                message: "Internal error in retrieving users"
                                            });
                                        }

                                    });
                                } else {
                                    res.send({
                                        status: false,

                                        message: "Already Registered for the event"



                                    });
                                }
                            });

                        } else {
                            res.send({
                                status: false,
                                message: "Internal Error!"
                            });
                        }
                    });
                } else {
                    res.send({
                        status: false,
                        message: "Internal Error!"
                    });
                }
            });
        } else {
            res.send({
                status: false,
                message: "Incorrect/Repeated Credentials!"
            });
            // console.log('Incorrect ids');
        }
    });
});

app.post('/user', (req, res) => {
    let user = { blitzID: req.body.blitzID };
    // console.log(req.body);
    // user.blitzID = Number(user.blitzID);
    eventRegister.retrieveUsers(user.blitzID).then(function(result) {
        if (result) {
            result = result[0];
            // console.log('result', result)
            let userDetails = new userModel();
            userDetails.paymentHistory = result.paymentHistory;
            userDetails.hospitality = result.hospitality;
            userDetails.firstName = result.firstName;
            userDetails.lastName = result.lastName;
            userDetails.email = result.email;
            userDetails.mob = result.mob;
            userDetails.course = result.course;
            userDetails.year = result.year;
            userDetails.gender = result.gender;
            userDetails.branch = result.branch;
            userDetails.city = result.city;
            userDetails.college = result.college;
            userDetails.collegeID = result.collegeID;
            userDetails.events = result.events;
            userDetails.blitzID = result.blitzID;
            userDetails.isMNIT = result.isMNIT;
            userDetails.accomodation = result.accomodation;
            userDetails.transactionID = result.transactionID;
            console.log('userDetails', userDetails)
            res.send({
                status: true,
                data: userDetails
            });
        } else {
            res.send({
                status: false,
                message: "Unable to fetch user details"
            });
        }
    });
});

app.post('/addhospitality', (req, res) => {
    userInput = req.body;
    eventRegister.retrieveUsers(userInput.blitzID).then(function(user) {
        let s = new Set();
        for (p of userInput.packages) {
            s.add(p);
        }
        if (user[0].hospitality !== undefined) {
            for (h of user[0].hospitality) {
                s.add(h);
            }
        }
        let arr = Array.from(s);
        userModel.findOneAndUpdate({ blitzID: userInput.blitzID }, { hospitality: arr }, (err) => {
            if (err) {
                res.send({
                    status: false,
                    message: "Internal error"
                });
            }
        }).then(function(output) {
            if (output) {
                res.send({
                    status: true,
                    message: "Updated hoospitality"
                });
            } else {
                res.send({
                    status: false,
                    message: "Internal Error"
                });
            }
        });
    });
});

app.post('/upipayments', (req, res) => {
    let userInput = req.body;
    let obj = new paymodel.upiPayModel(userInput);
    obj.approval = false;
    obj.save().then((result) => {
        res.send({
            status: true,
            message: ""
        });
    }).catch(err => {
        res.send({
            status: false,
            message: "Some Error Occured!"
        });
    });
});

app.post('/moderatorLogin', (req, res) => {
    let userInput = req.body;
    moderator.validateMod(userInput.id, userInput.blitzPIN).then(function(result) {
        if (result === false) {
            res.send({
                status: false,
                message: "Interanl Error"
            });
        } else {
            res.send({
                status: true,
                message: result
            });
        }
    });
});

app.post('/eventdata', (req, res) => {
    let userInput = req.body;
    moderator.findUsersOfEvent(userInput.eventID).then(function(result) {
        if (result === false) {
            res.send({
                status: false,
                message: "Internal error"
            });
        } else {
            res.send({
                status: true,
                message: result
            });
        }
    });
});


app.use(express.static('dist'));
app.get('/mod', (req, res) => {
        // console.log(__dirname);

        // res.sendFile(path.resolve('./moderator.html'))
        res.redirect('https://blitzmod.herokuapp.com/');

    })
    // app.get('/testpay',(req,res)=>{

//     res.redirect('https://eazypay.icicibank.com/EazyPG?merchantid=246360&mandatory fields=wWjvX/gh5KWpZdjyy+Z17D9aHmivKIUUlOtPV8359lVvftoSdfZfjTHkzZ9yG6hLjThX6D8ZNK2d8bnJ5iDB7IHc3ZJGrO/XqeylIZ6jUY0=&optional fields=&returnurl=3rfLIoDD/ILYOcxPN7qVqEDJ0yjNSsTPVER8gwSW95udVTgF6ev1UgpSuSpll/8f&Reference No=NIlbONBoaPukzFWW0fB32A==&submerchantid=A7xSEONo81i2CYiknB1LFg==&transaction amount=G3jpVMsNHGkY31MZFUxHog==&paymode=2zw/oO7SmPe68tHBfErheQ==');
// })
app.get('*', (req, res) => {
    // console.log(__dirname);
    // res.sendFile(path.resolve('./dist/index.html')) 
    res.redirect('http://www.blitzschlag.co.in/');
})

// console.log(process.env.PORT);
app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));