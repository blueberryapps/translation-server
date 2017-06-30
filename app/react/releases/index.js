import React from 'react';
import preload from 'redux-preload';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import Key from './components/Key';
import { fetchPrerelease, createRelease } from './actions';
import { initField, toggleField } from '../forms/releases/actions';
import transform from './transform';

const createStyles = (level = 0) => ({
  marginLeft: level * 10
});

type PropTypes = {
  hierarchy: Object,
  router: Object,
  params: Object,
  initField: Function,
  toggleField: Function,
  createRelease: Function
};

@preload(fetchPrerelease)
@connect((state, { params: { projectId, localeId } }) => ({
  hierarchy: state.releases.hierarchies[projectId] && transform(state.releases.hierarchies[projectId][localeId]),
}), { initField, toggleField, createRelease })
@withRouter
export default class Releases extends React.Component {
  props: PropTypes

  handleSubmit = () => {
    this.props.createRelease(this.props.params);
    this.props.router.push('/');
  }

  render() {
    const { hierarchy, params: { projectId, localeId }, params } = this.props;

    return (
      <div>
        {hierarchy && hierarchy.length ?
          <div>
            <button onClick={this.handleSubmit}>RELEASE!</button>
            {hierarchy.map(key => (
              <Key
                key={key.label}
                params={params}
                initField={this.props.initField}
                toggleField={this.props.toggleField}
                createStyles={createStyles}
                styles={createStyles()}
                {...key}
              />
            ))}
          </div>
        : (
          <div>
            <p>There are no translations to release. You need to make new translations for this locale first.</p>
            <Link to={`project/${projectId}/translations/locales/${localeId}?edited=all`}>
              Edit this locale
            </Link>
            <span> or </span>
            <Link to="/">go back.</Link>
          </div>
        )}
      </div>
    );
  }
}
