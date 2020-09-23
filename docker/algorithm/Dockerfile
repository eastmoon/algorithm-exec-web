FROM python:3
ARG SSH_USER=DEFAULT_USER
ARG SSH_PASS=DEFAULT_PASS

# Install ssh-server
RUN \
    apt-get update && \
    apt-get install -y \
        openssh-server && \
    rm -rf /var/lib/apt/lists/*

# Setting ssh user
ADD sshd_config /etc/ssh/
RUN \
    useradd -m -s /bin/bash -p $(openssl passwd -1 $SSH_PASS) $SSH_USER

# Install package
ADD .dependencies /
RUN \
    pip install -r .dependencies && \
    rm .dependencies

# Setting Container
EXPOSE 22
WORKDIR /repo

# Setting start command
COPY docker-entrypoint.sh /usr/src
ENTRYPOINT ["/bin/bash", "/usr/src/docker-entrypoint.sh"]
