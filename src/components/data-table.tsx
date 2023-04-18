import React from "react";
import { DataTable, Surface, Text } from 'react-native-paper';
import { StyleSheet, View } from "react-native";

interface Props {
  data: Record<string, string>;
}

export const BookingDataTable: React.FC<Props> = ({ data }) => {
  return (
    <Surface style={styles.paper}>
      <DataTable style={styles.table}>
        {Object.entries(data).map(([key, value], index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{key}</DataTable.Cell>
            <View style={styles.cell}>
              <Text style={styles.value}>{value}</Text>
            </View>
          </DataTable.Row>
        ))}
      </DataTable>
    </Surface>
  )
}

const styles = StyleSheet.create({
  paper: {
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
  },
  table: {
    width: '100%',
    paddingBottom: 50,
    paddingTop: 24,
  },
  cell: {
    marginTop: 12,
  },
  value: {
    fontWeight: 'bold',
    textAlign: 'right',
  },
});