import * as d3 from "d3";

class Constants {
  // For displaying status colors (palette from Carbon, should use tokens)
  static RED = "#da1e28";
  static YELLOW = "#f1c21b";
  static GREEN = "#24a148";
  static BLUE_DK = "#0f62fe";
  static BLUE_LT = "#78a9ff";
  static DEFAULT_COLOR = "#ddd";
  static DEFAULT_INCREMENT = "now";
  static CHERNOBYL = -1;

  // For calculating gauge angles
  static TAU = 2 * Math.PI;
  static ARC = d3.arc().innerRadius(21).outerRadius(30).startAngle(0);

  // These don't have time averages nor official thresholds
  static TMP_MIN = 0;
  static TMP_MAX = 40;
  static TMP_YELLOW = 24;
  static TMP_RED = 32;

  static HUM_MIN = 0;
  static HUM_MAX = 100;
  static HUM_YELLOW = 60;
  static HUM_RED = 80;

  // Chemical thresholds (from http://159.122.217.91/get_configuration)
  // TODO: Add ACR, FMD, BNZ when those sensors are added
  static CO_YELLOW = 420;
  static NO2_YELLOW = 8;
  static CO_RED = 500; // Not official
  static NO2_RED = 12; // Not official

  static CO_10_MN_YELLOW = 420;
  static NO2_10_MN_YELLOW = 8;
  static CO_10_MN_RED = 500; // Not official
  static NO2_10_MN_RED = 12; // Not official

  static CO_30_MN_YELLOW = 150;
  static NO2_30_MN_YELLOW = 6;
  static CO_30_MN_RED = 200; // Not official
  static NO2_30_MN_RED = 8; // Not official

  static CO_1_HR_YELLOW = 83;
  static NO2_1_HR_YELLOW = 4;
  static CO_1_HR_RED = 90; // Not official
  static NO2_1_HR_RED = 6; // Not official

  static CO_4_HR_YELLOW = 33;
  static NO2_4_HR_YELLOW = 2;
  static CO_4_HR_RED = 36; // Not official
  static NO2_4_HR_RED = 3; // Not official

  static CO_8_HR_YELLOW = 27;
  static NO2_8_HR_YELLOW = 1;
  static CO_8_HR_RED = 30; // Not official
  static NO2_8_HR_RED = 2; // Not official
}

export default Constants;
