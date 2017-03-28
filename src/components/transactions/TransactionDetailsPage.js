import React from 'react';
import { connect } from 'react-redux';

import { fetchFlowDetails, fetchTransactionDetails } from '../../actions/transactionsActions';
import EvidenceItem from './EvidenceItem';
import dateformat from 'dateformat';

import './TransactionDetails.css';


class TransactionDetailsPage extends React.Component {
  componentWillMount() {
    this.props.fetchFlowDetails(this.props.params.flowId);
    this.props.fetchTransactionDetails(this.props.params.id)
  }

  renderEvidence(evidenceItems) {
    return evidenceItems.map((eviItem) => {
      return (
        <EvidenceItem key={eviItem.Id} evidenceId={eviItem.Id} />
      )
    })
  }

  renderAddressLine(add) {
    if (add === '') {
      return '';
    }
    return (<div>{add}</div>);
  }

  renderOrderItems(items) {
    return items
        .map((item, index) => {
              return(
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.sku}</td>
                  <td>{item.quantity}</td>
                  <td className="table-currency-cell">{item.price}</td>
                  <td className="table-currency-cell">{item.tax}</td>
                  <td className="table-currency-cell">{((parseFloat(item.price)+parseFloat(item.tax))*parseInt(item.quantity, 10)).toFixed(2)}</td>
                </tr>
              )
        });
  }

  render() {
    const { flowDetails, transaction } = this.props;

    const heading = (<div className="panel"><h1>Transaction Details</h1></div>);

    if (!flowDetails) {
      return (
        <div>
          {heading}
          <h3>Loading...</h3>
        </div>
      )
    }

    return (
      <div>
        {heading}
        <div className="panel panel-default">
          <header className="panel-heading">
            <h2 className="panel-title">Customer details</h2>
          </header>
          <div className="panel-body">
            <h2>{flowDetails.EntrantDetail.FirstName} {flowDetails.EntrantDetail.LastName}</h2>
            <div className="row">
              <div className="col-md-6">

                <table className="table-details">
                  <tbody>
                    <tr>
                      <th>Email address:&nbsp;</th>
                      <td><a href={`mailto:${flowDetails.Entrant.EmailAddress}`}>{flowDetails.Entrant.EmailAddress}</a></td>
                    </tr>
                    <tr>
                      <th>Telephone no:&nbsp;</th>
                      <td>{flowDetails.EntrantDetail.TelephoneNumber }</td>
                    </tr>
                    <tr>
                      <th>Created:&nbsp;</th>
                      <td>{dateformat(transaction.CreatedDate)}</td>
                    </tr>
                    <tr>
                      <th>Updated:&nbsp;</th>
                      <td>{dateformat(transaction.UpdatedDate)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-6">
                <table className="table-details">
                  <tbody>
                    <tr>
                      <th>Postal address:&nbsp;</th>
                      <td>
                        {this.renderAddressLine(flowDetails.EntrantDetail.Address1)}
                        {this.renderAddressLine(flowDetails.EntrantDetail.Address2)}
                        {this.renderAddressLine(flowDetails.EntrantDetail.City)}
                        {this.renderAddressLine(flowDetails.EntrantDetail.State)}
                        {this.renderAddressLine(flowDetails.EntrantDetail.PostalCode)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        <section className="row section-order">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h2 className="panel-title">Order details</h2>
            </div>
            <div className="panel-body">

              <div className="row">
                <div className="col-md-6">

                  <table className="table-details">
                    <tbody>
                    <tr>
                      <th>Transaction ID:&nbsp;</th>
                      <td>{transaction.Id}</td>
                    </tr>
                    <tr>
                      <th>Payment ID:&nbsp;</th>
                      <td>{transaction.ExecuteResponse.id}</td>
                    </tr>
                    <tr>
                      <th>Cart ID:&nbsp;</th>
                      <td>{transaction.ExecuteResponse.cart}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-6">
                  <table className="table-details">
                    <tbody>
                    <tr>
                      <th>Payment Method:&nbsp;</th>
                      <td>{transaction.ExecuteResponse.payer.payment_method}</td>
                    </tr>
                    <tr>
                      <th>Payment Status:&nbsp;</th>
                      <td>{transaction.ExecuteResponse.payer.status}</td>
                    </tr>
                    <tr>
                      <th>Currency:&nbsp;</th>
                      <td>{transaction.ExecuteResponse.transactions[0].amount.currency}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <table className="table-details table-order table-bordered" width="100%">
                <thead>
                  <tr>
                    <th width="45%">Product</th>
                    <th>SKU</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Tax</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderOrderItems(transaction.ExecuteResponse.transactions[0].item_list.items)}
                  <tr className="table-break">
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr className="table-row-sub-total">
                    <td>Total Tax</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td className="table-currency-cell">{transaction.ExecuteResponse.transactions[0].amount.details.tax}</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr className="table-row-sub-total">
                    <td>Shipping</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td className="table-currency-cell">{transaction.ExecuteResponse.transactions[0].amount.details.shipping}</td>
                  </tr>
                  <tr className="table-row-grand-total">
                    <td>Total</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td className="table-currency-cell">{transaction.ExecuteResponse.transactions[0].amount.total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="row section-evidence">
          {this.renderEvidence(flowDetails.CollectionEvidence)}
        </section>

        <footer className="page-footer">
          <div className="container">
            <a href="#/transactions" className="btn btn-primary">&lt; Back to transactions list</a>
          </div>
        </footer>

      </div>
    );
  }
}

/*TransactionDetailsPage.propTypes = {
  flowDetails: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  fetchFlowDetails: PropTypes.func.isRequired,
};*/

function mapStateToProps(state) {
  return {
    flowDetails: state.transactions.details,
    transaction: state.transactions.transaction
  }
}

export default connect(mapStateToProps, {fetchFlowDetails, fetchTransactionDetails})(TransactionDetailsPage);
