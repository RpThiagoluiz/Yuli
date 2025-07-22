import { Stack } from 'expo-router';

export default function Chaves(): React.JSX.Element {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
          animationDuration: 20,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      />
    </Stack>
  );
}
