export const property = {
  address: 'Eksempelgata 12', city: '4020 Stavanger', price: '5 490 000 kr', rooms: 4, area: '92 m²', bedrooms: 3,
  image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
}
export const buyers = [
  { name: 'Sofie L.', status: 'Ny', time: '2 min siden', note: 'Ønsker privat visning' },
  { name: 'Martin og Ida', status: 'Interessert', time: 'I går', note: 'Har lastet ned prospektet' },
  { name: 'Jonas H.', status: 'På visning', time: 'Mandag', note: 'Kom sammen med samboer' },
  { name: 'Emma K.', status: 'Følger', time: '12. juni', note: 'Ser etter 3 soverom' },
]
export const viewings = [
  { date: '24', day: 'TIR', time: '17:00–18:00', guests: 8, type: 'Fellesvisning' },
  { date: '26', day: 'TOR', time: '12:30–13:00', guests: 2, type: 'Privat visning' },
]
export const guides = [
  { slug: 'selge-bolig-selv', title: 'Selge bolig selv – komplett guide', category: 'Kom i gang', read: '12 min' },
  { slug: 'hva-koster-det-a-selge-bolig', title: 'Hva koster det å selge bolig?', category: 'Økonomi', read: '8 min' },
  { slug: 'boligannonse-som-selger', title: 'Slik lager du en boligannonse som selger', category: 'Presentasjon', read: '7 min' },
  { slug: 'budrunde', title: 'Budrunde: Alt du trenger å vite', category: 'Salg', read: '10 min' },
]
export const cities = ['Oslo', 'Bergen', 'Stavanger', 'Trondheim', 'Kristiansand']
export const money = (value: number) => new Intl.NumberFormat('nb-NO').format(value) + ' kr'
export const statusClass = (status: string) => status === 'Ny' ? 'bg-accent text-accent-foreground' : status === 'Interessert' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
