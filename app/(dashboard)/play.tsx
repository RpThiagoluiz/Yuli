import { colors } from '@/styles/colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function PlayScreen() {
  const handleChavesPress = () => {
    router.push('/(chaves)/home' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Suas Coleções</Text>
          <Text style={styles.subtitle}>Escolha uma coleção para assistir</Text>
        </View>

        <View style={styles.collectionsContainer}>
          <TouchableOpacity
            style={styles.collectionCard}
            onPress={handleChavesPress}
            activeOpacity={0.7}
          >
            <View style={styles.cardIcon}>
              <Ionicons name="tv" size={40} color={colors.miami.cyan} />
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Chaves</Text>
              <Text style={styles.cardDescription}>
                A clássica série mexicana com o personagem mais querido da TV
              </Text>
              <View style={styles.cardStats}>
                <View style={styles.statItem}>
                  <Ionicons
                    name="videocam"
                    size={16}
                    color={colors.miami.pink}
                  />
                  <Text style={styles.statText}>300+ episódios</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="time" size={16} color={colors.miami.pink} />
                  <Text style={styles.statText}>Clássico</Text>
                </View>
              </View>
            </View>

            <View style={styles.cardArrow}>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={colors.miami.pink}
              />
            </View>
          </TouchableOpacity>

          {/* Placeholder para futuras coleções */}
          <View style={[styles.collectionCard, styles.comingSoonCard]}>
            <View style={styles.cardIcon}>
              <Ionicons
                name="add-circle-outline"
                size={40}
                color={colors.miami.gray}
              />
            </View>

            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, { color: colors.miami.gray }]}>
                Mais coleções em breve
              </Text>
              <Text
                style={[styles.cardDescription, { color: colors.miami.gray }]}
              >
                Novas coleções de vídeos serão adicionadas em futuras
                atualizações
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>💡 Dica</Text>
          <Text style={styles.infoText}>
            Puxe para baixo nas listas de vídeos para atualizar o conteúdo da
            nuvem
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[900],
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.miami.white,
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: colors.miami.pink,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.miami.gray,
    textAlign: 'center',
  },
  collectionsContainer: {
    marginBottom: 30,
  },
  collectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[800],
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.miami.cyan,
    shadowColor: colors.miami.pink,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  comingSoonCard: {
    borderColor: colors.miami.gray,
    opacity: 0.6,
  },
  cardIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.neutral[700],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: colors.miami.cyan,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.miami.white,
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.miami.gray,
    lineHeight: 20,
    marginBottom: 12,
  },
  cardStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: colors.miami.gray,
    marginLeft: 4,
    fontWeight: '500',
  },
  cardArrow: {
    marginLeft: 12,
  },
  infoContainer: {
    backgroundColor: colors.neutral[800],
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.miami.cyan,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.miami.white,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.miami.gray,
    lineHeight: 20,
  },
});
