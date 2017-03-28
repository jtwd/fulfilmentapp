import React from 'react';
import dateformat from 'dateformat';

import { Table, unsafe } from 'reactable';
import './DataTable.css';


class DataTable extends React.Component {
  render() {
    const { rows } = this.props;

    const newData = rows.map((row) => {

      var transactionUrl = '#/transactions/' + row.Id + '/' + row.FlowId;

      return {
        'PaymentID': row.PaymentId,
        'First Name': row.EntrantDetail.FirstName,
        'Last Name': row.EntrantDetail.LastName,
        'Email Address': row.Entrant.EmailAddress,
        'Created': dateformat(row.CreatedDate, "yyyy-mm-dd"),
        '': unsafe('<a href="'+transactionUrl+'" class="btn btn-primary btn-sm">View</a>')
      }
    });

    return (
      <div className="table-wrapper">
        <Table
          className="table"
          data={newData}
          itemsPerPage={10}
          pageButtonLimit={5}
          sortable={[
            'First Name',
            'Last Name',
            'Email Address',
            'Created'
          ]}
          defaultSort={{column: 'Created', direction: 'asc'}}
          filterable={['PaymentID', 'Email Address']}
        />
      </div>
    )
  }
}

DataTable.propType = {
  rows: React.PropTypes.array.isRequired,
};

export default DataTable;