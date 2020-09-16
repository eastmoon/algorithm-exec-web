cd /repo
if [ ${DOCKER_MODE} ] && [ ${DOCKER_MODE} = "prd" ]
then
    yarn build
    yarn start
else
    tail -f /dev/null
fi
