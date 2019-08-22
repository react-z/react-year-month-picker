import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment-timezone";

const MONTHS_NAMES = {
  Jan: "January",
  Feb: "February",
  Mar: "March",
  Apr: "April",
  May: "May",
  Jun: "June",
  Jul: "July",
  Aug: "August",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December"
};
const VIEW_YEARS = "YEARS";
const VIEW_MONTHS = "MONTHS";

export default class YearMonthPicker extends Component {
  static get defaultProps() {
    return {
      closeOnSelect: true
    };
  }

  static get propTypes() {
    return {
      onChange: PropTypes.func.isRequired,
      closeOnSelect: PropTypes.bool
    };
  }

  constructor(props) {
    super(props);
    const currentTime = new Date();
    const startYear = props.currentYearMonth
      ? currentTime.getFullYear()
      : props.defaultYear;
    const startMonth = props.currentYearMonth
      ? Object.keys(MONTHS_NAMES)[currentTime.getMonth()]
      : Object.keys(MONTHS_NAMES)[props.defaultMonth - 1];

    this.state = {
      years: Array.from({ length: 12 }, (_v, k) => k + startYear),
      selectedYear: startYear,
      selectedMonth: startMonth,
      currentView: startYear ? VIEW_MONTHS : VIEW_YEARS,
      open: false
    };
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.scheduleClose);
  }

  onChange(selectedMonth, selectedYear) {
    this.props.onChange(
      moment.utc(`${selectedMonth} ${selectedYear}`, "MMM YYYY")
    );
  }

  open() {
    this.setState({ open: true });
    document.body.addEventListener("click", this.scheduleClose.bind(this));
  }

  close() {
    this.setState({ open: false });
    document.body.removeEventListener("click", this.scheduleClose);
  }

  handleClick(event) {
    event.stopPropagation();
    if (this.timeoutClose) {
      clearTimeout(this.timeoutClose);
    }
  }

  scheduleClose() {
    if (this.timeoutClose) {
      clearTimeout(this.timeoutClose);
    }
    this.timeoutClose = setTimeout(() => {
      this.close();
    }, 10);
  }

  selectMonthYear(selectedMonth, selectedYear) {
    this.setState({ selectedMonth, selectedYear });
    this.onChange(selectedMonth, selectedYear);
  }

  previous() {
    let { currentView, selectedMonth, selectedYear, years } = this.state;

    if (currentView === VIEW_YEARS) {
      if (selectedYear === years[0]) {
        this.updateYears(years[0] - 12);
      }
      selectedYear = selectedYear - 1;
    }

    if (currentView === VIEW_MONTHS) {
      let monthNumber = Object.keys(MONTHS_NAMES).findIndex(
        m => m === selectedMonth
      );
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

  next() {
    let { currentView, selectedMonth, selectedYear, years } = this.state;

    if (currentView === VIEW_YEARS) {
      if (selectedYear === years[11]) {
        this.updateYears(years[11] + 1);
      }
      selectedYear = selectedYear + 1;
    }

    if (currentView === VIEW_MONTHS) {
      let monthNumber = Object.keys(MONTHS_NAMES).findIndex(
        m => m === selectedMonth
      );
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

  updateYears(startYear) {
    const years = Array.from({ length: 12 }, (_v, k) => {
      return k + startYear;
    });
    this.setState({ years });
  }

  renderMonths() {
    const { selectedMonth, selectedYear } = this.state;
    const { closeOnSelect } = this.props;

    return Object.keys(MONTHS_NAMES).map((month, i) => {
      return (
        <div
          className="column"
          selected={selectedMonth === month}
          key={i}
          onClick={() => {
            this.selectMonthYear(month, selectedYear);
            if (closeOnSelect) {
              this.close();
            }
          }}
        >
          {month}
          <style jsx>{`
            .column {
              cursor: pointer;
              font-size: 16px;
              padding: 5px 0;
              text-align: center;
              width: 33.33%;
            }
            .column:hover {
              background-color: #ececec;
            }
          `}</style>
        </div>
      );
    });
  }

  renderYears() {
    const { selectedYear, selectedMonth } = this.state;

    return this.state.years.map((year, i) => {
      let cname =
        year < this.props.minYear || year > this.props.maxYear
          ? "column-disabled"
          : "column";
      return (
        <div
          className={cname}
          selected={selectedYear === year}
          key={i}
          onClick={() => {
            this.selectMonthYear(selectedMonth, year);
            this.setState({ currentView: VIEW_MONTHS });
          }}
        >
          {year}
          <style jsx>{`
            .column {
              cursor: pointer;
              font-size: 16px;
              padding: 5px 0;
              text-align: center;
              width: 33.33%;
            }
            .column:hover {
              background-color: #ececec;
            }
            .column-disabled {
              pointer-events: none;
              font-size: 16px;
              padding: 5px 0;
              color: grey;
              text-align: center;
              width: 33.33%;
            }
          `}</style>
        </div>
      );
    });
  }

  renderHead() {
    const { currentView, selectedMonth, selectedYear } = this.state;

    return (
      <div className="head">
        <div
          className="column"
          id="picker-prev"
          onClick={() => {
            if (this.state.years[0] > this.props.minYear) this.previous();
          }}
        >
          &lt;
        </div>

        <div
          className="column"
          onClick={() =>
            this.setState({
              currentView: currentView === VIEW_YEARS ? VIEW_MONTHS : VIEW_YEARS
            })
          }
        >
          {`${selectedMonth} ${selectedYear}`}
        </div>

        <div
          className="column"
          id="picker-next"
          onClick={() => {
            if (this.state.years[11] < this.props.maxYear) this.next();
          }}
        >
          &gt;
        </div>

        <style jsx>{`
          .head {
            display: flex;
            flex-wrap: wrap;
            font-weight: bold;
          }
          .column {
            cursor: pointer;
            font-size: 16px;
            padding: 5px 0;
            text-align: center;
            width: 33.33%;
          }
          .column:hover {
            background-color: #ececec;
          }
        `}</style>
      </div>
    );
  }

  render() {
    const { selectedYear, selectedMonth, open, currentView } = this.state;

    return (
      <div onClick={this.handleClick.bind(this)}>
        <input
          className="input"
          id="picker-input"
          onClick={() => this.open()}
          onChange={() => {}}
          type="text"
          value={`${MONTHS_NAMES[selectedMonth]} ${selectedYear}`}
        />

        {open && (
          <div className="year-month-wrapper" id="year-month-picker">
            {this.renderHead()}
            <div className="year-month">
              {currentView === VIEW_YEARS
                ? this.renderYears()
                : this.renderMonths()}
            </div>
          </div>
        )}

        <style jsx>{`
          .year-month-wrapper {
            max-width: 300px;
            border: 1px solid #f9f9f9;
          }
          .year-month {
            border: 1px solid #f9f9f9;
            display: flex;
            flex-wrap: wrap;
          }
          .head {
            display: flex;
            flex-wrap: wrap;
            font-weight: bold;
          }
          .input {
            border-top: 0 !important;
            margin-bottom: 10px;
            font-size: 14px !important;
          }
        `}</style>
      </div>
    );
  }
}
