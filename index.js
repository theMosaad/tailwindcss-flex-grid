const plugin = require(`tailwindcss/plugin`)
const _ = require(`lodash`)

const defaultOptions = {
  componentPrefix: `c-`,
  widthUtilities: true,
  paddingUtilities: true,
  marginUtilities: true,
  negativeMarginUtilities: true,
}

const defaultRowOptions = {
  gutter: {
    default: `20px`,
    lg: `40px`,
  },
}

module.exports = plugin.withOptions(
  function (options = {}) {
    return function ({ theme, variants, e, addBase, addComponents, addUtilities }) {
      options = _.defaults({}, options, defaultOptions)

      const getMediaQuery = function (screen) {
        if (theme(`screens.${screen}`)) {
          return `@screen ${screen}`
        }
        return `@media (min-width: ${screen})`
      }

      const baseStyles = {}
      const rowVariants = variants(`layoutGrid`)

      _.forEach(theme(`layoutGrid`), function (rowOptions, rowName) {
        const row = _.defaults({}, rowOptions, defaultRowOptions)
        row.name = `row${rowName === `default` ? `` : `-${rowName}`}`
        row.gutterValues = []
        row.negativeGutterValues = []
        row.gutterHalfValues = []
        row.negativeGutterHalfValues = []

        if (_.isPlainObject(row.gutter)) {
          if (row.gutter.default) {
            row.gutterValues.push(row.gutter.default)
            row.negativeGutterValues.push(`-${row.gutter.default}`)
          }

          const nonDefaultGutters = _.pickBy(row.gutter, (gutter, screen) => screen !== `default`)

          if (!_.isEmpty(nonDefaultGutters)) {
            row.gutterValues.push(`var(--${row.name}-gutter)`)
            row.negativeGutterValues.push(`var(--${row.name}-gutter-negative)`)
            row.gutterHalfValues.push(`var(--${row.name}-gutter-half)`)
            row.negativeGutterHalfValues.push(`var(--${row.name}-gutter-half-negative)`)

            if (row.gutter.default) {
              baseStyles[`--${row.name}-gutter`] = row.gutter.default
            }

            baseStyles[`--${row.name}-gutter-half`] = `calc(var(--${row.name}-gutter) / 2)`
            baseStyles[`--${row.name}-gutter-negative`] = `calc(var(--${row.name}-gutter) * -1)`
            baseStyles[`--${row.name}-gutter-half-negative`] = `calc(var(--${row.name}-gutter) / 2 * -1)`

            _.forEach(nonDefaultGutters, function (gutter, screen) {
              const mediaQuery = getMediaQuery(screen)
              if (!baseStyles[mediaQuery]) {
                baseStyles[mediaQuery] = {}
              }
              baseStyles[mediaQuery][`--${row.name}-gutter`] = gutter
            })
          }
        } else if (row.gutter) {
          row.gutterValues.push(row.gutter)
          row.negativeGutterValues.push(`-${row.gutter}`)
          row.gutterHalfValues.push(`var(--${row.name}-gutter-half)`)
          row.negativeGutterHalfValues.push(`var(--${row.name}-gutter-half-negative)`)

          baseStyles[`--${row.name}-gutter`] = row.gutter
          baseStyles[`--${row.name}-gutter-negative`] = `-${row.gutter}`
          baseStyles[`--${row.name}-gutter-half`] = `calc(var(--${row.name}-gutter)/2)`
          baseStyles[`--${row.name}-gutter-half-negative`] = `calc(var(--${row.name}-gutter) / 2 * -1)`
        }

        addUtilities(
          {
            [`.${e(`${options.componentPrefix}${row.name}`)}`]: {
              display: `flex`,
              flexWrap: `wrap`,
              marginLeft: row.negativeGutterHalfValues,
              marginRight: row.negativeGutterHalfValues,
            },
          },
          rowVariants
        )

        addComponents({
          [`.${e(`${options.componentPrefix}${row.name}`)} > :not(template)`]: {
            flex: `none`,
            paddingLeft: row.gutterHalfValues,
            paddingRight: row.gutterHalfValues,
          },
        })

        if (options.widthUtilities && !_.isEmpty(row.gutterValues)) {
          addUtilities(
            {
              [`.${e(`w-${row.name}-gutter`)}`]: {
                width: row.gutterValues,
              },
              [`.${e(`min-w-${row.name}-gutter`)}`]: {
                minWidth: row.gutterValues,
              },
              [`.${e(`max-w-${row.name}-gutter`)}`]: {
                maxWidth: row.gutterValues,
              },
              [`.${e(`w-${row.name}-gutter-half`)}`]: {
                width: row.gutterHalfValues,
              },
              [`.${e(`min-w-${row.name}-gutter-half`)}`]: {
                minWidth: row.gutterHalfValues,
              },
              [`.${e(`max-w-${row.name}-gutter-half`)}`]: {
                maxWidth: row.gutterHalfValues,
              },
            },
            rowVariants
          )
        }

        if (options.paddingUtilities && !_.isEmpty(row.gutterValues)) {
          addUtilities(
            {
              [`.${e(`p-${row.name}-gutter`)}`]: {
                padding: row.gutterValues,
              },
              [`.${e(`py-${row.name}-gutter`)}`]: {
                paddingTop: row.gutterValues,
                paddingBottom: row.gutterValues,
              },
              [`.${e(`px-${row.name}-gutter`)}`]: {
                paddingLeft: row.gutterValues,
                paddingRight: row.gutterValues,
              },
              [`.${e(`pt-${row.name}-gutter`)}`]: {
                paddingTop: row.gutterValues,
              },
              [`.${e(`pr-${row.name}-gutter`)}`]: {
                paddingRight: row.gutterValues,
              },
              [`.${e(`pb-${row.name}-gutter`)}`]: {
                paddingBottom: row.gutterValues,
              },
              [`.${e(`pl-${row.name}-gutter`)}`]: {
                paddingLeft: row.gutterValues,
              },
              [`.${e(`p-${row.name}-gutter-half`)}`]: {
                padding: row.gutterHalfValues,
              },
              [`.${e(`py-${row.name}-gutter-half`)}`]: {
                paddingTop: row.gutterHalfValues,
                paddingBottom: row.gutterHalfValues,
              },
              [`.${e(`px-${row.name}-gutter-half`)}`]: {
                paddingLeft: row.gutterHalfValues,
                paddingRight: row.gutterHalfValues,
              },
              [`.${e(`pt-${row.name}-gutter-half`)}`]: {
                paddingTop: row.gutterHalfValues,
              },
              [`.${e(`pr-${row.name}-gutter-half`)}`]: {
                paddingRight: row.gutterHalfValues,
              },
              [`.${e(`pb-${row.name}-gutter-half`)}`]: {
                paddingBottom: row.gutterHalfValues,
              },
              [`.${e(`pl-${row.name}-gutter-half`)}`]: {
                paddingLeft: row.gutterHalfValues,
              },
            },
            rowVariants
          )
        }

        if (options.marginUtilities && !_.isEmpty(row.gutterValues)) {
          addUtilities(
            {
              [`.${e(`m-${row.name}-gutter`)}`]: {
                margin: row.gutterValues,
              },
              [`.${e(`my-${row.name}-gutter`)}`]: {
                marginTop: row.gutterValues,
                marginBottom: row.gutterValues,
              },
              [`.${e(`mx-${row.name}-gutter`)}`]: {
                marginLeft: row.gutterValues,
                marginRight: row.gutterValues,
              },
              [`.${e(`mt-${row.name}-gutter`)}`]: {
                marginTop: row.gutterValues,
              },
              [`.${e(`mr-${row.name}-gutter`)}`]: {
                marginRight: row.gutterValues,
              },
              [`.${e(`mb-${row.name}-gutter`)}`]: {
                marginBottom: row.gutterValues,
              },
              [`.${e(`ml-${row.name}-gutter`)}`]: {
                marginLeft: row.gutterValues,
              },
              [`.${e(`m-${row.name}-gutter-half`)}`]: {
                margin: row.gutterHalfValues,
              },
              [`.${e(`my-${row.name}-gutter-half`)}`]: {
                marginTop: row.gutterHalfValues,
                marginBottom: row.gutterHalfValues,
              },
              [`.${e(`mx-${row.name}-gutter-half`)}`]: {
                marginLeft: row.gutterHalfValues,
                marginRight: row.gutterHalfValues,
              },
              [`.${e(`mt-${row.name}-gutter-half`)}`]: {
                marginTop: row.gutterHalfValues,
              },
              [`.${e(`mr-${row.name}-gutter-half`)}`]: {
                marginRight: row.gutterHalfValues,
              },
              [`.${e(`mb-${row.name}-gutter-half`)}`]: {
                marginBottom: row.gutterHalfValues,
              },
              [`.${e(`ml-${row.name}-gutter-half`)}`]: {
                marginLeft: row.gutterHalfValues,
              },
            },
            rowVariants
          )
        }

        if (options.negativeMarginUtilities && !_.isEmpty(row.negativeGutterValues)) {
          addUtilities(
            {
              [`.${e(`-m-${row.name}-gutter`)}`]: {
                margin: row.negativeGutterValues,
              },
              [`.${e(`-my-${row.name}-gutter`)}`]: {
                marginTop: row.negativeGutterValues,
                marginBottom: row.negativeGutterValues,
              },
              [`.${e(`-mx-${row.name}-gutter`)}`]: {
                marginLeft: row.negativeGutterValues,
                marginRight: row.negativeGutterValues,
              },
              [`.${e(`-mt-${row.name}-gutter`)}`]: {
                marginTop: row.negativeGutterValues,
              },
              [`.${e(`-mr-${row.name}-gutter`)}`]: {
                marginRight: row.negativeGutterValues,
              },
              [`.${e(`-mb-${row.name}-gutter`)}`]: {
                marginBottom: row.negativeGutterValues,
              },
              [`.${e(`-ml-${row.name}-gutter`)}`]: {
                marginLeft: row.negativeGutterValues,
              },
              [`.${e(`-m-${row.name}-gutter-half`)}`]: {
                margin: row.negativeGutterHalfValues,
              },
              [`.${e(`-my-${row.name}-gutter-half`)}`]: {
                marginTop: row.negativeGutterHalfValues,
                marginBottom: row.negativeGutterHalfValues,
              },
              [`.${e(`-mx-${row.name}-gutter-half`)}`]: {
                marginLeft: row.negativeGutterHalfValues,
                marginRight: row.negativeGutterHalfValues,
              },
              [`.${e(`-mt-${row.name}-gutter-half`)}`]: {
                marginTop: row.negativeGutterHalfValues,
              },
              [`.${e(`-mr-${row.name}-gutter-half`)}`]: {
                marginRight: row.negativeGutterHalfValues,
              },
              [`.${e(`-mb-${row.name}-gutter-half`)}`]: {
                marginBottom: row.negativeGutterHalfValues,
              },
              [`.${e(`-ml-${row.name}-gutter-half`)}`]: {
                marginLeft: row.negativeGutterHalfValues,
              },
            },
            rowVariants
          )
        }
      })

      if (!_.isEmpty(baseStyles)) {
        addBase({
          html: baseStyles,
        })
      }
    }
  },
  function () {
    return {
      theme: {
        layoutGrid: {
          default: defaultRowOptions,
        },
      },
      variants: {
        layoutGrid: [`responsive`],
      },
    }
  }
)
