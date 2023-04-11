FROM directus/directus:latest

# Copy extensions, snapshots, package.json
COPY ./extensions ./extensions
COPY ./snapshots ./snapshots
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

# Install extensions
RUN npm ci

CMD npm exec directus bootstrap && npm exec directus start