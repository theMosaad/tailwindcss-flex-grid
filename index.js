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
  gutterX: {
    default: `20px`,
    lg: `42px`,
  },
  gutterY: {
    default: `20px`,
    lg: `42px`,
  },
}

const defaultContainerOptions = {
  padding: `15px`,
}

module.exports = plugin.withOptions(
  (options = {}) =>
    function ({ theme, variants, e, addBase, addComponents, addUtilities }) {
      options = _.defaults({}, options, defaultOptions)

      const baseStyles = {}
      const baseStylesAtRules = {}
      const flexGridVariants = variants(`flexGrid`)

      _.forEach(Object.keys(theme(`screens`)), (screen) => {
        if (!baseStylesAtRules[`@screen ${screen}`]) {
          baseStylesAtRules[`@screen ${screen}`] = {}
        }
      })

      _.forEach(theme(`flexGrid.rows`), (rowOptions, rowName) => {
        const row = _.defaults({}, rowOptions, defaultRowOptions)
        row.name = `row${rowName === `default` ? `` : `-${rowName}`}`
        row.gutterXValues = []
        row.negativeGutterXValues = []
        row.gutterXHalfValues = []
        row.negativeGutterXHalfValues = []
        row.gutterYValues = []
        row.negativeGutterYValues = []
        row.gutterYHalfValues = []
        row.negativeGutterYHalfValues = []

        if (_.isPlainObject(row.gutterX)) {
          if (row.gutterX.default) {
            row.gutterXValues.push(row.gutterX.default)
            row.negativeGutterXValues.push(`-${row.gutterX.default}`)
          }

          const nonDefaultGutters = _.pickBy(
            row.gutterX,
            (gutter, screen) => screen !== `default`
          )

          if (!_.isEmpty(nonDefaultGutters)) {
            row.gutterXValues.push(`var(--${row.name}-gutter-x)`)
            row.negativeGutterXValues.push(
              `var(--${row.name}-gutter-x-negative)`
            )
            row.gutterXHalfValues.push(`var(--${row.name}-gutter-x-half)`)
            row.negativeGutterXHalfValues.push(
              `var(--${row.name}-gutter-x-half-negative)`
            )

            if (row.gutterX.default) {
              baseStyles[`--${row.name}-gutter-x`] = row.gutterX.default
            }

            baseStyles[
              `--${row.name}-gutter-x-half`
            ] = `calc(var(--${row.name}-gutter-x) / 2)`
            baseStyles[
              `--${row.name}-gutter-x-negative`
            ] = `calc(var(--${row.name}-gutter-x) * -1)`
            baseStyles[
              `--${row.name}-gutter-x-half-negative`
            ] = `calc(var(--${row.name}-gutter-x) / 2 * -1)`

            _.forEach(nonDefaultGutters, (gutter, screen) => {
              if (!baseStylesAtRules[`@screen ${screen}`]) {
                baseStylesAtRules[`@screen ${screen}`] = {}
              }
              baseStylesAtRules[`@screen ${screen}`][`--${row.name}-gutter-x`] =
                gutter
            })
          }
        } else if (row.gutterX) {
          row.gutterXValues.push(row.gutterX)
          row.negativeGutterXValues.push(`-${row.gutterX}`)
          row.gutterXHalfValues.push(`var(--${row.name}-gutter-x-half)`)
          row.negativeGutterXHalfValues.push(
            `var(--${row.name}-gutter-x-half-negative)`
          )

          baseStyles[`--${row.name}-gutter-x`] = row.gutterX
          baseStyles[`--${row.name}-gutter-x-negative`] = `-${row.gutterX}`
          baseStyles[
            `--${row.name}-gutter-x-half`
          ] = `calc(var(--${row.name}-gutter-x)/2)`
          baseStyles[
            `--${row.name}-gutter-x-half-negative`
          ] = `calc(var(--${row.name}-gutter-x) / 2 * -1)`
        }

        if (_.isPlainObject(row.gutterY)) {
          if (row.gutterY.default) {
            row.gutterYValues.push(row.gutterY.default)
            row.negativeGutterYValues.push(`-${row.gutterY.default}`)
          }

          const nonDefaultGutters = _.pickBy(
            row.gutterY,
            (gutter, screen) => screen !== `default`
          )

          if (!_.isEmpty(nonDefaultGutters)) {
            row.gutterYValues.push(`var(--${row.name}-gutter-y)`)
            row.negativeGutterYValues.push(
              `var(--${row.name}-gutter-y-negative)`
            )
            row.gutterYHalfValues.push(`var(--${row.name}-gutter-y-half)`)
            row.negativeGutterYHalfValues.push(
              `var(--${row.name}-gutter-y-half-negative)`
            )

            if (row.gutterY.default) {
              baseStyles[`--${row.name}-gutter-y`] = row.gutterY.default
            }

            baseStyles[
              `--${row.name}-gutter-y-half`
            ] = `calc(var(--${row.name}-gutter-y) / 2)`
            baseStyles[
              `--${row.name}-gutter-y-negative`
            ] = `calc(var(--${row.name}-gutter-y) * -1)`
            baseStyles[
              `--${row.name}-gutter-y-half-negative`
            ] = `calc(var(--${row.name}-gutter-y) / 2 * -1)`

            _.forEach(nonDefaultGutters, (gutter, screen) => {
              if (!baseStylesAtRules[`@screen ${screen}`]) {
                baseStylesAtRules[`@screen ${screen}`] = {}
              }
              baseStylesAtRules[`@screen ${screen}`][`--${row.name}-gutter-y`] =
                gutter
            })
          }
        } else if (row.gutterY) {
          row.gutterYValues.push(row.gutterY)
          row.negativeGutterYValues.push(`-${row.gutterY}`)
          row.gutterYHalfValues.push(`var(--${row.name}-gutter-y-half)`)
          row.negativeGutterYHalfValues.push(
            `var(--${row.name}-gutter-y-half-negative)`
          )

          baseStyles[`--${row.name}-gutter-y`] = row.gutterY
          baseStyles[`--${row.name}-gutter-y-negative`] = `-${row.gutterY}`
          baseStyles[
            `--${row.name}-gutter-y-half`
          ] = `calc(var(--${row.name}-gutter-y)/2)`
          baseStyles[
            `--${row.name}-gutter-y-half-negative`
          ] = `calc(var(--${row.name}-gutter-y) / 2 * -1)`
        }

        addComponents({
          [`.${e(`${options.componentPrefix}${row.name}`)}`]: {
            display: `flex`,
            flexWrap: `wrap`,
            marginTop: row.negativeGutterYHalfValues,
            marginBottom: row.negativeGutterYHalfValues,
            marginLeft: row.negativeGutterXHalfValues,
            marginRight: row.negativeGutterXHalfValues,
            '& > :not([hidden])': {
              flex: `none`,
              paddingTop: row.gutterYHalfValues,
              paddingBottom: row.gutterYHalfValues,
              paddingLeft: row.gutterXHalfValues,
              paddingRight: row.gutterXHalfValues,
            },
          },
        })

        if (options.widthUtilities) {
          if (!_.isEmpty(row.gutterXValues)) {
            addUtilities(
              {
                [`.${e(`w-${row.name}-gutter-x`)}`]: {
                  width: row.gutterXValues,
                },
                [`.${e(`min-w-${row.name}-gutter-x`)}`]: {
                  minWidth: row.gutterXValues,
                },
                [`.${e(`max-w-${row.name}-gutter-x`)}`]: {
                  maxWidth: row.gutterXValues,
                },
                [`.${e(`w-${row.name}-gutter-x-half`)}`]: {
                  width: row.gutterXHalfValues,
                },
                [`.${e(`min-w-${row.name}-gutter-x-half`)}`]: {
                  minWidth: row.gutterXHalfValues,
                },
                [`.${e(`max-w-${row.name}-gutter-x-half`)}`]: {
                  maxWidth: row.gutterXHalfValues,
                },
              },
              flexGridVariants
            )
          }
          if (!_.isEmpty(row.gutterYValues)) {
            addUtilities(
              {
                [`.${e(`w-${row.name}-gutter-y`)}`]: {
                  width: row.gutterYValues,
                },
                [`.${e(`min-w-${row.name}-gutter-y`)}`]: {
                  minWidth: row.gutterYValues,
                },
                [`.${e(`max-w-${row.name}-gutter-y`)}`]: {
                  maxWidth: row.gutterYValues,
                },
                [`.${e(`w-${row.name}-gutter-y-half`)}`]: {
                  width: row.gutterYHalfValues,
                },
                [`.${e(`min-w-${row.name}-gutter-y-half`)}`]: {
                  minWidth: row.gutterYHalfValues,
                },
                [`.${e(`max-w-${row.name}-gutter-y-half`)}`]: {
                  maxWidth: row.gutterYHalfValues,
                },
              },
              flexGridVariants
            )
          }
        }

        if (options.paddingUtilities) {
          if (!_.isEmpty(row.gutterXValues)) {
            addUtilities(
              {
                [`.${e(`p-${row.name}-gutter-x`)}`]: {
                  padding: row.gutterXValues,
                },
                [`.${e(`py-${row.name}-gutter-x`)}`]: {
                  paddingTop: row.gutterXValues,
                  paddingBottom: row.gutterXValues,
                },
                [`.${e(`px-${row.name}-gutter-x`)}`]: {
                  paddingLeft: row.gutterXValues,
                  paddingRight: row.gutterXValues,
                },
                [`.${e(`pt-${row.name}-gutter-x`)}`]: {
                  paddingTop: row.gutterXValues,
                },
                [`.${e(`pr-${row.name}-gutter-x`)}`]: {
                  paddingRight: row.gutterXValues,
                },
                [`.${e(`pb-${row.name}-gutter-x`)}`]: {
                  paddingBottom: row.gutterXValues,
                },
                [`.${e(`pl-${row.name}-gutter-x`)}`]: {
                  paddingLeft: row.gutterXValues,
                },
                [`.${e(`p-${row.name}-gutter-x-half`)}`]: {
                  padding: row.gutterXHalfValues,
                },
                [`.${e(`py-${row.name}-gutter-x-half`)}`]: {
                  paddingTop: row.gutterXHalfValues,
                  paddingBottom: row.gutterXHalfValues,
                },
                [`.${e(`px-${row.name}-gutter-x-half`)}`]: {
                  paddingLeft: row.gutterXHalfValues,
                  paddingRight: row.gutterXHalfValues,
                },
                [`.${e(`pt-${row.name}-gutter-x-half`)}`]: {
                  paddingTop: row.gutterXHalfValues,
                },
                [`.${e(`pr-${row.name}-gutter-x-half`)}`]: {
                  paddingRight: row.gutterXHalfValues,
                },
                [`.${e(`pb-${row.name}-gutter-x-half`)}`]: {
                  paddingBottom: row.gutterXHalfValues,
                },
                [`.${e(`pl-${row.name}-gutter-x-half`)}`]: {
                  paddingLeft: row.gutterXHalfValues,
                },
              },
              flexGridVariants
            )
          }
          if (!_.isEmpty(row.gutterYValues)) {
            addUtilities(
              {
                [`.${e(`p-${row.name}-gutter-y`)}`]: {
                  padding: row.gutterYValues,
                },
                [`.${e(`py-${row.name}-gutter-y`)}`]: {
                  paddingTop: row.gutterYValues,
                  paddingBottom: row.gutterYValues,
                },
                [`.${e(`px-${row.name}-gutter-y`)}`]: {
                  paddingLeft: row.gutterYValues,
                  paddingRight: row.gutterYValues,
                },
                [`.${e(`pt-${row.name}-gutter-y`)}`]: {
                  paddingTop: row.gutterYValues,
                },
                [`.${e(`pr-${row.name}-gutter-y`)}`]: {
                  paddingRight: row.gutterYValues,
                },
                [`.${e(`pb-${row.name}-gutter-y`)}`]: {
                  paddingBottom: row.gutterYValues,
                },
                [`.${e(`pl-${row.name}-gutter-y`)}`]: {
                  paddingLeft: row.gutterYValues,
                },
                [`.${e(`p-${row.name}-gutter-y-half`)}`]: {
                  padding: row.gutterYHalfValues,
                },
                [`.${e(`py-${row.name}-gutter-y-half`)}`]: {
                  paddingTop: row.gutterYHalfValues,
                  paddingBottom: row.gutterYHalfValues,
                },
                [`.${e(`px-${row.name}-gutter-y-half`)}`]: {
                  paddingLeft: row.gutterYHalfValues,
                  paddingRight: row.gutterYHalfValues,
                },
                [`.${e(`pt-${row.name}-gutter-y-half`)}`]: {
                  paddingTop: row.gutterYHalfValues,
                },
                [`.${e(`pr-${row.name}-gutter-y-half`)}`]: {
                  paddingRight: row.gutterYHalfValues,
                },
                [`.${e(`pb-${row.name}-gutter-y-half`)}`]: {
                  paddingBottom: row.gutterYHalfValues,
                },
                [`.${e(`pl-${row.name}-gutter-y-half`)}`]: {
                  paddingLeft: row.gutterYHalfValues,
                },
              },
              flexGridVariants
            )
          }
        }

        if (options.marginUtilities) {
          if (!_.isEmpty(row.gutterXValues)) {
            addUtilities(
              {
                [`.${e(`m-${row.name}-gutter-x`)}`]: {
                  margin: row.gutterXValues,
                },
                [`.${e(`my-${row.name}-gutter-x`)}`]: {
                  marginTop: row.gutterXValues,
                  marginBottom: row.gutterXValues,
                },
                [`.${e(`mx-${row.name}-gutter-x`)}`]: {
                  marginLeft: row.gutterXValues,
                  marginRight: row.gutterXValues,
                },
                [`.${e(`mt-${row.name}-gutter-x`)}`]: {
                  marginTop: row.gutterXValues,
                },
                [`.${e(`mr-${row.name}-gutter-x`)}`]: {
                  marginRight: row.gutterXValues,
                },
                [`.${e(`mb-${row.name}-gutter-x`)}`]: {
                  marginBottom: row.gutterXValues,
                },
                [`.${e(`ml-${row.name}-gutter-x`)}`]: {
                  marginLeft: row.gutterXValues,
                },
                [`.${e(`m-${row.name}-gutter-x-half`)}`]: {
                  margin: row.gutterXHalfValues,
                },
                [`.${e(`my-${row.name}-gutter-x-half`)}`]: {
                  marginTop: row.gutterXHalfValues,
                  marginBottom: row.gutterXHalfValues,
                },
                [`.${e(`mx-${row.name}-gutter-x-half`)}`]: {
                  marginLeft: row.gutterXHalfValues,
                  marginRight: row.gutterXHalfValues,
                },
                [`.${e(`mt-${row.name}-gutter-x-half`)}`]: {
                  marginTop: row.gutterXHalfValues,
                },
                [`.${e(`mr-${row.name}-gutter-x-half`)}`]: {
                  marginRight: row.gutterXHalfValues,
                },
                [`.${e(`mb-${row.name}-gutter-x-half`)}`]: {
                  marginBottom: row.gutterXHalfValues,
                },
                [`.${e(`ml-${row.name}-gutter-x-half`)}`]: {
                  marginLeft: row.gutterXHalfValues,
                },
              },
              flexGridVariants
            )
          }
          if (!_.isEmpty(row.gutterYValues)) {
            addUtilities(
              {
                [`.${e(`m-${row.name}-gutter-y`)}`]: {
                  margin: row.gutterYValues,
                },
                [`.${e(`my-${row.name}-gutter-y`)}`]: {
                  marginTop: row.gutterYValues,
                  marginBottom: row.gutterYValues,
                },
                [`.${e(`mx-${row.name}-gutter-y`)}`]: {
                  marginLeft: row.gutterYValues,
                  marginRight: row.gutterYValues,
                },
                [`.${e(`mt-${row.name}-gutter-y`)}`]: {
                  marginTop: row.gutterYValues,
                },
                [`.${e(`mr-${row.name}-gutter-y`)}`]: {
                  marginRight: row.gutterYValues,
                },
                [`.${e(`mb-${row.name}-gutter-y`)}`]: {
                  marginBottom: row.gutterYValues,
                },
                [`.${e(`ml-${row.name}-gutter-y`)}`]: {
                  marginLeft: row.gutterYValues,
                },
                [`.${e(`m-${row.name}-gutter-y-half`)}`]: {
                  margin: row.gutterYHalfValues,
                },
                [`.${e(`my-${row.name}-gutter-y-half`)}`]: {
                  marginTop: row.gutterYHalfValues,
                  marginBottom: row.gutterYHalfValues,
                },
                [`.${e(`mx-${row.name}-gutter-y-half`)}`]: {
                  marginLeft: row.gutterYHalfValues,
                  marginRight: row.gutterYHalfValues,
                },
                [`.${e(`mt-${row.name}-gutter-y-half`)}`]: {
                  marginTop: row.gutterYHalfValues,
                },
                [`.${e(`mr-${row.name}-gutter-y-half`)}`]: {
                  marginRight: row.gutterYHalfValues,
                },
                [`.${e(`mb-${row.name}-gutter-y-half`)}`]: {
                  marginBottom: row.gutterYHalfValues,
                },
                [`.${e(`ml-${row.name}-gutter-y-half`)}`]: {
                  marginLeft: row.gutterYHalfValues,
                },
              },
              flexGridVariants
            )
          }
        }

        if (options.negativeMarginUtilities) {
          if (!_.isEmpty(row.negativeGutterXValues)) {
            addUtilities(
              {
                [`.${e(`-m-${row.name}-gutter-x`)}`]: {
                  margin: row.negativeGutterXValues,
                },
                [`.${e(`-my-${row.name}-gutter-x`)}`]: {
                  marginTop: row.negativeGutterXValues,
                  marginBottom: row.negativeGutterXValues,
                },
                [`.${e(`-mx-${row.name}-gutter-x`)}`]: {
                  marginLeft: row.negativeGutterXValues,
                  marginRight: row.negativeGutterXValues,
                },
                [`.${e(`-mt-${row.name}-gutter-x`)}`]: {
                  marginTop: row.negativeGutterXValues,
                },
                [`.${e(`-mr-${row.name}-gutter-x`)}`]: {
                  marginRight: row.negativeGutterXValues,
                },
                [`.${e(`-mb-${row.name}-gutter-x`)}`]: {
                  marginBottom: row.negativeGutterXValues,
                },
                [`.${e(`-ml-${row.name}-gutter-x`)}`]: {
                  marginLeft: row.negativeGutterXValues,
                },
                [`.${e(`-m-${row.name}-gutter-x-half`)}`]: {
                  margin: row.negativeGutterXHalfValues,
                },
                [`.${e(`-my-${row.name}-gutter-x-half`)}`]: {
                  marginTop: row.negativeGutterXHalfValues,
                  marginBottom: row.negativeGutterXHalfValues,
                },
                [`.${e(`-mx-${row.name}-gutter-x-half`)}`]: {
                  marginLeft: row.negativeGutterXHalfValues,
                  marginRight: row.negativeGutterXHalfValues,
                },
                [`.${e(`-mt-${row.name}-gutter-x-half`)}`]: {
                  marginTop: row.negativeGutterXHalfValues,
                },
                [`.${e(`-mr-${row.name}-gutter-x-half`)}`]: {
                  marginRight: row.negativeGutterXHalfValues,
                },
                [`.${e(`-mb-${row.name}-gutter-x-half`)}`]: {
                  marginBottom: row.negativeGutterXHalfValues,
                },
                [`.${e(`-ml-${row.name}-gutter-x-half`)}`]: {
                  marginLeft: row.negativeGutterXHalfValues,
                },
              },
              flexGridVariants
            )
          }
          if (!_.isEmpty(row.negativeGutterYValues)) {
            addUtilities(
              {
                [`.${e(`-m-${row.name}-gutter-y`)}`]: {
                  margin: row.negativeGutterYValues,
                },
                [`.${e(`-my-${row.name}-gutter-y`)}`]: {
                  marginTop: row.negativeGutterYValues,
                  marginBottom: row.negativeGutterYValues,
                },
                [`.${e(`-mx-${row.name}-gutter-y`)}`]: {
                  marginLeft: row.negativeGutterYValues,
                  marginRight: row.negativeGutterYValues,
                },
                [`.${e(`-mt-${row.name}-gutter-y`)}`]: {
                  marginTop: row.negativeGutterYValues,
                },
                [`.${e(`-mr-${row.name}-gutter-y`)}`]: {
                  marginRight: row.negativeGutterYValues,
                },
                [`.${e(`-mb-${row.name}-gutter-y`)}`]: {
                  marginBottom: row.negativeGutterYValues,
                },
                [`.${e(`-ml-${row.name}-gutter-y`)}`]: {
                  marginLeft: row.negativeGutterYValues,
                },
                [`.${e(`-m-${row.name}-gutter-y-half`)}`]: {
                  margin: row.negativeGutterYHalfValues,
                },
                [`.${e(`-my-${row.name}-gutter-y-half`)}`]: {
                  marginTop: row.negativeGutterYHalfValues,
                  marginBottom: row.negativeGutterYHalfValues,
                },
                [`.${e(`-mx-${row.name}-gutter-y-half`)}`]: {
                  marginLeft: row.negativeGutterYHalfValues,
                  marginRight: row.negativeGutterYHalfValues,
                },
                [`.${e(`-mt-${row.name}-gutter-y-half`)}`]: {
                  marginTop: row.negativeGutterYHalfValues,
                },
                [`.${e(`-mr-${row.name}-gutter-y-half`)}`]: {
                  marginRight: row.negativeGutterYHalfValues,
                },
                [`.${e(`-mb-${row.name}-gutter-y-half`)}`]: {
                  marginBottom: row.negativeGutterYHalfValues,
                },
                [`.${e(`-ml-${row.name}-gutter-y-half`)}`]: {
                  marginLeft: row.negativeGutterYHalfValues,
                },
              },
              flexGridVariants
            )
          }
        }
      })

      _.forEach(
        theme(`flexGrid.containers`),
        (containerOptions, containerName) => {
          const container = _.defaults(
            {},
            containerOptions,
            defaultContainerOptions
          )
          container.name = `container${
            containerName === `default` ? `` : `-${containerName}`
          }`
          container.paddingValues = []
          container.negativePaddingValues = []

          if (_.isPlainObject(container.padding)) {
            if (container.padding.default) {
              container.paddingValues.push(container.padding.default)
              container.negativePaddingValues.push(
                `-${container.padding.default}`
              )
            }

            const nonDefaultPaddings = _.pickBy(
              container.padding,
              (padding, screen) => screen !== `default`
            )

            if (!_.isEmpty(nonDefaultPaddings)) {
              container.paddingValues.push(`var(--${container.name}-padding)`)
              container.negativePaddingValues.push(
                `var(--${container.name}-padding-negative)`
              )

              if (container.padding.default) {
                baseStyles[`--${container.name}-padding`] =
                  container.padding.default
              }

              baseStyles[
                `--${container.name}-padding-negative`
              ] = `calc(var(--${container.name}-padding) * -1)`

              _.forEach(nonDefaultPaddings, (padding, screen) => {
                if (!baseStylesAtRules[`@screen ${screen}`]) {
                  baseStylesAtRules[`@screen ${screen}`] = {}
                }
                baseStylesAtRules[`@screen ${screen}`][
                  `--${container.name}-padding`
                ] = padding
              })
            }
          } else if (container.padding) {
            container.paddingValues.push(container.padding)
            container.negativePaddingValues.push(`-${container.padding}`)
          }

          addComponents({
            [`.${e(`${options.componentPrefix}${container.name}`)}`]: {
              display: 'flow-root',
              paddingLeft: container.paddingValues,
              paddingRight: container.paddingValues,
            },
          })

          if (options.paddingUtilities && !_.isEmpty(container.paddingValues)) {
            addUtilities(
              {
                [`.${e(`p-${container.name}`)}`]: {
                  padding: container.paddingValues,
                },
                [`.${e(`py-${container.name}`)}`]: {
                  paddingTop: container.paddingValues,
                  paddingBottom: container.paddingValues,
                },
                [`.${e(`px-${container.name}`)}`]: {
                  paddingLeft: container.paddingValues,
                  paddingRight: container.paddingValues,
                },
                [`.${e(`pt-${container.name}`)}`]: {
                  paddingTop: container.paddingValues,
                },
                [`.${e(`pr-${container.name}`)}`]: {
                  paddingRight: container.paddingValues,
                },
                [`.${e(`pb-${container.name}`)}`]: {
                  paddingBottom: container.paddingValues,
                },
                [`.${e(`pl-${container.name}`)}`]: {
                  paddingLeft: container.paddingValues,
                },
              },
              flexGridVariants
            )
          }

          if (options.marginUtilities && !_.isEmpty(container.paddingValues)) {
            addUtilities(
              {
                [`.${e(`m-${container.name}`)}`]: {
                  margin: container.paddingValues,
                },
                [`.${e(`my-${container.name}`)}`]: {
                  marginTop: container.paddingValues,
                  marginBottom: container.paddingValues,
                },
                [`.${e(`mx-${container.name}`)}`]: {
                  marginLeft: container.paddingValues,
                  marginRight: container.paddingValues,
                },
                [`.${e(`mt-${container.name}`)}`]: {
                  marginTop: container.paddingValues,
                },
                [`.${e(`mr-${container.name}`)}`]: {
                  marginRight: container.paddingValues,
                },
                [`.${e(`mb-${container.name}`)}`]: {
                  marginBottom: container.paddingValues,
                },
                [`.${e(`ml-${container.name}`)}`]: {
                  marginLeft: container.paddingValues,
                },
              },
              flexGridVariants
            )
          }

          if (
            options.negativeMarginUtilities &&
            !_.isEmpty(container.negativePaddingValues)
          ) {
            addUtilities(
              {
                [`.${e(`-m-${container.name}`)}`]: {
                  margin: container.negativePaddingValues,
                },
                [`.${e(`-my-${container.name}`)}`]: {
                  marginTop: container.negativePaddingValues,
                  marginBottom: container.negativePaddingValues,
                },
                [`.${e(`-mx-${container.name}`)}`]: {
                  marginLeft: container.negativePaddingValues,
                  marginRight: container.negativePaddingValues,
                },
                [`.${e(`-mt-${container.name}`)}`]: {
                  marginTop: container.negativePaddingValues,
                },
                [`.${e(`-mr-${container.name}`)}`]: {
                  marginRight: container.negativePaddingValues,
                },
                [`.${e(`-mb-${container.name}`)}`]: {
                  marginBottom: container.negativePaddingValues,
                },
                [`.${e(`-ml-${container.name}`)}`]: {
                  marginLeft: container.negativePaddingValues,
                },
              },
              flexGridVariants
            )
          }
        }
      )

      if (!_.isEmpty(baseStyles)) {
        addBase({
          html: baseStyles,
        })
      }

      if (!_.isEmpty(baseStylesAtRules)) {
        addBase({
          html: baseStylesAtRules,
        })
      }
    },
  () => ({
    theme: {
      flexGrid: {
        rows: {
          default: defaultRowOptions,
        },
        containers: {
          default: defaultContainerOptions,
        },
      },
    },
    variants: {
      flexGrid: [`responsive`],
    },
  })
)
