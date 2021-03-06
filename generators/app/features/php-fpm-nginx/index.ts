import { dirnameFrom, DockerComposeFeature, FeatureAsyncInit, ReverseProxyService } from '../feature'
import { ConfigBuilder } from '@gfi-centre-ouest/docker-compose-builder'
import { FeatureContext } from '../../index'
import { PortsManager } from '../../managers'
import { Php } from '../common/php'
import { DockerDevboxExt } from '../../docker'
import { RegistryClient } from '../../docker/registry'
import { rsort } from '../../semver-utils'

export class PhpFpmNginx extends Php implements DockerComposeFeature<PhpFpmNginx>, FeatureAsyncInit {
  name: string = 'php-fpm-nginx'
  label: string = 'NGINX with PHP-FPM'
  instanceName: string = 'php'
  otherInstanceNames: string[] = ['web']
  directory: string | string[] = [dirnameFrom('php'), __dirname]
  phpMode: string = 'fpm'

  async initAsync () {
    await super.initAsync()

    const registry = new RegistryClient()
    const nginxTax = await registry.tagsList('nginx')

    let tags = nginxTax
      .filter(tag => /^\d+\.\d+(?:.\d+)?$/.test(tag) || tag === 'stable' || tag === 'mainline')
      .reverse()

    tags = rsort(tags)

    this.asyncQuestions = [
      ...this.asyncQuestions,
      {
        type: 'list',
        name: 'nginxVersion',
        message: 'NGINX version',
        choices: tags,
        default: 'stable',
        store: true
      }
    ]
  }

  reverseProxyServices (context: FeatureContext<this>): ReverseProxyService[] {
    return [{
      service: context.instances.web.name,
      subdomainPrefix: context.instances.web.name === this.otherInstanceNames[0] ? undefined : context.instances.web.name
    }]
  }

  dockerComposeConfiguration (builder: ConfigBuilder, context: FeatureContext<this>, portsManager: PortsManager, dev?: boolean): void {
    super.dockerComposeConfiguration(builder, context, portsManager, dev)

    if (!dev) {
      builder.service(context.instances.web.name)
        .with.default()
        .volume.project(this.projectVolume)
        .volume.relative('nginx.conf', '/etc/nginx/conf.d/default.conf')
    }
  }
}
