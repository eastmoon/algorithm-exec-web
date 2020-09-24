const { exec, spawn } = require("child_process");
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    // console.log(req, res);
    exec(`sshpass -p ${process.env.SSH_PASS} ssh -o StrictHostKeyChecking=no ${process.env.SSH_USER}@alg python /repo/main.py`, (error, stdout, stderr) => {
        if (error) {
            // console.log(`error: ${error.message}`);
            res.send(`error: <br />${error.message}`);
            return;
        }
        if (stderr) {
            //console.log(`stderr: ${stderr}`);
            res.send(`stderr: <br />${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.send(`stdout: <br />${stdout}`);
    });
});

router.put('/', function(req, res, next) {
    // Retrieve parame from req object
    const { params, body } = req;
    console.log(params);
    console.log(body);
    res.send(`PUT request into algorithm.`);
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    res.send(`POST request into algorithm.`);
});

router.delete('/', function(req, res, next) {
    console.log(req.body);
    res.send(`DELETE request into algorithm.`);
});

module.exports = router;
