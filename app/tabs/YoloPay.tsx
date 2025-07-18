import React, { useState, useRef } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Circle,
  Rect,
} from "react-native-svg";
import { Snowflake } from "lucide-react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const scale = (size: number) => (SCREEN_WIDTH / 375) * size;

const BottomFadeBorder = ({
  width = scale(96),
  height = 1,
  color = "#fff",
}) => (
  <Svg width={width} height={height} style={StyleSheet.absoluteFillObject}>
    <Defs>
      <LinearGradient id="fadeBottomBorder" x1="0" y1="0" x2="1" y2="0">
        <Stop offset="0" stopColor={color} stopOpacity="0" />
        <Stop offset="0.48" stopColor={color} stopOpacity="0" />
        <Stop offset="0.5" stopColor={color} stopOpacity="1" />
        <Stop offset="0.52" stopColor={color} stopOpacity="0" />
        <Stop offset="1" stopColor={color} stopOpacity="0" />
      </LinearGradient>
    </Defs>
    <Rect width={width} height={height} fill="url(#fadeBottomBorder)" />
  </Svg>
);

const CustomButton = ({ label, textColor, borderColor }) => (
  <TouchableOpacity style={[styles.button, { borderColor }]}>
    <Text style={[styles.buttonText, { color: textColor }]}>{label}</Text>
    <BottomFadeBorder color={borderColor} />
  </TouchableOpacity>
);

