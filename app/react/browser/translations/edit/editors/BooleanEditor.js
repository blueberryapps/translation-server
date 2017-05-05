import React, { Component } from 'react';

export default class BooleanEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: true
    };
  }

  setFalse = (e) => {
    e.preventDefault();
    this.props.onChange('false', this.props.fieldInfo);
  }
  setTrue = (e) => {
    e.preventDefault();
    this.props.onChange('true', this.props.fieldInfo);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.props.value, this.props.fieldInfo);
  }

  render() {
    // console.log('I\'m editor =>', this.props.onChange);
    const { value, dataType, saved } = this.props;

    return (
      <div>
        <form>
          True:
          <input
            type="radio"
            checked={value === 'true'}
            onChange={this.setTrue}
          />
          False:
          <input
            type="radio"
            checked={value === 'false'}
            onChange={this.setFalse}
          />
          <button
            onClick={this.handleSubmit}
            style={saved && styles.edited}
          >Save</button>
        </form>
      </div>
    );
  }
}

const styles = {
  edited: {
    backgroundColor: 'green'
  }
};
