import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

import { RISK_FACTORS, CATEGORY_LABELS } from './riskFactors';
import { calcularRisco, corDoNivel, RISK_LEVELS } from './riskEngine';

export default function App() {
  const [selecionados, setSelecionados] = useState(new Set());

  const resultado = useMemo(
    () => calcularRisco(selecionados),
    [selecionados]
  );

  function alternar(id) {
    setSelecionados((anterior) => {
      const novo = new Set(anterior);
      if (novo.has(id)) {
        novo.delete(id);
      } else {
        novo.add(id);
      }
      return novo;
    });
  }

  function limpar() {
    setSelecionados(new Set());
  }

  // Agrupa os fatores por "group" (seção clínica), mantendo a ordem de riskFactors.js
  const grupos = useMemo(() => {
    const mapa = new Map();
    for (const fator of RISK_FACTORS) {
      if (!mapa.has(fator.group)) mapa.set(fator.group, []);
      mapa.get(fator.group).push(fator);
    }
    return Array.from(mapa.entries());
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>
          HFA-ICOS · Risco cardiovascular pré-antraciclina
        </Text>
        <Text style={styles.subtitulo}>
          Marque os fatores aplicáveis ao paciente. O escore é calculado
          automaticamente.
        </Text>

        {/* Card de resultado, fixo no topo da rolagem para feedback imediato */}
        <View
          style={[
            styles.resultCard,
            { borderColor: corDoNivel(resultado.nivel) },
          ]}
        >
          <Text style={styles.resultLabel}>Resultado</Text>
          <Text
            style={[styles.resultNivel, { color: corDoNivel(resultado.nivel) }]}
          >
            {resultado.nivel}
          </Text>
          {!resultado.temAlto && !resultado.temMuitoAlto && (
            <Text style={styles.resultPontos}>
              Pontos médios: {resultado.pontosMedios}
            </Text>
          )}
          <TouchableOpacity onPress={limpar} style={styles.limparBtn}>
            <Text style={styles.limparBtnTexto}>Limpar seleções</Text>
          </TouchableOpacity>
        </View>

        {/* Fatores de risco, agrupados por seção clínica */}
        {grupos.map(([grupoNome, fatores]) => (
          <View key={grupoNome} style={styles.grupo}>
            <Text style={styles.grupoTitulo}>{grupoNome}</Text>
            {fatores.map((fator) => {
              const marcado = selecionados.has(fator.id);
              return (
                <TouchableOpacity
                  key={fator.id}
                  style={[styles.item, marcado && styles.itemMarcado]}
                  onPress={() => alternar(fator.id)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[styles.checkbox, marcado && styles.checkboxMarcado]}
                  >
                    {marcado && <Text style={styles.checkboxTick}>✓</Text>}
                  </View>
                  <View style={styles.itemTextos}>
                    <Text style={styles.itemLabel}>{fator.label}</Text>
                    <Text style={styles.itemCategoria}>
                      {CATEGORY_LABELS[fator.category]}
                      {(fator.category === 'medio2' || fator.category === 'medio1') &&
                        ` · ${fator.points} pt${fator.points > 1 ? 's' : ''}`}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

        <View style={styles.regrasBox}>
          <Text style={styles.regrasTitulo}>Como a classificação funciona?</Text>
          <Text style={styles.regrasTexto}>
            • Se houver ≥1 fator MUITO ALTO → Risco Muito Alto{'\n'}
            • Se houver ≥1 fator ALTO (e nenhum muito alto) → Risco Alto{'\n'}
            • Sem alto/muito alto: soma os pontos dos fatores médios{'\n'}
            {'  '}· 0–1 ponto → Baixo{'\n'}
            {'  '}· 2–4 pontos → Moderado{'\n'}
            {'  '}· ≥5 pontos → Alto
          </Text>
        </View>

        <Text style={styles.aviso}>
          Esta ferramenta não substitui o julgamento clínico. Use-a para
          triagem inicial e correlacione com biomarcadores, exames de imagem
          e diretrizes vigentes.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f7' },
  container: { padding: 16, paddingBottom: 48 },
  titulo: { fontSize: 20, fontWeight: '700', color: '#1a1a1a' },
  subtitulo: { fontSize: 14, color: '#666', marginTop: 4, marginBottom: 16 },

  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    padding: 16,
    marginBottom: 20,
  },
  resultLabel: { fontSize: 12, color: '#888', textTransform: 'uppercase' },
  resultNivel: { fontSize: 24, fontWeight: '800', marginTop: 2 },
  resultPontos: { fontSize: 14, color: '#444', marginTop: 6 },
  limparBtn: { marginTop: 12, alignSelf: 'flex-start' },
  limparBtnTexto: { color: '#1565c0', fontWeight: '600', fontSize: 13 },

  grupo: { marginBottom: 20 },
  grupoTitulo: {
    fontSize: 13,
    fontWeight: '700',
    color: '#555',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  itemMarcado: { backgroundColor: '#e8f0fe' },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxMarcado: { backgroundColor: '#1565c0', borderColor: '#1565c0' },
  checkboxTick: { color: '#fff', fontSize: 14, fontWeight: '700' },
  itemTextos: { flex: 1 },
  itemLabel: { fontSize: 14, color: '#1a1a1a', fontWeight: '500' },
  itemCategoria: { fontSize: 12, color: '#888', marginTop: 2 },

  regrasBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  regrasTitulo: { fontSize: 14, fontWeight: '700', marginBottom: 8 },
  regrasTexto: { fontSize: 13, color: '#444', lineHeight: 20 },

  aviso: { fontSize: 12, color: '#888', fontStyle: 'italic', lineHeight: 18 },
});
