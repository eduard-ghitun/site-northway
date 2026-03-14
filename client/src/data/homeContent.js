import { CarFront, Flag, ShieldCheck, Sparkles } from 'lucide-react'
import { homeImages } from '../assets/images'

export const heroContent = {
  eyebrow: 'Comunitate Auto',
  title: 'NorthSideCrew',
  subtitle: 'O comunitate construită din pasiune pentru mașini, stil și experiențe memorabile.',
  description:
    'NorthSideCrew este mai mult decât un simplu grup de pasionați auto. Este locul unde performanța, designul și comunitatea se întâlnesc pentru a crea evenimente unice, dedicate celor care trăiesc pentru mașini.',
  media: {
    image: '/home/northsidecrew-home-hero.jpg',
    alt: 'NorthSideCrew meet overview',
  },
}

export const homeIntro = {
  title: 'La NorthSideCrew, pasiunea pentru mașini ne aduce împreună.',
  description:
    'Organizăm evenimente auto, întâlniri și experiențe dedicate celor care apreciază performanța, designul și cultura auto.',
  secondary:
    'Fie că este vorba despre mașini sport, build-uri unice sau simple întâlniri între pasionați, fiecare eveniment este gândit pentru a crea o experiență memorabilă pentru toți participanții.',
  media: {
    image: '/home/northsidecrew-home-community.jpg',
    alt: 'Comunitatea NorthSideCrew la eveniment',
  },
}

export const homeSlogan = '× The cars we drive say a lot about us! ×'

export const highlights = [
  {
    title: 'Comunitate',
    text: 'O comunitate formată din oameni care împărtășesc aceeași pasiune pentru mașini.',
    icon: ShieldCheck,
  },
  {
    title: 'Evenimente',
    text: 'Organizăm întâlniri și evenimente auto menite să aducă împreună pasionați din toată zona.',
    icon: Flag,
  },
  {
    title: 'Mașini',
    text: 'De la build-uri impresionante la mașini clasice sau moderne, fiecare vehicul spune o poveste.',
    icon: CarFront,
  },
  {
    title: 'Experiențe',
    text: 'Evenimentele NorthSideCrew sunt despre experiențe reale, atmosferă și oameni care împărtășesc aceeași pasiune.',
    icon: Sparkles,
  },
]

export const showcaseItems = [
  {
    title: 'Vibe de seara',
    caption: 'Un moment plin de energie, zambete si entuziasm, care surprinde bucuria reala a comunitatii NorthSideCrew.',
    image: '/home/home-showcase-sosire-seara.jpg',
    imageAlt: 'Atmosfera NorthSideCrew la sosirea de seara',
    imageWrapperClassName: 'h-72 sm:h-80',
    imageClassName: 'h-72 sm:h-80',
    imageStyle: {
      objectPosition: 'center 44%',
    },
  },
  {
    title: 'Organizare',
    caption: 'Un moment care surprinde discutiile de organizare, schimbul de idei si coordonarea din spatele unei experiente NorthSideCrew bine construite.',
    image: '/home/home-showcase-lumini-si-miscare.jpg',
    imageAlt: 'Atmosfera NorthSideCrew in lumina de zi',
    imageWrapperClassName: 'h-72 sm:h-80',
    imageClassName: 'h-72 sm:h-80',
    imageStyle: {
      objectPosition: 'center 24%',
    },
  },
  {
    title: 'Premii',
    caption: 'Un cadru dedicat premiilor care evidentiaza atentia pentru detalii, originalitatea build-urilor si nivelul ridicat al aparitiilor din comunitatea NorthSideCrew.',
    image: '/home/home-showcase-line-up-select.jpg',
    imageAlt: 'Detalii tehnice si line-up select NorthSideCrew',
    imageWrapperClassName: 'h-72 sm:h-80',
    imageClassName: 'h-72 sm:h-80',
    imageStyle: {
      objectPosition: 'center 38%',
    },
  },
  {
    title: 'Pasiune pentru toate varstele',
    caption: 'Un moment care arata ca pasiunea pentru masini poate fi traita intr-un mod deschis, prietenos si potrivit pentru toate varstele, inclusiv pentru cei mai mici pasionati.',
    image: '/home/home-showcase-after-hours.jpg',
    imageAlt: 'Atmosfera relaxata NorthSideCrew dupa eveniment',
    imageWrapperClassName: 'h-72 sm:h-80',
    imageClassName: 'h-72 sm:h-80',
    imageStyle: {
      objectPosition: 'center 34%',
    },
  },
]

export const homeFeaturedEvent = {
  title: 'NorthWay - Ediția I',
  description:
    'Primul eveniment oficial NorthSideCrew aduce împreună pasionați auto într-o experiență unică.',
  secondary:
    'Un loc unde designul, performanța și pasiunea pentru mașini se întâlnesc într-o atmosferă spectaculoasă.',
  tertiary:
    'Participanții vor putea descoperi mașini impresionante, vor cunoaște oameni cu aceeași pasiune și vor face parte dintr-o comunitate care continuă să crească.',
}
