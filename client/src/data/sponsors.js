const posterNames = [
  'Wrench Works',
  'O’Cafe',
  'TRC Art',
  'Red Restorations — sablare și vopsire electrostatică',
  'KPT3D Printing Services',
  'Death of Wipeout',
  'Teo Drive Defensive',
  'SEK Motorsport',
  'Fabian Machete Auto',
  'Cult.',
  'Auto Tuning Alin — accesorii auto',
  'Smeș Burger & More',
  'Fast Mobile Service',
  'Mariana Sweets',
  'Bogdan Wyl — tractări auto',
  'CCI & STEF S.R.L.',
  'Amana Food',
  'Tipografia Ria',
  'Express Food & Drink',
  'Arim Automotive',
  'Atelier Motoseriu AM Garage',
]

export const sponsorGroups = [
  {
    title: 'NorthWay Last Call',
    posters: posterNames.map((name, index) => ({
      src: `/sponsors/sponsor-${String(index + 1).padStart(2, '0')}.jpg`,
      alt: `Afiș sponsor ${name} — NorthWay Last Call`,
      width: index === 1 || index === 3 || index === 9 || index === 13 || index === 15 || index === 16 || index === 17 || index === 18 || index === 19 ? 1055 : 1054,
      height: index === 1 || index === 3 || index === 9 || index === 13 || index === 15 || index === 16 || index === 17 || index === 18 || index === 19 ? 1491 : 1492,
    })),
  },
]
