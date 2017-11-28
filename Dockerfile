FROM nodesource/node
MAINTAINER christronyxyocum

# Env variables for Discord token and command prefix
ENV token=$TOKEN
ENV prefix=$PREFIX

# Create dir, clone GitHub repo for MediaButler, prep and install app
RUN mkdir -p /home/nodejs/app
RUN git clone https://github.com/MediaButler/MediaButler.git /home/nodejs/app
RUN ls -la /home/nodejs/app
WORKDIR /home/nodejs/app
RUN cp ./settings.example.json ./settings.json
RUN npm install
CMD ["npm","start"]

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
