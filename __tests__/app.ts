import * as assertYo from 'yeoman-assert'
import * as helpers from 'yeoman-test'
import AppGenerator from '../generators/app'

describe('generator-docker-devbox:app', () => {

  describe('Default answers', () => {
    beforeAll(() => {
      return helpers.run(AppGenerator).toPromise()
    })

    it('should have SmartCD entrypoint files', () => {
      assertYo.file('.bash_enter')
    })

    it('should have default .bin scripts', () => {
      assertYo.file([
        '.bin/dc',
        '.bin/system',
        '.bin/yo',
        '.bin/mo'
      ])
    })

    it('should have default .bash_enter.d scripts', () => {
      assertYo.file([
        '.bash_enter.d/01-env',
        '.bash_enter.d/03-functions',
        '.bash_enter.d/05-variables',
        '.bash_enter.d/10-path',
        '.bash_enter.d/20-mo',
        '.bash_enter.d/30-env-symlinks',
        '.bash_enter.d/50-ca-certificates',
        '.bash_enter.d/60-cfssl-cli-gencert',
        '.bash_enter.d/62-nginx-proxy-config',
        '.bash_enter.d/95-init'
      ])
    })

    it('should have default .bash_leave.d scripts', () => {
      assertYo.file([
        '.bash_leave.d/01-env',
        '.bash_leave.d/90-cleanup-path',
        '.bash_leave.d/95-cleanup-variables'
      ])
    })
  })
})
