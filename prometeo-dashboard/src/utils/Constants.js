import * as d3 from 'd3';

class Constants {
  // Should be in an .env file
  // static WEBSOCKET_URL = 'ws://localhost:8010';
  static WEBSOCKET_URL = 'ws://159.122.237.4:32035';

  // Whether to validate against App ID. Important when developing locally.
  static AUTH_DISABLED = true;

  // Recent reading notification threshold
  static RECENT_NOTIFICATION_THRESHOLD = 45000;

  // For displaying status colors (palette from Carbon, should use tokens)
  static RED = '#da1e28';
  static YELLOW = '#f1c21b';
  static GREEN = '#24a148';
  static WHITE = '#efefef';
  static BLUE_DK = '#0f62fe';
  static BLUE_LT = '#78a9ff';
  static DEFAULT_COLOR = '#ddd';
  static DEFAULT_INCREMENT = 'now';
  static CHERNOBYL = -1;

  // For calculating gauge angles
  static TAU = 2 * Math.PI;
  static ARC = d3.arc().innerRadius(21).outerRadius(30).startAngle(0);

  /*
  float tempThreshold = 80; // 80C is max temperature rating for Prometeo device
  float coThreshold = 420;  // 420ppm is AEGL2 10-minute limit
  float no2Threshold = 8;   // 20ppm is AEGL2 10-minute limit; 8ppm is the limit Joan suggested
  float coSensorMax = 1000; // 1000ppm is the max value it's rated for
  float no2SensorMax = 10;  // 10ppm is the max value it's rated for
  */

  // These don't have time averages nor official thresholds
  static TMP_MIN = 0;
  static TMP_MAX = 40;
  static TMP_YELLOW = 25.6;
  static TMP_RED = 32;

  static HUM_MIN = 0;
  static HUM_MAX = 100;
  static HUM_YELLOW = 64;
  static HUM_RED = 80;

  // Chemical thresholds (from http://159.122.217.91/get_configuration)
  // See limits.json for a downloaded copy
  // TODO: Add ACR, FMD, BNZ when those sensors are added
  static CO_YELLOW = 336;
  static NO2_YELLOW = 6.4;
  static CO_RED = 420;
  static NO2_RED = 8;

  static CO_10_MN_YELLOW = 336;
  static NO2_10_MN_YELLOW = 6.4;
  static CO_10_MN_RED = 420;
  static NO2_10_MN_RED = 8;

  static CO_30_MN_YELLOW = 120;
  static NO2_30_MN_YELLOW = 4.8;
  static CO_30_MN_RED = 150;
  static NO2_30_MN_RED = 6;

  static CO_1_HR_YELLOW = 66.4;
  static NO2_1_HR_YELLOW = 3.2;
  static CO_1_HR_RED = 83;
  static NO2_1_HR_RED = 4;

  static CO_4_HR_YELLOW = 26.4;
  static NO2_4_HR_YELLOW = 1.6;
  static CO_4_HR_RED = 33;
  static NO2_4_HR_RED = 2;

  static CO_8_HR_YELLOW = 21.6;
  static NO2_8_HR_YELLOW = 0.8;
  static CO_8_HR_RED = 27;
  static NO2_8_HR_RED = 1;
}

export default Constants;
