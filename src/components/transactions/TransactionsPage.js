import React from 'react';
import { connect } from 'react-redux';

import { fetchTransactions } from '../../actions/transactionsActions';

//import TransactionsTable from './TransactionsTable';
import DataTable from './DataTable';


class TransactionsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mod_state: 'Pending',
    }
  }
  componentWillMount() {
    this.props.fetchTransactions(this.state.mod_state);
  }

  onFilterChange(fn, e) {
    console.log(e.target.value);
    fn(e.target.value);
  }

  render() {
    const { transactions, fetchTransactions } = this.props;

    const heading = (<div className="panel"><h1>Transactions</h1></div>);

    if (!transactions) {
      return (
        <div>
          {heading}
          <h3>Loading...</h3>
        </div>
      )
    }

    if (transactions.length === 0) {
      return (
        <div>
          {heading}
          <h3>There are currently no transactions</h3>
        </div>
      );
    }

    return (
      <div className="page-container">
        {heading}

        <div className="filter form-group">
          <label htmlFor="status-filter">Status filter: </label><br/>
          <select
            id="status-filter"
            className="form-control"
            onChange={(e) => { this.onFilterChange(fetchTransactions, e)}}>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="panel panel-default">
          <DataTable rows={transactions} />
        </div>
      </div>
    );
  }
}

/*TransactionsPage.propTypes = {
  transactions: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]).isRequired,
  fetchTransactions: PropTypes.func.isRequired,
};*/

function mapStateToProps(state) {
  return {
    transactions: state.transactions.list
  }
}

export default connect(mapStateToProps, {fetchTransactions})(TransactionsPage);
