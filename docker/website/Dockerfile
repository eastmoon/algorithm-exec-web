FROM node:10

# Install Tools
RUN \
  apt-get update -y && \
  apt-get install -y \
      rsync

# Upgrade Yarn
RUN \
  curl --compressed -o- -L https://yarnpkg.com/install.sh | bash

# Setting Container
EXPOSE 80/tcp
WORKDIR /repo

# Setting start command
COPY docker-entrypoint.sh /
CMD ["/bin/bash", "/docker-entrypoint.sh"]
