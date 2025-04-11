import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

export default function App() {
  const [tableData1, setTableData1] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [tableData3, setTableData3] = useState([]);

  const renderIconWithText = (iconName, text, color = '#000') => (
    <View style={styles.iconTextContainer}>
      <Icon name={iconName} size={16} color={color} style={styles.icon} />
      <Text style={styles.iconText}>{text}</Text>
    </View>
  );

  const getColorForStatus = (status) => {
    switch (status) {
      case 'aktif': return 'green';
      case 'beklemede': return 'orange';
      case 'kapalı': return 'red';
      default: return '#000';
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://192.168.1.33:7268/api/tableone');
      console.log('GET Response:', response.data); 
      setTableData1(response.data.tableone.map(item => [
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
      ]));

      setTableData2(response.data.tabletwo.map(item => [
        renderIconWithText('user', item.teknisyenAdi),
        renderIconWithText('barcode', item.dgtParcaKodu),
        renderIconWithText('circle', item.durum, getColorForStatus(item.durum)),
        renderIconWithText('pause', `${item.beklemedeAdet} Adet`, '#f39c12'),
        renderIconWithText('file-text', item.aciklama),
        renderIconWithText('calendar', item.tarih),
        renderIconWithText('list', Array.isArray(item.aciklamaListesi) ? item.aciklamaListesi.join(', ') : '')
      ]));

      setTableData3(response.data.tablethree.flatMap(item =>
        item.uygunsuzluktespitlistesi.map(tespit => [
          renderIconWithText('file-text', 'Uygunsuzluk Tespit Listesi', '#17a2b8'),
          renderIconWithText('user', tespit.teknisyenAdi),
          renderIconWithText('barcode', tespit.dgtParcaKodu),
          renderIconWithText('circle', tespit.durum, getColorForStatus(tespit.durum)),
          renderIconWithText('pause', `${tespit.beklemedeAdet} Adet`, '#f39c12'),
          renderIconWithText('file-text', tespit.aciklama),
          renderIconWithText('calendar', tespit.tarih),
          renderIconWithText('list', Array.isArray(tespit.aciklamaListesi) ? tespit.aciklamaListesi.join(', ') : '')
        ])
      ));
    } catch (error) {
      console.error('GET Error:', error);
    }
  };
  const postData = async () => {
    try {
      const dataToSend = {
        "id": 0,
        "projeSorumlusu": "Ali Can",
        "projeAdi": "Dijital Erp",
        "dgtParcaKodu": 1,
        "sorumluKisi": "abjdhsj",
        "seriNo": "stringsas",
        "uretimAdeti": 1,
        "sureGun": 1,
        "tarih": "2025-04-11T08:32:27.525Z",
        "dosyaYukle": "ssas",
        "aciklama": "stringasas",
        "kaydet": "strinassg",
        "dosyaAcilmaSaatTarih": "2025-04-11T08:32:27.525Z"
      };
      const response = await axios.post('https://192.168.1.33:7268/api/tableone', dataToSend);
      console.log('POST Response:', response.data); 
    } catch (error) {
      console.error('POST Error:', error);
    }
  };

  useEffect(() => {
    fetchData(); 
    postData(); 
  }, []);
  const tableHead1Titles = [
    'Proje Sorumlusu', 'Proje Adı', 'Dijital Parça Kodu', 'Sorumlu Kişi', 'Seri No',
    'Üretim Adeti', 'Süre (Gün)', 'Tarih', 'Dosya Yükle', 'Açıklama', 'Kaydet', 'Dosya Açılma Tarih/Saat'
  ];
  const tableHead2Titles = [
    'Teknisyen Adı', 'Dijital Parça Kodu', 'Durum', 'Beklemede Adet', 'Açıklama', 'Tarih', 'Açıklama Listesi'
  ];
  const tableHead3Titles = [
    'Uygunsuzluk Tespit Listesi', 'Teknisyen Adı', 'Dijital Parça Kodu', 'Durum', 'Beklemede Adet',
    'Açıklama', 'Tarih', 'Açıklama Listesi'
  ];

  const widthArr = [100, 120, 100, 130, 100, 80, 90, 80, 100, 100, 120, 400];

  return (
    <ScrollView style={styles.container}>
      <View>
        {/* Table 1 */}
        <ScrollView horizontal={true}>
          <Table borderStyle={styles.border}>
            <Row
              data={tableHead1Titles}
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
        <View style={styles.spacer} />

        {/* Table 2 */}
        <ScrollView horizontal={true}>
          <Table borderStyle={styles.border}>
            <Row
              data={tableHead2Titles}
              style={styles.head}
              textStyle={styles.text}
              widthArr={widthArr.slice(0, tableHead2Titles.length)}
            />
            {tableData2.map((rowData, index) => (
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
        <View style={styles.spacer} />

        {/* Table 3 */}
        <ScrollView horizontal={true}>
          <Table borderStyle={styles.border}>
            <Row
              data={tableHead3Titles}
              style={styles.head}
              textStyle={styles.text}
              widthArr={widthArr.slice(0, tableHead3Titles.length)}
            />
            {tableData3.map((rowData, index) => (
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
    backgroundColor: '#fff',
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  text: {
    fontSize: 10,
    margin: 2,
  },
  border: {
    borderWidth: 1,
    borderColor: '#c8e1ff',
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
  },
  spacer: {
    marginVertical: 20,
  },
});
