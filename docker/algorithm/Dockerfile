FROM python:3

# Install package
ADD .dependencies /
RUN \
    pip install -r .dependencies && \
    rm .dependencies

# Setting Container
WORKDIR /repo

# Setting start command
COPY docker-entrypoint.sh /
ENTRYPOINT ["/bin/bash", "/docker-entrypoint.sh"]
