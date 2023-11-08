# maria4umcs

Mobile friendly, dark-themed version of [moria.umcs.lublin.pl](http://moria.umcs.lublin.pl/) timetable for UMCS students.


## Why

[moria.umcs.lublin.pl](http://moria.umcs.lublin.pl/) in terms of design, sucks at any screen.

It's hard to read and sometimes even impossible to check lesson's details (especially on mobile devices).

I created **Maria** to make my life easier and check the timetable faster with less chance for misreadings.

Why **Maria**? Because yes


## Features
- Just checking the timetable, nothing else lol


## Installation

1. Download latest release from **[Releases page](https://github.com/dani3l0/maria4umcs)**

2. Make sure file has exec permission (`chmod +x maria4umcs`)

3. Just run it! (`./maria4umcs`)

App will be available on `:3000` port.

**NOTE**: Program does not touch your filesystem, it just spins a HTTP server and acts as reverse proxy for [Moria's API](http://moria.umcs.lublin.pl/api)


## Configuration

_not yet_


## Build from source

Just clone the repo and run `make all`. Make sure you have `nodejs` and `golang` packages installed


```
git clone https://github.com/dani3l0/maria4umcs
cd maria4umcs
make all
```

Prebuilt executable file will be available in `dist` directory. It does not need `web` assets, those are already embedded.


## Develompent

Kinda tricky, but works. Just make sure you are using default ports and you're good to go.

```
# Run our reverse-proxy backend
go run .

# Only when frontend is missing and build fails
npm run build
```

```
# Run front-end with hot-reload
npm run dev
```

And, for testing please **connect to [localhost:5173](localhost:5173)** instead of :3000
