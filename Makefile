# A simple makefile for running npm commands

# Run the app
.PHONY: run
run:
	sudo npm run dev

# Build the app
.PHONY: build
build:
	sudo npm run build

# Install dependencies from package.json
.PHONY: install
install:
	sudo npm install

# Nuke dependencies
.PHONY: nuke
nuke:
	sudo rm -rf node_modules
