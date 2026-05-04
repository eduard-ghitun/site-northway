import { eventImages, sharedImages } from '../assets/images'

export const featuredEvent = {
  slug: 'northway-editia-1',
  title: 'NorthWay - Ediția I',
  tagline: 'Primul eveniment oficial NorthSideCrew aduce împreună pasionați auto într-o experiență unică.',
  description:
    'Primul eveniment oficial NorthSideCrew marchează începutul unei serii de întâlniri dedicate pasionaților de mașini.',
  longDescription:
    'Evenimentul va reuni mașini atent pregătite, oameni pasionați și o atmosferă unică, construită în jurul culturii auto.',
  date: '19 Iunie - 21 Iunie',
  location: 'Complex Imperia (Cucorani, Botosani)',
  cta: 'Contactează-ne',
  image: '/events/northway-edition-1-featured-home.jpg',
  imageAlt: 'NorthWay - Ediția I, vizual principal',
  banner: eventImages.northwayEdition2Banner,
  gallery: [...eventImages.gallery],
}

export const upcomingEvents = [
  {
    slug: 'sunset-rolling-session',
    title: 'Sunset Rolling Session',
    date: '11 octombrie 2026',
    location: 'Urban Ring Route',
    description:
      'O sesiune de cruising de seară, gândită pentru mașini bine pregătite, cadre dinamice și o atmosferă relaxată.',
    image: sharedImages.galleryRun,
    imageAlt: 'Session automotive la apus',
  },
  {
    slug: 'midnight-details-meet',
    title: 'Midnight Details Meet',
    date: '7 noiembrie 2026',
    location: 'Warehouse Quarter',
    description:
      'Un format concentrat pe detalii, prezență și mașini care impresionează prin stil, finish și personalitate.',
    image: sharedImages.galleryLights,
    imageAlt: 'Întâlnire auto cu lumini premium',
  },
  {
    slug: 'northside-season-closing',
    title: 'NorthSide Season Closing',
    date: '5 decembrie 2026',
    location: 'Locatie privata TBA',
    description:
      'O închidere de sezon pentru comunitate, cu invitați, mașini selectate și o atmosferă construită în jurul pasiunii auto.',
    image: sharedImages.galleryNightdrive,
    imageAlt: 'Nightdrive NorthSideCrew',
  },
]

export const nextEventHighlight = {
  title: 'NorthWay - Edition II',
  subtitle: 'Trei zile de atmosferă premium, build-uri speciale și energie NorthSideCrew autentică.',
  description:
    'NorthWay - Edition II aduce din nou împreună pasiunea pentru mașini, comunitatea și atmosfera specifică unui eveniment auto memorabil. Timp de trei zile, participanții vor avea ocazia să își prezinte mașinile, să descopere build-uri speciale și să facă parte dintr-o experiență NorthSideCrew autentică.',
  location: 'Complex Imperia (Cucorani, Botosani)',
  startDate: '19 Iunie',
  endDate: '21 Iunie',
  openingHour: '15:00',
  image: '/events/northway-edition-2-upcoming-card.jpg',
  imageAlt: 'NorthWay - Edition II, vizual principal',
  banner: eventImages.northwayEdition2Banner,
  gallery: [...eventImages.gallery],
}

