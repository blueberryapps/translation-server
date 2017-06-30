/* eslint-disable */
// Generated by gulp svg-icon, if you add new icon run gulp svg-icon

import Radium from 'radium';

import React, {PureComponent as Component} from 'react';

const iconList = [
  'arrow',
  'edit',
  'letter',
  'ordered-list',
  'save',
  'unordered-list',
]


class Icon extends Component {

  static propTypes = {
    color: React.PropTypes.string,
    height: React.PropTypes.number,
    kind: React.PropTypes.oneOf([
      'arrow',
      'edit',
      'letter',
      'ordered-list',
      'save',
      'unordered-list',
    ]).isRequired,
    onClick: React.PropTypes.func,
    preview: React.PropTypes.bool,
    size: React.PropTypes.number,
    style: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]),
    width: React.PropTypes.number,
    wrapperStyle: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ])
  };

  static defaultProps = {
    color: '#000',
    size: 32
  }

  render() {
    const {kind, preview} = this.props

    return preview ?
      this.renderPreview() :
      this.renderIcon(kind)
  }

  renderPreview() {
    return (
      <div>
        {iconList.map(kind => this.renderPreviewKind(kind))}
      </div>
    )
  }

  renderIcon(kind) {
    const {wrapperStyle} = this.props;

    if (wrapperStyle)
      return <div style={wrapperStyle}>{this.getIcon(kind)}</div>

    return this.getIcon(kind)
  }

  renderPreviewKind(kind) {
    return (
      <div key={kind}>
        <h3>&lt;Icon kind="{kind}" /&gt;</h3>
        {this.renderIcon(kind)}
      </div>
    )
  }

  getIcon(kind) {
    const {height, color, onClick, size, style, width} = this.props;

    switch (kind) {
      default: return null;
      case ('arrow'): return (<svg height={height || size} width={width || size} onClick={onClick} style={style} fill={color} viewBox="0 0 220 103"><path d="M110 103L0 0h220L110 103z"/></svg>);
      case ('edit'): return (<svg height={height || size} width={width || size} onClick={onClick} style={style} fill={color} viewBox="0 0 355.8 355.8"><path d="M1.9 323c-5.1 11.9.4 25.7 12.3 30.8 5.9 2.5 12.6 2.5 18.5 0l85.9-36.3L38 236.9 1.9 323zM348.7 64.8L290.8 6.9c-9.2-9.2-24-9.2-33.2 0L59.3 204.7l91.3 91.6L348.9 98c9.2-9.2 9.2-24 0-33.2h-.2z"/></svg>);
      case ('letter'): return (<svg height={height || size} width={width || size} onClick={onClick} style={style} fill={color} viewBox="0 0 13.4 13.3"><path d="M7.7 13.3v-.7c1.2-.2 1.3-.4 1-1.3-.3-.6-.6-1.4-.9-2.3H4c-.2.6-.5 1.3-.7 2.1-.3 1-.2 1.2 1.2 1.4v.7H0v-.7c1.3-.2 1.6-.4 2.2-2.1L6.3.3l1-.3c1.3 3.5 2.5 7 3.8 10.4.7 1.8.9 2 2.2 2.2v.7H7.7zM6 3.7C5.3 5.1 4.8 6.6 4.3 8h3.1L6 3.7z"/></svg>);
      case ('ordered-list'): return (<svg height={height || size} width={width || size} onClick={onClick} style={style} fill={color} viewBox="0 0 471.7 444"><path d="M28.9 190.6c2-3.2 5.4-5.1 9.2-5 4.4 0 7.8 1.4 9.7 3.9 2.2 2.5 3.3 5.8 3.3 10 0 3.1-1.1 6.7-3.1 10.5-2.2 4.2-6.1 8.6-10.5 13.9L1.4 260.8v15.8h76.9v-17.8H36.6l-.3-1.1 15-16.1c9.7-10.5 16.6-18.3 20.3-23.9 3.6-5.3 5.6-11.4 5.6-18.3 0-10.3-3.6-18.6-10.5-24.4-8.1-6.4-18.3-9.5-28.6-8.9-11.4 0-20.5 3.6-27.7 10.5-6.9 6.9-10.3 15.5-10 25.8h25.3c-.1-4.3 1.1-8.5 3.3-12.2v.4zm-2.8-99.9h-25V111h77.4V90.7h-25V0L1.4 7.8v18.3h25l-.3 64.6zM61.3 386c5.3-2.2 9.4-5.5 12.5-9.7 3.1-4 4.7-8.9 4.7-13.9.3-9-3.8-17.6-11.1-23-6.9-5.5-16.7-8.3-28.6-8.3-10.5 0-19.4 2.8-26.6 8.3-7 4.9-11 13.1-10.5 21.6v.8H27c0-4.4 1.4-5.8 3.9-7.8 2.8-1.9 5.6-3.1 8.9-3.1 4.2 0 7.5 1.1 9.7 3.3 2.2 2.5 3.3 5.3 3.3 8.6 0 4.4-1.1 8.3-3.6 10.5-2.9 2.7-6.8 4.1-10.8 3.9h-12v18h11.9c5.3 0 9.2 1.4 11.9 3.9 2.8 2.5 4.4 6.4 4.4 11.7 0 3.9-1.4 7.2-4.2 9.7-3 2.7-7 4.1-11.1 3.9-3.7-.1-7.3-1.6-10-4.2-2.9-2.3-4.4-5.8-4.2-9.4H.1l-.1 1.3c0 10.3 3.6 18.3 11.1 23.6 8.3 5.6 17.2 8.3 27.8 8.3 11.9 0 22.2-2.8 29.7-8.3 7.7-5.5 12.1-14.4 11.7-23.9.2-5.7-1.6-11.3-5-15.8-3.7-4.6-8.5-8.1-14-10zm410.4 30.2V333h-333v83.2h333zm0-166.5v-55.5h-333v55.5h333zm0-138.7V27.7h-333V111h333z"/></svg>);
      case ('save'): return (<svg height={height || size} width={width || size} onClick={onClick} style={style} fill={color} viewBox="0 0 308.34 264.47"><title>save</title><path d="M166 81.38V31.13H64.28v66.11h167V31.13h-17.81v50.25zm142.31-35v218.09H0V0h253.08zm-57.87 94h-199v93h199zM77.09 167.43c0-3.05 2.85-5.49 6.4-5.49h45.07c3.47-.58 6.83 1.36 7.51 4.34s-1.59 5.86-5.06 6.44a7.45 7.45 0 0 1-2.45 0H83.49c-3.49 0-6.28-2.34-6.4-5.29zm0 21.56c0-3.05 2.85-5.49 6.4-5.49h64.28c3.47-.58 6.83 1.36 7.51 4.34s-1.59 5.86-5.06 6.44a7.45 7.45 0 0 1-2.45 0H83.49c-3.49 0-6.28-2.33-6.4-5.28zm85.39 3.66a5.17 5.17 0 0 1-1.9-3.66 5.62 5.62 0 0 1 1.9-4.07 7.42 7.42 0 0 1 9 0 6 6 0 0 1 1.9 4.07 4.8 4.8 0 0 1-1.9 3.66 7.05 7.05 0 0 1-9 0z"/></svg>);
      case ('unordered-list'): return (<svg height={height || size} width={width || size} onClick={onClick} style={style} fill={color} viewBox="0 0 352.8 290.5"><path d="M83 290.5v-62.2h269.8v62.2H83zM83 166v-41.5h269.8V166H83zm0-103.8V0h269.8v62.2H83zm-51.9 166c17.2 0 31.1 13.9 31.1 31.1s-13.9 31.1-31.1 31.1S0 276.6 0 259.4s13.9-31.2 31.1-31.2zm0-124.4c17.2 0 31.1 13.9 31.1 31.1S48.3 166 31.1 166 0 152.1 0 134.9s13.9-31.1 31.1-31.1zM31.1 0c17.2 0 31.1 13.9 31.1 31.1S48.3 62.2 31.1 62.2 0 48.3 0 31.1 13.9 0 31.1 0z"/></svg>);
      }
  }
}


export default Radium(Icon)
