import PropTypes from 'prop-types';
import cx from 'classnames';

const Inline = ({ as: Component, className, size, wrap, ...opts }) => (
  <Component
    css={theme => [
      {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        listStyle: 'none',
        padding: 0,
        margin: `-${theme.space[size]}px 0 0 -${theme.space[size]}px`,

        '> *': {
          marginLeft: `${theme.space[size]}px !important`,
          marginTop: `${theme.space[size]}px !important`,
        },
      },

      !wrap && {
        whiteSpace: 'nowrap',
        flexWrap: 'nowrap',
      },
    ]}
    className={cx('CK__Inline', className)}
    {...opts}
  />
);

Inline.propTypes = {
  as: PropTypes.oneOf(['div', 'ul']),
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'base', 'medium', 'large', 'xlarge']),
  wrap: PropTypes.bool,
};

Inline.defaultProps = {
  size: 'base',
  wrap: true,
  as: 'div',
};

export default Inline;
