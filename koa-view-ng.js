'use strict';

/**
 * Module dependencies.
 */
const fs = require('fs');
const path = require('path');
const ngTemplate = require('../util/soda');

// app.js
// let ngViews = require('./server/middleware/koa-view-ng');
// 加载模板引擎
// ngViews(app, {
//   extension: ".html",
//   templateDir: path.join(__dirname, './server/views')
// });

/**
 * default render options
 * @type {Object}
 */
const defaultSettings = {
  prefix: 'ng',
  templateDir: __dirname,
  lruCache: false
};

/**
 * set app.context.render
 *
 * usage:
 * ```
 * await ctx.render('user', {name: 'dead_horse'});
 * ```
 * @param {Application} app koa application instance
 * @param {Object} settings user settings
 */
exports = module.exports = function (app, settings) {
  if (app.context.render) {
    return;
  }

  if (!settings || !settings.templateDir) {
    throw new Error('settings.templateDir required');
  }

  /**
   * cache the generate package
   * @type {Object}
   */
  const cache = Object.create(null);

  settings = Object.assign({}, defaultSettings, settings);

  // 初始化ngTemplate设置
  ngTemplate.prefix(settings.prefix);
  ngTemplate.templateDir = settings.templateDir;

  /**
   * generate html with view name and options
   * @param {String} view
   * @param {Object} options
   * @return {String} html
   */
  async function render(view, options) {
    const viewPath = path.join(settings.templateDir, view + settings.extension);
    // 从缓存获取模版
    // if (settings.cache && cache[viewPath]) {
    //   return cache[viewPath].call(options.scope, options);
    // }

    const tpl = await fs.readFileSync(viewPath, 'utf-8');

    // 加入缓存
    // if (settings.cache) {
    //   cache[viewPath] = fn;
    // }

    return ngTemplate(tpl, options);
  }

  app.context.render = async function (view, _context) {
    const ctx = this;

    const context = Object.assign({}, ctx.state, _context);

    let html = await render(view, context);
    ctx.type = 'html';
    ctx.body = html;
    // const layout = context.layout === false ? false : (context.layout || settings.layout);
    // if (layout) {
    //   // if using layout
    //   context.body = html;
    //   html = await render(layout, context);
    // }

    // const writeResp = context.writeResp === false ? false : (context.writeResp || settings.writeResp);
    // if (writeResp) {
    //   // normal operation
    //   ctx.type = 'html';
    //   ctx.body = html;
    // } else {
    //   // only return the html
    //   return html;
    // }
  };
};

/**
 * Expose ngTemplate
 */

exports.ngTemplate = ngTemplate;