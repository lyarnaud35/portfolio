export interface ShowcaseProject {
  id:            string;
  title:         string;
  client:        string;
  category:      string;
  roles:         string;
  videoFileName: string;
  isVertical?:   boolean;
  volume?:       number; // 1.0 = Max, 0.71 ≈ −3 dB
  endAt?:        number; // reboucle avant cette seconde (évite la fin indésirable)
}

export const R2_BASE_URL = 'https://pub-9128f76c1a114c7c8a7d523ada635e8c.r2.dev';

export const showcaseProjects: ShowcaseProject[] = [
  {
    id:            'c-pas-si-loin',
    title:         'C PAS SI LOIN',
    client:        'FRANCE 5',
    category:      'MAGAZINE',
    roles:         'MIXAGE, SOUND DESIGN & ENREGISTREMENT',
    videoFileName: 'C pas si loin.mp4',
  },
  {
    id:            'c-succulent',
    title:         'C SUCCULENT',
    client:        'FRANCE 3',
    category:      'EMISSION CULINAIRE',
    roles:         'ENREGISTREMENT DES COMÉDIENS',
    videoFileName: 'Csucc.mp4',
  },
  {
    id:            'ici-matin',
    title:         'ICI MATIN',
    client:        'FRANCE TV',
    category:      'MATINALE',
    roles:         'MIXAGE AUDIO',
    videoFileName: 'ICIMATIN.mp4',
  },
  {
    id:            'comedy-queer',
    title:         'COMÉDIE QUEER',
    client:        'FRANCE 4',
    category:      'DIVERTISSEMENT',
    roles:         'ENREGISTREMENT DES COMÉDIENS',
    videoFileName: 'Comedy-queer.mp4',
    isVertical:    true,
    volume:        0.71,
  },
  {
    id:            'chef-pays',
    title:         'CHEF PAYS',
    client:        'LA 1ÈRE',
    category:      'DIVERTISSEMENT',
    roles:         'MIXAGE & SOUND DESIGN',
    videoFileName: 'chefpays.mp4',
    isVertical:    true,
    volume:        0.71,
  },
  {
    id:            'outremer-story',
    title:         'OUTREMER.STORY',
    client:        'FRANCE TV',
    category:      'DOCUMENTAIRE',
    roles:         'MIXAGE & SOUND DESIGN',
    videoFileName: 'outremerstory.mp4',
    endAt:         30,
  },
  {
    id:            'outremer-le-mag',
    title:         'OUTREMER.LE MAG',
    client:        'FRANCE TELEVISIONS',
    category:      'EMISSION QUOTIDIENNE',
    roles:         'MIXAGE & SOUND DESIGN',
    videoFileName: 'OMMAGS04_SOM-C_EM004.mp4',
  },
  {
    id:            'brame-du-cerf',
    title:         'LE BRAME DU CERF',
    client:        'FRANCE.TV',
    category:      'SLOW TV / NATURE / PODCAST',
    roles:         'SOUND DESIGN COMPLET & MIXAGE',
    videoFileName: 'Brame-du-cerf.mp4',
    isVertical:    true,
    volume:        0.71,
  },
];

export const getVideoUrl = (fileName: string): string =>
  `${R2_BASE_URL}/${encodeURIComponent(fileName)}`;
