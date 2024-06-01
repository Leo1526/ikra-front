
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../design/themes'; 
import { images } from "../../constants";



const internshipListings = [
  { id: 1, department: 'Yazılım Mühendisliği', company: 'ABC Teknoloji', description: 'Yazılım geliştirme projelerinde görev alacak stajyer arıyoruz.', contact: 'info@abc.com', address: 'İstanbul, Türkiye', deadline: '30/06/2024' },
  { id: 2, department: 'Makine Mühendisliği', company: 'XYZ Mühendislik', description: 'Üretim hattında çalışacak stajyer arıyoruz.', contact: 'hr@xyz.com', address: 'Ankara, Türkiye', deadline: '25/06/2024' },
  { id: 3, department: 'Elektrik Mühendisliği', company: 'Elektrik A.Ş.', description: 'Elektrik projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@elektrik.com', address: 'İzmir, Türkiye', deadline: '20/06/2024' },
  { id: 4, department: 'İnşaat Mühendisliği', company: 'İnşaat Ltd.', description: 'Şantiye projelerinde görev alacak stajyer arıyoruz.', contact: 'info@insaat.com', address: 'Antalya, Türkiye', deadline: '15/06/2024' },
  { id: 5, department: 'Kimya Mühendisliği', company: 'Kimya A.Ş.', description: 'Laboratuvar projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@kimya.com', address: 'Bursa, Türkiye', deadline: '10/06/2024' },
  { id: 6, department: 'Gıda Mühendisliği', company: 'Gıda Ltd.', description: 'Gıda üretim hattında çalışacak stajyer arıyoruz.', contact: 'info@gida.com', address: 'Adana, Türkiye', deadline: '05/06/2024' },
  { id: 7, department: 'Endüstri Mühendisliği', company: 'Endüstri A.Ş.', description: 'Verimlilik projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@endustri.com', address: 'Konya, Türkiye', deadline: '01/06/2024' },
  { id: 8, department: 'Bilgisayar Mühendisliği', company: 'Tekno Bilgisayar', description: 'Bilgisayar sistemlerinde çalışacak stajyer arıyoruz.', contact: 'info@teknobilgisayar.com', address: 'Gaziantep, Türkiye', deadline: '30/05/2024' },
  { id: 9, department: 'Mekatronik Mühendisliği', company: 'Mekatronik Ltd.', description: 'Robotik projelerde çalışacak stajyer arıyoruz.', contact: 'info@mekatronik.com', address: 'Eskişehir, Türkiye', deadline: '25/05/2024' },
  { id: 10, department: 'Çevre Mühendisliği', company: 'Çevre A.Ş.', description: 'Çevre projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@cevre.com', address: 'Samsun, Türkiye', deadline: '20/05/2024' },
  { id: 11, department: 'Biyomedikal Mühendisliği', company: 'BioMed Ltd.', description: 'Tıbbi cihaz projelerinde çalışacak stajyer arıyoruz.', contact: 'info@biomed.com', address: 'Kayseri, Türkiye', deadline: '15/05/2024' },
  { id: 12, department: 'Otomotiv Mühendisliği', company: 'Oto A.Ş.', description: 'Otomotiv üretim hattında çalışacak stajyer arıyoruz.', contact: 'iletisim@oto.com', address: 'Mersin, Türkiye', deadline: '10/05/2024' },
  { id: 13, department: 'Havacılık Mühendisliği', company: 'Havacılık Ltd.', description: 'Havacılık projelerinde görev alacak stajyer arıyoruz.', contact: 'info@havacilik.com', address: 'Trabzon, Türkiye', deadline: '05/05/2024' },
  { id: 14, department: 'Maden Mühendisliği', company: 'Maden A.Ş.', description: 'Maden sahasında çalışacak stajyer arıyoruz.', contact: 'iletisim@maden.com', address: 'Zonguldak, Türkiye', deadline: '01/05/2024' },
  { id: 15, department: 'Yazılım Mühendisliği', company: 'Dijital Teknoloji', description: 'Web geliştirme projelerinde görev alacak stajyer arıyoruz.', contact: 'info@dijital.com', address: 'İstanbul, Türkiye', deadline: '30/04/2024' },
  { id: 16, department: 'Makine Mühendisliği', company: 'Üretim Mühendislik', description: 'Makine üretim hattında çalışacak stajyer arıyoruz.', contact: 'hr@uretim.com', address: 'Ankara, Türkiye', deadline: '25/04/2024' },
  { id: 17, department: 'Elektrik Mühendisliği', company: 'Enerji A.Ş.', description: 'Enerji projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@enerji.com', address: 'İzmir, Türkiye', deadline: '20/04/2024' },
  { id: 18, department: 'İnşaat Mühendisliği', company: 'Yapı Ltd.', description: 'Şantiye projelerinde çalışacak stajyer arıyoruz.', contact: 'info@yapi.com', address: 'Antalya, Türkiye', deadline: '15/04/2024' },
  { id: 19, department: 'Kimya Mühendisliği', company: 'Lab Kimya', description: 'Laboratuvar projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@labkimya.com', address: 'Bursa, Türkiye', deadline: '10/04/2024' },
  { id: 20, department: 'Gıda Mühendisliği', company: 'Besin Ltd.', description: 'Gıda üretim hattında çalışacak stajyer arıyoruz.', contact: 'info@besin.com', address: 'Adana, Türkiye', deadline: '05/04/2024' },
  { id: 21, department: 'Endüstri Mühendisliği', company: 'Sanayi A.Ş.', description: 'Verimlilik projelerinde çalışacak stajyer arıyoruz.', contact: 'iletisim@sanayi.com', address: 'Konya, Türkiye', deadline: '01/04/2024' },
  { id: 22, department: 'Bilgisayar Mühendisliği', company: 'Tech Bilgisayar', description: 'Bilgisayar sistemlerinde çalışacak stajyer arıyoruz.', contact: 'info@techbilgisayar.com', address: 'Gaziantep, Türkiye', deadline: '30/03/2024' },
  { id: 23, department: 'Mekatronik Mühendisliği', company: 'Robotik Ltd.', description: 'Robotik projelerde çalışacak stajyer arıyoruz.', contact: 'info@robotik.com', address: 'Eskişehir, Türkiye', deadline: '25/03/2024' },
  { id: 24, department: 'Çevre Mühendisliği', company: 'Eko A.Ş.', description: 'Çevre projelerinde çalışacak stajyer arıyoruz.', contact: 'iletisim@eko.com', address: 'Samsun, Türkiye', deadline: '20/03/2024' },
  { id: 25, department: 'Biyomedikal Mühendisliği', company: 'Medikal Ltd.', description: 'Tıbbi cihaz projelerinde görev alacak stajyer arıyoruz.', contact: 'info@medikal.com', address: 'Kayseri, Türkiye', deadline: '15/03/2024' },
  { id: 26, department: 'Otomotiv Mühendisliği', company: 'Araç A.Ş.', description: 'Otomotiv üretim hattında çalışacak stajyer arıyoruz.', contact: 'iletisim@arac.com', address: 'Mersin, Türkiye', deadline: '10/03/2024' },
  { id: 27, department: 'Havacılık Mühendisliği', company: 'Uçak Ltd.', description: 'Havacılık projelerinde görev alacak stajyer arıyoruz.', contact: 'info@ucak.com', address: 'Trabzon, Türkiye', deadline: '05/03/2024' },
  { id: 28, department: 'Maden Mühendisliği', company: 'Maden Teknoloji', description: 'Maden sahasında çalışacak stajyer arıyoruz.', contact: 'iletisim@madenteknoloji.com', address: 'Zonguldak, Türkiye', deadline: '01/03/2024' },
  { id: 29, department: 'Yazılım Mühendisliği', company: 'Kodu Teknoloji', description: 'Mobil uygulama geliştirme projelerinde görev alacak stajyer arıyoruz.', contact: 'info@kodu.com', address: 'İstanbul, Türkiye', deadline: '28/02/2024' },
  { id: 30, department: 'Makine Mühendisliği', company: 'Teknik Mühendislik', description: 'Makine üretim hattında çalışacak stajyer arıyoruz.', contact: 'hr@teknik.com', address: 'Ankara, Türkiye', deadline: '25/02/2024' },
  { id: 31, department: 'Elektrik Mühendisliği', company: 'Volt A.Ş.', description: 'Elektrik projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@volt.com', address: 'İzmir, Türkiye', deadline: '20/02/2024' },
  { id: 32, department: 'İnşaat Mühendisliği', company: 'Beton Ltd.', description: 'Şantiye projelerinde çalışacak stajyer arıyoruz.', contact: 'info@beton.com', address: 'Antalya, Türkiye', deadline: '15/02/2024' },
  { id: 33, department: 'Kimya Mühendisliği', company: 'Analiz Kimya', description: 'Laboratuvar projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@analizkimya.com', address: 'Bursa, Türkiye', deadline: '10/02/2024' },
  { id: 34, department: 'Gıda Mühendisliği', company: 'Tarım Ltd.', description: 'Gıda üretim hattında çalışacak stajyer arıyoruz.', contact: 'info@tarim.com', address: 'Adana, Türkiye', deadline: '05/02/2024' },
  { id: 35, department: 'Endüstri Mühendisliği', company: 'Proje A.Ş.', description: 'Verimlilik projelerinde çalışacak stajyer arıyoruz.', contact: 'iletisim@proje.com', address: 'Konya, Türkiye', deadline: '01/02/2024' },
  { id: 36, department: 'Bilgisayar Mühendisliği', company: 'Soft Bilgisayar', description: 'Bilgisayar sistemlerinde çalışacak stajyer arıyoruz.', contact: 'info@softbilgisayar.com', address: 'Gaziantep, Türkiye', deadline: '30/01/2024' },
  { id: 37, department: 'Mekatronik Mühendisliği', company: 'Robot A.Ş.', description: 'Robotik projelerde çalışacak stajyer arıyoruz.', contact: 'info@robot.com', address: 'Eskişehir, Türkiye', deadline: '25/01/2024' },
  { id: 38, department: 'Çevre Mühendisliği', company: 'Çevre Teknoloji', description: 'Çevre projelerinde çalışacak stajyer arıyoruz.', contact: 'iletisim@cevreteknoloji.com', address: 'Samsun, Türkiye', deadline: '20/01/2024' },
  { id: 39, department: 'Biyomedikal Mühendisliği', company: 'BioTech Ltd.', description: 'Tıbbi cihaz projelerinde görev alacak stajyer arıyoruz.', contact: 'info@biotech.com', address: 'Kayseri, Türkiye', deadline: '15/01/2024' },
  { id: 40, department: 'Otomotiv Mühendisliği', company: 'Motor A.Ş.', description: 'Otomotiv üretim hattında çalışacak stajyer arıyoruz.', contact: 'iletisim@motor.com', address: 'Mersin, Türkiye', deadline: '10/01/2024' },
  { id: 41, department: 'Havacılık Mühendisliği', company: 'Gökyüzü Ltd.', description: 'Havacılık projelerinde görev alacak stajyer arıyoruz.', contact: 'info@gokyuzu.com', address: 'Trabzon, Türkiye', deadline: '05/01/2024' },
  { id: 42, department: 'Maden Mühendisliği', company: 'Maden Yapı', description: 'Maden sahasında çalışacak stajyer arıyoruz.', contact: 'iletisim@madenyapi.com', address: 'Zonguldak, Türkiye', deadline: '01/01/2024' },
  { id: 43, department: 'Yazılım Mühendisliği', company: 'Kodlama Teknoloji', description: 'Web geliştirme projelerinde görev alacak stajyer arıyoruz.', contact: 'info@kodlama.com', address: 'İstanbul, Türkiye', deadline: '30/12/2023' },
  { id: 44, department: 'Makine Mühendisliği', company: 'Makina Mühendislik', description: 'Makine üretim hattında çalışacak stajyer arıyoruz.', contact: 'hr@makina.com', address: 'Ankara, Türkiye', deadline: '25/12/2023' },
  { id: 45, department: 'Elektrik Mühendisliği', company: 'Enerji Teknoloji', description: 'Enerji projelerinde çalışacak stajyer arıyoruz.', contact: 'iletisim@enerjiteknoloji.com', address: 'İzmir, Türkiye', deadline: '20/12/2023' },
  { id: 46, department: 'İnşaat Mühendisliği', company: 'Şantiye Ltd.', description: 'Şantiye projelerinde çalışacak stajyer arıyoruz.', contact: 'info@santiye.com', address: 'Antalya, Türkiye', deadline: '15/12/2023' },
  { id: 47, department: 'Kimya Mühendisliği', company: 'LabTek Kimya', description: 'Laboratuvar projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@labtekkimya.com', address: 'Bursa, Türkiye', deadline: '10/12/2023' },
  { id: 48, department: 'Gıda Mühendisliği', company: 'Besin Teknoloji', description: 'Gıda üretim hattında çalışacak stajyer arıyoruz.', contact: 'info@besinteknoloji.com', address: 'Adana, Türkiye', deadline: '05/12/2023' },
  { id: 49, department: 'Endüstri Mühendisliği', company: 'Proje Teknoloji', description: 'Verimlilik projelerinde çalışacak stajyer arıyoruz.', contact: 'iletisim@projeteknoloji.com', address: 'Konya, Türkiye', deadline: '01/12/2023' },
  { id: 50, department: 'Bilgisayar Mühendisliği', company: 'Teknoloji Bilgisayar', description: 'Bilgisayar sistemlerinde çalışacak stajyer arıyoruz.', contact: 'info@teknolojibilgisayar.com', address: 'Gaziantep, Türkiye', deadline: '30/11/2023' },
  { id: 1, department: 'Yazılım Mühendisliği', company: 'ABC Teknoloji', description: 'Yazılım geliştirme projelerinde görev alacak stajyer arıyoruz.', contact: 'info@abc.com', address: 'İstanbul, Türkiye', deadline: '30/06/2024' },
  { id: 2, department: 'Makine Mühendisliği', company: 'XYZ Mühendislik', description: 'Üretim hattında çalışacak stajyer arıyoruz.', contact: 'hr@xyz.com', address: 'Ankara, Türkiye', deadline: '25/06/2024' },
  { id: 3, department: 'Elektrik Mühendisliği', company: 'Elektrik A.Ş.', description: 'Elektrik projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@elektrik.com', address: 'İzmir, Türkiye', deadline: '20/06/2024' },
  { id: 4, department: 'İnşaat Mühendisliği', company: 'İnşaat Ltd.', description: 'Şantiye projelerinde görev alacak stajyer arıyoruz.', contact: 'info@insaat.com', address: 'Antalya, Türkiye', deadline: '15/06/2024' },
  { id: 5, department: 'Kimya Mühendisliği', company: 'Kimya A.Ş.', description: 'Laboratuvar projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@kimya.com', address: 'Bursa, Türkiye', deadline: '10/06/2024' },
  { id: 6, department: 'Gıda Mühendisliği', company: 'Gıda Ltd.', description: 'Gıda üretim hattında çalışacak stajyer arıyoruz.', contact: 'info@gida.com', address: 'Adana, Türkiye', deadline: '05/06/2024' },
  { id: 7, department: 'Endüstri Mühendisliği', company: 'Endüstri A.Ş.', description: 'Verimlilik projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@endustri.com', address: 'Konya, Türkiye', deadline: '01/06/2024' },
  { id: 8, department: 'Bilgisayar Mühendisliği', company: 'Tekno Bilgisayar', description: 'Bilgisayar sistemlerinde çalışacak stajyer arıyoruz.', contact: 'info@teknobilgisayar.com', address: 'Gaziantep, Türkiye', deadline: '30/05/2024' },
  { id: 9, department: 'Mekatronik Mühendisliği', company: 'Mekatronik Ltd.', description: 'Robotik projelerde çalışacak stajyer arıyoruz.', contact: 'info@mekatronik.com', address: 'Eskişehir, Türkiye', deadline: '25/05/2024' },
  { id: 10, department: 'Çevre Mühendisliği', company: 'Çevre A.Ş.', description: 'Çevre projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@cevre.com', address: 'Samsun, Türkiye', deadline: '20/05/2024' },
  { id: 11, department: 'Biyomedikal Mühendisliği', company: 'BioMed Ltd.', description: 'Tıbbi cihaz projelerinde çalışacak stajyer arıyoruz.', contact: 'info@biomed.com', address: 'Kayseri, Türkiye', deadline: '15/05/2024' },
  { id: 12, department: 'Otomotiv Mühendisliği', company: 'Oto A.Ş.', description: 'Otomotiv üretim hattında çalışacak stajyer arıyoruz.', contact: 'iletisim@oto.com', address: 'Mersin, Türkiye', deadline: '10/05/2024' },
  { id: 13, department: 'Havacılık Mühendisliği', company: 'Havacılık Ltd.', description: 'Havacılık projelerinde görev alacak stajyer arıyoruz.', contact: 'info@havacilik.com', address: 'Trabzon, Türkiye', deadline: '05/05/2024' },
  { id: 14, department: 'Maden Mühendisliği', company: 'Maden A.Ş.', description: 'Maden sahasında çalışacak stajyer arıyoruz.', contact: 'iletisim@maden.com', address: 'Zonguldak, Türkiye', deadline: '01/05/2024' },
  { id: 15, department: 'Yazılım Mühendisliği', company: 'Dijital Teknoloji', description: 'Web geliştirme projelerinde görev alacak stajyer arıyoruz.', contact: 'info@dijital.com', address: 'İstanbul, Türkiye', deadline: '30/04/2024' },
  { id: 16, department: 'Makine Mühendisliği', company: 'Üretim Mühendislik', description: 'Makine üretim hattında çalışacak stajyer arıyoruz.', contact: 'hr@uretim.com', address: 'Ankara, Türkiye', deadline: '25/04/2024' },
  { id: 17, department: 'Elektrik Mühendisliği', company: 'Enerji A.Ş.', description: 'Enerji projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@enerji.com', address: 'İzmir, Türkiye', deadline: '20/04/2024' },
  { id: 18, department: 'İnşaat Mühendisliği', company: 'Yapı Ltd.', description: 'Şantiye projelerinde çalışacak stajyer arıyoruz.', contact: 'info@yapi.com', address: 'Antalya, Türkiye', deadline: '15/04/2024' },
  { id: 19, department: 'Kimya Mühendisliği', company: 'Lab Kimya', description: 'Laboratuvar projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@labkimya.com', address: 'Bursa, Türkiye', deadline: '10/04/2024' },
  { id: 20, department: 'Gıda Mühendisliği', company: 'Besin Ltd.', description: 'Gıda üretim hattında çalışacak stajyer arıyoruz.', contact: 'info@besin.com', address: 'Adana, Türkiye', deadline: '05/04/2024' },
  { id: 21, department: 'Endüstri Mühendisliği', company: 'Sanayi A.Ş.', description: 'Verimlilik projelerinde çalışacak stajyer arıyoruz.', contact: 'iletisim@sanayi.com', address: 'Konya, Türkiye', deadline: '01/04/2024' },
  { id: 22, department: 'Bilgisayar Mühendisliği', company: 'Tech Bilgisayar', description: 'Bilgisayar sistemlerinde çalışacak stajyer arıyoruz.', contact: 'info@techbilgisayar.com', address: 'Gaziantep, Türkiye', deadline: '30/03/2024' },
  { id: 23, department: 'Mekatronik Mühendisliği', company: 'Robotik Ltd.', description: 'Robotik projelerde çalışacak stajyer arıyoruz.', contact: 'info@robotik.com', address: 'Eskişehir, Türkiye', deadline: '25/03/2024' },
  { id: 24, department: 'Çevre Mühendisliği', company: 'Eko A.Ş.', description: 'Çevre projelerinde çalışacak stajyer arıyoruz.', contact: 'iletisim@eko.com', address: 'Samsun, Türkiye', deadline: '20/03/2024' },
  { id: 25, department: 'Biyomedikal Mühendisliği', company: 'Medikal Ltd.', description: 'Tıbbi cihaz projelerinde görev alacak stajyer arıyoruz.', contact: 'info@medikal.com', address: 'Kayseri, Türkiye', deadline: '15/03/2024' },
  { id: 26, department: 'Otomotiv Mühendisliği', company: 'Araç A.Ş.', description: 'Otomotiv üretim hattında çalışacak stajyer arıyoruz.', contact: 'iletisim@arac.com', address: 'Mersin, Türkiye', deadline: '10/03/2024' },
  { id: 27, department: 'Havacılık Mühendisliği', company: 'Uçak Ltd.', description: 'Havacılık projelerinde görev alacak stajyer arıyoruz.', contact: 'info@ucak.com', address: 'Trabzon, Türkiye', deadline: '05/03/2024' },
  { id: 28, department: 'Maden Mühendisliği', company: 'Maden Teknoloji', description: 'Maden sahasında çalışacak stajyer arıyoruz.', contact: 'iletisim@madenteknoloji.com', address: 'Zonguldak, Türkiye', deadline: '01/03/2024' },
  { id: 29, department: 'Yazılım Mühendisliği', company: 'Kodu Teknoloji', description: 'Mobil uygulama geliştirme projelerinde görev alacak stajyer arıyoruz.', contact: 'info@kodu.com', address: 'İstanbul, Türkiye', deadline: '28/02/2024' },
  { id: 30, department: 'Makine Mühendisliği', company: 'Teknik Mühendislik', description: 'Makine üretim hattında çalışacak stajyer arıyoruz.', contact: 'hr@teknik.com', address: 'Ankara, Türkiye', deadline: '25/02/2024' },
  { id: 31, department: 'Elektrik Mühendisliği', company: 'Volt A.Ş.', description: 'Elektrik projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@volt.com', address: 'İzmir, Türkiye', deadline: '20/02/2024' },
  { id: 32, department: 'İnşaat Mühendisliği', company: 'Beton Ltd.', description: 'Şantiye projelerinde çalışacak stajyer arıyoruz.', contact: 'info@beton.com', address: 'Antalya, Türkiye', deadline: '15/02/2024' },
  { id: 33, department: 'Kimya Mühendisliği', company: 'Analiz Kimya', description: 'Laboratuvar projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@analizkimya.com', address: 'Bursa, Türkiye', deadline: '10/02/2024' },
  { id: 34, department: 'Gıda Mühendisliği', company: 'Tarım Ltd.', description: 'Gıda üretim hattında çalışacak stajyer arıyoruz.', contact: 'info@tarim.com', address: 'Adana, Türkiye', deadline: '05/02/2024' },
  { id: 35, department: 'Endüstri Mühendisliği', company: 'Proje A.Ş.', description: 'Verimlilik projelerinde çalışacak stajyer arıyoruz.', contact: 'iletisim@proje.com', address: 'Konya, Türkiye', deadline: '01/02/2024' },
  { id: 36, department: 'Bilgisayar Mühendisliği', company: 'Soft Bilgisayar', description: 'Bilgisayar sistemlerinde çalışacak stajyer arıyoruz.', contact: 'info@softbilgisayar.com', address: 'Gaziantep, Türkiye', deadline: '30/01/2024' },
  { id: 37, department: 'Mekatronik Mühendisliği', company: 'Robot A.Ş.', description: 'Robotik projelerde çalışacak stajyer arıyoruz.', contact: 'info@robot.com', address: 'Eskişehir, Türkiye', deadline: '25/01/2024' },
  { id: 38, department: 'Çevre Mühendisliği', company: 'Çevre Teknoloji', description: 'Çevre projelerinde çalışacak stajyer arıyoruz.', contact: 'iletisim@cevreteknoloji.com', address: 'Samsun, Türkiye', deadline: '20/01/2024' },
  { id: 39, department: 'Biyomedikal Mühendisliği', company: 'BioTech Ltd.', description: 'Tıbbi cihaz projelerinde görev alacak stajyer arıyoruz.', contact: 'info@biotech.com', address: 'Kayseri, Türkiye', deadline: '15/01/2024' },
  { id: 40, department: 'Otomotiv Mühendisliği', company: 'Motor A.Ş.', description: 'Otomotiv üretim hattında çalışacak stajyer arıyoruz.', contact: 'iletisim@motor.com', address: 'Mersin, Türkiye', deadline: '10/01/2024' },
  { id: 41, department: 'Havacılık Mühendisliği', company: 'Gökyüzü Ltd.', description: 'Havacılık projelerinde görev alacak stajyer arıyoruz.', contact: 'info@gokyuzu.com', address: 'Trabzon, Türkiye', deadline: '05/01/2024' },
  { id: 42, department: 'Maden Mühendisliği', company: 'Maden Yapı', description: 'Maden sahasında çalışacak stajyer arıyoruz.', contact: 'iletisim@madenyapi.com', address: 'Zonguldak, Türkiye', deadline: '01/01/2024' },
  { id: 43, department: 'Yazılım Mühendisliği', company: 'Kodlama Teknoloji', description: 'Web geliştirme projelerinde görev alacak stajyer arıyoruz.', contact: 'info@kodlama.com', address: 'İstanbul, Türkiye', deadline: '30/12/2023' },
  { id: 44, department: 'Makine Mühendisliği', company: 'Makina Mühendislik', description: 'Makine üretim hattında çalışacak stajyer arıyoruz.', contact: 'hr@makina.com', address: 'Ankara, Türkiye', deadline: '25/12/2023' },
  { id: 45, department: 'Elektrik Mühendisliği', company: 'Enerji Teknoloji', description: 'Enerji projelerinde çalışacak stajyer arıyoruz.', contact: 'iletisim@enerjiteknoloji.com', address: 'İzmir, Türkiye', deadline: '20/12/2023' },
  { id: 46, department: 'İnşaat Mühendisliği', company: 'Şantiye Ltd.', description: 'Şantiye projelerinde çalışacak stajyer arıyoruz.', contact: 'info@santiye.com', address: 'Antalya, Türkiye', deadline: '15/12/2023' },
  { id: 47, department: 'Kimya Mühendisliği', company: 'LabTek Kimya', description: 'Laboratuvar projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@labtekkimya.com', address: 'Bursa, Türkiye', deadline: '10/12/2023' },
  { id: 48, department: 'Gıda Mühendisliği', company: 'Besin Teknoloji', description: 'Gıda üretim hattında çalışacak stajyer arıyoruz.', contact: 'info@besinteknoloji.com', address: 'Adana, Türkiye', deadline: '05/12/2023' },
  { id: 49, department: 'Endüstri Mühendisliği', company: 'Proje Teknoloji', description: 'Verimlilik projelerinde çalışacak stajyer arıyoruz.', contact: 'iletisim@projeteknoloji.com', address: 'Konya, Türkiye', deadline: '01/12/2023' },
  { id: 50, department: 'Bilgisayar Mühendisliği', company: 'Teknoloji Bilgisayar', description: 'Bilgisayar sistemlerinde çalışacak stajyer arıyoruz.', contact: 'info@teknolojibilgisayar.com', address: 'Gaziantep, Türkiye', deadline: '30/11/2023' },
  { id: 1, department: 'Yazılım Mühendisliği', company: 'ABC Teknoloji', description: 'Yazılım geliştirme projelerinde görev alacak stajyer arıyoruz.', contact: 'info@abc.com', address: 'İstanbul, Türkiye', deadline: '30/06/2024' },
  { id: 2, department: 'Makine Mühendisliği', company: 'XYZ Mühendislik', description: 'Üretim hattında çalışacak stajyer arıyoruz.', contact: 'hr@xyz.com', address: 'Ankara, Türkiye', deadline: '25/06/2024' },
  { id: 3, department: 'Elektrik Mühendisliği', company: 'Elektrik A.Ş.', description: 'Elektrik projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@elektrik.com', address: 'İzmir, Türkiye', deadline: '20/06/2024' },
  { id: 4, department: 'İnşaat Mühendisliği', company: 'İnşaat Ltd.', description: 'Şantiye projelerinde görev alacak stajyer arıyoruz.', contact: 'info@insaat.com', address: 'Antalya, Türkiye', deadline: '15/06/2024' },
  { id: 5, department: 'Kimya Mühendisliği', company: 'Kimya A.Ş.', description: 'Laboratuvar projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@kimya.com', address: 'Bursa, Türkiye', deadline: '10/06/2024' },
  { id: 6, department: 'Gıda Mühendisliği', company: 'Gıda Ltd.', description: 'Gıda üretim hattında çalışacak stajyer arıyoruz.', contact: 'info@gida.com', address: 'Adana, Türkiye', deadline: '05/06/2024' },
  { id: 7, department: 'Endüstri Mühendisliği', company: 'Endüstri A.Ş.', description: 'Verimlilik projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@endustri.com', address: 'Konya, Türkiye', deadline: '01/06/2024' },
  { id: 8, department: 'Bilgisayar Mühendisliği', company: 'Tekno Bilgisayar', description: 'Bilgisayar sistemlerinde çalışacak stajyer arıyoruz.', contact: 'info@teknobilgisayar.com', address: 'Gaziantep, Türkiye', deadline: '30/05/2024' },
  { id: 9, department: 'Mekatronik Mühendisliği', company: 'Mekatronik Ltd.', description: 'Robotik projelerde çalışacak stajyer arıyoruz.', contact: 'info@mekatronik.com', address: 'Eskişehir, Türkiye', deadline: '25/05/2024' },
  { id: 10, department: 'Çevre Mühendisliği', company: 'Çevre A.Ş.', description: 'Çevre projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@cevre.com', address: 'Samsun, Türkiye', deadline: '20/05/2024' },
  { id: 11, department: 'Biyomedikal Mühendisliği', company: 'BioMed Ltd.', description: 'Tıbbi cihaz projelerinde çalışacak stajyer arıyoruz.', contact: 'info@biomed.com', address: 'Kayseri, Türkiye', deadline: '15/05/2024' },
  { id: 12, department: 'Otomotiv Mühendisliği', company: 'Oto A.Ş.', description: 'Otomotiv üretim hattında çalışacak stajyer arıyoruz.', contact: 'iletisim@oto.com', address: 'Mersin, Türkiye', deadline: '10/05/2024' },
  { id: 13, department: 'Havacılık Mühendisliği', company: 'Havacılık Ltd.', description: 'Havacılık projelerinde görev alacak stajyer arıyoruz.', contact: 'info@havacilik.com', address: 'Trabzon, Türkiye', deadline: '05/05/2024' },
  { id: 14, department: 'Maden Mühendisliği', company: 'Maden A.Ş.', description: 'Maden sahasında çalışacak stajyer arıyoruz.', contact: 'iletisim@maden.com', address: 'Zonguldak, Türkiye', deadline: '01/05/2024' },
  { id: 15, department: 'Yazılım Mühendisliği', company: 'Dijital Teknoloji', description: 'Web geliştirme projelerinde görev alacak stajyer arıyoruz.', contact: 'info@dijital.com', address: 'İstanbul, Türkiye', deadline: '30/04/2024' },
  { id: 16, department: 'Makine Mühendisliği', company: 'Üretim Mühendislik', description: 'Makine üretim hattında çalışacak stajyer arıyoruz.', contact: 'hr@uretim.com', address: 'Ankara, Türkiye', deadline: '25/04/2024' },
  { id: 17, department: 'Elektrik Mühendisliği', company: 'Enerji A.Ş.', description: 'Enerji projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@enerji.com', address: 'İzmir, Türkiye', deadline: '20/04/2024' },
  { id: 18, department: 'İnşaat Mühendisliği', company: 'Yapı Ltd.', description: 'Şantiye projelerinde çalışacak stajyer arıyoruz.', contact: 'info@yapi.com', address: 'Antalya, Türkiye', deadline: '15/04/2024' },
  { id: 19, department: 'Kimya Mühendisliği', company: 'Lab Kimya', description: 'Laboratuvar projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@labkimya.com', address: 'Bursa, Türkiye', deadline: '10/04/2024' },
  { id: 20, department: 'Gıda Mühendisliği', company: 'Besin Ltd.', description: 'Gıda üretim hattında çalışacak stajyer arıyoruz.', contact: 'info@besin.com', address: 'Adana, Türkiye', deadline: '05/04/2024' },
  { id: 21, department: 'Endüstri Mühendisliği', company: 'Sanayi A.Ş.', description: 'Verimlilik projelerinde çalışacak stajyer arıyoruz.', contact: 'iletisim@sanayi.com', address: 'Konya, Türkiye', deadline: '01/04/2024' },
  { id: 22, department: 'Bilgisayar Mühendisliği', company: 'Tech Bilgisayar', description: 'Bilgisayar sistemlerinde çalışacak stajyer arıyoruz.', contact: 'info@techbilgisayar.com', address: 'Gaziantep, Türkiye', deadline: '30/03/2024' },
  { id: 23, department: 'Mekatronik Mühendisliği', company: 'Robotik Ltd.', description: 'Robotik projelerde çalışacak stajyer arıyoruz.', contact: 'info@robotik.com', address: 'Eskişehir, Türkiye', deadline: '25/03/2024' },
  { id: 24, department: 'Çevre Mühendisliği', company: 'Eko A.Ş.', description: 'Çevre projelerinde çalışacak stajyer arıyoruz.', contact: 'iletisim@eko.com', address: 'Samsun, Türkiye', deadline: '20/03/2024' },
  { id: 25, department: 'Biyomedikal Mühendisliği', company: 'Medikal Ltd.', description: 'Tıbbi cihaz projelerinde görev alacak stajyer arıyoruz.', contact: 'info@medikal.com', address: 'Kayseri, Türkiye', deadline: '15/03/2024' },
  { id: 26, department: 'Otomotiv Mühendisliği', company: 'Araç A.Ş.', description: 'Otomotiv üretim hattında çalışacak stajyer arıyoruz.', contact: 'iletisim@arac.com', address: 'Mersin, Türkiye', deadline: '10/03/2024' },
  { id: 27, department: 'Havacılık Mühendisliği', company: 'Uçak Ltd.', description: 'Havacılık projelerinde görev alacak stajyer arıyoruz.', contact: 'info@ucak.com', address: 'Trabzon, Türkiye', deadline: '05/03/2024' },
  { id: 28, department: 'Maden Mühendisliği', company: 'Maden Teknoloji', description: 'Maden sahasında çalışacak stajyer arıyoruz.', contact: 'iletisim@madenteknoloji.com', address: 'Zonguldak, Türkiye', deadline: '01/03/2024' },
  { id: 29, department: 'Yazılım Mühendisliği', company: 'Kodu Teknoloji', description: 'Mobil uygulama geliştirme projelerinde görev alacak stajyer arıyoruz.', contact: 'info@kodu.com', address: 'İstanbul, Türkiye', deadline: '28/02/2024' },
  { id: 30, department: 'Makine Mühendisliği', company: 'Teknik Mühendislik', description: 'Makine üretim hattında çalışacak stajyer arıyoruz.', contact: 'hr@teknik.com', address: 'Ankara, Türkiye', deadline: '25/02/2024' },
  { id: 31, department: 'Elektrik Mühendisliği', company: 'Volt A.Ş.', description: 'Elektrik projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@volt.com', address: 'İzmir, Türkiye', deadline: '20/02/2024' },
  { id: 32, department: 'İnşaat Mühendisliği', company: 'Beton Ltd.', description: 'Şantiye projelerinde çalışacak stajyer arıyoruz.', contact: 'info@beton.com', address: 'Antalya, Türkiye', deadline: '15/02/2024' },
  { id: 33, department: 'Kimya Mühendisliği', company: 'Analiz Kimya', description: 'Laboratuvar projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@analizkimya.com', address: 'Bursa, Türkiye', deadline: '10/02/2024' },
  { id: 34, department: 'Gıda Mühendisliği', company: 'Tarım Ltd.', description: 'Gıda üretim hattında çalışacak stajyer arıyoruz.', contact: 'info@tarim.com', address: 'Adana, Türkiye', deadline: '05/02/2024' },
  { id: 35, department: 'Endüstri Mühendisliği', company: 'Proje A.Ş.', description: 'Verimlilik projelerinde çalışacak stajyer arıyoruz.', contact: 'iletisim@proje.com', address: 'Konya, Türkiye', deadline: '01/02/2024' },
  { id: 36, department: 'Bilgisayar Mühendisliği', company: 'Soft Bilgisayar', description: 'Bilgisayar sistemlerinde çalışacak stajyer arıyoruz.', contact: 'info@softbilgisayar.com', address: 'Gaziantep, Türkiye', deadline: '30/01/2024' },
  { id: 37, department: 'Mekatronik Mühendisliği', company: 'Robot A.Ş.', description: 'Robotik projelerde çalışacak stajyer arıyoruz.', contact: 'info@robot.com', address: 'Eskişehir, Türkiye', deadline: '25/01/2024' },
  { id: 38, department: 'Çevre Mühendisliği', company: 'Çevre Teknoloji', description: 'Çevre projelerinde çalışacak stajyer arıyoruz.', contact: 'iletisim@cevreteknoloji.com', address: 'Samsun, Türkiye', deadline: '20/01/2024' },
  { id: 39, department: 'Biyomedikal Mühendisliği', company: 'BioTech Ltd.', description: 'Tıbbi cihaz projelerinde görev alacak stajyer arıyoruz.', contact: 'info@biotech.com', address: 'Kayseri, Türkiye', deadline: '15/01/2024' },
  { id: 40, department: 'Otomotiv Mühendisliği', company: 'Motor A.Ş.', description: 'Otomotiv üretim hattında çalışacak stajyer arıyoruz.', contact: 'iletisim@motor.com', address: 'Mersin, Türkiye', deadline: '10/01/2024' },
  { id: 41, department: 'Havacılık Mühendisliği', company: 'Gökyüzü Ltd.', description: 'Havacılık projelerinde görev alacak stajyer arıyoruz.', contact: 'info@gokyuzu.com', address: 'Trabzon, Türkiye', deadline: '05/01/2024' },
  { id: 42, department: 'Maden Mühendisliği', company: 'Maden Yapı', description: 'Maden sahasında çalışacak stajyer arıyoruz.', contact: 'iletisim@madenyapi.com', address: 'Zonguldak, Türkiye', deadline: '01/01/2024' },
  { id: 43, department: 'Yazılım Mühendisliği', company: 'Kodlama Teknoloji', description: 'Web geliştirme projelerinde görev alacak stajyer arıyoruz.', contact: 'info@kodlama.com', address: 'İstanbul, Türkiye', deadline: '30/12/2023' },
  { id: 44, department: 'Makine Mühendisliği', company: 'Makina Mühendislik', description: 'Makine üretim hattında çalışacak stajyer arıyoruz.', contact: 'hr@makina.com', address: 'Ankara, Türkiye', deadline: '25/12/2023' },
  { id: 45, department: 'Elektrik Mühendisliği', company: 'Enerji Teknoloji', description: 'Enerji projelerinde çalışacak stajyer arıyoruz.', contact: 'iletisim@enerjiteknoloji.com', address: 'İzmir, Türkiye', deadline: '20/12/2023' },
  { id: 46, department: 'İnşaat Mühendisliği', company: 'Şantiye Ltd.', description: 'Şantiye projelerinde çalışacak stajyer arıyoruz.', contact: 'info@santiye.com', address: 'Antalya, Türkiye', deadline: '15/12/2023' },
  { id: 47, department: 'Kimya Mühendisliği', company: 'LabTek Kimya', description: 'Laboratuvar projelerinde görev alacak stajyer arıyoruz.', contact: 'iletisim@labtekkimya.com', address: 'Bursa, Türkiye', deadline: '10/12/2023' },
  { id: 48, department: 'Gıda Mühendisliği', company: 'Besin Teknoloji', description: 'Gıda üretim hattında çalışacak stajyer arıyoruz.', contact: 'info@besinteknoloji.com', address: 'Adana, Türkiye', deadline: '05/12/2023' },
  { id: 49, department: 'Endüstri Mühendisliği', company: 'Proje Teknoloji', description: 'Verimlilik projelerinde çalışacak stajyer arıyoruz.', contact: 'iletisim@projeteknoloji.com', address: 'Konya, Türkiye', deadline: '01/12/2023' },
  { id: 50, department: 'Bilgisayar Mühendisliği', company: 'Teknoloji Bilgisayar', description: 'Bilgisayar sistemlerinde çalışacak stajyer arıyoruz.', contact: 'info@teknolojibilgisayar.com', address: 'Gaziantep, Türkiye', deadline: '30/11/2023' },
];


