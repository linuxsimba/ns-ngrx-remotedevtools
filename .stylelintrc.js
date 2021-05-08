module.exports = {
  extends: [
    'stylelint-config-standard'
  ],
  rules: {
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          'horizontal-align',
          'placeholder-color'
        ],
      },
    ],
  }
}
