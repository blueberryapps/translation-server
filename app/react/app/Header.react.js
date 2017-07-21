import Radium from 'radium';
import React from 'react';
import { actions as onionActions } from 'onion-form';
import { connect } from 'react-redux';

import Button from '../components/Button.react';
import Icon from '../components/Icon.react';
import Image from '../components/Image.react';
import Menu from './menu/Menu.react';
import Search from '../components/Search.react';
import Separator from '../components/Separator.react';
import { colors, media } from '../globals';
import { saveAllFields } from '../forms/translations/actions';

const { clearForm } = onionActions;

@connect(
  state => ({
    unsavedCount: state.forms.translations.unsavedCount,
  }),
  { saveAllFields, clearForm }
)
@Radium
export default class Header extends React.PureComponent {
  static defaultProps = {
    menuShown: true,
    projectName: 'Dev Project',
    userName: 'Admin',
  };

  constructor(props) {
    super(props);
    this.state = { timeout: null };
  }

  state: {
    timeout: ?number
  }

  props: {
    clearForm: Function,
    currentLocaleCode: string,
    location: Location,
    menuShown: boolean,
    page: string,
    projectName: string,
    push: Function,
    saveAllFields: Function,
    unsavedCount: number,
    userName: string,
  }

  handleClick = () => this.props.push('/');

  handleSaveAll = () => this.props.saveAllFields(this.props.page)

  handleSearchChange = ({ value }) => {
    this.props.push({
      ...this.props.location,
      query: { ...this.props.location.query, page: 1, search: value },
    });
  };

  handleSearchClear = () => {
    this.props.clearForm('searchForm');
    this.handleSearchChange({ value: '' });
  };

  handleDebounceSearch = (...arg) => {
    if (this.state.timeout) clearTimeout(this.state.timeout);

    const search = this.handleSearchChange.bind(null, ...arg);
    this.setState({ timeout: setTimeout(search, 500) });
  }

  render() {
    const {
      currentLocaleCode,
      location,
      menuShown,
      unsavedCount,
      projectName,
      userName,
    } = this.props;

    return (
      <header style={styles.header}>
        <div style={styles.info}>
          <Icon
            kind="arrow-left"
            size={25}
            color={colors.primary}
            wrapperStyle={styles.back}
            onClick={this.handleClick}
          />
          <Separator />
          <span style={styles.projectName}>{projectName}</span>
          <Image src={`/react_assets/flags/${currentLocaleCode}.svg`} style={styles.image} />
          <span style={styles.text}>Translations</span>
        </div>
        <Search onChange={this.handleDebounceSearch} onClear={this.handleSearchClear} search={location.query.search || ''} />
        <div style={styles.controls}>
          {(unsavedCount >= 1) &&
          <Button onClick={this.handleSaveAll} style={styles.saveAll.wrapper}>
            <Icon kind="save" color="white" size={13} style={styles.saveAll.icon} />
            Save all
          </Button>
          }
          <Separator />
          <Menu menuShown={menuShown} user={userName} />
        </div>
      </header>
    );
  }
}

const styles = {
  back: {
    marginRight: '16px',
    padding: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
  },
  header: {
    alignSelf: 'auto',
    flex: '0 0 auto',
    display: 'flex',
    height: '65px',
    padding: '0 10px',
    justifyContent: 'space-between',
    alignItems: 'center',
    order: 0,
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: colors.white,
    boxShadow: '0 0 7px hsla(0, 0%, 0%, 0.1)',
    width: '100%',
    zIndex: 16
  },
  projectName: {
    padding: '0 16px 0 26px'
  },
  saveAll: {
    wrapper: {
      backgroundColor: colors.green,
      boxShadow: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      marginRight: '25px',
      fontSize: '14px',
      textTransform: 'uppercase',
      padding: '8px 14px'
    },
    icon: {
      marginRight: '8px'
    }
  },
  text: {
    padding: '0 16px',
  },
  info: {
    display: 'flex',
    fontSize: '18px',
    alignItems: 'center',
    [media.l]: {
      fontSize: '22px',
    }
  },
  image: {
    width: '22px',
    height: '15px'
  },
  controls: {
    display: 'flex',
    alignItems: 'center'
  }
};
