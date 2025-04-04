import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const App = () => {
  const NUM_ROWS = 8;
  const NUM_COLS = 12;
  const generateTableData = () => {
    let data = [];
    let counter = 1;
    for (let i = 0; i < NUM_ROWS; i++) {
      let row = [];
      for (let j = 0; j < NUM_COLS; j++) {
        row.push(`Veri ${counter}`);
        counter++;
      }
      data.push(row);
    }
    return data;
  };

  const tableData = generateTableData();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal>
        <View>
          {tableData.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, colIndex) => (
                <View key={colIndex} style={styles.cell}>
                  <Text style={styles.cellText}>{cell}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: '#f4f4f4',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 80,
    height: 50,
    borderWidth: 1,
    borderColor: '#bbb',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cellText: {
    fontSize: 13,
    color: '#333',
  },
});

export default App;
