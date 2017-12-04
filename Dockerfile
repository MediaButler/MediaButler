FROM alpine
MAINTAINER christronyxyocum
# Major thanks to starbix for rewriting this with Alpine

# Env variables for Discord token, command prefix, UID, & GID
ENV token=$TOKEN
ENV prefix=$PREFIX
ENV UID=991 GID=991

# Copy files
COPY rootfs /

# Install some required packages
RUN apk add -U build-base \
        libssl1.0 \
        curl \
        git \
        nodejs-npm \
        su-exec \
        s6 \
    # Install Node.js
    && cd /tmp \
    && curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh -o install_nvm.sh \
    && sh install_nvm.sh \
    # Create dir and clone MediaButler
    && mkdir -p /opt \
    && cd /opt \
    && git clone https://github.com/MediaButler/MediaButler.git \
    # Copy settings example to settings
    && cd MediaButler \
    && cp ./settings.example.json ./settings.json \
    # Install
    && npm install \
    # Set permissions
    && chmod a+x /usr/local/bin/* /etc/s6.d/*/* \
    # Ceanup
    && apk del build-base git \
    && rm -rf /tmp/* /var/cache/apk/*

VOLUME /config

# Execute run.sh script
CMD ["run.sh"]
