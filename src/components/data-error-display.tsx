import React from 'react';
import dayjs from 'dayjs';
import { StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';

interface Props {
  data: Record<string, string>;
}

type DataErrorType = 'not-today';

const errorContent: Record<DataErrorType, string> = {
  'not-today': "Booking is not for today"
}

export const DataErrorDisplay: React.FC<Props> = ({ data }) => {
  const today = dayjs().format("DD MMM YYYY");

  let error: DataErrorType | null = null;

  if (data['Date'] !== today) {
    error = 'not-today';
  }

  if (!error) {
    return null;
  }

  return (
    <Surface style={styles.surface}>
      <Text style={styles.error}>⚠️ {errorContent[error]}</Text>
    </Surface>
  );
}


const styles = StyleSheet.create({
  surface: {
    padding: 12
  },
  error: {
    color: '#ff2c00'
  }
});