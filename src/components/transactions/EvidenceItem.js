import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { API_URL } from '../../index';
import './EvidenceItem.css';


class EvidenceItem extends React.Component {
  constructor(props) {
    super(props);

    this.id = this.props.evidenceId;
    this.state = { imgData: null }
  }

  componentDidMount() {
    axios.get(`${API_URL}collection-evidence/${this.id}`).then(res => {
      this.setState({ imgData: res.data.Item });
    });
  }

  onClick(status) {
    const url = `${API_URL}collection-evidence/${this.id}/state`;
    const data = {
      State: status
    };
    let stateIndex;

    if(status === 'Submitted') stateIndex = 0;
    if(status === 'Approved') stateIndex = 1;
    if(status === 'Rejected') stateIndex = 2;

    let tempData = Object.assign({}, this.state.imgData, { State: stateIndex, StateDescription: status});

    axios.put(url, data).then(res => {
      this.setState({ imgData: tempData });
    });
  }

  render() {
    if (this.state.imgData === null) {
      return (
        <div className="col-md-6 text-center">
          <article className={`panel panel-default`}>
            <header className="panel-heading">
              <h3 className="panel-title">Evidence item</h3>
            </header>
            <div className="panel-body">
              <h4 className="text-center">Loading...</h4>
            </div>
            <footer className="panel-footer" />
          </article>
        </div>
      )
    };

    const image = this.state.imgData;

    let panelClass;
    switch(image.StateDescription) {
      case 'Approved':
        panelClass = 'success';
        break;

      case 'Rejected':
        panelClass = 'danger';
        break;

      case 'Submitted':
        panelClass = 'default';
        break;

      default:
        panelClass = 'default';
    }

    const buttons = (
      <div className="btn-group-wrapper">
        <div className="btn-group">
          <button className="btn btn-danger" onClick={() => { this.onClick('Rejected') }}>Reject</button>
          <button className="btn btn-success" onClick={() => { this.onClick('Approved') }}>Approve</button>
        </div>
      </div>
    );

    const reset = (
      <div className="btn-group-wrapper">
        <div><strong className={`text-${panelClass}`}>{image.StateDescription}</strong></div>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={() => { this.onClick('Submitted') }}>Reset</button>
        </div>
      </div>
    );

    return (
      <div className="col-md-6">
        <article className={`panel panel-${panelClass}`}>
          <header className="panel-heading">
            <h3 className="panel-title">Evidence item</h3>
          </header>
          <div className="panel-body">
            <img src={`data:${image.ContentType};base64, ${image.File}`} className="img-responsive" alt="Evidence asset" />
          </div>
          <footer className="panel-footer">
            {image.StateDescription === 'Submitted' ? buttons : reset}
          </footer>
        </article>
      </div>
    );
  }
}

/*
EvidenceItem.propTypes = {
  evidenceId: React.PropTypes.string.isRequired,
  fetchEvidence: React.PropTypes.func.isRequired,
};
*/


export default connect()(EvidenceItem);
