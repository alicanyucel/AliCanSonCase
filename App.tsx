import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';
import data from './assets/db.json';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    100, 120, 100, 130, 100, 80, 90, 80, 100, 100, 120, 150
  ];

  const renderIconWithText = (iconName: string, text: string, color = '#000') => {
    return (
      <View style={styles.iconTextContainer}>
        <Icon name={iconName} size={16} color={color} style={styles.icon} />
        <Text style={styles.iconText}>{text}</Text>
      </View>
    );
  };

  const tableData1 = data.tableone.map(item => [
    renderIconWithText('user', item.ProjeSorumlusu),
    renderIconWithText('folder', item.projeadi),
    renderIconWithText('barcode', String(item.DgtParcaKodu)),
    renderIconWithText('user-circle', item.SorumluKisi),
    renderIconWithText('hashtag', item.SeriNo),
    renderIconWithText('cogs', `${item.UretimAdeti} Adet`), 
    renderIconWithText('clock', `${item.SureGun} Gün`),
    renderIconWithText('calendar', item.Tarih),
    renderIconWithText('cloud-upload', item.DosyaYukle, '#007bff'),
    renderIconWithText('file-text', item.Aciklama),
    renderIconWithText('floppy-o', item.kAYDET, '#28a745'),
    renderIconWithText('clock-o', item.DosyaAcilmaSaatTarih, '#6c757d')
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
            {tableData1.map((rowData, index) => (
              <TableWrapper key={index} style={{ flexDirection: 'row' }}>
                {rowData.map((cellData, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    data={cellData}
                    textStyle={styles.text}
                    style={{ width: widthArr[cellIndex] }}
                  />
                ))}
              </TableWrapper>
            ))}
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
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  iconText: {
    fontSize: 10,
    color: '#333',
  }
});