const YoloPay = () => {
  const { width, height } = useWindowDimensions();
  const [isFrozen, setIsFrozen] = useState(false);
  const freezeOpacity = useRef(new Animated.Value(0)).current;

  const toggleFreeze = () => {
    Animated.timing(freezeOpacity, {
      toValue: isFrozen ? 0 : 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
    setIsFrozen(!isFrozen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>select payment mode</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.content}>
          choose your preferred payment method to make the payment.
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <CustomButton label="pay" textColor="#fff" borderColor="#fff" />
        <CustomButton label="card" textColor="#A90808" borderColor="#A90808" />
      </View>

      <View style={styles.info}>
        <Text style={styles.infotxt}>YOUR DIGITAL DEBIT CARD</Text>
      </View>

      <View style={styles.main}>
        <ImageBackground
          source={require("../../assets/images/bg-card.png")}
          style={styles.cardContainer}
          imageStyle={styles.cardImage}
          resizeMode="cover"
        >
          <View style={styles.cardleftimgcontainer}>
            <Image
              source={require("../../assets/images/yolo.png")}
              style={styles.cardleftimg}
              resizeMode="contain"
            />
          </View>
          <View style={styles.cardrightimgcontainer}>
            <Image
              source={require("../../assets/images/bank.png")}
              style={styles.cardrightimg}
              resizeMode="contain"
            />
          </View>

          <View style={styles.middlecontent}>
            <View style={styles.cardNumbersContainer}>
              <Text style={styles.cardNumber}>8124</Text>
              <Text style={styles.cardNumber}>4212</Text>
              <Text style={styles.cardNumber}>3456</Text>
              <Text style={styles.cardNumber}>7890</Text>
            </View>

            <View style={styles.expirycontainer}>
              <Text style={styles.expiry}>expiry</Text>
              <Text style={styles.expirydate}>01/28</Text>
            </View>
            <View style={styles.hiddenNumbersContainer}>
              <Text style={styles.cvv}>CVV</Text>
              <View style={styles.password}>
                <Text style={styles.hiddenNumbers}>***</Text>
                <TouchableOpacity style={styles.eyeIconContainer}>
                  <Ionicons name="eye-off" size={24} color="#ff4444" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.copycontainer}>
            <Image
              source={require("../../assets/images/copy.png")}
              style={styles.copyimg}
              resizeMode="contain"
            />
            <Text style={styles.copytxt}>copy details</Text>
          </View>

          <View style={styles.groupcontainer}>
            <Image
              source={require("../../assets/images/Group.png")}
              style={styles.groupimg}
              resizeMode="contain"
            />
          </View>
          <Animated.View
            style={[styles.freezeOverlay, { opacity: freezeOpacity }]}
          >
            <Image
              source={require("../../assets/images/freeze.png")}
              style={StyleSheet.absoluteFillObject}
              resizeMode="cover"
            />
          </Animated.View>
        </ImageBackground>

        <View style={styles.freezeButtonContainer}>
          <TouchableOpacity style={styles.freeze} onPress={toggleFreeze}>
            <Svg width={60} height={60}>
              <Defs>
                <LinearGradient id="fadeCircle" x1="0.5" y1="0" x2="0.5" y2="1">
                  <Stop
                    offset="0%"
                    stopColor={isFrozen ? "#ff4444" : "#fff"}
                    stopOpacity="0.4"
                  />
                  <Stop
                    offset="100%"
                    stopColor={isFrozen ? "#ff4444" : "#fff"}
                    stopOpacity="0"
                  />
                </LinearGradient>
              </Defs>
              <Circle
                cx={30}
                cy={30}
                r={28}
                stroke="url(#fadeCircle)"
                strokeWidth={2}
                fill="transparent"
              />
            </Svg>
            <View style={styles.freezeIcon}>
              <Snowflake size={24} color={isFrozen ? "#ff4444" : "#ffffff"} />
            </View>
          </TouchableOpacity>
          <Text
            style={[
              styles.freezeLabel,
              { color: isFrozen ? "#ff4444" : "#fff" },
            ]}
          >
            {isFrozen ? "Unfreeze" : "Freeze"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default YoloPay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: scale(16),
  },
  titleContainer: {
    marginTop: scale(64),
  },
  title: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: scale(24),
  },
  contentContainer: {
    marginTop: scale(16),
  },
  content: {
    color: "#888",
    fontFamily: "Poppins-Regular",
    fontSize: scale(16),
    lineHeight: scale(22),
  },
  buttonsContainer: {
    marginTop: scale(24),
    flexDirection: "row",
    gap: scale(12),
  },
  button: {
    height: scale(40),
    width: scale(96),
    paddingVertical: scale(9),
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: scale(40),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    position: "relative",
    overflow: "hidden",
  },
  buttonText: {
    fontFamily: "Poppins-Regular",
    fontSize: scale(17),
    lineHeight: scale(22),
  },
  info: {
    marginTop: scale(48),
  },
  infotxt: {
    color: "#888",
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    fontSize: scale(12),
    lineHeight: scale(22),
  },
  cardContainer: {
    marginTop: scale(14),
    height: scale(296),
    width: scale(186),
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: scale(16),
    overflow: "hidden",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  cardImage: {
    borderRadius: scale(16),
  },
  cardleftimgcontainer: {
    position: "absolute",
    top: scale(13.49),
    left: scale(19.06),
    zIndex: 20,
  },
  cardrightimgcontainer: {
    position: "absolute",
    top: scale(8.55),
    left: scale(124),
    zIndex: 20,
  },
  cardleftimg: {
    height: scale(15.29),
    width: scale(48.44),
  },
  cardrightimg: {
    width: scale(48.37),
    height: scale(20.94),
  },
  middlecontent: {
    flexDirection: "row",
    marginTop: scale(76.3),
    marginLeft: scale(23.29),
  },
  cardNumbersContainer: {},
  cardNumber: {
    color: "#ffffff",
    fontSize: scale(18),
    fontWeight: "600",
    letterSpacing: 2,
    marginBottom: scale(8),
    fontFamily: "ShareTechMono",
  },
  expirycontainer: {
    marginLeft: scale(25),
    height: scale(36),
  },
  expiry: {
    color: "#888888",
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    fontSize: scale(10),
    lineHeight: scale(22),
  },
  expirydate: {
    color: "#ffffff",
  },
  hiddenNumbersContainer: {
    marginLeft: scale(-40),
    marginTop: scale(80),
  },
  cvv: {
    color: "#888888",
    fontWeight: "400",
    fontSize: scale(10),
    fontFamily: "Poppins-Regular",
  },
  hiddenNumbers: {
    color: "#888888",
    fontSize: scale(18),
    fontWeight: "600",
    letterSpacing: 2,
    fontFamily: "monospace",
  },
  eyeIconContainer: {
    padding: scale(4),
  },
  password: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
  },
  copycontainer: {
    marginTop: scale(20),
    marginLeft: scale(16),
    flexDirection: "row",
    gap: scale(6),
    alignItems: "center",
  },
  copyimg: {
    width: scale(20),
    height: scale(20),
  },
  copytxt: {
    color: "#A90808",
    fontFamily: "Poppins-Medium",
    fontWeight: "500",
    fontSize: scale(12),
  },
  groupcontainer: {
    marginTop: scale(10),
    marginLeft: scale(120),
  },
  groupimg: {
    width: scale(60),
  },
  main: {
    flexDirection: "row",
  },
  freeze: {
    marginTop: scale(100),
    marginLeft: scale(12),
    width: scale(60),
    height: scale(60),
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  freezeIcon: {
    position: "absolute",
    top: scale(18),
    left: scale(18),
  },
  freezeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 30,
    borderRadius: scale(16),
  },
  freezeButtonContainer: {
    alignItems: "center",
    marginTop: scale(1),
  },
  freezeLabel: {
    color: "#fff",
    fontSize: scale(12),
    marginTop: scale(5),
    marginLeft: scale(15),
    fontFamily: "Poppins-Regular",
  },
});
