import { eventImages } from '../assets/images'

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

const featuredEdition = {
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

export const completedEventHighlight = {
  title: 'NorthWay - Ediția I',
  status: 'Eveniment încheiat',
  featuredEdition,
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
