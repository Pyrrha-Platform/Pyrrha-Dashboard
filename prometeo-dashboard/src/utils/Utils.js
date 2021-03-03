import * as d3 from 'd3';
import Constants from './Constants';

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
      return ele.device_id !== value.device_id;
    });
  };

  // Whole number or to a given number of decimal places
  static formatFloat = (value, places) => {
    if (!isNaN(value)) {
      return +parseFloat(value).toFixed(places);
    }
    return '-';
  };

  // Get the percentage as a float between 0 and 1 to determine the angle
  static getPercentage = (type, value, increment) => {
    var number = 0.0;

    // Carbon monoxide
    if (type === 'CO') {
      switch (increment) {
        case 'now':
          number = value / Constants.CO_RED;
          break;
        case '10min':
          number = value / Constants.CO_10_MN_RED;
          break;
        case '30min':
          number = value / Constants.CO_30_MN_RED;
          break;
        case '1hr':
          number = value / Constants.CO_1_HR_RED;
          break;
        case '4hr':
          number = value / Constants.CO_4_HR_RED;
          break;
        case '8hr':
          number = value / Constants.CO_8_HR_RED;
          break;
        default:
          number = value / Constants.CO_RED;
      }

      // Nitrogen dioxide
    } else if (type === 'NO2') {
      switch (increment) {
        case 'now':
          number = value / Constants.NO2_RED;
          break;
        case '10min':
          number = value / Constants.NO2_10_MN_RED;
          break;
        case '30min':
          number = value / Constants.NO2_30_MN_RED;
          break;
        case '1hr':
          number = value / Constants.NO2_1_HR_RED;
          break;
        case '4hr':
          number = value / Constants.NO2_4_HR_RED;
          break;
        case '8hr':
          number = value / Constants.NO2_8_HR_RED;
          break;
        default:
          number = value / Constants.NO2_RED;
      }

      // Temperature
    } else if (type === 'Tmp') {
      number = value / Constants.TMP_MAX;

      // Humidity
    } else if (type === 'Hum') {
      number = value / Constants.HUM_MAX;
    }

    /*
    console.log("getPercentage()", number);
    console.log("type", type);
    console.log("value", value);
    */
    if (number > 1.0) {
      /*
      console.log("number over limit", number);
      console.log("-----");
      */
      return 1.0;
    } else {
      /*
      console.log("number under limit", number);
      console.log("-----");
      */
      return number;
    }
  };

  // Get the percentage as a float between 0 and 1 to determine the angle
  static getChartLimit = (type, increment) => {
    var limits = [0, 0];

    // Carbon monoxide
    if (type === 'CO') {
      switch (increment) {
        case 'now':
          limits = [Constants.CO_YELLOW, Constants.CO_RED];
          break;
        case '10min':
          limits = [Constants.CO_10_MN_YELLOW, Constants.CO_10_MN_RED];
          break;
        case '30min':
          limits = [Constants.CO_30_MN_YELLOW, Constants.CO_30_MN_RED];
          break;
        case '1hr':
          limits = [Constants.CO_1_HR_YELLOW, Constants.CO_1_HR_RED];
          break;
        case '4hr':
          limits = [Constants.CO_4_HR_YELLOW, Constants.CO_4_HR_RED];
          break;
        case '8hr':
          limits = [Constants.CO_8_HR_YELLOW, Constants.CO_8_HR_RED];
          break;
        default:
          limits = [Constants.CO_YELLOW, Constants.CO_RED];
      }

      // Nitrogen dioxide
    } else if (type === 'NO2') {
      switch (increment) {
        case 'now':
          limits = [Constants.NO2_YELLOW, Constants.NO2_RED];
          break;
        case '10min':
          limits = [Constants.NO2_10_MN_YELLOW, Constants.NO2_10_MN_RED];
          break;
        case '30min':
          limits = [Constants.NO2_30_MN_YELLOW, Constants.NO2_30_MN_RED];
          break;
        case '1hr':
          limits = [Constants.NO2_1_HR_YELLOW, Constants.NO2_1_HR_RED];
          break;
        case '4hr':
          limits = [Constants.NO2_4_HR_YELLOW, Constants.NO2_4_HR_RED];
          break;
        case '8hr':
          limits = [Constants.NO2_8_HR_YELLOW, Constants.NO2_8_HR_RED];
          break;
        default:
          limits = [Constants.NO2_YELLOW, Constants.NO2_RED];
      }
    }

    return limits;
  };

  // Return a specific color representing what the gauge should show
  // TODO: Use something more clever than stacked if...else statements
  // TODO: Add Formaldehyde, Acrolein, and Benzene when implemented
  static getStatusColor = (type, value, increment, gauge) => {
    var color = Constants.DEFAULT_COLOR;

    console.log('getStatusColor()');
    console.log('type', type);
    console.log('value', value, parseInt(value));
    console.log('increment', increment);
    console.log('gauge', gauge);

    // Bail out quickly
    if (parseInt(value) === Constants.CHERNOBYL) {
      return Constants.RED;
    }

    // Carbon monoxide
    if (type === 'CO') {
      if (increment === 'now') {
        if (value <= Constants.CO_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.CO_RED) {
          color = Constants.RED;
        } else if (value > Constants.CO_YELLOW && value < Constants.CO_RED) {
          color = Constants.YELLOW;
        }
      } else if (increment === '10min') {
        if (value <= Constants.CO_10_MN_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.CO_10_MN_RED) {
          color = Constants.RED;
        } else if (
          value > Constants.CO_10_MN_YELLOW &&
          value < Constants.CO_10_MN_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === '30min') {
        if (value <= Constants.CO_30_MN_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.CO_30_MN_RED) {
          color = Constants.RED;
        } else if (
          value > Constants.CO_30_MN_YELLOW &&
          value < Constants.CO_30_MN_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === '1hr') {
        if (value <= Constants.CO_1_HR_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.CO_1_HR_RED) {
          color = Constants.RED;
        } else if (
          value > Constants.CO_1_HR_YELLOW &&
          value < Constants.CO_1_HR_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === '4hr') {
        if (value <= Constants.CO_4_HR_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.CO_4_HR_RED) {
          color = Constants.RED;
        } else if (
          value > Constants.CO_4_HR_YELLOW &&
          value < Constants.CO_4_HR_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === '8hr') {
        if (value <= Constants.CO_8_HR_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.CO_8_HR_RED) {
          color = Constants.RED;
        } else if (
          value > Constants.CO_8_HR_YELLOW &&
          value < Constants.CO_8_HR_RED
        ) {
          color = Constants.YELLOW;
        }
      }

      // Nitrogen dioxide
    } else if (type === 'NO2') {
      if (increment === 'now') {
        if (value <= Constants.NO2_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.NO2_RED) {
          color = Constants.RED;
        } else if (value > Constants.NO2_YELLOW && value < Constants.NO2_RED) {
          color = Constants.YELLOW;
        }
      } else if (increment === '10min') {
        if (value <= Constants.NO2_10_MN_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.NO2_10_MN_RED) {
          color = Constants.RED;
        } else if (
          value > Constants.NO2_10_MN_YELLOW &&
          value < Constants.NO2_10_MN_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === '30min') {
        if (value <= Constants.NO2_30_MN_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.NO2_30_MN_RED) {
          color = Constants.RED;
        } else if (
          value > Constants.NO2_30_MN_YELLOW &&
          value < Constants.NO2_30_MN_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === '1hr') {
        if (value <= Constants.NO2_1_HR_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.NO2_1_HR_RED) {
          color = Constants.RED;
        } else if (
          value > Constants.NO2_1_HR_YELLOW &&
          value < Constants.NO2_1_HR_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === '4hr') {
        if (value <= Constants.NO2_4_HR_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.NO2_4_HR_RED) {
          color = Constants.RED;
        } else if (
          value > Constants.NO2_4_HR_YELLOW &&
          value < Constants.NO2_4_HR_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === '8hr') {
        if (value <= Constants.NO2_8_HR_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.NO2_8_HR_RED) {
          color = Constants.RED;
        } else if (
          value > Constants.NO2_8_HR_YELLOW &&
          value < Constants.NO2_8_HR_RED
        ) {
          color = Constants.YELLOW;
        }
      }

      // Temperature
    } else if (type === 'Tmp') {
      if (increment === 'now') {
        if (value <= Constants.TMP_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.TMP_RED) {
          color = Constants.RED;
        } else if (value > Constants.TMP_YELLOW && value < Constants.TMP_RED) {
          color = Constants.YELLOW;
        }
      } else if (increment === '10min') {
        if (value <= Constants.TMP_10_MN_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.TMP_10_MN_RED) {
          color = Constants.RED;
        } else if (
          value > Constants.TMP_10_MN_YELLOW &&
          value < Constants.TMP_10_MN_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === '30min') {
        if (value <= Constants.TMP_30_MN_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.TMP_30_MN_RED) {
          color = Constants.RED;
        } else if (
          value > Constants.TMP_30_MN_YELLOW &&
          value < Constants.TMP_30_MN_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === '1hr') {
        if (value <= Constants.TMP_1_HR_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.TMP_1_HR_RED) {
          color = Constants.RED;
        } else if (
          value > Constants.TMP_1_HR_YELLOW &&
          value < Constants.TMP_1_HR_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === '4hr') {
        if (value <= Constants.TMP_4_HR_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.TMP_4_HR_RED) {
          color = Constants.RED;
        } else if (
          value > Constants.TMP_4_HR_YELLOW &&
          value < Constants.TMP_4_HR_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === '8hr') {
        if (value <= Constants.TMP_8_HR_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.TMP_8_HR_RED) {
          color = Constants.RED;
        } else if (
          value > Constants.TMP_8_HR_YELLOW &&
          value < Constants.TMP_8_HR_RED
        ) {
          color = Constants.YELLOW;
        }
      }

      // Humidity
    } else if (type === 'Hum') {
      if (increment === 'now') {
        if (value <= Constants.HUM_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.HUM_RED) {
          color = Constants.RED;
        } else if (value > Constants.HUM_YELLOW && value < Constants.HUM_RED) {
          color = Constants.YELLOW;
        }
      } else if (increment === '10min') {
        if (value <= Constants.HUM_10_MN_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.HUM_10_MN_RED) {
          color = Constants.RED;
        } else if (
          value > Constants.HUM_10_MN_YELLOW &&
          value < Constants.HUM_10_MN_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === '30min') {
        if (value <= Constants.HUM_30_MN_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.HUM_30_MN_RED) {
          color = Constants.RED;
        } else if (
          value > Constants.HUM_30_MN_YELLOW &&
          value < Constants.HUM_30_MN_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === '1hr') {
        if (value <= Constants.HUM_1_HR_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.HUM_1_HR_RED) {
          color = Constants.RED;
        } else if (
          value > Constants.HUM_1_HR_YELLOW &&
          value < Constants.HUM_1_HR_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === '4hr') {
        if (value <= Constants.HUM_4_HR_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.HUM_4_HR_RED) {
          color = Constants.RED;
        } else if (
          value > Constants.HUM_4_HR_YELLOW &&
          value < Constants.HUM_4_HR_RED
        ) {
          color = Constants.YELLOW;
        }
      } else if (increment === '8hr') {
        if (value <= Constants.HUM_8_HR_YELLOW) {
          color = Constants.GREEN;
        } else if (value >= Constants.HUM_8_HR_RED) {
          color = Constants.RED;
        } else if (
          value > Constants.HUM_8_HR_YELLOW &&
          value < Constants.HUM_8_HR_RED
        ) {
          color = Constants.YELLOW;
        }
      }
    }

    /*
    console.log("color", color);
    console.log("-----");
    */

    return color;
  };

  static formatDate = (date) => {
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return `${da} ${mo}, ${ye}`;
  };

  static formatTime = (date) => {
    return new Intl.DateTimeFormat('en', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    })
      .format(date)
      .toLowerCase();
  };

  static filterTime = (date, timeFilter) => {
    return (
      new Date().getTime() - date <= (timeFilter.timePeriod + 86400) * 1000
    );
  };

  static keyboardOnlySubmit = (e, callback) => {
    switch (e.keyCode) {
      case 32: // space
      case 13: // enter
        callback();
        break;
      default:
        break;
    }
  };
}

export default Utils;
