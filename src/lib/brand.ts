export const BRAND_ASSETS = {
  logoFull: "/brand/logo-full.png",
  logoMark: "/brand/logo-mark-orange.png",
  logoFooter: "/brand/logo-footer.png",
  photos: {
    manutention: "/brand/photo-manutention.png",
    livraison: "/brand/photo-livraison.png",
    nettoyage: "/brand/photo-nettoyage.png",
    travaux: "/brand/photo-travaux.png",
    montage: "/brand/photo-montage.png",
    assistance: "/brand/photo-manutention.png",
  },
} as const;

export const SERVICE_BRAND_KEYS = {
  manutention: "manutention",
  livraison: "livraison",
  nettoyage: "nettoyage",
  "petits-travaux": "travaux",
  "montage-meubles": "montage",
  "assistance-domicile": "assistance",
} as const;

export type ServiceBrandKey =
  (typeof SERVICE_BRAND_KEYS)[keyof typeof SERVICE_BRAND_KEYS];
