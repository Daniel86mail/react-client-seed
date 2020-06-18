import React from 'react';
import { configure } from '@storybook/react';

function loadStories() {
    require('../../seed-viewer/stories/index.js'); // todo
}

configure(loadStories, module);
