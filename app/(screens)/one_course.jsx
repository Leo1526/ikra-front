import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { Slider } from 'react-native-elements';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { colors, text, fonts } from '../../design/themes';
import RNPickerSelect from 'react-native-picker-select';
import { TextInput } from 'react-native-paper';
import * as myStyle from "../../design/style"


const exampleCourseResponse = {
  id: 1,
  departmentId: 1,
  universityId: 1,
  name: "Fundamentals of Artificial Intelligence",
  courseCode: "BBM405",
  website: "www.example.com",
  instructors: ["Dr. Ali Veli", "Prof. Dr. Ayşe Yılmaz"],
  courseStatResponse: {
    gradeMap: {
      A1: 10,
      A2: 15,
      A3: 12,
      B1: 22,
      B2: 30,
      B3: 28,
      C1: 20,
      C2: 25,
      C3: 18,
      D: 8,
      F: 5,
    },
    difficultyAvg: 7.4,
    qualityAvg: 8.9,
    hours: {
      FIFTEEN_TWENTY: 10,
      TEN_FIFTEEN: 20,
      ZERO_FIVE: 5,
      TWENTY_TWENTYFIVE: 8,
      FIVE_TEN: 15,
      TWENTYFIVE_THIRTY: 12
    }
  },
  idate: null
};

const gradeValueMap = {
  A1: 4.0,
  A2: 3.75,
  A3: 3.5,
  B1: 3.25,
  B2: 3.0,
  B3: 2.75,
  C1: 2.50,
  C2: 2.25,
  C3: 2.0,
  D: 1.75,
  F: 0.0
};

const difficultyDescriptions = [
  "Çocuk Oyuncağı",
  "Çantada Keklik",
  "Kolay Lokma",
  "Hallederiz",
  "Orta Şeker",
  "Allah Kabul Etsin",
  "Zahmetli",
  "Beyin Yakıcı",
  "Kabus",
  "BÖLÜM SONU CANAVARI"
];

const qualityDescriptions = [
  "Berbat Ötesi",
  "Eh İşte",
  "İdare Eder",
  "Güzelmiş",
  "Efsane!"
];



