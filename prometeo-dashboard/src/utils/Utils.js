import * as d3 from "d3";
import Constants from "./Constants";

class Utils {
  // Manages transitions of gauge angles
  static arcTween = (newAngle) => {
    return function (d) {
      var interpolate = d3.interpolate(d.endAngle, newAngle);
      return function (t) {
        d.endAngle = interpolate(t);
        return Constants.ARC(d);
      };
    };
  };

  // TODO: Use thresholds from constants
  static getStatusColor = (type, value, limit) => {
    var color = Constants.DEFAULT_COLOR;
    if (type === "CO") {
      if (limit <= 0.81) {
        color = Constants.GREEN;
      } else if (limit >= 0.99 || value == -1) {
        color = Constants.RED;
      } else if (limit > 0.81 && value < 0.99) {
        color = Constants.YELLOW;
      }
    } else if (type === "NO2") {
      if (limit <= 0.81) {
        color = Constants.GREEN;
      } else if (limit >= 0.99 || value == -1) {
        color = Constants.RED;
      } else if (limit > 0.81 && value < 0.99) {
        color = Constants.YELLOW;
      }
    } else if (type === "Tmp") {
      limit = Utils.getWhole(type, value);
      if (limit <= 0.25) {
        color = Constants.GREEN;
      } else if (limit >= 0.35) {
        color = Constants.RED;
      } else if (limit > 0.25 && value < 0.35) {
        color = Constants.YELLOW;
      }
    } else if (type === "Hum") {
      limit = Utils.getWhole(type, value);
      if (limit <= 0.6) {
        color = Constants.GREEN;
      } else if (limit >= 0.8) {
        color = Constants.RED;
      } else if (limit > 0.6 && value < 0.8) {
        color = Constants.YELLOW;
      }
    }
    return color;
  };

  // TODO: Use thresholds from constants
  static getWhole = (type, value) => {
    var number = 0.0;
    if (type === "Tmp") {
      var upper = 40;
      var lower = 0;
      var range = upper - lower;
      number = value / range;
    } else if (type === "Hum") {
      var upper = 100;
      var lower = 0;
      var range = upper - lower;
      number = value / range;
    }
    return number;
  };
}

export default Utils;