export const upcomingEventAnnouncement = {
  title: 'NORTHway',
  subtitle: 'Northside Automotive Crew anunță al 2-lea eveniment oficial ce va avea loc în Botoșani!',
  intro:
    'Cu această ocazie deschidem înscrierile pentru evenimentul auto NORTHway - Second Edition, eveniment ce se va desfășura în perioada 20-21 Iunie, în aceeași locație inedită, Complex Imperia Cucorani. Pentru această ediție avem alocate un număr de 120 locuri.',
  participantFee: {
    title: 'Taxa pentru participanți',
    items: [
      'Acces în cadrul evenimentului (2 persoane)',
      'Acces la piscină (2 persoane)',
      'Acces la Pool Party (2 persoane)',
      'Reducere 50% mâncare (2 persoane)',
      'Northside Goodie Bag',
    ],
    note:
      'Pentru fiecare mașină acceptată se va plăti anticipat, pentru rezervarea locului, prin transfer bancar, o taxă de 150 de lei.',
  },
  visitorFees: {
    title: 'Taxe pentru vizitatori',
    items: [
      'Taxa de acces pentru vizitatori va fi în valoare de 10 lei / zi, accesul fiind permis în intervalul orar 10:00 - 20:00.',
      'Taxa de acces Pool Party va fi în valoare de 50 lei / persoană, accesul fiind permis în intervalul orar 21:00 - 05:00.',
      'În cadrul evenimentului vor avea acces în locație doar participanții și spectatorii care dețin brățară la mână.',
    ],
  },
  registration: {
    title: 'Înscrierea în cadrul evenimentului',
    intro: 'Înscrierea se realizează cu formularul de înscriere de pe site.',
    requirements: [
      'Număr înmatriculare',
      'Nume / Prenume',
      'Username Instagram',
      'Minim 5 poze calitative din unghiuri diferite (poze clare pentru a scoate în evidență detaliile mașinii)',
      'Minim 1 poză mod portret',
      'Scurtă descriere cu modificările aduse sau informații elocvente',
    ],
    warning: 'Ultima zi de înscriere este 01.06.2026',
  },
  minimumRequirements: {
    title: 'Cerințe minime de accept',
    items: ['Jante', 'Suspensie', 'Fitment', 'Fără defecte optice (rugină, îndoituri, elemente lipsă)'],
  },
  regulations: {
    title: 'Regulament',
    items: [
      'Accesul în cadrul evenimentului se va face vineri între 18:00-23:00 și sâmbătă între 8:00-13:00. Vă rugăm să respectați cu strictețe programul de acces.',
      'Nu există accept la poartă, acceptul mașinilor în locație se va face pe baza unei liste de la care nu se vor face excepții sub nicio formă.',
      'Este complet interzisă mutarea mașinilor pe durata evenimentului.',
      'Fiecare participant este direct răspunzător de bunurile sale și eventualele pagube produse în cadrul locației.',
      'Se vor respecta doar indicațiile date de către organizatori și staff. Nerespectarea lor va duce la excluderea din cadrul evenimentului.',
      'Este interzisă orice activitate și comportament agresiv. EXCLUS: burnout / drift. Nerespectarea lor va duce la excluderea din cadrul evenimentului.',
      'În incinta locației NU SE ACCEPTĂ CAMPING / FOC DESCHIS.',
      'Interzis accesul cu trotinete, biciclete, role sau alte articole ce ar putea pune în pericol.',
      'Accesul în piscină este permis doar participanților, exclus publicului. Vă rugăm acordați atenție consumului de băuturi alcoolice dacă doriți să intrați în piscină.',
      'Se va permite comercializarea de produse exclusiv destinate domeniului auto doar cu acordul organizatorilor, cu cel puțin 30 zile înaintea evenimentului.',
    ],
  },
  stays: {
    title: 'Recomandări cazări',
    items: ['Popas Cucorani', 'Pensiunea Casa Boema', 'Hotel Premier', 'Hotel Rapsodia'],
  },
  schedule: {
    title: 'Program',
    dayOne: {
      title: 'Ziua I – sâmbătă',
      items: [
        '08:00-13:00 Meet & Greet',
        '17:00 Loudest Exhaust',
        '18:00 Powerful Exhaust',
        '22:00 Biggest Flame',
        '22:30 Pool Party',
      ],
    },
    dayTwo: {
      title: 'Ziua II – duminică',
      items: ['13:00 Premierea', '16:00 Închiderea evenimentului'],
    },
  },
  awards: {
    title: 'Categorii de premii',
    items: [
      'Best car of the show',
      'TOP 10',
      'Best paint',
      'Best wheels',
      'Best interior',
      'Best exterior',
      'Lowest static',
      'Lowest airride',
      'Best loudest exhaust',
      'Best biggest flame',
      'Best powerful exhaust',
      'Best OEM',
      'Best Retro',
      'Best Club Display',
    ],
  },
}

