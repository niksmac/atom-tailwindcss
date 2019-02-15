'use strict';

const defaultConfig = require('tailwindcss/defaultConfig')();
const tailwindClassNames = require('tailwind-class-names');
const configPath = require('./config-path');

module.exports = {
  completions: [],
  selector: '.meta.attribute-with-value.class.html',

  async getCompletions () {
    if (this.completions.length > 0) {
      return this.completions;
    }

    const options = {
      config: defaultConfig,
      strings: true
    };

    options.configPath = await configPath();

    const { classNames } = await tailwindClassNames(options);
    this.completions = Object.entries(classNames);
    return this.completions;
  },

  async getSuggestions ({ prefix }) {
    let suggestions = [];
    let completion, i, len, rightLabel, text;
    let completions = await this.getCompletions();

    for (i = 0, len = completions.length; i < len; i++) {
      [text, rightLabel] = completions[i];

      if (!prefix || text.indexOf(prefix) >= 0) {
        completion = {
          replacementPrefix: prefix,
          rightLabel: rightLabel,
          text: text,
          type: 'tailwind'
        };

        if (rightLabel.indexOf('color') >= 0) {
          const result = rightLabel.match(/#[0-9a-f]{3,6}/i);
          const color = result ? result[0] : 'transparent';

          completion.leftLabelHTML = `<div style="background-color: ${color}" class="tailwind__color-preview"></div>`;
        }

        suggestions.push(completion);
      }
    }

    return suggestions;
  }
};
