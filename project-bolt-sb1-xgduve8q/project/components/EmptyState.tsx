import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircleCheck as CheckCircle2 } from 'lucide-react-native';

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <CheckCircle2 size={80} color="#D1D5DB" />
      <Text style={styles.title}>No tasks yet</Text>
      <Text style={styles.description}>
        Tap the + button to create your first task
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#9CA3AF',
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});