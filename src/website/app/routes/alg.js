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

module.exports = router;
