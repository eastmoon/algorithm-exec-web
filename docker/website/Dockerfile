FROM node:10
ARG SSH_USER=DEFAULT_USER
ARG SSH_PASS=DEFAULT_PASS

# Install Tools
RUN \
  apt-get update -y && \
  apt-get install -y \
      rsync \
      sshpass

# Upgrade Yarn
RUN \
  curl --compressed -o- -L https://yarnpkg.com/install.sh | bash

# Setting Container
EXPOSE 80/tcp
WORKDIR /repo

# Setting SSH user for connection to container
ENV SSH_USER=$SSH_USER
ENV SSH_PASS=$SSH_PASS

# Set link to sshc execute entry
COPY sshc.sh /usr/src
RUN \
  cd /bin && \
  ln -s /usr/src/sshc.sh sshc && \
  chmod 777 /usr/src/sshc.sh

# Setting start command
COPY docker-entrypoint.sh /usr/src
CMD ["/bin/bash", "/usr/src/docker-entrypoint.sh"]
