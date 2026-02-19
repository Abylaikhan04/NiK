export interface Location {
  lat: number;
  lng: number;
  name: string;
}

export const objectLocations: Record<string, Location> = {
  colosseum: {
    lat: 41.8902,
    lng: 12.4922,
    name: 'Рим, Италия'
  },
  pyramid: {
    lat: 29.9792,
    lng: 31.1342,
    name: 'Гиза, Египет'
  },
  parthenon: {
    lat: 37.9715,
    lng: 23.7267,
    name: 'Афины, Греция'
  },
  stonehenge: {
    lat: 51.1789,
    lng: -1.8262,
    name: 'Уилтшир, Англия'
  },
  'machu-picchu': {
    lat: -13.1631,
    lng: -72.5450,
    name: 'Куско, Перу'
  },
  'great-wall': {
    lat: 40.4319,
    lng: 116.5704,
    name: 'Китай'
  }
};
