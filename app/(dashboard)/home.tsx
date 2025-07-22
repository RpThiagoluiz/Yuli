import { colors } from '@/styles/colors';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function DashboardHome() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="videocam" size={60} color={colors.miami.cyan} />
          </View>
          <Text style={styles.title}>Video Drive App</Text>
          <Text style={styles.subtitle}>
            Seus vídeos favoritos em um só lugar
          </Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>Bem-vindo ao Video Drive!</Text>
        </View>

        <View style={styles.instructionContainer}>
          <Text style={styles.instructionTitle}>Como começar:</Text>
          <Text style={styles.instructionText}>
            1. Toque na aba &ldquo;Play&rdquo; abaixo para ver suas coleções
          </Text>
          <Text style={styles.instructionText}>
            2. Selecione uma coleção para começar a assistir
          </Text>
          <Text style={styles.instructionText}>
            3. Toque em qualquer vídeo para reproduzi-lo
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
    marginBottom: 40,
    paddingTop: 20,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.neutral[800],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.miami.cyan,
    shadowColor: colors.miami.pink,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.miami.white,
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: colors.miami.pink,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.miami.gray,
    textAlign: 'center',
    fontWeight: '400',
  },
  descriptionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.miami.white,
    marginBottom: 20,
    textAlign: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: colors.neutral[800],
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.miami.cyan,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: colors.miami.white,
    marginLeft: 12,
    lineHeight: 22,
  },
  instructionContainer: {
    backgroundColor: colors.neutral[800],
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.miami.pink,
  },
  instructionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.miami.white,
    marginBottom: 16,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: colors.miami.gray,
    marginBottom: 8,
    lineHeight: 22,
  },
});
