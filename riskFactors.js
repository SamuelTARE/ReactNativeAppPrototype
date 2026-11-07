// riskFactors.js
//
// Fatores de risco do HFA-ICOS para pacientes que vão iniciar ANTRACICLINAS.
// Fonte das categorias/itens: consenso HFA-ICOS 2020 (Lyon AR et al.) e MDCalc
// (https://www.mdcalc.com/calc/10642).
//
// IMPORTANTE: os campos "points" marcados com "// TODO: confirmar" precisam
// ser revisados com a fonte oficial (HFA-ICOS 2020 / diretriz ESC 2022 de
// cardio-oncologia) antes de usar isso clinicamente. A categoria (muitoAlto,
// alto, medio2, medio1) de cada item já está de acordo com a estrutura oficial,
// mas o valor de pontos de alguns itens "médios" pode variar conforme a versão
// do proforma — confirme antes de publicar.

export const CATEGORIES = {
  MUITO_ALTO: 'muitoAlto',
  ALTO: 'alto',
  MEDIO_2: 'medio2',
  MEDIO_1: 'medio1',
};

export const CATEGORY_LABELS = {
  [CATEGORIES.MUITO_ALTO]: 'Fatores de risco MUITO ALTO',
  [CATEGORIES.ALTO]: 'Fatores de risco ALTO',
  [CATEGORIES.MEDIO_2]: 'Fatores de risco MÉDIO (2 pontos)',
  [CATEGORIES.MEDIO_1]: 'Fatores de risco MÉDIO (1 ponto)',
};

// Cada fator: id único, rótulo exibido, categoria, grupo (para agrupar na tela)
// e pontos (usados apenas nas categorias médio2 / médio1 — alto e muito alto
// não dependem de soma de pontos, basta 1 marcado).
export const RISK_FACTORS = [
  // ---- Doença cardiovascular prévia ----
  {
    id: 'hf_cardiomiopatia',
    label: 'Insuficiência cardíaca ou cardiomiopatia prévia',
    group: 'Doença cardiovascular prévia',
    category: CATEGORIES.MUITO_ALTO,
    points: 0,
  },
  {
    id: 'valvopatia_grave',
    label: 'Doença valvar cardíaca grave',
    group: 'Doença cardiovascular prévia',
    category: CATEGORIES.MUITO_ALTO,
    points: 0,
  },
  {
    id: 'imc_revascularizacao',
    label: 'Infarto do miocárdio prévio ou revascularização coronariana prévia',
    group: 'Doença cardiovascular prévia',
    category: CATEGORIES.ALTO,
    points: 0,
  },
  {
    id: 'angina_estavel',
    label: 'Angina estável',
    group: 'Doença cardiovascular prévia',
    category: CATEGORIES.ALTO,
    points: 0,
  },

  // ---- Biomarcadores cardíacos basais ----
  {
    id: 'troponina_elevada',
    label: 'Troponina basal elevada',
    group: 'Biomarcadores cardíacos basais',
    category: CATEGORIES.ALTO,
    points: 0,
  },
  {
    id: 'peptideo_natriuretico_elevado',
    label: 'Peptídeo natriurético (BNP/NT-proBNP) basal elevado',
    group: 'Biomarcadores cardíacos basais',
    category: CATEGORIES.ALTO,
    points: 0,
  },

  // ---- Fatores demográficos e de risco cardiovascular ----
  {
    id: 'idade_avancada',
    label: 'Idade ≥ 65 anos', // TODO: confirmar ponto de corte exato (65 ou 80)
    group: 'Demográficos e risco cardiovascular',
    category: CATEGORIES.MEDIO_2,
    points: 2, // TODO: confirmar
  },
  {
    id: 'hipertensao',
    label: 'Hipertensão arterial',
    group: 'Demográficos e risco cardiovascular',
    category: CATEGORIES.MEDIO_1,
    points: 1, // TODO: confirmar
  },
  {
    id: 'diabetes',
    label: 'Diabetes mellitus',
    group: 'Demográficos e risco cardiovascular',
    category: CATEGORIES.MEDIO_1,
    points: 1, // TODO: confirmar
  },
  {
    id: 'drc',
    label: 'Doença renal crônica',
    group: 'Demográficos e risco cardiovascular',
    category: CATEGORIES.MEDIO_1,
    points: 1, // TODO: confirmar
  },

  // ---- Tratamento oncológico cardiotóxico prévio ----
  {
    id: 'antraciclina_previa',
    label: 'Exposição prévia a antraciclinas',
    group: 'Tratamento cardiotóxico prévio',
    category: CATEGORIES.MEDIO_2,
    points: 2, // TODO: confirmar
  },
  {
    id: 'radioterapia_torax',
    label: 'Radioterapia prévia em tórax esquerdo / mediastino',
    group: 'Tratamento cardiotóxico prévio',
    category: CATEGORIES.MEDIO_2,
    points: 2, // TODO: confirmar
  },
  {
    id: 'quimio_nao_antraciclina',
    label: 'Quimioterapia prévia não baseada em antraciclina',
    group: 'Tratamento cardiotóxico prévio',
    category: CATEGORIES.MEDIO_1,
    points: 1, // TODO: confirmar
  },

  // ---- Fatores de estilo de vida ----
  {
    id: 'tabagismo',
    label: 'Tabagismo atual ou histórico significativo',
    group: 'Estilo de vida',
    category: CATEGORIES.MEDIO_1,
    points: 1, // TODO: confirmar
  },
  {
    id: 'obesidade',
    label: 'Obesidade (IMC > 30 kg/m²)',
    group: 'Estilo de vida',
    category: CATEGORIES.MEDIO_1,
    points: 1, // TODO: confirmar
  },
];
