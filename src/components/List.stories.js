import React from 'react';
import { storiesOf } from '@storybook/react';
import { optionsKnob as options } from '@storybook/addon-knobs';

import { List, ListItem } from '.';

const params = {
  type: () => options(
    'Type',
    {
      space: 'space',
      border: 'border',
      number: 'number',
      circles: 'circles',
    },
    'space',
    {
      display: 'multi-select',
    },
  ),
};

storiesOf('Components|List', module).add('Overview', () => (
  <List type={params.type()}>
    <ListItem>List item 1</ListItem>
    <ListItem>List item 2</ListItem>
  </List>
));
