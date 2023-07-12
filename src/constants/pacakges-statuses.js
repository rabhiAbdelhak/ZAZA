import {
  AllInbox,
  AssignmentReturnRounded,
  LocalShipping,
  MoveToInbox,
  ReportProblemRounded,
} from '@mui/icons-material'

export const situationsVariant = [
  {
    label: 'All Packages',
    value: 'all',
    icon: <AllInbox />,
    statusIds: [],
  },
  {
    id: 5,
    label: 'Preparation',
    color: 'info.main',
    icon: <MoveToInbox />,
    statusIds: [1, 2, 34, 27, 3, 26],
  },
  {
    id: 8,
    label: 'Delivery',
    color: 'success.main',
    icon: <LocalShipping />,
    statusIds: [21, 8, 24, 25, 7, 5, 12, 4, 6],
  },
  {
    id: 9,
    label: 'Return',
    color: 'primary.main',
    icon: <AssignmentReturnRounded />,
    statusIds: [20, 17, 19, 31, 29, 37, 16],
  },
  {
    id: 10,
    label: 'Failed',
    color: 'warning.main',
    icon: <ReportProblemRounded />,
    statusIds: [9, 22, 11, 13, 14],
  },
]

export const statusVariants = [
  {
    id: 1,
    name: {
      ar: '',
      fr: 'En preparation',
      en: 'Preparation',
    },
    color: 'info.main',
  },
  {
    id: 2,
    name: {
      ar: '',
      fr: 'PRÊT À EXPÉDIER',
      en: 'Ready to ship',
    },
    color: 'info.main',
  },
  {
    id: 34,
    name: {
      ar: '',
      fr: 'DROPSHIP EN PREPARATION',
      en: 'Dropship in preparation',
    },
    color: 'info.main',
  },
  {
    id: 27,
    name: {
      ar: '',
      fr: 'WAREHOUSE HORS STOCK',
      en: 'Warehouse out of stock',
    },
    color: 'info.main',
  },
  {
    id: 26,
    name: {
      ar: '',
      fr: 'WAREHOUSE EN PREPARATION',
      en: 'Warehouse in preparation',
    },
    color: 'info.main',
  },
  {
    id: 3,
    name: {
      ar: '',
      fr: 'EXPÉDIÉ',
      en: 'Shipped',
    },
    color: 'info.main',
  },
  {
    id: 20,
    name: {
      ar: '',
      fr: 'RETOURNEE AU VENDEUR (SAC)',
      en: 'Returned to seller(SAC)',
    },
    color: 'error.main',
  },
  {
    id: 17,
    name: {
      ar: '',
      fr: 'RETOURNEE AU CENTRE',
      en: 'Returned to center',
    },
    color: 'error.main',
  },
  {
    id: 19,
    name: {
      ar: '',
      fr: 'RETOUR VERS VENDEUR(SAC)',
      en: 'Return to Seller(SAC)',
    },
    color: 'error.main',
  },
  {
    id: 31,
    name: {
      ar: '',
      fr: 'WAREHOUSE ANNULÉE',
      en: 'Canceled Warehouse',
    },
    color: 'error.main',
  },
  {
    id: 29,
    name: {
      ar: '',
      fr: 'WAREHOUSE RETOURNÉE',
      en: 'Returned Warehouse',
    },
    color: 'error.main',
  },
  {
    id: 37,
    name: {
      ar: '',
      fr: 'DROPSHIPS RETOURNEÉ',
      en: 'Returned Dropships',
    },
    color: 'error.main',
  },
  {
    id: 16,
    name: {
      ar: '',
      fr: 'RETOUR VERS CENTRE',
      en: 'Return to center',
    },
    color: 'error.main',
  },
  {
    id: 21,
    name: {
      ar: '',
      fr: 'SOCIETE PARTENAIRE',
      en: 'Partner Company',
    },
    color: 'success.main',
  },
  {
    id: 8,
    name: {
      ar: '',
      fr: 'LIVRÉ',
      en: 'Delivered',
    },
    color: 'success.main',
  },
  {
    id: 24,
    name: {
      ar: '',
      fr: 'En Dispatche',
      en: 'In Dispatch',
    },
    color: 'success.main',
  },
  {
    id: 25,
    name: {
      ar: '',
      fr: 'Dispatché',
      en: 'Dispatched',
    },
    color: 'success.main',
  },
  {
    id: 7,
    name: {
      ar: '',
      fr: 'SORTIE EN LIVRAISON',
      en: 'Release in Delivery',
    },
    color: 'success.main',
  },
  {
    id: 5,
    name: {
      ar: '',
      fr: 'CENTRE(HUB)',
      en: 'Center(HUB)',
    },
    color: 'success.main',
  },
  {
    id: 12,
    name: {
      ar: '',
      fr: 'EN ATTENTE',
      en: 'Pending',
    },
    color: 'success.main',
  },
  {
    id: 4,
    name: {
      ar: '',
      fr: 'VERS WILAYA(SAC)',
      en: 'Towards Wilaya(SAC)',
    },
    color: 'success.main',
  },
  {
    id: 6,
    name: {
      ar: '',
      fr: 'TRANSFERT(SAC)',
      en: 'Transfer(SAC)',
    },
    color: 'success.main',
  },
  {
    id: 9,
    name: {
      ar: '',
      fr: 'ÉCHEC DE LIVRAISON',
      en: 'Delivery Failure',
    },
    color: 'warning.main',
  },
  {
    id: 22,
    name: {
      ar: '',
      fr: 'REFUSÉ',
      en: 'Refused',
    },
    color: 'warning.main',
  },
  {
    id: 11,
    name: {
      ar: '',
      fr: 'Reporté',
      en: 'Reported',
    },
    color: 'warning.main',
  },
  {
    id: 13,
    name: {
      ar: '',
      fr: 'TENTATIVE ÉCHOUÉE 1',
      en: 'Failed Attepmt 1',
    },
    color: 'warning.main',
  },
  {
    id: 14,
    name: {
      ar: '',
      fr: 'TENTATIVE ÉCHOUÉE 2',
      en: 'Failed Attempt 2',
    },
    color: 'warning.main',
  },
]

export const paymentStatusVariants = [
  {
    id: 0,
    name: {
      fr: 'Pas prêt',
      en: 'Not ready',
      ar: '',
    },
    color: 'error.main',
  },
  {
    id: 1,
    name: {
      fr: 'Prêt',
      en: 'Ready',
      ar: '',
    },
    color: 'info.main',
  },
  {
    id: 2,
    name: {
      fr: 'Payé',
      en: 'Payed',
      ar: '',
    },
    color: 'success.main',
  },
  {
    id: 3,
    name: {
      fr: 'Demandé',
      en: 'Pending',
      ar: '',
    },
    color: 'info.main',
  },
  {
    id: 4,
    name: {
      fr: 'Payé non encaissé',
      en: 'Payed not received',
      ar: '',
    },
    color: 'warning.main',
  },
]
