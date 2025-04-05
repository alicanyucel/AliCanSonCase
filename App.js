import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import data from './assets/db.json';

export default function App() {
  const tableHead1 = [
    'Proje Sorumlusu',
    'Proje Adı',
    'Dijital Parça Kodu',
    'Sorumlu Kişi',
    'Seri No',
    'Üretim Adeti',
    'Süre (Gün)',
    'Tarih',
    'Dosya Yükle',
    'Açıklama',
    'Kaydet',
    'Dosya Açılma Saat/Tarih'
  ];

  const widthArr = [
    70, 120, 100, 130, 100, 80, 90, 80, 100, 100, 120, 70, 150
  ]; 
  const tableData1 = data.tableone.map(item => [
    item.ProjeSorumlusu,
    item.projeadi,
    item.DgtParcaKodu,
    item.SorumluKisi,
    item.SeriNo,
    item.UretimAdeti,
    item.SureGun,
    item.Tarih,
    item.DosyaYukle,
    item.Aciklama,
    item.kAYDET,
    item.DosyaAcilmaSaatTarih
  ]);

  return (
    <ScrollView style={styles.container} horizontal={true}>
      <View>
        <Text style={styles.title}>Tablo 1 - Projeler</Text>
        <ScrollView>
          <Table borderStyle={styles.border}>
            <Row
              data={tableHead1}
              style={styles.head}
              textStyle={styles.text}
              widthArr={widthArr}
            />
            <Rows
              data={tableData1}
              textStyle={styles.text}
              widthArr={widthArr}
            />
          </Table>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff'
  },
  text: {
    fontSize: 10,
    margin: 2
  },
  border: {
    borderWidth: 1,
    borderColor: '#c8e1ff'
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333'
  }
});