const PAGE_SIZE = 10;

const InternshipScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(internshipListings.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentData = internshipListings.slice(startIndex, endIndex);

  const renderItem = ({ item }) => (
    <View style={styles.internshipContainer}>
      <Image source={ images.logo } style={styles.companyLogo} />
      <View>
        <Text style={styles.internshipDepartment}>{item.department}</Text>
        <Text style={styles.internshipCompany}>{item.company}</Text>
        <Text style={styles.internshipDescription}>{item.description}</Text>
        <Text style={styles.internshipContact}>İletişim: {item.contact}</Text>
        <Text style={styles.internshipAddress}>Adres: {item.address}</Text>
        <Text style={styles.internshipDeadline}>Son Başvuru Tarihi: {item.deadline}</Text>
      </View>
    </View>
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return (
      <View style={styles.paginationContainer}>
        {pages.map((page, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.pageButton,
              currentPage === page && styles.activePageButton
            ]}
            onPress={() => page !== '...' && handlePageChange(page)}
          >
            <Text style={styles.pageButtonText}>{page}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.heading}>Staj İlanları</Text>
      <FlatList
        data={currentData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
      {renderPagination()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.text,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  internshipContainer: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  companyLogo: {
    width: 150,
    height: 64,
    alignSelf: "center",
    resizeMode: "contain"
  },
  internshipDepartment: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.secondary,
  },
  internshipCompany: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text,
  },
  internshipDescription: {
    fontSize: 14,
    marginBottom: 10,
    color: colors.text,
  },
  internshipContact: {
    fontSize: 14,
    marginBottom: 10,
    color: colors.text,
  },
  internshipAddress: {
    fontSize: 14,
    marginBottom: 10,
    color: colors.text,
  },
  internshipDeadline: {
    fontSize: 14,
    color: colors.text,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  pageButton: {
    margin: 5,
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  activePageButton: {
    backgroundColor: colors.secondary,
  },
  pageButtonText: {
    color: colors.text,
  },
});

export default InternshipScreen;
