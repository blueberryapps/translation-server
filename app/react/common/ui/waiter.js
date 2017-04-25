import React, { Component } from 'react';
import { connect } from 'react-redux';

const getPendingStatus = (structure) => {
  if (typeof structure === 'boolean') return structure;
  if (Array.isArray(structure)) return structure.every(b => b);
  if (structure instanceof Object) {
    return Object
      .keys(structure)
      .map(k => structure[k])
      .every(b => b);
  }
  return !!structure;
};

const wrapper = (createPendings, Preloader) => Decorated =>
  @connect((state, props) => ({
    pending: getPendingStatus(createPendings(state, props))
  }))
  class PreloadHOC extends Component {
    props: {
      pending: boolean
    }

    shouldComponentUpdate = nextProps =>
      this.props.pending === nextProps.pending;

    render() {
      return this.props.pending
        ? Preloader
        : <Decorated {...this.props} />;
    }
  };

export default function createWithPreloader(preloader) {
  return getPendings => wrapper(getPendings, preloader);
}
