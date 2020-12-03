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

  // Used to dedepuplicate arrays of firefighters
  static arrayRemove = (arr, value) => {
    return arr.filter(function (ele) {
      return ele.firefighterId != value.firefighterId;
    });
  };

  // Get the percentage as a float between 0 and 1 to determine the angle
  static getWhole = (type, value) => {
    var number = 0.0;
    if (type === "Tmp") {
      number = value / (Constants.TMP_MAX - Constants.TMP_MIN);
    } else if (type === "Hum") {
      number = value / (Constants.HUM_MAX - Constants.HUM_MIN);
    } else if (type === "CO") {
      number = value / Constants.CO_RED;
    } else if (type === "NO2") {
      number = value / Constants.NO2_RED;
    }
    console.log("getWhole()", number);
    console.log("type", type);
    console.log("value", value);
    if (number > 1.0) {
      console.log("number over limit", number);
      console.log("-----");
      return 1.0;
    } else {
      console.log("number under limit", number);
      console.log("-----");
      return number;
    }
  };

  // Return a specific color representing what the gauge should show
  // TODO: Use something more clever than stacked if...else statements
  // TODO: Add Formaldehyde, Acrolein, and Benzene when implemented
  static getStatusColor = (type, value, increment, gauge) => {
    var color = Constants.DEFAULT_COLOR;
    var defaultIncrement = Constants.DEFAULT_INCREMENT;

    // Carbon monoxide
    if (type === "CO") {
      if (increment === "now") {
        if (value <= Constants.CO_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.CO_RED || value === Constants.CHERNOBYL) {
          color = Constants.RED;
        } else if (value > Constants.CO_YELLOW && value < Constants.CO_RED) {
          color = Constants.YELLOW;
        }
      } else if (increment === "10min") {
        if (value <= Constants.CO_10_MN_YELLOW) {
          color = Constants.GREEN;
        } else if (
          value >= Constants.CO_10_MN_RED ||
          value === Constants.CHERNOBYL
        ) {
          color = Constants.RED;
        } else if (
          value > Constants.CO_10_MN_YELLOW &&
          value < Constants.CO_10_MN_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === "30min") {
        if (value <= Constants.CO_30_MN_YELLOW) {
          color = Constants.GREEN;
        } else if (
          value >= Constants.CO_30_MN_RED ||
          value === Constants.CHERNOBYL
        ) {
          color = Constants.RED;
        } else if (
          value > Constants.CO_30_MN_YELLOW &&
          value < Constants.CO_30_MN_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === "1hr") {
        if (value <= Constants.CO_1_HR_YELLOW) {
          color = Constants.GREEN;
        } else if (
          value >= Constants.CO_1_HR_RED ||
          value === Constants.CHERNOBYL
        ) {
          color = Constants.RED;
        } else if (
          value > Constants.CO_1_HR_YELLOW &&
          value < Constants.CO_1_HR_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === "4hr") {
        if (value <= Constants.CO_4_HR_YELLOW) {
          color = Constants.GREEN;
        } else if (
          value >= Constants.CO_4_HR_RED ||
          value === Constants.CHERNOBYL
        ) {
          color = Constants.RED;
        } else if (
          value > Constants.CO_4_HR_YELLOW &&
          value < Constants.CO_4_HR_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === "8hr") {
        if (value <= Constants.CO_8_HR_YELLOW) {
          color = Constants.GREEN;
        } else if (
          value >= Constants.CO_8_HR_RED ||
          value === Constants.CHERNOBYL
        ) {
          color = Constants.RED;
        } else if (
          value > Constants.CO_8_HR_YELLOW &&
          value < Constants.CO_8_HR_RED
        ) {
          color = Constants.YELLOW;
        }
      }

      // Nitrogen dioxide
    } else if (type === "NO2") {
      if (increment === "now") {
        if (value <= Constants.NO2_YELLOW) {
          color = Constants.GREEN;
        } else if (
          value >= Constants.NO2_RED ||
          value === Constants.CHERNOBYL
        ) {
          color = Constants.RED;
        } else if (value > Constants.NO2_YELLOW && value < Constants.NO2_RED) {
          color = Constants.YELLOW;
        }
      } else if (increment === "10min") {
        if (value <= Constants.NO2_10_MN_YELLOW) {
          color = Constants.GREEN;
        } else if (
          value >= Constants.NO2_10_MN_RED ||
          value === Constants.CHERNOBYL
        ) {
          color = Constants.RED;
        } else if (
          value > Constants.NO2_10_MN_YELLOW &&
          value < Constants.NO2_10_MN_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === "30min") {
        if (value <= Constants.NO2_30_MN_YELLOW) {
          color = Constants.GREEN;
        } else if (
          value >= Constants.NO2_30_MN_RED ||
          value === Constants.CHERNOBYL
        ) {
          color = Constants.RED;
        } else if (
          value > Constants.NO2_30_MN_YELLOW &&
          value < Constants.NO2_30_MN_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === "1hr") {
        if (value <= Constants.NO2_1_HR_YELLOW) {
          color = Constants.GREEN;
        } else if (
          value >= Constants.NO2_1_HR_RED ||
          value === Constants.CHERNOBYL
        ) {
          color = Constants.RED;
        } else if (
          value > Constants.NO2_1_HR_YELLOW &&
          value < Constants.NO2_1_HR_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === "4hr") {
        if (value <= Constants.NO2_4_HR_YELLOW) {
          color = Constants.GREEN;
        } else if (
          value >= Constants.NO2_4_HR_RED ||
          value === Constants.CHERNOBYL
        ) {
          color = Constants.RED;
        } else if (
          value > Constants.NO2_4_HR_YELLOW &&
          value < Constants.NO2_4_HR_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === "8hr") {
        if (value <= Constants.NO2_8_HR_YELLOW) {
          color = Constants.GREEN;
        } else if (
          value >= Constants.NO2_8_HR_RED ||
          value === Constants.CHERNOBYL
        ) {
          color = Constants.RED;
        } else if (
          value > Constants.NO2_8_HR_YELLOW &&
          value < Constants.NO2_8_HR_RED
        ) {
          color = Constants.YELLOW;
        }
      }

      // Temperature
    } else if (type === "Tmp") {
      if (increment === "now") {
        if (value <= Constants.TMP_YELLOW) {
          color = Constants.GREEN;
        } else if (
          value >= Constants.TMP_RED ||
          value === Constants.CHERNOBYL
        ) {
          color = Constants.RED;
        } else if (value > Constants.TMP_YELLOW && value < Constants.TMP_RED) {
          color = Constants.YELLOW;
        }
      } else if (increment === "10min") {
        if (value <= Constants.TMP_10_MN_YELLOW) {
          color = Constants.GREEN;
        } else if (
          value >= Constants.TMP_10_MN_RED ||
          value === Constants.CHERNOBYL
        ) {
          color = Constants.RED;
        } else if (
          value > Constants.TMP_10_MN_YELLOW &&
          value < Constants.TMP_10_MN_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === "30min") {
        if (value <= Constants.TMP_30_MN_YELLOW) {
          color = Constants.GREEN;
        } else if (
          value >= Constants.TMP_30_MN_RED ||
          value === Constants.CHERNOBYL
        ) {
          color = Constants.RED;
        } else if (
          value > Constants.TMP_30_MN_YELLOW &&
          value < Constants.TMP_30_MN_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === "1hr") {
        if (value <= Constants.TMP_1_HR_YELLOW) {
          color = Constants.GREEN;
        } else if (
          value >= Constants.TMP_1_HR_RED ||
          value === Constants.CHERNOBYL
        ) {
          color = Constants.RED;
        } else if (
          value > Constants.TMP_1_HR_YELLOW &&
          value < Constants.TMP_1_HR_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === "4hr") {
        if (value <= Constants.TMP_4_HR_YELLOW) {
          color = Constants.GREEN;
        } else if (
          value >= Constants.TMP_4_HR_RED ||
          value === Constants.CHERNOBYL
        ) {
          color = Constants.RED;
        } else if (
          value > Constants.TMP_4_HR_YELLOW &&
          value < Constants.TMP_4_HR_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === "8hr") {
        if (value <= Constants.TMP_8_HR_YELLOW) {
          color = Constants.GREEN;
        } else if (
          value >= Constants.TMP_8_HR_RED ||
          value === Constants.CHERNOBYL
        ) {
          color = Constants.RED;
        } else if (
          value > Constants.TMP_8_HR_YELLOW &&
          value < Constants.TMP_8_HR_RED
        ) {
          color = Constants.YELLOW;
        }
      }

      // Humidity
    } else if (type === "Hum") {
      if (increment === "now") {
        if (value <= Constants.HUM_YELLOW) {
          color = Constants.GREEN;
        } else if (
          value >= Constants.HUM_RED ||
          value === Constants.CHERNOBYL
        ) {
          color = Constants.RED;
        } else if (value > Constants.HUM_YELLOW && value < Constants.HUM_RED) {
          color = Constants.YELLOW;
        }
      } else if (increment === "10min") {
        if (value <= Constants.HUM_10_MN_YELLOW) {
          color = Constants.GREEN;
        } else if (
          value >= Constants.HUM_10_MN_RED ||
          value === Constants.CHERNOBYL
        ) {
          color = Constants.RED;
        } else if (
          value > Constants.HUM_10_MN_YELLOW &&
          value < Constants.HUM_10_MN_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === "30min") {
        if (value <= Constants.HUM_30_MN_YELLOW) {
          color = Constants.GREEN;
        } else if (
          value >= Constants.HUM_30_MN_RED ||
          value === Constants.CHERNOBYL
        ) {
          color = Constants.RED;
        } else if (
          value > Constants.HUM_30_MN_YELLOW &&
          value < Constants.HUM_30_MN_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === "1hr") {
        if (value <= Constants.HUM_1_HR_YELLOW) {
          color = Constants.GREEN;
        } else if (
          value >= Constants.HUM_1_HR_RED ||
          value === Constants.CHERNOBYL
        ) {
          color = Constants.RED;
        } else if (
          value > Constants.HUM_1_HR_YELLOW &&
          value < Constants.HUM_1_HR_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === "4hr") {
        if (value <= Constants.HUM_4_HR_YELLOW) {
          color = Constants.GREEN;
        } else if (
          value >= Constants.HUM_4_HR_RED ||
          value === Constants.CHERNOBYL
        ) {
          color = Constants.RED;
        } else if (
          value > Constants.HUM_4_HR_YELLOW &&
          value < Constants.HUM_4_HR_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === "8hr") {
        if (value <= Constants.HUM_8_HR_YELLOW) {
          color = Constants.GREEN;
        } else if (
          value >= Constants.HUM_8_HR_RED ||
          value === Constants.CHERNOBYL
        ) {
          color = Constants.RED;
        } else if (
          value > Constants.HUM_8_HR_YELLOW &&
          value < Constants.HUM_8_HR_RED
        ) {
          color = Constants.YELLOW;
        }
      }
    }
    console.log("getStatusColor()");
    console.log("gauge", gauge);
    console.log("value", value);
    console.log("color", color);
    console.log("-----");

    return color;
  };
}

export default Utils;
