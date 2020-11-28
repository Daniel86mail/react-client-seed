import React from 'react';
import { storiesOf } from '@storybook/react';

import A from '../src/components/a.component';

storiesOf('A component', module)
    .add('a component', () => (
        <A msg="storybook test" />
    ));
