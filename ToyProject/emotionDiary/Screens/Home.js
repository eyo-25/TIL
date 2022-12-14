import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors";
import { useDB } from "../cotext";
import {
  FlatList,
  LayoutAnimation,
  TouchableOpacity,
  Platform,
  UIManager,
} from "react-native";
import { AdMobBanner } from "expo-ads-admob";

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 0px 30px;
  padding-top: 50px;
  background-color: ${colors.bgColor};
`;
const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 38px;
  font-weight: 500;
`;
const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 30px;
  right: 30px;
  height: 60px;
  width: 60px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.btnColor};
  elevation: 3;
  /* box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3); */
`;

const Record = styled.View`
  background-color: ${colors.cardColor};
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 1px 1px 1px rgba(41, 30, 95, 0.1);
`;

const Emotion = styled.Text`
  font-size: 24px;
  margin-right: 10px;
`;
const Message = styled.Text`
  font-size: 18px;
`;
const Separator = styled.View`
  height: 10px;
`;

const Home = ({ navigation: { navigate } }) => {
  const realm = useDB();
  const [feelings, setFeelings] = useState([]);
  // const happy = feelings.filtered("emotion = '๐ฅฐ' ");
  useEffect(() => {
    const feelings = realm.objects("Feeling");
    //feelings์ ๋ํ ์ด๋ฒคํธ ๊ฐ์ง๋ ๋ current feelings๋ฅผ ์ป์ ์ ์๋ค.
    feelings.addListener((feelings, changes) => {
      /* Only For Android */
      if (Platform.OS === "android") {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
          UIManager.setLayoutAnimationEnabledExperimental(true);
        }
      }
      //๋ณํ๋ฅผ ์ฃผ๊ธฐ์ ์ ๋ ์ด์์ ๋ณ๊ฒฝ ์ ๋๋ฉ์ด์์ ๋ถ์ฌํด state๋ณ๊ฒฝ์ผ๋ก ๋ ์ด์์ ๋ณ๊ฒฝ์ ์ ๋์คํ
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setFeelings(feelings.sorted("_id", true));
    });
    return () => {
      //๋ฉ๋ชจ๋ฆฌ ๋์ ๋ฐฉ์ง๋ฅผ ์ํ ์ด๋ฒคํธ ๋ฆฌ์ค๋ ์ ๊ฑฐ
      // feelings.removeAllListener();
    };
  }, []);
  const onPress = (id) => {
    realm.write(() => {
      const feeling = realm.objectForPrimaryKey("Feeling", id);
      realm.delete(feeling);
    });
  };
  return (
    <>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-3940256099942544/2934735716"
      />
      <Container>
        <Title>My Journal</Title>
        <FlatList
          style={{ marginVertical: 25, width: "100%" }}
          data={feelings}
          contentContainerStyle={{ paddingVertical: 10 }}
          ItemSeparatorComponent={Separator}
          keyExtractor={(feeling) => feeling._id + ""}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onPress(item._id)}>
              <Record>
                <Emotion>{item.emotion}</Emotion>
                <Message>{item.message}</Message>
              </Record>
            </TouchableOpacity>
          )}
        />
        <Btn onPress={() => navigate("Write")}>
          <Ionicons name="add" color="white" size={40} />
        </Btn>
        {/* ์๋ฎฌ๋ ์ดํฐ์ ์ค์ ์์ด๋๋ก ๊ด๊ณ ํ๋ฉด ๋ฒค๋จน์ */}
      </Container>
    </>
  );
};
export default Home;
