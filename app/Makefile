.PHONY: all

info:
	@echo "Available commands:"
	@echo ""
	@echo "Command                              Description"
	@echo "-------                              -----------"
	@echo "make info                            Show the available make commands"
	@echo "make start                           Start the Docker environment"
	@echo "make stop                            Stop the Docker environment"
	@echo "make status                          Show the status of the Docker environment"

	@echo "make bash                            Open a bash shell in the website container"
	@echo "make restart                         Restart webpack: yarn dev"
	@echo ""
	@echo "Your project is running on http://localhost:8081/"
	@echo ""

docker-exec-notes = docker compose -f .infra/development-environment/docker-compose.yml exec notes

bash:
	@echo "=== Opening a bash shell ==="
	${docker-exec-notes} sh


start: rebuild
	@echo "=== Starting the Docker environment ==="
	docker compose -f .infra/development-environment/docker-compose.yml up

status:
	@echo "=== Status of the Docker environment ==="
	docker compose -f .infra/development-environment/docker-compose.yml ps

stop:
	@echo "=== Stopping the Docker environment ==="
	docker compose -f .infra/development-environment/docker-compose.yml stop

rebuild:
	@echo "=== Rebuilding Docker containers ==="
	docker compose -f .infra/development-environment/docker-compose.yml build

restart:
	@echo "=== Restarting webpack ==="
	${docker-exec-notes} sh -c "supervisorctl restart start-dev"
