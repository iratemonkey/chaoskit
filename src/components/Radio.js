/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useTheme } from 'emotion-theming';

import { form } from '../assets/styles/utility';

export const StylesRadioVariables = {
  size: 22,
  iconSize: 10,
};

const Radio = ({
  checked,
  className,
  disabled,
  label,
  name,
  value,
  noContrast,
  onChange,
  wrapperProps,
  ...opts
}) => {
  const theme = useTheme();

  return (
    <label
      css={[
        {
          display: 'flex',
          alignItems: 'center',
          fontSize: theme.fontSize.base,
        },

        disabled && {
          cursor: 'not-allowed',
          opacity: theme.opacity.base,
        },
      ]}
      className={cx('CK__Radio', className)}
      {...wrapperProps}
    >
      <input
        type="radio"
        name={name}
        disabled={disabled}
        value={value}
        checked={checked}
        onChange={onChange}
        css={[
          form.base(theme),
          // 1. Style
          // 2. Make box Make box more robust so it clips the child element
          // 3. Remoe default style
          // 4. Fix background on iOS
          // 5. Don't collapse
          {
            // 1
            width: StylesRadioVariables.size,
            height: StylesRadioVariables.size,
            verticalAlign: 'middle',
            borderRadius: '50%',
            border: theme.border.base,
            boxShadow: theme.boxShadow.base,
            position: 'relative',
            // 2
            overflow: 'hidden',
            // 3
            appearance: 'none',
            // 4
            backgroundColor: theme.color.light.base,
            // 5
            flex: 'none',

            '&:not(:disabled)': {
              cursor: 'pointer',
            },

            '&:disabled': {
              backgroundColor: theme.color.panel.base,
            },
            '&:checked': {
              backgroundColor: theme.color.primary.base,
              color: theme.contrast.base,
              borderColor: theme.color.primary.dark,

              '&::after': {
                content: "''",
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: StylesRadioVariables.iconSize,
                height: StylesRadioVariables.iconSize,
                borderRadius: '50%',
                border: '1px solid',
                borderColor: theme.color.primary.dark,
                backgroundColor: theme.contrast.base,
              },
            },
          },

          theme.settings.contrast.enable &&
            theme.settings.contrast.form &&
            !noContrast && {
              '.u-contrast &': {
                borderColor: theme.contrast.base,
                backgroundColor: 'transparent',

                '&:disabled': {
                  backgroundColor: form.variables(theme).contrast.background,
                },

                '&:checked': {
                  backgroundColor: 'transparent',

                  '&::after': {
                    border: 0,
                  },
                },
              },
            },
        ]}
        {...opts}
      />
      {label && <span css={{ marginLeft: theme.space.small }}>{label}</span>}
    </label>
  );
};

Radio.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string.isRequired,
  noContrast: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  wrapperProps: PropTypes.object,
};

export default Radio;
