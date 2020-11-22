import * as d3 from "d3";

class Constants {
  // For displaying status colors (palette from Carbon, should use tokens)
  static RED = "#da1e28";
  static YELLOW = "#f1c21b";
  static GREEN = "#24a148";
  static BLUE_DK = "#0f62fe";
  static BLUE_LT = "#78a9ff";
  static DEFAULT_COLOR = "#ddd";

  // For calculating gauge angles
  static TAU = 2 * Math.PI;
  static ARC = d3.arc().innerRadius(21).outerRadius(30).startAngle(0);

  // Chemical hresholds
  static MAX_CO = 40;
  static MAX_NO2 = 20;
  static MAX_BNZ = -1; // Not used
  static MAX_ACR = -1; // Not used
  static MAX_FMD = -1; // Not used
}

export default Constants;
