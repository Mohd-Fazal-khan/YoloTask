import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from "react-native";
import { Home, QrCode, BadgePercent } from "lucide-react-native";
import Svg, {
  Path,
  Defs,
  LinearGradient as SvgGradient,
  Stop,
  Circle,
} from "react-native-svg";
import { useFonts } from "expo-font";

import HomeScreen from "./HomeScreen";
import YoloPayScreen from "./YoloPay";
import GinieScreen from "./Ginie";


const { width: SCREEN_WIDTH } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 375;
const normalize = (size) => Math.round(PixelRatio.roundToNearestPixel(size * scale));

const CurvedBackground = () => (
  <Svg
    width={SCREEN_WIDTH}
    height={normalize(80)}
    viewBox={`0 36 ${SCREEN_WIDTH} 80`}
    style={StyleSheet.absoluteFillObject}
  >
    <Defs>
      <SvgGradient id="fadeLine" x1="0" y1="0" x2="1" y2="0">
        <Stop offset="0%" stopColor="white" stopOpacity="0" />
        <Stop offset="10%" stopColor="white" stopOpacity="0.5" />
        <Stop offset="90%" stopColor="white" stopOpacity="0.5" />
        <Stop offset="100%" stopColor="white" stopOpacity="0" />
      </SvgGradient>
    </Defs>
    <Path
      d={`M0,75 Q${SCREEN_WIDTH / 2},0 ${SCREEN_WIDTH},75`}
      fill="transparent"
      stroke="url(#fadeLine)"
      strokeWidth={1.5}
    />
  </Svg>
);

const GradientBorderCircle = ({ size, strokeWidth }) => {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "ShareTechMono": require("../../assets/fonts/ShareTechMono-Regular.ttf"),
  });

  return (
    <Svg width={size} height={size}>
      <Defs>
        <SvgGradient id="fadeBorder" x1="0.5" y1="0" x2="0.5" y2="1">
          <Stop offset="0%" stopColor="white" stopOpacity="0.5" />
          <Stop offset="100%" stopColor="white" stopOpacity="0" />
        </SvgGradient>
      </Defs>
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke="url(#fadeBorder)"
        strokeWidth={strokeWidth}
        fill="transparent"
      />
    </Svg>
  );
};

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState("yolo");

  const tabs = [
    { id: "home", label: "home", icon: Home },
    { id: "yolo", label: "yolo pay", icon: QrCode },
    { id: "ginie", label: "ginie", icon: BadgePercent },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen />;
      case "yolo":
        return <YoloPayScreen />;
      case "ginie":
        return <GinieScreen />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}

      <View style={styles.bottomNav}>
        <CurvedBackground />
        <View style={styles.tabContainer}>
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            const size = isActive ? normalize(51) : normalize(41);
            const strokeWidth = 2;

            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tab, isActive && styles.activeTab]}
                onPress={() => setActiveTab(tab.id)}
              >
                <View
                  style={{
                    width: size,
                    height: size,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <GradientBorderCircle size={size} strokeWidth={strokeWidth} />
                  <View style={styles.iconOverlay}>
                    <IconComponent
                      size={normalize(24)}
                      color={isActive ? "#ffffff" : "#888888"}
                    />
                  </View>
                </View>
                <Text
                  style={[styles.tabLabel, isActive && styles.activeTabLabel]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: normalize(108),
    backgroundColor: "#000000",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: normalize(20),
    paddingTop: normalize(10),
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  activeTab: {
    transform: [{ translateY: normalize(-10) }],
  },
  iconOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontFamily: "Poppins",
    fontSize: normalize(12),
    color: "#888888",
    fontWeight: "500",
  },
  activeTabLabel: {
    color: "#ffffff",
  },
});

export default BottomNavigation;
