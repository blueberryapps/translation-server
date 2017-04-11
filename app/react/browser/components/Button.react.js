import Radium from 'radium';
import React, { PropTypes as RPT } from 'react';
import { colors, media } from '../globals';

export const BUTTON_KIND_PRIMARY = 'primary';
export const BUTTON_KIND_SECONDARY = 'secondary';
export const BUTTON_KIND_GHOST_LIGHT = 'ghost_light';
export const BUTTON_KIND_GHOST_DARK = 'ghost_dark';
export const BUTTON_SIZE_NORMAL = 'normal';
export const BUTTON_SIZE_LARGE = 'large';

@Radium
export default class Button extends React.PureComponent {

  static propTypes = {
    children: RPT.node.isRequired,
    decorated: RPT.bool,
    disabled: RPT.bool,
    kind: RPT.oneOf([
      BUTTON_KIND_PRIMARY,
      BUTTON_KIND_SECONDARY,
      BUTTON_KIND_GHOST_LIGHT,
      BUTTON_KIND_GHOST_DARK
    ]).isRequired,
    size: RPT.oneOf([
      BUTTON_SIZE_NORMAL,
      BUTTON_SIZE_LARGE
    ]).isRequired,
    style: RPT.oneOfType([
      RPT.arrayOf(RPT.object),
      RPT.object
    ]),
    type: RPT.string
  };

  static defaultProps = {
    decorated: false,
    disabled: false,
    kind: BUTTON_KIND_PRIMARY,
    size: BUTTON_SIZE_NORMAL,
    style: {},
    type: null
  };

  renderDecorator() {
    return (
      <div style={styles.decorator} />
    );
  }

  render() {
    const {
      children,
      decorated,
      disabled,
      kind,
      size,
      style,
      type,
      ...rest
    } = this.props;
    const focus = Radium.getState(this.state, 'button', ':focus');
    const hover = Radium.getState(this.state, 'button', ':hover');

    return (
      <div style={styles.wrapper}>
        <button
          disabled={disabled}
          key="button"
          style={[
            buttonKindStyles[kind],
            buttonSizeStyles[size],
            focus && !disabled && buttonFocusStyles[kind],
            hover && !disabled && buttonHoverStyles[kind],
            disabled && buttonDisabledStyles[kind],
            style
          ]}
          type={type}
          {...rest}
        >
          {children}
        </button>
        {decorated && this.renderDecorator()}
      </div>
    );
  }

}

const buttonKindStyles = {
  [BUTTON_KIND_PRIMARY]: {
    backgroundColor: colors.primary,
    boxShadow: '0 2px 1px rgba(0, 0, 0, .15)',
    borderWidth: 0,
    color: 'white',
    fontSize: '1.3em',
    padding: '14px 32px',
    ':focus': {},
    ':hover': {}
  },
  [BUTTON_KIND_SECONDARY]: {
    background: 'none',
    border: 0,
    fontWeight: 600,
    padding: '12px 24px',
    ':focus': {},
    ':hover': {}
  },
  [BUTTON_KIND_GHOST_LIGHT]: {
    background: 'none',
    borderColor: '#fff',
    borderStyle: 'solid',
    borderWidth: '2px',
    color: '#fff',
    fontSize: '1.25em',
    fontWeight: 400,
    padding: '12px 20px',
    ':focus': {},
    ':hover': {}
  },
  [BUTTON_KIND_GHOST_DARK]: {
    background: 'none',
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth: '2px',
    color: '#000',
    fontSize: '1.25em',
    fontWeight: 400,
    padding: '12px 20px',
    ':focus': {},
    ':hover': {}
  }
};

const buttonFocusStyles = {
  [BUTTON_KIND_PRIMARY]: {},
  [BUTTON_KIND_SECONDARY]: {
    color: colors.primary
  }
};

const buttonHoverStyles = {
  [BUTTON_KIND_PRIMARY]: {},
  [BUTTON_KIND_SECONDARY]: {
    color: colors.primary
  }
};

const buttonDisabledStyles = {
  [BUTTON_KIND_PRIMARY]: {
    backgroundColor: '#aaa'
  },
  [BUTTON_KIND_SECONDARY]: {}
};

const buttonSizeStyles = {
  [BUTTON_SIZE_NORMAL]: {},
  [BUTTON_SIZE_LARGE]: {
    borderWidth: '3px',
    fontSize: '28px',
    [media.m]: {
      fontSize: '34px',
    }
  }
};

const styles = {
  wrapper: {
    display: 'inline-block',
    position: 'relative',
    zIndex: 2
  },
  decorator: {
    backgroundColor: 'black',
    bottom: 0,
    display: 'block',
    height: '1px',
    left: '50%',
    position: 'absolute',
    transform: 'translateX(-50%)',
    width: '64px'
  }
};
