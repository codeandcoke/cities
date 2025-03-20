start-dev-env:
	docker compose -f docker-compose.dev.yaml up -d

stop-dev-env:
	docker compose -f docker-compose.dev.yaml down

all-test: stop-dev-env start-dev-env
	sleep 4
	npm test

.PHONY: all-test start-dev-env stop-dev-env