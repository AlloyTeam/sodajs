// app.js
// let ngViews = require('./server/middleware/koa-view-ng');

// 加载模板引擎
// ngViews(app, {
//     extension: ".html",
//     filters: ngTemplateFilter,
//     templateDir: path.join(__dirname, './common/templates/views'),
//     cache: LRU({
//         max: 500, // The maximum number of items allowed in the cache
//         max_age: 1000 * 60 * 60 * 24 // The maximum life of a cached item in milliseconds
//     }),
//     beforeRender: (viewName, scope, ctx, setting) => {
//         let { prefix, extension } = setting;
//         let combScope = Object.assign({
//             HMC: Object.assign({}, ctx.state, {
//                 tplSettings: { prefix, extension },
//                 currPage: viewName,
//                 jsRev: ctx.state.jsRevList[viewName + ".min.js"],
//                 pointList: ctx.state.pointData.common.concat(ctx.state.pointData.pages[viewName] || [])
//             })
//         }, scope, {
//             templates: scope && scope.templates || {}
//         })
//         delete combScope.HMC.jsRevList;
//         delete combScope.HMC.pointData;
//         return { viewName, combScope, setting }
//     },
//     disabledCache: process.env.NODE_ENV === 'development'
// });

// router.get('/', async (ctx, next) => {
//   let scope = {
//     state,
//     page: "index"
//   }
//   let setting = {
//     disabledCache: false,
//     serverCacheKey: scope
//   }
//   await ctx.render("index", scope, setting||null)
// })
'use strict';

/**
 * Module dependencies.
 */
const fs = require('fs');
const path = require('path');
const ngTemplate = require('../../client/src/js/lib/soda');
const crypto = require('crypto');

/**
 * default render options
 * @type {Object}
 */
const defaultSettings = {
  prefix: 'ng',
  templateDir: __dirname
};

let tplCache = new Map()

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

  settings = Object.assign({}, defaultSettings, settings);

  if (settings.cache) {
    tplCache = settings.cache;
    settings.cache = null;
  }


  // 初始化ngTemplate设置
  ngTemplate.prefix(settings.prefix);
  ngTemplate.templateDir = settings.templateDir;
  for (var key in settings.filters) {
    ngTemplate.filter(key, settings.filters[key])
  }

  /**
   * generate html with view name and options
   * @param {String} view
   * @param {Object} options
   * @return {String} html
   */
  async function render(view, options, ctx, setting) {
    const viewPath = path.join(setting.templateDir, view + setting.extension);
    const tpl = await fs.readFileSync(viewPath, 'utf-8');
    let hashKey = "";
    let hash = crypto.createHmac('sha256', "hmc_secret");
    if (process.env.NODE_ENV === 'development') {
      hashKey = hash.update(tpl + JSON.stringify(setting.serverCacheKey || options)).digest('hex');
    }
    else {
      hashKey = hash.update(viewPath + JSON.stringify(setting.serverCacheKey || options)).digest('hex');
    }
    // 从缓存获取模版
    if (!setting.disabledCache && tplCache && tplCache.get(hashKey)) {
      ctx.set("fromCache", true);
      return tplCache.get(hashKey);
    }

    let template = ngTemplate(tpl, options)
    // 加入缓存
    if (!setting.disabledCache && tplCache) {
      tplCache.set(hashKey, template);
    }
    return template;
  }

  app.context.render = async function (view, _context, setting) {
    const ctx = this;
    setting = Object.assign({}, settings, setting);
    let { prefix, extension } = setting;
    Object.assign(ctx.state, {
      tplSettings: { prefix, extension }
    });
    const context = Object.assign({}, ctx.state, _context);

    let html = await render(view, context, ctx, setting);
    ctx.type = 'html';
    ctx.body = html.replace("</!DOCTYPE>", "").replace("<!DOCTYPE>", "<!DOCTYPE html>");
  };
};

exports.ngTemplate = ngTemplate;