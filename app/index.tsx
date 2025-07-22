import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/colors';

export default function WelcomeScreen() {
  const [showWelcome] = useState(true);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => {
        router.replace('/(dashboard)/home');
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [scaleAnim, opacityAnim]);

  if (!showWelcome) {
    return null;
  }

  return (
    <LinearGradient
      colors={[colors.neutral[900], colors.neutral[800], colors.neutral[900]]}
      locations={[0, 0.5, 1]}
      style={styles.container}
    >
      <StatusBar style="light" />
      {showWelcome && (
        <View style={styles.content}>
          <Animated.View
            style={[
              styles.iconContainer,
              {
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
              },
            ]}
          >
            <Ionicons name="play-circle" size={120} color={colors.miami.cyan} />
          </Animated.View>

          <View style={styles.textContainer}>
            <Text style={styles.welcomeTitle}>Bem-vindo ao Play</Text>
            <Text style={styles.welcomeSubtitle}>
              Seus vídeos favoritos em um só lugar
            </Text>
          </View>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[900],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 40,
    shadowColor: colors.miami.pink,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.miami.white,
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: colors.miami.pink,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: colors.miami.gray,
    textAlign: 'center',
    fontWeight: '400',
    textShadowColor: colors.miami.cyan,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
