all: build

build:
	@echo "Building images..."
	@docker compose build --build-arg COMMIT_VERSION="$(git rev-parse --short HEAD)"

deploy-dev:
	@echo "Deploying to dev..."
	@docker compose up -f docker-compose.dev.yaml -d

deploy-prod:
	@echo "Deploying to prod..."
	@docker compose up -d

stop:
	@echo "Stopping containers..."
	@docker compose down

