FROM alpine
LABEL maintainer="MediaButler"

ENV TOKEN="$TOKEN_HERE"
ENV UID=991
ENV GID=991

COPY fs /
COPY app /app

RUN apk add --no-cache build-base \
        libssl1.0 \
        curl \
        git \
        nodejs-npm \
        su-exec \
        s6 \
        python \
        nodejs \
        nodejs-npm \
    && cd /app \
    && npm install

VOLUME /config
CMD ["npm", "start", "--prefix /app"]