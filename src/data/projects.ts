export interface Project {
  id:            string;
  title:         string;
  client:        string;
  category:      string;
  roles:         string;
  videoFileName: string;
  posterFileName?: string; // miniature locale dans /public/image
  isVertical?:   boolean;
  volume?:       number;
}

export const R2_BASE_URL = 'https://pub-9128f76c1a114c7c8a7d523ada635e8c.r2.dev';

/** Projets affichés dans la grille /demos */
export const projects: Project[] = [
  {
    id:            '1',
    title:         "C PAS SI LOIN — L'ASCENSION DE LA SOUFRIÈRE",
    client:        'France Télévisions / C Pas Si Loin',
    category:      'MAGAZINE TV',
    roles:         'Mixage & Sound Design',
    videoFileName: 'GUADELOUPE_ASCENSION_DE_LA_SOUFFRIERE.mp4',
    posterFileName: 'soufriere.jpg',
  },
  {
    id:            '2',
    title:         'C PAS SI LOIN — KAYAK RIVIÈRE MOUSTIQUE',
    client:        'France Télévisions / C Pas Si Loin',
    category:      'MAGAZINE TV',
    roles:         'Mixage & Sound Design',
    videoFileName: 'GUADELOUPE_KAYAK_RIVIERE_MOUSTIQUE.mp4',
    posterFileName: 'kayak.jpg',
  },
  {
    id:            '3',
    title:         'C PAS SI LOIN — GUYANE PETIT SAUT',
    client:        'France Télévisions / C Pas Si Loin',
    category:      'MAGAZINE TV',
    roles:         'Mixage & Sound Design',
    videoFileName: 'GUYANE PETIT SAUT.mp4',
    posterFileName: 'petit-saut.jpg',
  },
  {
    id:            '4',
    title:         'OUTREMER.LE MAG — EM004 (TRAILER)',
    client:        'France Télévisions / Outremer.Le Mag',
    category:      'MAGAZINE TV',
    roles:         'Mixage & Sound Design',
    videoFileName: 'OMMAGS04_SOM-C_EM004.mp4',
    posterFileName: 'outremer-mag.jpg',
  },
  {
    id:            '5',
    title:         'FRANCE TV — ANIMATION TARTE TATIN',
    client:        'France Télévisions',
    category:      'FILM & DOCUMENTAIRE',
    roles:         'Mixage & Sound Design',
    videoFileName: 'ANIMATION TARTE TATIN.mp4',
    posterFileName: 'tarte-tatin.jpg',
  },
  {
    id:            '6',
    title:         'AUDI — 1 MILLIMÈTRE (RE-BRUITAGE)',
    client:        'Audi (Unofficial Shorts)',
    category:      'COMMERCIAL',
    roles:         'Mixage & Sound Design',
    videoFileName: 'AUDI_1_millimètre.mp4',
    posterFileName: 'audi.jpg',
  },
  {
    id:            '7',
    title:         'ELIS — CHRONO (FILM PROMOTIONNEL)',
    client:        'Elis',
    category:      'COMMERCIAL',
    roles:         'Mixage & Sound Design',
    videoFileName: 'elis-chrono.mp4',
    posterFileName: 'elis.png',
  },
];

export const getProjectVideoUrl = (fileName: string): string =>
  `${R2_BASE_URL}/${encodeURIComponent(fileName)}`;

/** Miniatures locales : /public/image/... */
export const getProjectPosterUrl = (fileName: string): string =>
  `/image/${encodeURIComponent(fileName)}`;
