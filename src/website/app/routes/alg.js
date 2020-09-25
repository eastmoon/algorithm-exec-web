// Node.js library
const path = require('path');
const { exec, spawn } = require("child_process");
const express = require('express');
const router = express.Router();

// Utils
const common_utils = path.join(process.cwd(), "common_utils");
const moment = require(path.join(common_utils, "moment.js"));

/* GET users listing. */
router.get('/', function(req, res, next) {
    // console.log(req, res);
    exec(`sshpass -p ${process.env.SSH_PASS} ssh -o StrictHostKeyChecking=no ${process.env.SSH_USER}@alg python /repo/main.py`, (error, stdout, stderr) => {
        if (error) {
            // console.log(`error: ${error.message}`);
            res.send(`${moment.current()} > error: <br />${error.message}`);
            return;
        }
        if (stderr) {
            //console.log(`stderr: ${stderr}`);
            res.send(`${moment.current()} > stderr: <br />${stderr}`);
            return;
        }
        console.log(`${moment.current()} > stdout: ${stdout}`);
        res.send(`${moment.current()} > stdout: <br />${stdout}`);
    });
});

router.put('/:type', function(req, res, next) {
    // Retrieve parame from req object
    const { params, body } = req;
    console.log(params);
    console.log(body);
    if ( params.type === "ssh" ) {
        res.send(`${moment.current()} > PUT request into algorithm with SSH.`);
    }
    if ( params.type === "ssh-sf" ) {
        res.send(`${moment.current()} > PUT request into algorithm with SSH & SharedFolder.`);
    }
    if ( params.type === "sf" ) {
        res.send(`${moment.current()} > PUT request into algorithm with SharedFolder.`);
    }
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    res.send(`${moment.current()} > POST request into algorithm.`);
});

router.delete('/', function(req, res, next) {
    console.log(req.body);
    res.send(`${moment.current()} > DELETE request into algorithm.`);
});

module.exports = router;
