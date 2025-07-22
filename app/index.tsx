import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { colors } from '../styles/colors';

const TIME_TO_NAVIGATE = 3000; // 3 seconds

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
    }, TIME_TO_NAVIGATE);

    return () => clearTimeout(timer);
  }, [scaleAnim, opacityAnim]);

  if (!showWelcome) {
    return null;
  }

  return (
    <LinearGradient
      colors={[colors.neutral[0], colors.neutral[100], colors.neutral[0]]}
      locations={[0, 0.5, 1]}
      style={styles.container}
    >
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
            <Ionicons
              name="play-circle"
              size={200}
              color={colors.primary.DEFAULT}
            />
          </Animated.View>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[0],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 40,
    shadowColor: colors.secondary.DEFAULT,
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
    color: colors.primary.DEFAULT,
    textAlign: 'center',
    marginBottom: 8,
  },
});
