import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Slider } from "react-native-elements";
import { BarChart, PieChart } from "react-native-gifted-charts";
import { Rating, AirbnbRating } from "react-native-ratings";
import { colors, text, fonts } from "../../design/themes";
import RNPickerSelect from "react-native-picker-select";
import { TextInput, Button } from "react-native-paper";
import * as myStyle from "../../design/style";
import { ikraAxios, urlDev } from "../common"; // API istekleri için kullanılan özelleştirilmiş axios instance
import { commonStyle } from "../../design/style";
const gradeValueMap = {
  A1: 4.0,
  A2: 3.75,
  A3: 3.5,
  B1: 3.25,
  B2: 3.0,
  B3: 2.75,
  C1: 2.5,
  C2: 2.25,
  C3: 2.0,
  D: 1.75,
  F: 0.0,
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
  "BÖLÜM SONU CANAVARI",
];

const qualityDescriptions = [
  "Berbat Ötesi",
  "Eh İşte",
  "İdare Eder",
  "Güzelmiş",
  "Efsane!",
];

const CourseDetailPage = ({
  initialDifficulty = 1,
  maxDifficulty = 10,
  minDifficulty = 1,
  navigation,
}) => {
  const route = useRoute();
  const { courseId } = route.params;
  const [courseDetails, setCourseDetails] = useState(null);
  const [showGradePieChart, setShowGradePieChart] = useState(false);
  const [showHoursPieChart, setShowHoursPieChart] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [qualityRating, setQualityRating] = useState(0);
  const [difficulty, setDifficulty] = useState(5);
  const [selectedHours, setSelectedHours] = useState("");

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
    }
  }, []);

  const fetchCourseDetails = () => {
    const endpoint = `/courses/courseId?courseId=${courseId}`; // id varsa, URL'ye ekle
    ikraAxios({
      url: urlDev + endpoint, // Dinamik URL
      onSuccess: (data) => {
        console.log(data.body.courseStatResponse.hours);
        setCourseDetails(data.body);
      },
      onError: (error) => {
        console.error("Error fetching profile info: ", error);
        Alert.alert(
          "Profil Bilgisi Yükleme Hatası",
          "Profil bilgileri yüklenirken bir hata oluştu."
        );
      },
    });
  };

  const handleSendComment = async () => {
    const formData = {
      courseId: courseId,
      comment: comment,
      grade: selectedGrade,
      difficulty: difficulty,
      quality: qualityRating,
      hours: selectedHours,
    };

    try {
      // Backend'e POST isteği at
      ikraAxios({
        url: urlDev + "/courseStats", // POST isteği atılacak endpoint
        method: "POST",
        data: formData,
        onSuccess: (data) => {
          console.log(data);
          fetchCourseDetails();
        },
        onError: (error) => {
          console.error("Error fetching profile info: ", error);
          Alert.alert(
            "Profil Bilgisi Yükleme Hatası",
            "Profil bilgileri yüklenirken bir hata oluştu."
          );
        },
      });
    } catch (error) {
      // Ağ hatası veya diğer hatalar için
      console.error("Network error:", error);
      Alert.alert("Ağ Hatası", "Bir ağ hatası meydana geldi.");
    }
  };

  if (!courseDetails) {
    return (
      <View style={styles.safeArea}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const gradeData = [
    {
      label: "A1",
      value: courseDetails.courseStatResponse.gradeMap.A1,
      color: "#FFD700",
      gradientCenterColor: "#FFFF00",
    },
    {
      label: "A2",
      value: courseDetails.courseStatResponse.gradeMap.A2,
      color: "#FF6347",
      gradientCenterColor: "#FF4500",
    },
    {
      label: "A3",
      value: courseDetails.courseStatResponse.gradeMap.A3,
      color: "#00CED1",
      gradientCenterColor: "#40E0D0",
    },
    {
      label: "B1",
      value: courseDetails.courseStatResponse.gradeMap.B1,
      color: "#1E90FF",
      gradientCenterColor: "#4169E1",
    },
    {
      label: "B2",
      value: courseDetails.courseStatResponse.gradeMap.B2,
      color: "#0000FF",
      gradientCenterColor: "#0000CD",
    },
    {
      label: "B3",
      value: courseDetails.courseStatResponse.gradeMap.B3,
      color: "#8A2BE2",
      gradientCenterColor: "#9400D3",
    },
    {
      label: "C1",
      value: courseDetails.courseStatResponse.gradeMap.C1,
      color: "#32CD32",
      gradientCenterColor: "#00FF00",
    },
    {
      label: "C2",
      value: courseDetails.courseStatResponse.gradeMap.C2,
      color: "#FF8C00",
      gradientCenterColor: "#FFA500",
    },
    {
      label: "C3",
      value: courseDetails.courseStatResponse.gradeMap.C3,
      color: "#00FA9A",
      gradientCenterColor: "#00FF7F",
    },
    {
      label: "D",
      value: courseDetails.courseStatResponse.gradeMap.D,
      color: "#FF1493",
      gradientCenterColor: "#FF69B4",
    },
    {
      label: "F",
      value: courseDetails.courseStatResponse.gradeMap.F,
      color: "#ADFF2F",
      gradientCenterColor: "#7FFF00",
    },
  ];

  const gradePieData = gradeData.map(
    ({ label, value, color, gradientCenterColor }) => ({
      value,
      color,
      gradientCenterColor,
      text: label,
    })
  );

  const hoursData = [
    {
      label: "0-5",
      value: courseDetails.courseStatResponse.hours.ZERO_FIVE,
      frontColor: "#006DFF",
      gradientColor: "#009FFF",
    },
    {
      label: "5-10",
      value: courseDetails.courseStatResponse.hours.FIVE_TEN,
      frontColor: "#3BE9DE",
      gradientColor: "#93FCF8",
    },
    {
      label: "10-15",
      value: courseDetails.courseStatResponse.hours.TEN_FIFTEEN,
      frontColor: "#006DFF",
      gradientColor: "#009FFF",
    },
    {
      label: "15-20",
      value: courseDetails.courseStatResponse.hours.FIFTEEN_TWENTY,
      frontColor: "#3BE9DE",
      gradientColor: "#93FCF8",
    },
    {
      label: "20-25",
      value: courseDetails.courseStatResponse.hours.TWENTY_TWENTYFIVE,
      frontColor: "#006DFF",
      gradientColor: "#009FFF",
    },
    {
      label: "25-30",
      value: courseDetails.courseStatResponse.hours.TWENTYFIVE_THIRTY,
      frontColor: "#3BE9DE",
      gradientColor: "#93FCF8",
    },
  ];

  const hoursPieData = [
    {
      label: "0-5",
      value: courseDetails.courseStatResponse.hours.ZERO_FIVE,
      color: "#FF6347",
      gradientCenterColor: "#FF4500",
    },
    {
      label: "5-10",
      value: courseDetails.courseStatResponse.hours.FIVE_TEN,
      color: "#FF8C00",
      gradientCenterColor: "#FFA500",
    },
    {
      label: "10-15",
      value: courseDetails.courseStatResponse.hours.TEN_FIFTEEN,
      color: "#FFD700",
      gradientCenterColor: "#FFFF00",
    },
    {
      label: "15-20",
      value: courseDetails.courseStatResponse.hours.FIFTEEN_TWENTY,
      color: "#ADFF2F",
      gradientCenterColor: "#7FFF00",
    },
    {
      label: "20-25",
      value: courseDetails.courseStatResponse.hours.TWENTY_TWENTYFIVE,
      color: "#32CD32",
      gradientCenterColor: "#00FF00",
    },
    {
      label: "25-30",
      value: courseDetails.courseStatResponse.hours.TWENTYFIVE_THIRTY,
      color: "#00FA9A",
      gradientCenterColor: "#00FF7F",
    },
  ];

  const difficultyData = [
    {
      value: 20,
      color: "#009FFF",
      gradientCenterColor: "#006DFF",
      text: "0-2.5 Kolay",
    },
    {
      value: 30,
      color: "#93FCF8",
      gradientCenterColor: "#3BE9DE",
      text: "2.5-5 Orta",
    },
    {
      value: 40,
      color: "#BDB2FA",
      gradientCenterColor: "#8F80F3",
      text: "5-7.5 Zor",
    },
    {
      value: 10,
      color: "#FFA5BA",
      gradientCenterColor: "#FF7F97",
      text: "7.5-10 Çok Zor",
    },
  ];

  const calculateMeanGrade = (gradeMap) => {
    let totalScore = 0;
    let totalCount = 0;

    Object.keys(gradeMap).forEach((grade) => {
      totalScore += gradeValueMap[grade] * gradeMap[grade];
      totalCount += gradeMap[grade];
    });

    const meanValue =
      totalCount === 0 ? "N/A" : (totalScore / totalCount).toFixed(2);

    let meanGrade = "N/A";
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

  const meanGrade = calculateMeanGrade(
    courseDetails.courseStatResponse.gradeMap
  );

  const hoursValueMap = {
    ZERO_FIVE: 2.5,
    FIVE_TEN: 7.5,
    TEN_FIFTEEN: 12.5,
    FIFTEEN_TWENTY: 17.5,
    TWENTY_TWENTYFIVE: 22.5,
    TWENTYFIVE_THIRTY: 27.5,
  };

  const handleUrlPress = (url) => {
    Linking.openURL("https://" + url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const calculateMeanHours = (hoursMap) => {
    let totalHours = 0;
    let totalCount = 0;

    Object.keys(hoursMap).forEach((hoursRange) => {
      totalHours += hoursValueMap[hoursRange] * hoursMap[hoursRange];
      totalCount += hoursMap[hoursRange];
    });

    const meanHours =
      totalCount === 0 ? "N/A" : (totalHours / totalCount).toFixed(1);

    return meanHours;
  };

  const meanHours = calculateMeanHours(courseDetails.courseStatResponse.hours);

  const renderDot = (color) => {
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

    data.forEach((item) => {
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

  const { max: maxHours, min: minHours } = calculateMaxMinValues(hoursData);
  const { max: maxGrades, min: minGrades } = calculateMaxMinValues(gradeData);

  const interpolateColor = (value) => {
    const red = Math.min(255, (value - 1) * 28);
    const green = Math.max(0, 255 - (value - 1) * 28);
    return `rgb(${red},${green},0)`;
  };

  const renderGradeLegendComponent = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        {gradePieData.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 10,
              marginBottom: 10,
            }}
          >
            {renderDot(item.color)}
            <Text style={{ color: "white" }}>
              {item.text}: {item.value}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderHoursLegendComponent = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        {hoursPieData.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 10,
              marginBottom: 10,
            }}
          >
            {renderDot(item.color)}
            <Text style={{ color: "white" }}>
              {item.label}: {item.value}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          {difficultyData.slice(0, 2).map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: 120,
                marginRight: 20,
              }}
            >
              {renderDot(item.color)}
              <Text style={{ color: "white" }}>
                {item.text}: {item.value}%
              </Text>
            </View>
          ))}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {difficultyData.slice(2).map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: 120,
                marginRight: 20,
              }}
            >
              {renderDot(item.color)}
              <Text style={{ color: "white" }}>
                {item.text}: {item.value}%
              </Text>
            </View>
          ))}
        </View>
      </>
    );
  };

  const NoStatsText = "Bu dersle ilgili verimiz yok";

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text
            style={[
              commonStyle.textLabel,
              {
                fontSize: 28,
                color: colors.text,
                marginBottom: 20,
                textAlign: "center",
                paddingHorizontal: 10,
              },
            ]}
          >
            {courseDetails.name}
          </Text>
          <Text style={styles.sectionHeading}>Dersin Açıklaması:</Text>
          <Text style={styles.sectionHeading}>Dersin Sitesi:</Text>
          <TouchableOpacity
            onPress={() => handleUrlPress(courseDetails.website)}
          >
            <Text style={styles.linket}>{courseDetails.website}</Text>
          </TouchableOpacity>
          <Text style={styles.sectionHeading}>Dersi Veren Hocalar</Text>
          {courseDetails.instructors?.map((instructor, index) => (
            <TouchableOpacity
              key={index}
              style={styles.instructor}
              onPress={() => {
                navigation.navigate("profile", { id: instructor.id });
              }}
            >
              <Text style={styles.instructorText}>
                {instructor.firstName + " " + instructor.lastName}
              </Text>
            </TouchableOpacity>
          ))}
          <Text style={styles.sectionHeading}>Not Dağılımı</Text>
          {!courseDetails.courseStatResponse.difficultyAvg ? (
            <Text style={styles.warning}>{NoStatsText}</Text>
          ) : (
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
                    xAxisType={"dashed"}
                    xAxisColor={"lightgray"}
                    yAxisTextStyle={{ color: "lightgray" }}
                    stepValue={Math.ceil(maxGrades / 5)}
                    maxValue={maxGrades}
                    noOfSections={5}
                    yAxisLabelTexts={Array.from({ length: 6 }, (_, i) =>
                      (i * Math.ceil(maxGrades / 5)).toString()
                    )}
                    labelWidth={40}
                    xAxisLabelTextStyle={{
                      color: "lightgray",
                      textAlign: "center",
                    }}
                    showLine
                    lineConfig={{
                      color: "#F29C6E",
                      thickness: 3,
                      curved: true,
                      hideDataPoints: true,
                      shiftY: 20,
                      initialSpacing: -5,
                    }}
                    frontColor={colors.primary}
                  />
                ) : (
                  <View style={{ alignItems: "center" }}>
                    <PieChart
                      data={gradePieData}
                      donut
                      showGradient
                      sectionAutoFocus
                      focusOnPress
                      radius={90}
                      innerRadius={60}
                      innerCircleColor={"#232B5D"}
                      centerLabelComponent={() => {
                        return (
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 22,
                                color: "white",
                                fontWeight: "bold",
                              }}
                            >
                              {meanGrade}
                            </Text>
                            <Text style={{ fontSize: 14, color: "white" }}>
                              Ortalama Not
                            </Text>
                          </View>
                        );
                      }}
                    />
                    {renderGradeLegendComponent()}
                  </View>
                )}
              </View>
              <Button
                mode="contained"
                onPress={() => setShowGradePieChart(!showGradePieChart)} // Butona basıldığında durumu değiştir
                style={{
                  backgroundColor: "#7B68EE",
                  color: "white",
                  borderRadius: 20,
                }}
              >
                {showGradePieChart ? "Bar Chart Göster" : "Pie Chart Göster"}
              </Button>
            </View>
          )}
          <Text style={styles.sectionHeading}>Saat Harcanma Dağılımı</Text>
          {!courseDetails.courseStatResponse.difficultyAvg ? (
            <Text style={styles.warning}>{NoStatsText}</Text>
          ) : (
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
                    xAxisType={"dashed"}
                    xAxisColor={"lightgray"}
                    yAxisTextStyle={{ color: "lightgray" }}
                    stepValue={Math.ceil(maxHours / 5)}
                    maxValue={maxHours}
                    noOfSections={5}
                    yAxisLabelTexts={Array.from({ length: 6 }, (_, i) =>
                      (i * Math.ceil(maxHours / 5)).toString()
                    )}
                    labelWidth={40}
                    xAxisLabelTextStyle={{
                      color: "lightgray",
                      textAlign: "center",
                    }}
                    showLine
                    lineConfig={{
                      color: "#F29C6E",
                      thickness: 3,
                      curved: true,
                      hideDataPoints: true,
                      shiftY: 20,
                      initialSpacing: -5,
                    }}
                  />
                ) : (
                  <View style={{ alignItems: "center" }}>
                    <PieChart
                      data={hoursPieData}
                      donut
                      showGradient
                      sectionAutoFocus
                      focusOnPress
                      radius={90}
                      innerRadius={60}
                      innerCircleColor={"#232B5D"}
                      centerLabelComponent={() => {
                        return (
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 22,
                                color: "white",
                                fontWeight: "bold",
                              }}
                            >
                              {meanHours}
                            </Text>
                            <Text style={{ fontSize: 14, color: "white" }}>
                              Ortalama Saat
                            </Text>
                          </View>
                        );
                      }}
                    />
                    {renderHoursLegendComponent()}
                  </View>
                )}
              </View>
              <Button
                mode="contained"
                onPress={() => setShowHoursPieChart(!showHoursPieChart)} // Butona basıldığında durumu değiştir
                style={{
                  backgroundColor: "#7B68EE",
                  color: "white",
                  borderRadius: 20,
                }}
              >
                {showHoursPieChart ? "Bar Chart Göster" : "Pie Chart Göster"}
              </Button>
            </View>
          )}
          <Text style={styles.sectionHeading}>Kalite Ortalaması</Text>
          {!courseDetails.courseStatResponse.difficultyAvg ? (
            <Text style={styles.warning}>{NoStatsText}</Text>
          ) : (
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>
                {courseDetails.courseStatResponse.qualityAvg?.toFixed(1) ||
                  "N/A"}
                /5
              </Text>
              <Rating
                readonly
                startingValue={
                  courseDetails.courseStatResponse.qualityAvg
                    ? courseDetails.courseStatResponse.qualityAvg
                    : 0
                }
                imageSize={30}
                ratingBackgroundColor={colors.secondaryBackground}
                ratingColor={colors.secondary}
              />
            </View>
          )}
          <Text style={styles.sectionHeading}>Zorluk Ortalaması</Text>
          {!courseDetails.courseStatResponse.difficultyAvg ? (
            <Text style={styles.warning}>{NoStatsText}</Text>
          ) : (
            <View style={styles.pieChartContainer}>
              <PieChart
                data={difficultyData}
                donut
                showGradient
                sectionAutoFocus
                focusOnPress
                radius={90}
                innerRadius={60}
                innerCircleColor={"#232B5D"}
                centerLabelComponent={() => {
                  return (
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          fontSize: 22,
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {courseDetails.courseStatResponse.difficultyAvg?.toFixed(
                          1
                        ) || "N/A"}
                      </Text>
                      <Text style={{ fontSize: 14, color: "white" }}>
                        Ortalama Zorluk
                      </Text>
                    </View>
                  );
                }}
              />
              {renderLegendComponent()}
            </View>
          )}
          <View style={styles.rightEnd}>
            <Text
              style={[
                commonStyle.textLabel,
                { fontSize: 20, marginBottom: 10 },
              ]}
            >
              Yorumlar
            </Text>
            <Button
              style={commonStyle.secondaryButton}
              labelStyle={commonStyle.secondaryButtonLabel}
              onPress={() => navigation.navigate("commentsPage", courseDetails)}
            >
              Tümünü gör
            </Button>
          </View>
          <View style={styles.commentForm}>
            <Text
              style={[
                commonStyle.generalText,
                { fontSize: 16, marginBottom: 10 },
              ]}
            >
              Derse yorumunuz nedir?
            </Text>
            <TextInput
              label="Yorum"
              mode="outlined"
              value={comment}
              onChangeText={(text) => setComment(text)}
              multiline
              maxLength={100}
              style={styles.input}
              right={<TextInput.Affix text={`${comment.length}/100`} />}
            />
            <Text
              style={[
                commonStyle.generalText,
                { fontSize: 16, marginBottom: 10 },
              ]}
            >
              Dersten hangi notu aldınız?
            </Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedGrade(value)}
              items={[
                { label: "A1", value: "A1" },
                { label: "A2", value: "A2" },
                { label: "A3", value: "A3" },
                { label: "B1", value: "B1" },
                { label: "B2", value: "B2" },
                { label: "B3", value: "B3" },
                { label: "C1", value: "C1" },
                { label: "C2", value: "C2" },
                { label: "C3", value: "C3" },
                { label: "D", value: "D" },
                { label: "F", value: "F" },
              ]}
              placeholder={{ label: "Not Seçin", value: null }}
              style={pickerSelectStyles}
            />
            <Text
              style={[
                commonStyle.generalText,
                { fontSize: 16, marginBottom: 10 },
              ]}
            >
              Dersi ne kadar kaliteli buldunuz?
            </Text>
            <AirbnbRating
              count={5}
              reviews={qualityDescriptions}
              selectedColor={colors.primary}
              defaultRating={3}
              size={30}
              fractions={3}
              onFinishRating={(rating) => setQualityRating(rating)}
              showRating
              style={styles.rating}
            />
            <View style={styles.formRow}>
              <Text
                style={[
                  commonStyle.generalText,
                  { fontSize: 16, marginBottom: 10, marginTop: 10 },
                ]}
              >
                Dersi ne kadar zor buldunuz?
              </Text>
            </View>
            <Text
              style={[commonStyle.generalText, { color: interpolateColor(difficulty) , textAlign: 'center', fontSize: 20}]}
            >
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
              style={{ width: "100%", height: 40 }}
            />
            <Text
              style={[
                commonStyle.generalText,
                { fontSize: 16, marginBottom: 10 },
              ]}
            >
              Derse çalışırken kaç saat ayırdınız?
            </Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedHours(value)}
              items={[
                { label: "0-5 saat", value: "ZERO_FIVE" },
                { label: "5-10 saat", value: "FIVE_TEN" },
                { label: "10-15 saat", value: "TEN_FIFTEEN" },
                { label: "15-20 saat", value: "FIFTEEN_TWENTY" },
                { label: "20-25 saat", value: "TWENTY_TWENTYFIVE" },
                { label: "25-30 saat", value: "TWENTYFIVE_THIRTY" },
              ]}
              placeholder={{ label: "Saat Aralığı Seçin", value: null }}
              style={pickerSelectStyles}
            />

            <Button
              mode="contained" // Bu, dolgulu bir buton stilidir.
              onPress={() => {
                handleSendComment();
              }}
              style={commonStyle.primaryButton}
            >
              Yorumu Gönder
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
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
    textAlign: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    width: "100%",
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  commentForm: {
    marginTop: 20,
    width: "95%",
    padding: 20,
    backgroundColor: colors.background,
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    backgroundColor: "#fff",
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
    fontWeight: "bold",
    color: text.primaryDark,
    marginBottom: 20,
    textAlign: "center",
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: text.primaryDark,
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  link: {
    color: colors.secondary,
    fontSize: 18,
    fontWeight: "bold",
  },
  warning: {
    fontSize: 15,
    fontWeight: "bold",
    color: text.primaryDark,
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center",
  },
  transactionsHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: text.secondaryDark,
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  instructor: {
    fontSize: 18,
    color: text.secondaryDark,
    marginBottom: 5,
    textAlign: "center",
  },
  instructorText: {
    color: colors.primary, // Tıklanabilir metnin rengini vurgulamak için
    textDecorationLine: "underline", // Altını çizmek için
  },
  rightEnd: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    paddingHorizontal: 16, // Yatay boşluk eklemek için
    paddingTop: 5,
  },
  chartWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  chartContainer: {
    margin: 10,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#232B5D",
    width: "90%",
  },
  chartTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 10,
    color: text.primaryDark,
  },
  pieChartContainer: {
    margin: 10,
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#232B5D",
    width: "90%",
    alignItems: "center",
  },
  pieLabel: {
    fontSize: 18,
    color: text.primaryLight,
    textAlign: "center",
  },
  linket: {
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    color: text.primaryDark,
    marginTop: 20,
  },
  commentContainer: {
    width: "90%",
    backgroundColor: colors.secondaryBackground,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  commentAuthor: {
    fontSize: 16,
    fontWeight: "bold",
    color: text.primaryDark,
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    color: text.secondaryDark,
  },
});

export default CourseDetailPage;
