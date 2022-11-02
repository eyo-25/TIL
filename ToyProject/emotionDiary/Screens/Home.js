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
  // const happy = feelings.filtered("emotion = '🥰' ");
  useEffect(() => {
    const feelings = realm.objects("Feeling");
    //feelings에 대한 이벤트 감지될때 current feelings를 얻을 수 있다.
    feelings.addListener((feelings, changes) => {
      /* Only For Android */
      if (Platform.OS === "android") {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
          UIManager.setLayoutAnimationEnabledExperimental(true);
        }
      }
      //변화를 주기전에 레이아웃 변경 애니메이션을 부여해 state변경으로 레이아웃 변경시 애니실행
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setFeelings(feelings.sorted("_id", true));
    });
    return () => {
      //메모리 누수 방지를 위한 이벤트 리스너 제거
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
        {/* 시뮬레이터에 실제아이디로 광고하면 벤먹음 */}
      </Container>
    </>
  );
};
export default Home;
