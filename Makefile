# A simple makefile for running npm commands

# Run the app
.PHONY: run
run:
	npm run dev

# Build the app
.PHONY: build
build:
	npm run build

# Install dependencies from package.json
.PHONY: install
install:
	npm install

# Nuke dependencies
.PHONY: nuke
nuke:
	rm -rf node_modules

.PHONY: format
format:
	npx prettier --write .