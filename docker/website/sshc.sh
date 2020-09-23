if [ ${SSH_USER} ] && [ ${SSH_PASS} ] && [ ${1} ]
then
    sshpass -p ${SSH_PASS} ssh -o StrictHostKeyChecking=no ${SSH_USER}@${1} ${@:2}
fi
