import * as d3 from "d3";
import Constants from "./Constants.js";

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
  
  // TODO: Use thresholds from constants.js
  static getStatusColor = (type, initialNumber) => {
    var color = Constants.DEFAULT_COLOR;
    if (type == "CO") {
      if (initialNumber <= 0.81) {
        color = Constants.GREEN;
      } else if (initialNumber >= 0.99 || initialNumber == -1) {
        color = Constants.RED;
      } else if (initialNumber > 0.81 && initialNumber < 0.99) {
        color = Constants.YELLOW;
      }
    } else if (type == "NO2") {
      if (initialNumber <= 0.81) {
        color = Constants.GREEN;
      } else if (initialNumber >= 0.99 || initialNumber == -1) {
        color = Constants.RED;
      } else if (initialNumber > 0.81 && initialNumber < 0.99) {
        color = Constants.YELLOW;
      }
    } else if (type == "Tmp") {
      if (initialNumber <= 0.25) {
        color = Constants.GREEN;
      } else if (initialNumber >= 0.35) {
        color = Constants.RED;
      } else if (initialNumber > 0.25 && initialNumber < 0.35) {
        color = Constants.YELLOW;
      }
    } else if (type == "Hum") {
      if (initialNumber <= 0.6) {
        color = Constants.GREEN;
      } else if (initialNumber >= 0.8) {
        color = Constants.RED;
      } else if (initialNumber > 0.6 && initialNumber < 0.8) {
        color = Constants.YELLOW;
      }
    }
    return color;
  };
  
  // TODO: Use thresholds from constants.js
  static getWhole = (value, type) => {
    var number = 0.0;
    if (type == "Tmp") {
      var upper = 40;
      var lower = 0;
      var range = upper - lower;
      number = value / range;
    } else if (type == "Hum") {
      var upper = 100;
      var lower = 0;
      var range = upper - lower;
      number = value / range;
    }
    return number;
  };

}

export default Utils;