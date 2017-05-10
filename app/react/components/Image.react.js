import Radium from 'radium';
import React from 'react';

@Radium
export default class Image extends React.PureComponent {

  static defaultProps = {
    alt: 'Alt',
    children: null,
    key: 'image key',
    style: {}
  }

  props: {
    alt?: string,
    children?: Node,
    key?: string,
    src: string,
    style: Object | Array<Object>
  }

  renderImage() {
    const { key, src, style, alt } = this.props;

    return <img alt={alt} key={key} src={src} style={style} {...this.props} />;
  }

  renderImageWithChildren() {
    const { children, key, src, style } = this.props;

    return (
      <div
        key={key}
        style={[
          styles.background,
          { backgroundImage: `url(${src})` },
          style
        ]}
      >
        {children}
      </div>
    );
  }

  render() {
    const { children } = this.props;
    const image = children
      ? this.renderImageWithChildren()
      : this.renderImage();

    return image;
  }

}

const styles = {
  background: {
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }
};