const CourseDetailPage = ({ initialDifficulty = 1, maxDifficulty = 10, minDifficulty = 1 }) => {
  const route = useRoute();
  const { course } = route.params;
  const [courseDetails, setCourseDetails] = useState(null);
  const [showGradePieChart, setShowGradePieChart] = useState(false);
  const [showHoursPieChart, setShowHoursPieChart] = useState(false);
  const [comment, setComment] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [qualityRating, setQualityRating] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [selectedHours, setSelectedHours] = useState('');

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // Backend yerine sabit veriden veri çekme işlemi
        const data = exampleCourseResponse;
        setCourseDetails(data || {});
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    if (course) {
      fetchCourseDetails();
    }
  }, [course]);

  if (!courseDetails) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }


  const gradeData = [
    { label: 'A1', value: courseDetails.courseStatResponse.gradeMap.A1, color: '#FFD700', gradientCenterColor: '#FFFF00' },
    { label: 'A2', value: courseDetails.courseStatResponse.gradeMap.A2, color: '#FF6347', gradientCenterColor: '#FF4500' },
    { label: 'A3', value: courseDetails.courseStatResponse.gradeMap.A3, color: '#00CED1', gradientCenterColor: '#40E0D0' },
    { label: 'B1', value: courseDetails.courseStatResponse.gradeMap.B1, color: '#1E90FF', gradientCenterColor: '#4169E1' },
    { label: 'B2', value: courseDetails.courseStatResponse.gradeMap.B2, color: '#0000FF', gradientCenterColor: '#0000CD' },
    { label: 'B3', value: courseDetails.courseStatResponse.gradeMap.B3, color: '#8A2BE2', gradientCenterColor: '#9400D3' },
    { label: 'C1', value: courseDetails.courseStatResponse.gradeMap.C1, color: '#32CD32', gradientCenterColor: '#00FF00' },
    { label: 'C2', value: courseDetails.courseStatResponse.gradeMap.C2, color: '#FF8C00', gradientCenterColor: '#FFA500' },
    { label: 'C3', value: courseDetails.courseStatResponse.gradeMap.C3, color: '#00FA9A', gradientCenterColor: '#00FF7F' },
    { label: 'D', value: courseDetails.courseStatResponse.gradeMap.D, color: '#FF1493', gradientCenterColor: '#FF69B4' },
    { label: 'F', value: courseDetails.courseStatResponse.gradeMap.F, color: '#ADFF2F', gradientCenterColor: '#7FFF00' },
  ];


  const gradePieData = gradeData.map(({ label, value, color, gradientCenterColor }) => ({
    value,
    color,
    gradientCenterColor,
    text: label,
  }));


  const hoursData = [
    { label: '0-5', value: courseDetails.courseStatResponse.hours.ZERO_FIVE, frontColor: '#006DFF', gradientColor: '#009FFF' },
    { label: '5-10', value: courseDetails.courseStatResponse.hours.FIVE_TEN, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },
    { label: '10-15', value: courseDetails.courseStatResponse.hours.TEN_FIFTEEN, frontColor: '#006DFF', gradientColor: '#009FFF' },
    { label: '15-20', value: courseDetails.courseStatResponse.hours.FIFTEEN_TWENTY, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },
    { label: '20-25', value: courseDetails.courseStatResponse.hours.TWENTY_TWENTYFIVE, frontColor: '#006DFF', gradientColor: '#009FFF' },
    { label: '25-30', value: courseDetails.courseStatResponse.hours.TWENTYFIVE_THIRTY, frontColor: '#3BE9DE', gradientColor: '#93FCF8' },
  ];

  const hoursPieData = [
    { label: '0-5', value: courseDetails.courseStatResponse.hours.ZERO_FIVE, color: '#FF6347', gradientCenterColor: '#FF4500' },
    { label: '5-10', value: courseDetails.courseStatResponse.hours.FIVE_TEN, color: '#FF8C00', gradientCenterColor: '#FFA500' },
    { label: '10-15', value: courseDetails.courseStatResponse.hours.TEN_FIFTEEN, color: '#FFD700', gradientCenterColor: '#FFFF00' },
    { label: '15-20', value: courseDetails.courseStatResponse.hours.FIFTEEN_TWENTY, color: '#ADFF2F', gradientCenterColor: '#7FFF00' },
    { label: '20-25', value: courseDetails.courseStatResponse.hours.TWENTY_TWENTYFIVE, color: '#32CD32', gradientCenterColor: '#00FF00' },
    { label: '25-30', value: courseDetails.courseStatResponse.hours.TWENTYFIVE_THIRTY, color: '#00FA9A', gradientCenterColor: '#00FF7F' },
  ];



  const difficultyData = [
    {
      value: 20,
      color: '#009FFF',
      gradientCenterColor: '#006DFF',
      text: '0-2.5 Kolay',
    },
    {
      value: 30,
      color: '#93FCF8',
      gradientCenterColor: '#3BE9DE',
      text: '2.5-5 Orta',
    },
    {
      value: 40,
      color: '#BDB2FA',
      gradientCenterColor: '#8F80F3',
      text: '5-7.5 Zor',
    },
    {
      value: 10,
      color: '#FFA5BA',
      gradientCenterColor: '#FF7F97',
      text: '7.5-10 Çok Zor',
    },
  ];

  const calculateMeanGrade = (gradeMap) => {
    let totalScore = 0;
    let totalCount = 0;

    Object.keys(gradeMap).forEach(grade => {
      totalScore += gradeValueMap[grade] * gradeMap[grade];
      totalCount += gradeMap[grade];
    });

    const meanValue = totalCount === 0 ? 'N/A' : (totalScore / totalCount).toFixed(2);

    // Harf notunu dönmek için
    let meanGrade = 'N/A';
    for (const grade in gradeValueMap) {
      if (gradeValueMap[grade] == meanValue) {
        meanGrade = grade;
        break;
      } else if (gradeValueMap[grade] < meanValue) {
        meanGrade = grade;
        break;
      }
    }

    return meanGrade;
  };

  const meanGrade = calculateMeanGrade(courseDetails.courseStatResponse.gradeMap);

  const hoursValueMap = {
    'ZERO_FIVE': 2.5,
    'FIVE_TEN': 7.5,
    'TEN_FIFTEEN': 12.5,
    'FIFTEEN_TWENTY': 17.5,
    'TWENTY_TWENTYFIVE': 22.5,
    'TWENTYFIVE_THIRTY': 27.5
  };

  const calculateMeanHours = (hoursMap) => {
    let totalHours = 0;
    let totalCount = 0;

    Object.keys(hoursMap).forEach(hoursRange => {
      totalHours += hoursValueMap[hoursRange] * hoursMap[hoursRange];
      totalCount += hoursMap[hoursRange];
    });

    const meanHours = totalCount === 0 ? 'N/A' : (totalHours / totalCount).toFixed(1);

    return meanHours;
  };

  const meanHours = calculateMeanHours(courseDetails.courseStatResponse.hours);

  const renderDot = color => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const calculateMaxMinValues = (data) => {
    let max = -Infinity;
    let min = Infinity;

    data.forEach(item => {
      if (item.value > max) {
        max = item.value;
      }
      if (item.value < min) {
        min = item.value;
      }
    });

    max = max + 10;

    return { max, min };
  };

  // Harcanan saat verileri için dinamik max ve min hesaplama
  const { max: maxHours, min: minHours } = calculateMaxMinValues(hoursData);

  // Not dağılımı verileri için dinamik max ve min hesaplama
  const { max: maxGrades, min: minGrades } = calculateMaxMinValues(gradeData);


  const interpolateColor = (value) => {
    const red = Math.min(255, (value - 1) * 28);
    const green = Math.max(0, 255 - (value - 1) * 28);
    return `rgb(${red},${green},0)`;
  };
  
  const renderGradeLegendComponent = () => {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 }}>
        {gradePieData.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 10,
              marginBottom: 10,
            }}>
            {renderDot(item.color)}
            <Text style={{ color: 'white' }}>{item.text}: {item.value}</Text>
          </View>
        ))}
      </View>
    );
  };
  const renderHoursLegendComponent = () => {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 }}>
        {hoursPieData.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 10,
              marginBottom: 10,
            }}>
            {renderDot(item.color)}
            <Text style={{ color: 'white' }}>{item.label}: {item.value}</Text>
          </View>
        ))}
      </View>
    );
  };


  const renderLegendComponent = () => {
    return (
      <>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
          {difficultyData.slice(0, 2).map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 120,
                marginRight: 20,
              }}>
              {renderDot(item.color)}
              <Text style={{ color: 'white' }}>{item.text}: {item.value}%</Text>
            </View>
          ))}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {difficultyData.slice(2).map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 120,
                marginRight: 20,
              }}>
              {renderDot(item.color)}
              <Text style={{ color: 'white' }}>{item.text}: {item.value}%</Text>
            </View>
          ))}
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.logo} />
          <Text style={styles.title}>{courseDetails.name}</Text>
          <Text style={styles.sectionHeading}>Dersin kısa bir açıklaması:</Text>
          <Text style={styles.description}>Website: {courseDetails.website}</Text>
          <Text style={styles.sectionHeading}>Dersi Veren Hocalar</Text>
          {courseDetails.instructors?.map((instructor, index) => (
            <Text key={index} style={styles.instructor}>{instructor}</Text>
          ))}
          <Text style={styles.sectionHeading}>Not Dağılımı</Text>
          <View style={styles.chartWrapper}>
            <View style={styles.chartContainer}>
              {!showGradePieChart ? (
                <BarChart
                  data={gradeData}
                  barWidth={30}
                  initialSpacing={10}
                  showGradient
                  spacing={14}
                  barBorderRadius={4}
                  yAxisThickness={0}
                  xAxisType={'dashed'}
                  xAxisColor={'lightgray'}
                  yAxisTextStyle={{ color: 'lightgray' }}
                  stepValue={Math.ceil(maxGrades / 5)} // max değeri 5 bölüme ayırarak stepValue hesaplama
                  maxValue={maxGrades}
                  noOfSections={5} // 5 bölüm halinde gösterim
                  yAxisLabelTexts={Array.from({ length: 6 }, (_, i) => (i * Math.ceil(maxGrades / 5)).toString())} // 0, 10, 20, ... gibi değerler
                  labelWidth={40}
                  xAxisLabelTextStyle={{ color: 'lightgray', textAlign: 'center' }}
                  showLine
                  lineConfig={{
                    color: '#F29C6E',
                    thickness: 3,
                    curved: true,
                    hideDataPoints: true,
                    shiftY: 20,
                    initialSpacing: -5,
                  }}
                  frontColor={colors.primary}

                />
              ) : (
                <View style={{ alignItems: 'center' }}>
                  <PieChart
                    data={gradePieData}
                    donut
                    showGradient
                    sectionAutoFocus
                    focusOnPress
                    radius={90}
                    innerRadius={60}
                    innerCircleColor={'#232B5D'}
                    centerLabelComponent={() => {
                      return (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
                            {meanGrade}
                          </Text>
                          <Text style={{ fontSize: 14, color: 'white' }}>Ortalama Not</Text>
                        </View>
                      );
                    }}
                  />
                  {renderGradeLegendComponent()}
                </View>
              )}
            </View>
            <Button
              title={!showGradePieChart ? "Pie Chart Göster" : "Bar Chart Göster"}
              onPress={() => setShowGradePieChart(!showGradePieChart)}
            />
          </View>

          <Text style={styles.sectionHeading}>Saat Harcanma Dağılımı</Text>
          <View style={styles.chartWrapper}>
            <View style={styles.chartContainer}>
              {!showHoursPieChart ? (
                <BarChart
                  frontColor={colors.primary}
                  data={hoursData}
                  barWidth={30}
                  initialSpacing={10}
                  spacing={14}
                  barBorderRadius={4}
                  showGradient
                  yAxisThickness={0}
                  xAxisType={'dashed'}
                  xAxisColor={'lightgray'}
                  yAxisTextStyle={{ color: 'lightgray' }}
                  stepValue={Math.ceil(maxHours / 5)} // max değeri 5 bölüme ayırarak stepValue hesaplama
                  maxValue={maxHours}
                  noOfSections={5} // 5 bölüm halinde gösterim
                  yAxisLabelTexts={Array.from({ length: 6 }, (_, i) => (i * Math.ceil(maxHours / 5)).toString())} // 0, 10, 20, ... gibi değerler
                  labelWidth={40}
                  xAxisLabelTextStyle={{ color: 'lightgray', textAlign: 'center' }}
                  showLine
                  lineConfig={{
                    color: '#F29C6E',
                    thickness: 3,
                    curved: true,
                    hideDataPoints: true,
                    shiftY: 20,
                    initialSpacing: -5,
                  }}
                />
              ) : (
                <View style={{ alignItems: 'center' }}>
                  <PieChart
                    data={hoursPieData}
                    donut
                    showGradient
                    sectionAutoFocus
                    focusOnPress
                    radius={90}
                    innerRadius={60}
                    innerCircleColor={'#232B5D'}
                    centerLabelComponent={() => {
                      return (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
                            {meanHours}
                          </Text>
                          <Text style={{ fontSize: 14, color: 'white' }}>Ortalama Saat</Text>
                        </View>
                      );
                    }}
                  />
                  {renderHoursLegendComponent()}
                </View>

              )}

            </View>
            <Button
              title={!showHoursPieChart ? "Pie Chart Göster" : "Bar Chart Göster"}
              onPress={() => setShowHoursPieChart(!showHoursPieChart)}
            />
          </View>
          <Text style={styles.sectionHeading}>Kalite Ortalaması</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{courseDetails.courseStatResponse.qualityAvg?.toFixed(1) || 'N/A'}</Text>
            <Rating
              readonly
              startingValue={courseDetails.courseStatResponse.qualityAvg ? courseDetails.courseStatResponse.qualityAvg / 2 : 0}
              imageSize={30}
              fractions={1}
              ratingBackgroundColor={colors.secondaryBackground}
              ratingColor={colors.secondary}
            />
          </View>
          <Text style={styles.sectionHeading}>Zorluk Ortalaması</Text>
          <View style={styles.pieChartContainer}>
            <PieChart
              data={difficultyData}
              donut
              showGradient
              sectionAutoFocus
              focusOnPress
              radius={90}
              innerRadius={60}
              innerCircleColor={'#232B5D'}
              centerLabelComponent={() => {
                return (
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
                      {courseDetails.courseStatResponse.difficultyAvg?.toFixed(1) || 'N/A'}
                    </Text>
                    <Text style={{ fontSize: 14, color: 'white' }}>Ortalama Zorluk</Text>
                  </View>
                );
              }}
            />
            {renderLegendComponent()}
          </View>
          <Text style={styles.sectionHeading}>Yorumlar</Text>
          {courseDetails.yorumlar?.map((yorum) => (
            <View key={yorum.id} style={styles.commentContainer}>
              <Text style={styles.commentAuthor}>{yorum.yazar}:</Text>
              <Text style={styles.commentText}>{yorum.yorum}</Text>
            </View>
          ))}

          <View style={styles.commentForm}>
            <Text style={styles.ratingLabel}>Derse yorumunuz nedir?</Text>

            <TextInput
              label="Yorum"
              mode="outlined"
              value={comment}
              onChangeText={text => setComment(text)}
              multiline
              maxLength={100}
              style={styles.input}
              right={<TextInput.Affix text={`${comment.length}/100`} />}
            />

            <Text style={styles.ratingLabel}>Dersten hangi notu aldınız?</Text>

            <RNPickerSelect
              onValueChange={(value) => setSelectedGrade(value)}
              items={[
                { label: 'A1', value: 'A1' },
                { label: 'A2', value: 'A2' },
                { label: 'A3', value: 'A3' },
                { label: 'B1', value: 'B1' },
                { label: 'B2', value: 'B2' },
                { label: 'B3', value: 'B3' },
                { label: 'C1', value: 'C1' },
                { label: 'C2', value: 'C2' },
                { label: 'C3', value: 'C3' },
                { label: 'D', value: 'D' },
                { label: 'F', value: 'F' },
              ]}
              placeholder={{ label: 'Not Seçin', value: null }}
              style={pickerSelectStyles}
            />
            <Text style={styles.ratingLabel}>Dersi ne kadar kaliteli buldunuz?</Text>
            <AirbnbRating
              count={5}
              reviews={qualityDescriptions}
              selectedColor= {colors.primary}
              defaultRating={3}
              size={30}
              fractions={3}
              onFinishRating={(rating) => setQualityRating(rating)}
              showRating
              style={styles.rating}
            />
            <View style={styles.formRow}>
              <Text style={styles.ratingLabel}></Text>

              <Text style={styles.ratingLabel}>Dersi ne kadar zor buldunuz?</Text>
            </View>
            <Text style={[styles.text, { color: interpolateColor(difficulty) }]}>
              {difficultyDescriptions[difficulty - 1]}
            </Text>
            <Slider
              value={difficulty}
              onValueChange={setDifficulty}
              maximumValue={maxDifficulty}
              minimumValue={minDifficulty}
              step={1}
              thumbTintColor={interpolateColor(difficulty)}
              minimumTrackTintColor={interpolateColor(difficulty)}
              maximumTrackTintColor="#D3D3D3"
              thumbStyle={styles.thumb}
              style={{ width: '100%', height: 40 }}
            />
            <Text style={styles.ratingLabel}>Derse çalışırken kaç saat ayırdınız?</Text>

            <RNPickerSelect
              onValueChange={(value) => setSelectedHours(value)}
              items={[
                { label: '0-5 saat', value: 'ZERO_FIVE' },
                { label: '5-10 saat', value: 'FIVE_TEN' },
                { label: '10-15 saat', value: 'TEN_FIFTEEN' },
                { label: '15-20 saat', value: 'FIFTEEN_TWENTY' },
                { label: '20-25 saat', value: 'TWENTY_TWENTYFIVE' },
                { label: '25-30 saat', value: 'TWENTYFIVE_THIRTY' },
              ]}
              placeholder={{ label: 'Saat Aralığı Seçin', value: null }}
              style={pickerSelectStyles}
            />
            <Button
              title="Yorumu Gönder"
              style={myStyle.commonStyle.secondaryButton}
              onPress={() => {
                // Yorum gönderme işlemi
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 20,
  },
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    alignItems: 'center',
    width: '100%',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  commentForm: {
    marginTop: 20,
    width: "95%",
    padding: 20,
    backgroundColor: colors.background,
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 20,
  },
  ratingLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  rating: {
    marginBottom: 20,
  },

  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: text.primaryDark,
    fontFamily: fonts.bold,
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: text.primaryDark,
    fontFamily: fonts.bold,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: text.secondaryDark,
    fontFamily: fonts.regular,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  thumb: {
    width: 20, // Thumb genişliği
    height: 20, // Thumb yüksekliği
    borderRadius: 10, // Thumb'un yuvarlak olması için yarıçap
  },
  instructor: {
    fontSize: 18,
    color: text.secondaryDark,
    fontFamily: fonts.regular,
    marginBottom: 5,
    textAlign: 'center',
  },
  chartWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartContainer: {
    margin: 10,
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#232B5D',
    width: '90%',
  },
  chartTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
    color: text.primaryDark,
  },
  pieChartContainer: {
    margin: 10,
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#232B5D',
    width: '90%',
    alignItems: 'center',
  },
  pieLabel: {
    fontSize: 18,
    color: text.primaryLight,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    color: text.primaryDark,
    fontFamily: fonts.regular,
    marginTop: 20,
  },
  commentContainer: {
    width: '90%',
    backgroundColor: colors.secondaryBackground,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  commentAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: text.primaryDark,
    fontFamily: fonts.bold,
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    color: text.secondaryDark,
    fontFamily: fonts.regular,
  },
});

export default CourseDetailPage;
