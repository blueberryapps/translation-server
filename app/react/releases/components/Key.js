import React from 'react';

type PropTypes = {
  // level: number,
  label: string,
  path: Array<string>,
  isEndNode: boolean,
  createStyles: Function,
  styles: Object,
  resetParents: Function,
  childrenKeys: Array<Object>,
  checked: ?boolean,
  initField: Function,
  toggleField: Function,
  params: Object
};

export default class Key extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: props.checked };
    if (props.isEndNode)
      props.initField(props.path, props.params);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.checked !== nextProps.checked) {
      this.setState({ checked: !!nextProps.checked });
    }
    if (this.state.checked !== nextState.checked && nextProps.isEndNode) {
      this.props.toggleField(nextProps.path, nextProps.params);
    }
  }

  props: PropTypes

  handleToggle = () => {
    const { resetParents } = this.props;
    if (this.state.checked && resetParents) resetParents();
    this.setState({ checked: !this.state.checked });
  }

  resetParents = () => {
    const { resetParents } = this.props;

    if (resetParents) resetParents();
    this.setState({ checked: false });
  }

  render() {
    const { initField, toggleField, label, createStyles, styles, params } = this.props;
    const { checked } = this.state;

    return (
      <div style={styles}>
        <input
          onChange={this.handleToggle}
          type="checkbox"
          checked={checked}
        />
        <span>
          {label}
        </span>
        {
          <div>
            {this.props.childrenKeys.map(key => (
              <Key
                checked={checked}
                key={key.label}
                params={params}
                initField={initField}
                toggleField={toggleField}
                resetParents={this.resetParents}
                createStyles={createStyles}
                styles={this.props.createStyles(key.level)}
                {...key}
              />
            ))}
          </div>
        }
      </div>
    );
  }
}
