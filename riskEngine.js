// riskEngine.js
//
// Lógica de classificação, isolada da UI para ser fácil de testar e de
// reaproveitar (ex: em outra tela, ou em testes unitários).

import { CATEGORIES, RISK_FACTORS } from './riskFactors';

export const RISK_LEVELS = {
  BAIXO: 'Baixo risco',
  MODERADO: 'Risco Moderado',
  ALTO: 'Risco Alto',
  MUITO_ALTO: 'Risco Muito Alto',
};

// selectedIds: Set ou array com os ids dos fatores marcados pelo usuário
export function calcularRisco(selectedIds) {
  const selected = new Set(selectedIds);
  const marcados = RISK_FACTORS.filter((f) => selected.has(f.id));

  const temMuitoAlto = marcados.some((f) => f.category === CATEGORIES.MUITO_ALTO);
  const temAlto = marcados.some((f) => f.category === CATEGORIES.ALTO);

  const pontosMedios = marcados
    .filter(
      (f) => f.category === CATEGORIES.MEDIO_2 || f.category === CATEGORIES.MEDIO_1
    )
    .reduce((soma, f) => soma + f.points, 0);

  let nivel;
  if (temMuitoAlto) {
    nivel = RISK_LEVELS.MUITO_ALTO;
  } else if (temAlto) {
    nivel = RISK_LEVELS.ALTO;
  } else if (pontosMedios >= 5) {
    nivel = RISK_LEVELS.ALTO;
  } else if (pontosMedios >= 2) {
    nivel = RISK_LEVELS.MODERADO;
  } else {
    nivel = RISK_LEVELS.BAIXO;
  }

  return {
    nivel,
    pontosMedios,
    temAlto,
    temMuitoAlto,
    fatoresMarcados: marcados,
  };
}

export function corDoNivel(nivel) {
  switch (nivel) {
    case RISK_LEVELS.BAIXO:
      return '#2e7d32'; // verde
    case RISK_LEVELS.MODERADO:
      return '#f9a825'; // amarelo
    case RISK_LEVELS.ALTO:
      return '#ef6c00'; // laranja
    case RISK_LEVELS.MUITO_ALTO:
      return '#c62828'; // vermelho
    default:
      return '#616161';
  }
}