export const completedEventHighlight = {
  title: 'NorthWay - Ediția I',
  status: 'Eveniment încheiat',
  description:
    'NorthWay - Ediția I a reprezentat primul pas în construirea unei experiențe autentice NorthSideCrew. Evenimentul a adus împreună pasiunea pentru mașini, comunitatea și atmosfera specifică unui meet auto memorabil.',
  summary:
    'Prima ediție a pus bazele identității NorthSideCrew printr-un mix de mașini atent pregătite, oameni pasionați și un vibe cinematic care a transformat întâlnirea într-un reper pentru comunitate.',
  location: 'Complex Imperia (Cucorani, Botosani)',
  startDate: '19 Iunie',
  endDate: '21 Iunie',
  openingHour: '15:00',
  image: '/events/northway-edition-1-completed-card.jpg',
  imageAlt: 'NorthWay - Ediția I, imagine principală',
  banner: '/events/northway-edition-1-completed-card.jpg',
  sideMedia: {
    title: 'Final De Eveniment',
    description: 'Mulțumim tuturor pentru participare și pentru atmosfera superbă! Ne vedem la următorul eveniment auto.',
    image: '/events/northway-edition-1-side-media.jpg',
    imageAlt: 'Detaliu premium din NorthWay - Ediția I',
  },
  testimonials: [
    'Atmosfera a fost super relaxata si friendly, exact genul de eveniment la care vii cu drag si ramai pana la final.',
    'S-a simtit foarte natural toata energia dintre oameni, fara stres, fara presiune, doar pasiune reala pentru masini.',
    'Un vibe foarte misto, cu oameni deschisi, masini atent pregatite si multe conversatii faine pe tot parcursul zilei.',
    'Mi-a placut faptul ca totul a avut un aer prietenos si bine organizat, iar comunitatea chiar s-a simtit unita.',
    'A fost una dintre acele experiente in care te bucuri atat de masini, cat si de oamenii pe care ii intalnesti acolo.',
    'NorthWay - Ediția I a avut acel mix bun intre competitie, socializare si atmosfera care te face sa vrei sa revii.',
    'S-a vazut pasiunea in fiecare detaliu, dar mai ales in felul in care oamenii au interactionat si au construit vibe-ul evenimentului.',
  ],
  galleryPlaceholders: [
    {
      title: 'VW T2',
      description: 'Un clasic cu personalitate aparte, remarcat instant prin prezenta sa relaxata si memorabila.',
      image: '/events/northway-edition-1-gallery-01.jpg',
      imageAlt: 'Cadru din NorthWay - Ediția I, galerie 01',
    },
    {
      title: 'BMW seria 3 E21',
      description: 'Un model clasic BMW, elegant si bine proportionat, cu prezenta autentica in competitie.',
      image: '/events/northway-edition-1-gallery-02.jpg',
      imageAlt: 'Cadru din NorthWay - Ediția I, galerie 02',
    },
    {
      title: 'VW Scirocco',
      description: 'Un coupe sportiv cu profil distinct, stance jos si un look foarte bine definit.',
      image: '/events/northway-edition-1-gallery-03.jpg',
      imageAlt: 'Cadru din NorthWay - Ediția I, galerie 03',
    },
    {
      title: 'vw passat w8',
      description: 'O prezenta rara si impunatoare, cu atitudine joasa si un caracter aparte.',
      image: '/events/northway-edition-1-gallery-04.jpg',
      imageAlt: 'Cadru din NorthWay - Ediția I, galerie 04',
    },
    {
      title: 'AUDI & BMW',
      description: 'Un line-up reusit care surprinde contrastul dintre stil, detalii si prezenta premium.',
      image: '/events/northway-edition-1-gallery-05.jpg',
      imageAlt: 'Cadru din NorthWay - Ediția I, galerie 05',
    },
    {
      title: 'BMW E34',
      description: 'Un sedan emblematic, bine asezat si apreciat pentru eleganta sa clasica.',
      image: '/events/northway-edition-1-gallery-06.jpg',
      imageAlt: 'Cadru din NorthWay - Ediția I, galerie 06',
    },
    {
      title: 'Audi A5',
      description: 'Un coupe elegant, cu prezenta joasa si un look premium bine definit.',
      image: '/events/northway-edition-1-gallery-07.jpg',
      imageAlt: 'Cadru din NorthWay - Ediția I, galerie 07',
    },
    {
      title: 'Opel Corsa',
      description: 'Un build compact si expresiv, cu atitudine sportiva si prezenta fresh in line-up.',
      image: '/events/northway-edition-1-gallery-08.jpg',
      imageAlt: 'Cadru din NorthWay - Ediția I, galerie 08',
    },
    {
      title: 'Toyota Celica',
      description: 'Un model japonez iconic, remarcat prin silueta sportiva si caracterul sau distinct.',
      image: '/events/northway-edition-1-gallery-09.jpg',
      imageAlt: 'Cadru din NorthWay - Ediția I, galerie 09',
    },
    {
      title: 'Seat Leon',
      description: 'Un hot hatch cu personalitate, stance agresiv si detalii care atrag instant privirea.',
      image: '/events/northway-edition-1-gallery-10.jpg',
      imageAlt: 'Cadru din NorthWay - Ediția I, galerie 10',
    },
    {
      title: 'Mercedes CLE',
      description: 'Eleganta moderna si finisaj premium, intr-o aparitie curata si foarte bine proportionata.',
      image: '/events/northway-edition-1-gallery-11.jpg',
      imageAlt: 'Cadru din NorthWay - Ediția I, galerie 11',
    },
    {
      title: 'Dacia 1300',
      description: 'Un clasic romanesc cu farmec autentic, pastrat cu respect si prezentat memorabil.',
      image: '/events/northway-edition-1-gallery-12.jpg',
      imageAlt: 'Cadru din NorthWay - Ediția I, galerie 12',
    },
    {
      title: 'VW GOLF GTI',
      description: 'Un reper hot hatch, echilibrat perfect intre performanta, stil si identitate sportiva.',
      image: '/events/northway-edition-1-gallery-13.jpg',
      imageAlt: 'Cadru din NorthWay - Ediția I, galerie 13',
    },
    {
      title: 'BMW E91',
      description: 'Un touring bine asezat, cu prezenta joasa si un vibe premium discret.',
      image: '/events/northway-edition-1-gallery-14.jpg',
      imageAlt: 'Cadru din NorthWay - Ediția I, galerie 14',
    },
    {
      title: 'VW G60',
      description: 'Un model rar si apreciat, cu aer old-school si detalii care spun poveste.',
      image: '/events/northway-edition-1-gallery-15.jpg',
      imageAlt: 'Cadru din NorthWay - Ediția I, galerie 15',
    },
    {
      title: 'VW POLO GTI',
      description: 'Mic, rapid si expresiv, cu un look curat si o energie urbana aparte.',
      image: '/events/northway-edition-1-gallery-16.jpg',
      imageAlt: 'Cadru din NorthWay - Ediția I, galerie 16',
    },
    {
      title: 'BMW M4CS & LOTUS',
      description: 'Doua aparitii speciale, unite de performanta pura, contrast vizual si prezenta puternica.',
      image: '/events/northway-edition-1-gallery-17.jpg',
      imageAlt: 'Cadru din NorthWay - Ediția I, galerie 17',
    },
    {
      title: 'AUDI A3',
      description: 'Un hatchback cu stil bine conturat, finisat atent si integrat perfect in vibe.',
      image: '/events/northway-edition-1-gallery-18.jpg',
      imageAlt: 'Cadru din NorthWay - Ediția I, galerie 18',
    },
    {
      title: 'BMW E46',
      description: 'Un clasic modern al scenei BMW, cu proportii corecte si caracter inconfundabil.',
      image: '/events/northway-edition-1-gallery-19.jpg',
      imageAlt: 'Cadru din NorthWay - Ediția I, galerie 19',
    },
    {
      title: 'MINI COOPER-S',
      description: 'Compact, jucaus si plin de personalitate, intr-o aparitie fresh si usor recognoscibila.',
      image: '/events/northway-edition-1-gallery-20.jpg',
      imageAlt: 'Cadru din NorthWay - Ediția I, galerie 20',
    },
    {
      title: 'VW GOLF',
      description: 'Un nume emblematic al culturii auto, prezentat simplu, curat si foarte convingator.',
      image: '/events/northway-edition-1-gallery-21.jpg',
      imageAlt: 'Cadru din NorthWay - Ediția I, galerie 21',
    },
  ],
}
