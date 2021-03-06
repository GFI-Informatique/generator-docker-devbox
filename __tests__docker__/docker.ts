import * as helpers from 'yeoman-test'
import AppGenerator from '../generators/app'
import { features } from '../generators/app/features'
import { bash, buildFeaturePrompts, BuildOptionsChoiceType } from './utils'

// Because docker sometimes fails to pull images, or hits authentication failures ...
(jest as any).retryTimes(5)

jest.setTimeout(1000 * 60 * 15)

function validateConfig () {
  return bash('. .bash_enter && dc config')
}

function buildDockerImage () {
  return bash('. .bash_enter && dc build --pull')
}

describe('All features', () => {
  describe('Default options', () => {
    beforeAll(async () => {
      return helpers.run(AppGenerator)
        .withArguments('bash-disabled')
        .withPrompts({
          'features~0': features.map(f => f.name)
        }).toPromise()
    })

    it('should validate docker-compose configuration', async () => {
      return validateConfig()
    })

    it('should build docker image', async () => {
      return buildDockerImage()
    })
  })

  const allOptions = buildFeaturePrompts('features~0', BuildOptionsChoiceType.ALL, ...features)

  describe('All options', () => {
      beforeAll(async () => {
        return helpers.run(AppGenerator)
          .withArguments('bash-disabled')
          .withPrompts({
            'features~0': features.map(f => f.name),
            ...allOptions
          }).toPromise()
      })

      it('should validate docker-compose configuration', async () => {
        return validateConfig()
      })

      it('should build docker image', async () => {
        return buildDockerImage()
      })
    }
  )

  const noOption = buildFeaturePrompts('features~0', BuildOptionsChoiceType.NO, ...features)

  describe('No option', () => {
    beforeAll(async () => {
      return helpers.run(AppGenerator)
        .withArguments('bash-disabled')
        .withPrompts({
          'features~0': features.map(f => f.name),
          ...noOption
        }).toPromise()
    })

    it('should validate docker-compose configuration', async () => {
      return validateConfig()
    })

    it('should build docker image', async () => {
      return buildDockerImage()
    })
  })
})

xdescribe('Each feature', () => {
  describe('Default options', () => {
    for (const feature of features) {
      describe(feature.label, () => {
        beforeAll(async () => {
          return helpers.run(AppGenerator)
            .withArguments('bash-disabled')
            .withPrompts({
              'features~0': [
                'mail-catcher'
              ]
            }).toPromise()
        })

        it('should validate docker-compose configuration', async () => {
          return validateConfig()
        })

        it('should build docker image', async () => {
          return buildDockerImage()
        })
      })
    }
  })

  describe('All options', () => {
    for (const feature of features) {
      const allOptions = buildFeaturePrompts('features~0', BuildOptionsChoiceType.ALL, feature)

      describe(feature.label, () => {
        beforeAll(async () => {
          return helpers.run(AppGenerator)
            .withArguments('bash-disabled')
            .withPrompts({
              'features~0': [
                feature.name
              ],
              ...allOptions
            }).toPromise()
        })

        it('should validate docker-compose configuration', async () => {
          return validateConfig()
        })

        it('should build docker image', async () => {
          return buildDockerImage()
        })
      })
    }
  })

  describe('No option', () => {
    for (const feature of features) {
      const noOption = buildFeaturePrompts('features~0', BuildOptionsChoiceType.NO, feature)

      describe(feature.label, () => {
        beforeAll(async () => {
          return helpers.run(AppGenerator)
            .withArguments('bash-disabled')
            .withPrompts({
              'features~0': [
                feature.name
              ],
              ...noOption
            }).toPromise()
        })

        it('should validate docker-compose configuration', async () => {
          return validateConfig()
        })

        it('should build docker image', async () => {
          return buildDockerImage()
        })
      })
    }
  })
})
