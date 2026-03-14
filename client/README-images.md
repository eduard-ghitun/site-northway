# NorthSideCrew Image Guide

## Unde pui imaginile

- `src/assets/images/home` pentru imaginile paginii `Home`
- `src/assets/images/about` pentru imaginile paginii `Despre Noi`
- `src/assets/images/events` pentru bannere si imagini principale de eveniment
- `src/assets/images/members` pentru pozele masinilor membrilor
- `src/assets/images/shared` pentru fallback-uri si imagini refolosite in mai multe sectiuni

## De unde schimbi imaginile

- `src/assets/images/index.js` este registry-ul central al imaginilor
- `src/data/homeContent.js` controleaza imaginile din `Home`
- `src/data/aboutContent.js` controleaza imaginile din `Despre Noi`
- `src/data/events.js` controleaza banner-ele, imaginile principale si galeriile pentru evenimente
- `src/data/members.js` controleaza cardurile de membri

## Cum schimbi o poza

1. Adauga fisierul in folderul potrivit din `src/assets/images/...`
2. Exporta imaginea din `src/assets/images/index.js`
3. Actualizeaza obiectul relevant din fisierul de date potrivit

Nu este nevoie sa modifici layout-ul componentelor pentru un simplu schimb de imagine.

## Cum adaugi un membru nou

Adauga un nou obiect in `src/data/members.js` cu:

- `name`
- `nickname`
- `carModel`
- `description`
- `badge`
- `image`
- `imageAlt`

## Cum adaugi imagini la evenimente

In `src/data/events.js`, fiecare eveniment poate primi usor:

- `image`
- `imageAlt`
- `banner`
- `gallery`
- `date`
- `location`

## Fallback si loading

- componenta comuna pentru imagini este `src/components/AppImage.jsx`
- foloseste lazy loading implicit
- daca o imagine nu se incarca, cade automat pe `src/assets/images/shared/image-fallback.svg`
