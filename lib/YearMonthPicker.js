"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _style = _interopRequireDefault(require("styled-jsx/style"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MONTHS_NAMES = {
  Jan: 'January',
  Feb: 'February',
  Mar: 'March',
  Apr: 'April',
  May: 'May',
  Jun: 'June',
  Jul: 'July',
  Aug: 'August',
  Sep: 'September',
  Oct: 'October',
  Nov: 'November',
  Dec: 'December'
};
var VIEW_YEARS = 'YEARS';
var VIEW_MONTHS = 'MONTHS';

var YearMonthPicker =
/*#__PURE__*/
function (_Component) {
  _inherits(YearMonthPicker, _Component);

  _createClass(YearMonthPicker, null, [{
    key: "defaultProps",
    get: function get() {
      return {
        closeOnSelect: true
      };
    }
  }, {
    key: "propTypes",
    get: function get() {
      return {
        onChange: _propTypes.default.func.isRequired,
        closeOnSelect: _propTypes.default.bool
      };
    }
  }]);

  function YearMonthPicker(props) {
    var _this;

    _classCallCheck(this, YearMonthPicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(YearMonthPicker).call(this, props));
    var currentTime = new Date();
    var startYear = props.currentYearMonth ? currentTime.getFullYear() : props.defaultYear;
    var startMonth = props.currentYearMonth ? Object.keys(MONTHS_NAMES)[currentTime.getMonth()] : Object.keys(MONTHS_NAMES)[props.defaultMonth - 1];
    _this.state = {
      years: Array.from({
        length: 12
      }, function (_v, k) {
        return k + startYear;
      }),
      selectedYear: startYear,
      selectedMonth: startMonth,
      currentView: startYear ? VIEW_MONTHS : VIEW_YEARS,
      open: false
    };
    return _this;
  }

  _createClass(YearMonthPicker, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.body.removeEventListener('click', this.scheduleClose);
    }
  }, {
    key: "onChange",
    value: function onChange(selectedMonth, selectedYear) {
      this.props.onChange(_momentTimezone.default.utc("".concat(selectedMonth, " ").concat(selectedYear), 'MMM YYYY'));
    }
  }, {
    key: "open",
    value: function open() {
      this.setState({
        open: true
      });
      document.body.addEventListener('click', this.scheduleClose.bind(this));
    }
  }, {
    key: "close",
    value: function close() {
      this.setState({
        open: false
      });
      document.body.removeEventListener('click', this.scheduleClose);
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      event.stopPropagation();

      if (this.timeoutClose) {
        clearTimeout(this.timeoutClose);
      }
    }
  }, {
    key: "scheduleClose",
    value: function scheduleClose() {
      var _this2 = this;

      if (this.timeoutClose) {
        clearTimeout(this.timeoutClose);
      }

      this.timeoutClose = setTimeout(function () {
        _this2.close();
      }, 10);
    }
  }, {
    key: "selectMonthYear",
    value: function selectMonthYear(selectedMonth, selectedYear) {
      this.setState({
        selectedMonth: selectedMonth,
        selectedYear: selectedYear
      });
      this.onChange(selectedMonth, selectedYear);
    }
  }, {
    key: "previous",
    value: function previous() {
      var _this$state = this.state,
          currentView = _this$state.currentView,
          selectedMonth = _this$state.selectedMonth,
          selectedYear = _this$state.selectedYear,
          years = _this$state.years;

      if (currentView === VIEW_YEARS) {
        if (selectedYear === years[0]) {
          this.updateYears(years[0] - 12);
        }

        selectedYear = selectedYear - 1;
      }

      if (currentView === VIEW_MONTHS) {
        var monthNumber = Object.keys(MONTHS_NAMES).findIndex(function (m) {
          return m === selectedMonth;
        });

        if (monthNumber === 0) {
          monthNumber = 11;

          if (selectedYear === years[0]) {
            this.updateYears(years[0] - 12);
          }

          selectedYear = selectedYear - 1;
        } else {
          monthNumber = monthNumber - 1;
        }

        selectedMonth = Object.keys(MONTHS_NAMES)[monthNumber];
      }

      this.selectMonthYear(selectedMonth, selectedYear);
    }
  }, {
    key: "next",
    value: function next() {
      var _this$state2 = this.state,
          currentView = _this$state2.currentView,
          selectedMonth = _this$state2.selectedMonth,
          selectedYear = _this$state2.selectedYear,
          years = _this$state2.years;

      if (currentView === VIEW_YEARS) {
        if (selectedYear === years[11]) {
          this.updateYears(years[11] + 1);
        }

        selectedYear = selectedYear + 1;
      }

      if (currentView === VIEW_MONTHS) {
        var monthNumber = Object.keys(MONTHS_NAMES).findIndex(function (m) {
          return m === selectedMonth;
        });

        if (monthNumber === 11) {
          monthNumber = 0;

          if (selectedYear === years[11]) {
            this.updateYears(years[11] + 1);
          }

          selectedYear = selectedYear + 1;
        } else {
          monthNumber = monthNumber + 1;
        }

        selectedMonth = Object.keys(MONTHS_NAMES)[monthNumber];
      }

      this.selectMonthYear(selectedMonth, selectedYear);
    }
  }, {
    key: "updateYears",
    value: function updateYears(startYear) {
      var years = Array.from({
        length: 12
      }, function (_v, k) {
        return k + startYear;
      });
      this.setState({
        years: years
      });
    }
  }, {
    key: "renderMonths",
    value: function renderMonths() {
      var _this3 = this;

      var _this$state3 = this.state,
          selectedMonth = _this$state3.selectedMonth,
          selectedYear = _this$state3.selectedYear;
      var closeOnSelect = this.props.closeOnSelect;
      return Object.keys(MONTHS_NAMES).map(function (month, i) {
        return _react.default.createElement("div", {
          selected: selectedMonth === month,
          key: i,
          onClick: function onClick() {
            _this3.selectMonthYear(month, selectedYear);

            if (closeOnSelect) {
              _this3.close();
            }
          },
          className: "jsx-2985449870" + " " + "column"
        }, month, _react.default.createElement(_style.default, {
          id: "2985449870"
        }, [".column.jsx-2985449870{cursor:pointer;font-size:16px;padding:5px 0;text-align:center;width:33.33%;}", ".column.jsx-2985449870:hover{background-color:#ececec;}"]));
      });
    }
  }, {
    key: "renderYears",
    value: function renderYears() {
      var _this4 = this;

      var _this$state4 = this.state,
          selectedYear = _this$state4.selectedYear,
          selectedMonth = _this$state4.selectedMonth;
      return this.state.years.map(function (year, i) {
        var cname = year < _this4.props.minYear || year > _this4.props.maxYear ? "column-disabled" : "column";
        return _react.default.createElement("div", {
          selected: selectedYear === year,
          key: i,
          onClick: function onClick() {
            _this4.selectMonthYear(selectedMonth, year);

            _this4.setState({
              currentView: VIEW_MONTHS
            });
          },
          className: "jsx-1302388516" + " " + (cname || "")
        }, year, _react.default.createElement(_style.default, {
          id: "1302388516"
        }, [".column.jsx-1302388516{cursor:pointer;font-size:16px;padding:5px 0;text-align:center;width:33.33%;}", ".column.jsx-1302388516:hover{background-color:#ececec;}", ".column-disabled.jsx-1302388516{pointer-events:none;font-size:16px;padding:5px 0;color:grey;text-align:center;width:33.33%;}"]));
      });
    }
  }, {
    key: "renderHead",
    value: function renderHead() {
      var _this5 = this;

      var _this$state5 = this.state,
          currentView = _this$state5.currentView,
          selectedMonth = _this$state5.selectedMonth,
          selectedYear = _this$state5.selectedYear;
      return _react.default.createElement("div", {
        className: "jsx-341033505" + " " + "head"
      }, _react.default.createElement("div", {
        id: "picker-prev",
        onClick: function onClick() {
          if (_this5.state.years[0] > _this5.props.minYear) _this5.previous();
        },
        className: "jsx-341033505" + " " + "column"
      }, "<"), _react.default.createElement("div", {
        onClick: function onClick() {
          return _this5.setState({
            currentView: currentView === VIEW_YEARS ? VIEW_MONTHS : VIEW_YEARS
          });
        },
        className: "jsx-341033505" + " " + "column"
      }, "".concat(selectedMonth, " ").concat(selectedYear)), _react.default.createElement("div", {
        id: "picker-next",
        onClick: function onClick() {
          if (_this5.state.years[11] < _this5.props.maxYear) _this5.next();
        },
        className: "jsx-341033505" + " " + "column"
      }, ">"), _react.default.createElement(_style.default, {
        id: "341033505"
      }, [".head.jsx-341033505{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;font-weight:bold;}", ".column.jsx-341033505{cursor:pointer;font-size:16px;padding:5px 0;text-align:center;width:33.33%;}", ".column.jsx-341033505:hover{background-color:#ececec;}"]));
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _this$state6 = this.state,
          selectedYear = _this$state6.selectedYear,
          selectedMonth = _this$state6.selectedMonth,
          open = _this$state6.open,
          currentView = _this$state6.currentView;
      return _react.default.createElement("div", {
        onClick: this.handleClick.bind(this),
        className: "jsx-1876002214"
      }, _react.default.createElement("input", {
        id: "picker-input",
        onClick: function onClick() {
          return _this6.open();
        },
        onChange: function onChange() {},
        type: "text",
        value: "".concat(MONTHS_NAMES[selectedMonth], " ").concat(selectedYear),
        className: "jsx-1876002214" + " " + "input"
      }), open && _react.default.createElement("div", {
        id: "year-month-picker",
        className: "jsx-1876002214" + " " + "year-month-wrapper"
      }, this.renderHead(), _react.default.createElement("div", {
        className: "jsx-1876002214" + " " + "year-month"
      }, currentView === VIEW_YEARS ? this.renderYears() : this.renderMonths())), _react.default.createElement(_style.default, {
        id: "1876002214"
      }, [".year-month-wrapper.jsx-1876002214{max-width:300px;border:1px solid #f9f9f9;}", ".year-month.jsx-1876002214{border:1px solid #f9f9f9;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;}", ".head.jsx-1876002214{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;font-weight:bold;}", ".input.jsx-1876002214{border-top:0 !important;margin-bottom:10px;font-size:14px !important;}"]));
    }
  }]);

  return YearMonthPicker;
}(_react.Component);

exports.default = YearMonthPicker;