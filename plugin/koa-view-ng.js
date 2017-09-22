// app.js
// let ngViews = require('./server/middleware/koa-view-ng');

// 加载模板引擎
// ngViews(app, {
//     extension: ".html",
//     viewsDir: path.join(__dirname, './common/templates/views'),
//     cache: LRU({
//         max: 500, // The maximum number of items allowed in the cache
//         max_age: 1000 * 60 * 60 * 24 // The maximum life of a cached item in milliseconds
//     }),
//     beforeRender: (viewName, scope, ctx, setting) => {
//         let combScope = Object.assign({
//             HMC: Object.assign({}, ctx.state, {
//                 currPage: viewName,
//                 jsRev: ctx.state.jsRevList[viewName + ".min.js"],
//                 cssRev: ctx.state.cssRevList[viewName + ".min.css"],
//                 pointList: ctx.state.pointData.common.concat(ctx.state.pointData.pages[viewName] || []),
//                 data: scope && scope.data || {}
//             })
//         }, scope, {
//             templates: scope && scope.templates || {}
//         })
//         delete combScope.HMC.jsRevList;
//         delete combScope.HMC.cssRevList;
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
const ngTemplate = require('./ngTemplate');
const crypto = require('crypto');

/**
 * default render options
 * @type {Object}
 */
const defaultSettings = {};

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
exports = module.exports = function(app, settings) {
    if (app.context.render) {
        return;
    }

    if (!settings || !settings.viewsDir) {
        throw new Error('settings.viewsDir required');
    }

    settings = Object.assign({}, defaultSettings, settings);

    if (settings.cache) {
        tplCache = settings.cache;
        settings.cache = null;
    }

    /**
     * generate html with view name and state
     * @param {String} view
     * @param {Object} state
     * @return {String} html
     */
    async function render(viewName, scope, ctx, setting) {
        const viewPath = path.join(setting.viewsDir, viewName + setting.extension);
        const tpl = await fs.readFileSync(viewPath, 'utf-8');
        let hashKey = "";
        let hash = crypto.createHmac('sha256', "hmc_secret");
        if (process.env.NODE_ENV === 'development') {
            hashKey = hash.update(tpl + JSON.stringify(setting.serverCacheKey || scope)).digest('hex');
        } else {
            hashKey = hash.update(viewPath + JSON.stringify(setting.serverCacheKey || scope)).digest('hex');
        }
        // 从缓存获取模版
        if (!setting.disabledCache && tplCache && tplCache.get(hashKey)) {
            ctx.set("fromCache", true);
            return tplCache.get(hashKey);
        }
        let template = ngTemplate(tpl, scope)
        // 加入缓存
        if (!setting.disabledCache && tplCache) {
            tplCache.set(hashKey, template);
        }
        return template;
    }

    app.context.render = async function(viewName, scope, setting) {
        const ctx = this;
        // 合并配置
        setting = Object.assign({}, settings, setting);
        // 合并state
        let combScope = Object.assign({}, ctx.state, scope);
        // 渲染前预处理
        setting.beforeRender && ({ viewName, combScope, setting } = setting.beforeRender(viewName, scope, ctx, setting))
        let html = await render(viewName, combScope, ctx, setting);
        ctx.type = 'html';
        ctx.body = html.replace("</!doctype>", "").replace("<!doctype>", "<!DOCTYPE HTML>");
    };
};