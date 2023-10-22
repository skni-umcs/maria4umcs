CGO_ENABLED=0

clean:
	rm -rf dist

deps:
	npm i

webapp:
	npm run build

build:
	go build -o dist/maria4umcs

all: clean deps webapp build
