'use strict';
const clsBluebird = require('cls-bluebird');
import { Patcher } from 'pandora-metrics';

export class BluebirdPatcher extends Patcher {

  constructor() {
    super();

    this.shimmer();
  }

  getModuleName() {
    return 'bluebird';
  }

  shimmer() {
    const traceManager = this.getTraceManager();

    this.hook('3.x', (loadModule) => {
      const pkg = loadModule('package.json');
      const Promise = loadModule(pkg.main);
      clsBluebird(traceManager.ns, Promise);
    });
  }
}
