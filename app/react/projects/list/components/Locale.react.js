/* @flow */
import Radium from 'radium';
import React from 'react';
import { Box } from 'radium-flex';
import { Link } from 'react-router';
import locale from 'country-language';
import Icon from '../../../components/Icon.react';
import Image from '../../../components/Image.react';
import PercentageBar from '../../../components/PercentageBar.react';
import { calculatePercents } from '../../helpers';
import { colors } from '../../../globals';

import type { LocaleEntityType } from '../../../types/entityTypes';

const RadiumLink = Radium(Link);

@Radium
export default class Locale extends React.PureComponent {
  state: {
    hovered: false
  }

  props: LocaleEntityType

  handleMouseEnter = () => {
    this.setState({ hovered: true });
  }

  handleMouseLeave = () => {
    this.setState({ hovered: false });
  }

  render() {
    const { code, id, projectId, translationCount, translatedCount } = this.props;
    const { hovered } = this.state;
    const language = locale.getLanguage(code).name[0];
    return (
      <div style={styles.outerWrapper}>
        <RadiumLink to={`project/${projectId}/locales/${id}?page=1&edited=new`} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} style={styles.wrapper}>
          <Box col={12}><Image src={`/assets/flags/${code}.svg`} style={styles.image} /></Box>
          <Box col={12} style={styles.heading}>{language}</Box>
          <Box col={12} style={styles.transaltedRatio}>{translatedCount} / {translationCount}</Box>
          <Box col={12}>
            <PercentageBar number={calculatePercents(translatedCount, translationCount)} />
          </Box>
          <div style={[styles.edit.base, hovered && styles.edit.visible]}>
            <Icon color={colors.white} kind="edit" size={20} style={styles.icon} />
            EDIT
          </div>
        </RadiumLink>
      </div>
    );
  }
}

const styles = {
  outerWrapper: {
    paddingLeft: '1px',
    paddingTop: '1px'
  },
  wrapper: {
    display: 'flex',
    height: '135px',
    flexDirection: 'column',
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: colors.white,
    boxShadow: '0px 0px 10px -4px rgba(135,132,135,1)',
    alignItems: 'center',
    textAlign: 'center',
    color: colors.black,
    ':hover': {
      textDecoration: 'none'
    }
  },
  heading: {
    fontSize: '18px'
  },
  transaltedRatio: {
    fontSize: '13px'
  },
  edit: {
    base: {
      opacity: 0,
      fontWeight: 900,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      fontSize: '22px',
      letterSpacing: '1px',
      color: colors.white,
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(48, 122, 188, .9)',
      transition: 'opacity .3s'
    },
    visible: {
      opacity: 1
    }
  },
  icon: {
    marginRight: '10px'
  },
  image: {
    width: '30px',
    height: '20px',
    marginBottom: '16px'
  }
};
