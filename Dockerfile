FROM alpine
MAINTAINER christronyxyocum

# Env variables for Discord token and command prefix
ENV token=$TOKEN
ENV prefix=$PREFIX
ENV UID=991 GID=991

COPY rootfs /

# Install Node.js dependencies
RUN apk add -U build-base \
        libssl1.0 \
        curl \
        git \
        nodejs-npm \
        su-exec \
        s6 \
    && cd /tmp \
    && curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh -o install_nvm.sh \
    && sh install_nvm.sh \
    && mkdir -p /opt \
    && cd /opt \
    && git clone https://github.com/MediaButler/MediaButler.git \
    && cd MediaButler \
    && cp ./settings.example.json ./settings.json \
    && npm install \
    && chmod a+x /usr/local/bin/* /etc/s6.d/*/* \
    && apk del build-base git \
    && rm -rf /tmp/* /var/cache/apk/*

CMD ["run.sh"]
