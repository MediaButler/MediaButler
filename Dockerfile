FROM nodesource/node
MAINTAINER christronyxyocum

# Env variables for Discord token and command prefix
ENV token=$TOKEN
ENV prefix=$PREFIX

# Install Node.js dependencies
RUN apt-get update && \
        apt-get -y install build-essential \
        libssl-dev \
        curl

# Install Node.js
RUN curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh -o install_nvm.sh
RUN bash install_nvm.sh

# Create dir, clone GitHub repo for MediaButler, prep and install app
RUN mkdir -p /home/nodejs/app
RUN git clone https://github.com/MediaButler/MediaButler.git /home/nodejs/app
RUN ls -la /home/nodejs/app
WORKDIR /home/nodejs/app
RUN cp ./settings.example.json ./settings.json
RUN npm install
CMD ["npm","start"]

# Add entrypoint script and make it executable
ADD /entrypoint.sh /home/nodejs
RUN chmod a+x /home/nodejs/entrypoint.sh
CMD ["/home/nodejs/entrypoint.sh"]
