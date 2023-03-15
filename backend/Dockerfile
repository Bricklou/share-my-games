FROM directus/directus:latest

# Copy extensions, snapshots, package.json
COPY ./extensions ./extensions
COPY ./snapshots ./snapshots
COPY ./package.json ./package.json

# Install extensions
RUN npm install

CMD npx directus bootstrap && npx directus start