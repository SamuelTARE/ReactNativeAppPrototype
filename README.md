# Calculadora de Risco Cardiovascular (HFA-ICOS – Antraciclinas)

App React Native (Expo) que reproduz a lógica da calculadora de risco do site
do Dr. Rodrigo Noronha, focado em pacientes que vão iniciar **antraciclinas**.

## Como rodar

```bash
npx create-expo-app risco-cardio-app --template blank
# depois substitua App.js, package.json e adicione riskFactors.js e riskEngine.js
# (ou simplesmente copie os 4 arquivos deste projeto para dentro do seu)

cd risco-cardio-app
npm install
npx expo start
```

Abra no celular com o app **Expo Go** (Android/iOS) escaneando o QR code, ou
pressione `w` no terminal para abrir a versão web.

## Estrutura

- `App.js` — tela principal, UI (checkboxes agrupados por categoria clínica,
  card de resultado, regras de classificação).
- `riskFactors.js` — **config dos fatores de risco**. É aqui que você edita
  textos, categorias e pontos. Pensado para não precisar mexer na UI.
- `riskEngine.js` — lógica pura de cálculo (`calcularRisco`), sem nada de UI.
  Fácil de testar isoladamente.

## ⚠️ Antes de usar clinicamente

Os **pontos** de alguns fatores da categoria "médio" em `riskFactors.js`
estão marcados com `// TODO: confirmar`. Eu montei a lista de fatores e as
categorias (muito alto / alto / médio) com base nas seções oficiais do
HFA-ICOS para antraciclinas, mas não tive acesso à pontuação exata (o
MDCalc renderiza isso via JavaScript, então não consegui extrair os números
de forma confiável). **Confirme os valores com a publicação oficial do
consenso HFA-ICOS 2020 (Lyon AR et al.) ou com a diretriz ESC 2022 de
cardio-oncologia antes de publicar o app**, já que é uma ferramenta de apoio
a decisão clínica.

## Próximos passos possíveis

- Adicionar seletor de "terapia planejada" (antraciclinas, anti-HER2,
  anti-VEGF, etc.) como no site original, trocando o `RISK_FACTORS`
  carregado conforme a terapia — dá pra fazer um arquivo por terapia
  (`riskFactors.antraciclinas.js`, `riskFactors.antiHer2.js`, ...).
- Botão "Exportar seleção (JSON)" — usando `expo-sharing` ou `Share.share`
  do React Native para exportar o resumo.
- Persistir o estado com `AsyncStorage` entre sessões, se fizer sentido.
