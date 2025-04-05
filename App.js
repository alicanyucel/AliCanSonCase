import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

import data from './assets/db.json';

export default function App() {
  const tableHead1 = ['ID', 'İsim', 'Email'];
  const tableData1 = data.users.map(user => [user.id, user.name, user.email]);

  const tableHead2 = Array.from({ length: 8 }, (_, i) => `S${i + 1}`);
  const tableData2 = Array.from({ length: 2 }, (_, rowIndex) =>
    Array.from({ length: 8 }, (_, colIndex) => `R${rowIndex + 1}C${colIndex + 1}`)
  );

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Tablo 1 - Kullanıcılar</Text>
      <Table borderStyle={styles.border}>
        <Row data={tableHead1} style={styles.head} textStyle={styles.text} />
        <Rows data={tableData1} textStyle={styles.text} />
      </Table>

      <Text style={styles.title}>TABLO 2</Text>
      <Table borderStyle={styles.border}>
        <Row data={tableHead2} style={styles.head} textStyle={styles.text} />
        <Rows data={tableData2} textStyle={styles.text} />
      </Table>

      <Text style={styles.title}>Tablo 3</Text>
      <Table borderStyle={styles.border}>
        <Row data={tableHead2} style={styles.head} textStyle={styles.text} />
        <Rows data={tableData2} textStyle={styles.text} />
      </Table>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 4, textAlign: 'center', fontSize: 12 },
  border: { borderWidth: 1, borderColor: '#c8e1ff' },
  title: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
});
