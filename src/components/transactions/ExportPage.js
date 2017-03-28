import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import DateTime from 'react-datetime';
import { CSVLink } from 'react-csv';
const { func, oneOfType, bool, string } = PropTypes;

import { fetchTransactionsExport, resetTransactionsExport } from '../../actions/transactionsActions';
import './DateTime.css';

class ExportPage extends React.Component {
  static propTypes = {
    fetchTransactionsExport: func.isRequired,
    resetTransactionsExport: func.isRequired,
    exportData: oneOfType([ bool, string ])
  }

  constructor(props) {
    super(props);

    this.state = {
      startDate: '',
      endDate: '',
      status: '',
      submitted: false
    }

    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.resetTransactionsExport()
  }

  handleStartDateChange(e) {
    this.setState({startDate: e._d});
  }

  handleEndDateChange(e) {
    this.setState({endDate: e._d});
  }

  handleStatusChange(e) {
    this.setState({status: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    const start = this.state.startDate === '' ? null : this.state.startDate.toISOString()
    const end = this.state.endDate === '' ? null : this.state.endDate.toISOString()
    const status = this.state.status === '' ? null : this.state.status

    this.setState({ submitted: true });

    this.props.fetchTransactionsExport(start, end, status)

  }

  render() {
    const heading = (<div className="panel"><h1>Export data</h1></div>);
    const { exportData } = this.props;

    const timestamp = new Date().valueOf();
    const filename = 'trop-glass-' + timestamp +'.csv';

    let exportButton = '';

    if (this.state.submitted && exportData) {
      exportButton = (<CSVLink data={exportData} filename={filename} className="btn btn-primary">Download CSV File</CSVLink>)
    }

    return (
      <div className="page-container">
        {heading}

        <div className="panel">
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="control-label">Start date</label>
              <DateTime dateFormat="DD/MM/YYYY" utc={true} name="start-date" value={this.state.startDate} onChange={this.handleStartDateChange} />
            </div>
            <div className="form-group">
              <label className="control-label">End date</label>
              <DateTime dateFormat="DD/MM/YYYY" utc={true} name="end-date" value={this.state.endDate} onChange={this.handleEndDateChange} />
            </div>
            <div className="form-group">
              <label className="control-label">Moderation State</label>
              <select name="status" className="form-control" onChange={this.handleStatusChange} value={this.state.status}>
                <option></option>
                <option value="1">Approved</option>
                <option value="2">Rejected</option>
              </select>
            </div>
            <div className="form-group">
              <br />
              <button className="btn btn-primary">Export</button>
            </div>
          </form>

          {exportButton}

        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    exportData: state.transactions.exportData
  }
}

export default connect(mapStateToProps, { fetchTransactionsExport, resetTransactionsExport })(ExportPage);
