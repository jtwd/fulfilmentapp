/**
 * Created by Jamest on 08/02/2017.
 */

import React, {PropTypes, Component} from 'react';
import classnames from 'classnames';


class FlashMessage extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.deleteFlashMessage(this.props.message.id);
  }

  render() {
    const { type, text} = this.props.message;

    return (
      <div className={classnames('alert', { 'alert-success': type === 'success', 'alert-danger': type === 'error' })}>
        <button
          className="close"
          onClick={this.onClick}>
          <span>&times;</span>
        </button>
        {text}
      </div>
    );
  }
};

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired,
};

export default FlashMessage;