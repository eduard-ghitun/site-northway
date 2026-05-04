import eventTicketImage from '../assets/images/tickets/bilet-eveniment.jpeg'
import fullAccessTicketImage from '../assets/images/tickets/bilet-full-access.png'
import partyTicketImage from '../assets/images/tickets/bilet-party.jpeg'
import vipAccessTicketImage from '../assets/images/tickets/bilet-vip-access.png'

export const ticketProducts = [
  {
    id: 'spectator',
    title: 'Bilet General Access /zi',
    price: 10,
    image: eventTicketImage,
    badge: 'Acces Spectator',
    description:
      'Acces spectator pentru NorthWay II, cu intrare in zona evenimentului, expo & show pentru o zi',
    perks: ['Acces zona spectator', 'Zone expo & show'],
    checkoutUrl: 'https://revolut.me/unchiubenz',
  },
  {
    id: 'full-access',
    title: 'Bilet Full Access',
    price: 20,
    image: fullAccessTicketImage,
    badge: 'Acces Full',
    description:
      'Acces rapid pentru ambele zile NorthWay, cu intrare pe 20-21 iunie si sticker cadou NORTHWAY.',
    perks: ['Acces 2 zile / 20-21 iunie', 'Sticker cadou NORTHWAY', 'Acelasi link rapid de plata'],
    checkoutUrl: 'https://revolut.me/unchiubenz',
  },
  {
    id: 'vip-access',
    title: 'Bilet VIP Acces - Only Early Bird',
    price: 40,
    image: vipAccessTicketImage,
    badge: 'Acces VIP',
    description:
      'Achizitie disponibila pana pe data de 01.06.2026, cu acces pentru 2 zile pe 20-21 iunie si NORTHWAY Goodiebag inclus.',
    perks: ['Achizitie pana la 01.06.2026', 'Acces 2 zile / 20-21 iunie', 'NORTHWAY Goodiebag'],
    checkoutUrl: 'https://revolut.me/unchiubenz',
  },
  {
    id: 'participant',
    title: 'Bilet Party',
    price: 50,
    priceBelowTitle: true,
    image: partyTicketImage,
    badge: 'Acces Party',
    description: 'Taxa de participare in cadrul petrecerii ',
    perks: ['Acces participant', 'Participare in cadrul evenimentului', 'Prezenta in zona dedicata'],
    checkoutUrl: 'https://revolut.me/unchiubenz',
  },
]
