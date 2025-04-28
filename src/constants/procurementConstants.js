
export const PRAGURI_VALORICE = {
  SERVICII_PRODUSE: {
    DIRECTA: 270120,
    SIMPLIFICAT: 3506625
  },
  LUCRARI: {
    DIRECTA: 900400,
    SIMPLIFICAT: 27827125
  }
};

export const TIP_PROCEDURA = {
  ACHIZITIE_DIRECTA: "achizitie_directa",
  PROCEDURA_SIMPLIFICATA: "procedura_simplificata",
  LICITATIE_DESCHISA: "licitatie_deschisa"
};

export const VALIDATION_RULES = {
  MONUMENT_ISTORIC: {
    ALLOWED_TERMS: ["unic", "exclusiv", "specific", "original"],
    REQUIRED_FIELDS: ["cod_LMI", "aviz_MC"]
  },
  CONSOLIDARE: {
    ALLOWED_TERMS: ["consolidare", "seismic", "risc seismic", "expertiza tehnica"],
    REQUIRED_FIELDS: ["expertiza_tehnica", "aviz_ISC"]
  }
};
