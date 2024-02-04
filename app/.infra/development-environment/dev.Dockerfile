FROM node:20.10-alpine

# Prerequisites for Extensions
RUN apk update && \
    apk add supervisor openssh git

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

# Configure Supervisor
COPY .infra/development-environment/supervisord.conf /etc/supervisord.conf

# Setup workdir
WORKDIR /usr/src/app

COPY .infra/development-environment/entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
