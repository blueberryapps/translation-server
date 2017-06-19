import Radium from 'radium';
import React from 'react';
import { connect } from 'react-redux';

import Button from '../components/Button.react';
import Container from '../components/Container.react';
import Image from '../components/Image.react';
import Menu from './menu/Menu.react';
import Search from '../components/Search.react';
import { colors, media } from '../globals';
import { saveAllFields } from '../forms/translations/actions';

@connect(null, { saveAllFields })
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
    projectName: string,
    userName: string,
    location: Location,
    page: string,
    menuShown: boolean,
    push: Function,
    saveAllFields: Function,
  }

  handleClick = () => this.props.push('/');

  handleSaveAll = () => this.props.saveAllFields(this.props.page)

  handleSearchChange = ({ value }) => {
    this.props.push({
      ...this.props.location,
      query: { ...this.props.location.query, page: 1, search: value },
    });
  };

  handleDebounceSearch = (...arg) => {
    if (this.state.timeout) clearTimeout(this.state.timeout);

    const search = this.handleSearchChange.bind(null, ...arg);
    this.setState({ timeout: setTimeout(search, 500) });
  }

  render() {
    const { menuShown, projectName, userName, location } = this.props;

    return (
      <header style={styles.header}>
        <Container style={styles.container}>
          <Image
            src={'/assets/backArrow.png'}
            style={styles.backButton}
            onClick={this.handleClick}
          />
          <span style={styles.projectName}>{projectName}</span>
          <span style={styles.text}>Translations</span>
          <Search onChange={this.handleDebounceSearch} search={location.query.search || ''} />
          <div style={styles.saveAllWrapper}>
            <Button onClick={this.handleSaveAll} style={styles.saveAll}>Save all</Button>
          </div>
          <Menu style={styles.menu} menuShown={menuShown} user={userName} />
        </Container>
      </header>
    );
  }
}

const styles = {
  backButton: {
    marginRight: '15px',
    width: '10px',
    [media.l]: {
      marginRight: '25px',
    },
  },
  header: {
    alignSelf: 'auto',
    flex: '0 0 auto',
    order: 0,
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: colors.white,
    boxShadow: '0 0 7px hsla(0, 0%, 0%, 0.1)',
    width: '100%',
    zIndex: 100
  },
  menu: {
    borderLeft: `1px solid ${colors.inputBorder}`,
    fontSize: '16px',
    paddingLeft: '10px',
    [media.l]: {
      fontSize: '20px',
      paddingLeft: '30px',
    },
  },
  container: {
    maxWidth: '90%',
    display: 'flex',
    height: '50px',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'auto',
  },
  projectName: {
    borderLeft: `1px solid ${colors.inputBorder}`,
    fontSize: '15px',
    padding: '0 10px',
    verticalAlign: 'middle',
    [media.l]: {
      fontSize: '20px',
      padding: '0 25px',
    },
  },
  saveAllWrapper: {
    marginRight: '30px',
    marginLeft: 0,
    verticalAlign: 'middle',
    [media.l]: {
      marginLeft: '15%',
      marginRight: '30px',
    },
  },
  saveAll: {
    backgroundColor: colors.green,
    fontSize: '1em',
    padding: '7px 20px',
  },
  text: {
    display: 'inline-block',
    fontSize: '16px',
    verticalAlign: 'middle',
    [media.l]: {
      fontSize: '20px',
    },
  },
};
