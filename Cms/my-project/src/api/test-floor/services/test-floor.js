'use strict';

/**
 * test-floor service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::test-floor.test-floor');
