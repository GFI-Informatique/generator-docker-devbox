import { Feature } from './feature'
import { PhpApache } from './php-apache'
import { Postgres } from './postgresql'
import { MySQL } from './mysql'
import { Node } from './node'
import { Mapserver } from './mapserver'
import { Mail } from './mail'
import { SonarScanner } from './sonar-scanner'
import { Phing } from './phing'
import { MariaDB } from './mariadb'
import { Solr } from './solr'
import { PhpFpmNginx } from './php-fpm-nginx'
import { PhpFpmApache } from './php-fpm-apache'
import { PhpCli } from './php-cli'

export const features: Feature[] = [
  new PhpFpmApache(),
  new PhpFpmNginx(),
  new PhpApache(),
  new PhpCli(),
  new Postgres(),
  new MySQL(),
  new MariaDB(),
  new Node(),
  new Mapserver(),
  new Mail(),
  new SonarScanner(),
  new Phing(),
  new Solr()
]
