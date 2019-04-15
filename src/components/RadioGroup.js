import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import {
  FormLabel, FormFooter, Inline, List, ListItem,
} from '.';

import { config } from '../helpers/config';

const RadioGroup = ({
  children,
  className,
  explanationMessage,
  inline,
  label,
  name,
  onChange,
  selectedValue,
  validationMessage,
  required,
  ...opts
}) => {
  const renderChildren = () => {
    let returnChild = null;

    return React.Children.map(children, (child) => {
      const onChangeFunc = () => {
        onChange(name, child.props.value);
      };

      returnChild = React.cloneElement(child, {
        onChange: onChangeFunc,
        selectedValue,
        name,
      });

      if (inline) {
        return returnChild;
      }

      return <ListItem>{returnChild}</ListItem>;
    });
  };

  const renderItems = () => {
    if (inline) {
      return <Inline>{renderChildren()}</Inline>;
    }

    return <List type={['space']}>{renderChildren()}</List>;
  };

  const classes = cx('form-group', className, {
    [config.classes.notValid]: validationMessage,
    [config.classes.required]: required,
  });

  return (
    <div className={classes} {...opts}>
      <FormLabel required={required} id="">
        {label}
      </FormLabel>
      {renderItems()}
      <FormFooter
        explanationMessage={explanationMessage}
        validationMessage={validationMessage}
      />
    </div>
  );
};

RadioGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  explanationMessage: PropTypes.string,
  inline: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  validationMessage: PropTypes.string,
  required: PropTypes.bool,
};

export default RadioGroup;
