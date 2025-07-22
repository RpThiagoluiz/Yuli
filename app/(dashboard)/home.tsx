import { colors } from '@/styles/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function DashboardHome() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="videocam"
              size={60}
              color={colors.primary.DEFAULT}
            />
          </View>
          <Text style={styles.title}>Yuli</Text>
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
    backgroundColor: colors.neutral[0],
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
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.primary.DEFAULT,
    shadowColor: colors.secondary.DEFAULT,
    shadowOffset: {
      width: 2,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary.DEFAULT,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.neutral.DEFAULT,
    textAlign: 'center',
    fontWeight: '400',
  },
  descriptionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary.DEFAULT,
    marginBottom: 20,
    textAlign: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: colors.neutral[100],
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary.DEFAULT,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: colors.neutral.DEFAULT,
    marginLeft: 12,
    lineHeight: 22,
  },
  instructionContainer: {
    backgroundColor: colors.neutral[100],
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.secondary.DEFAULT,
  },
  instructionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondary.DEFAULT,
    marginBottom: 16,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: colors.neutral.DEFAULT,
    marginBottom: 8,
    lineHeight: 22,
  },
});
