# sodajs
超好用的指令模板引擎

## 特性
* 超小体积（gzip之后只有4K)
* 支持dom指令系统
* 良好的兼容性，兼容ie8及现代浏览器，兼容node环境
* 避免输出的xss漏洞
* 高性能dom渲染引擎
* 与AngularJS指令兼容
* 自定义指令和前缀


## 安装
### npm
``` js
npm install --save sodajs 
```

### CDN
* [https://unpkg.com/sodajs@0.4.9/dist/soda.min.js](https://unpkg.com/sodajs@0.4.9/dist/soda.min.js)
* [https://unpkg.com/sodajs@0.4.9/dist/soda.js](https://unpkg.com/sodajs@0.4.9/dist/soda.js)
* [https://unpkg.com/sodajs@0.4.9/dist/soda.node.min.js](https://unpkg.com/sodajs@0.4.9/dist/soda.node.min.js)
* [https://unpkg.com/sodajs@0.4.9/dist/soda.node.js](https://unpkg.com/sodajs@0.4.9/dist/soda.node.js)


## 使用
### soda & soda.node的不同
| version  |  soda  |   soda.node |
| ------------ | ------------ | ------------ |
|   Mordern Browsers |  ✓|  ✓|
|  Mobile Browsers |  ✓ | ✓ |
|  ie  | ≥8 | ≥9|
|  node |  ✗ | ✓|
| dom解析引擎| 原生|  自带nodeWindow引擎|

提示: ie 8兼容需要自行引入es5-shim 或es5-sham 和console-polyfill

查看这里的ie8的兼容测试
* [ie8 browser test](http://alloyteam.github.io/sodajs/test/soda-browser.html)

### 浏览器端
* script标签

```html
<script src="https://unpkg.com/sodajs@0.4.9/dist/soda.min.js"></script>
```
* 使用webpack

```javascript
   import soda from "sodajs"
```

### Node端
```js
let soda = require('sodajs/node');
```
低版本node可以使用dist版本
```js
let soda = require('sodajs/dist/soda.node')
```
## API
### 输出

#### 简单输出

```js
var tpl = '<div>{{name}}</div>';

document.body.innerHTML = soda(tpl,{ name : 'soda' })

```
➜ [示例](http://alloyteam.github.io/sodajs/pg/rd.html?type=simple)


#### 安全的链式输出
```js
var data = {
    name: 'soda',
    info: {
        version: '2.0'
    }
}

soda("{{info.version}}", data);  
// result => "2.0"


soda("{{info.foo.foo1}}", data)
// result => ""      without errors

soda("{{info['name']}}", data)
// result => "2.0"

```

#### 表达式

```js
var data = {}

soda("{{1 + 2}}", data);  
// result => 2


soda("{{true ? 'soda' : 'foo'}}", data)
// result => "soda"      

soda("{{1 < 3 && 'soda'}}", data)
// result => "soda"

```
➜ [示例](http://alloyteam.github.io/sodajs/pg/rd.html?type=expression)

#### 复杂的表达式
```js
 var data = {
      list: [
         {list: [{'title': '<>aa</h1>'}, {'title': 'bb'}], name: 0, show: 1},
         {list: [{'title': 0 }, {'title': 'bb'}], name: 'b'}
        ]
       
 };

 soda('{{list[list[0].show === 1 ? list[0].name : 1].list[0].title}}', data)
 // result => '<>aa</h1>'
```

### 指令

#### if

``` js
var data = { name : 'soda',show: true };
soda(` <div soda-if="show">Hello, {{name}}</div>
       <div soda-if="!show">I\'m hidden!</div>`,
       data
    )
// result => <div>Hello, soda</div>
```

➜ [示例](http://alloyteam.github.io/sodajs/pg/rd.html?type=if)


### repeat

> soda-repeat="item in array"

> soda-repeat="item in object"

> soda-repeat="item in array by index"

> soda-repeat="item in object by key"

> soda-repeat="(index, value) in array"

> soda-repeat="(key, value) in object"

默认的下标是$index


``` js
var tpl = '\
<ul>\
    <li soda-repeat="item in list" soda-if="item.show">\
        {{item.name}}\
        {{$index}}\
    </li>\
</ul>'

var data = {
    list: [
        {name: "Hello" ,show: true},
        {name: "sodajs" ,show: true},
        {name: "AlloyTeam"}
    ]
};

document.body.innerHTML =  soda(tpl, data);
```

➜ [示例](http://alloyteam.github.io/sodajs/pg/rd.html?type=repeat)


### filter

> soda.filter(String filterName, Function func(input, args...))
> {{input|filte1:args1:args2...|filter2:args...}}

example: 

``` js
soda.filter('shortTitle', function(input, length){
    return (input || '').substr(0, length);
});

var tpl = '\
<ul soda-repeat="item in list">\
    <li class="title">\
        {{item.title|shortTitle:10}}\
    </li>\
</ul>'


document.body.innerHTML = soda(tpl,{ list : [
    {title:'short'},
    {title:'i am too long!'}
] })
```

➜ [示例](http://alloyteam.github.io/sodajs/pg/rd.html?type=filter)

### html
输出原始的html,不做完全转换

```js
var tpl = '<div soda-html="html"></div>'
document.body.innerHTML = soda(tpl,{ html : '<span style="color:red;">test soda-html</span>' })
```

➜ [html example](http://alloyteam.github.io/sodajs/pg/rd.html?type=html)

### replace
用html替换当前结点

```js
var tpl = '<div soda-replace="html"></div>'
document.body.innerHTML = soda(tpl,{ html : '<span style="color:red;">test soda-html</span>' })
```

➜ [replace example](http://alloyteam.github.io/sodajs/pg/rd.html?type=replace)

div will be replaced with given html
div会被html替换

#### include
嵌套模板

soda-include="tmplateName:arg1:arg2:..."
和soda.discribe一起使用

```js
    var data = {
        name: "soda"
    };
    
	// define sub template named tmpl1
    soda.discribe('tmpl1', `<h1>{{name}}</h1>`);
    
	
	// use template tmpl1 by soda-include
    soda(`<span soda-include="tmpl1">1</span>`, data);
    // result => <h1>dorsy</h1>
    
	// set compile false not to compile sub template
	soda.discribe('tmpl1', `<h1>{{name}}</h1>`, {
		compile: false
	});
 
 	// show origin template
    soda(`<span soda-include="tmpl1">1</span>`, data);
    // result => <h1>{{name}}</h1>

    soda.discribe('tmpl2', function(path){
        return `<h1>{{name}}_${path}</h1>`;
    });

    soda(`<span soda-include="list3:sub{{'path' + 1}}">1</span>`, data);
    //  result =>  <h1>soda_subpath1</h1>
    

    // In node env
    soda.discribe('tmplNode', function(path){
        return fs.readFileSync(path, 'utf-8');
    });

    soda(`<span soda-include="tmplNode:view.html">1</span>`, data);
    //  result =>  view.html Tmplate


```

### 其他

#### soda-class
> soda-class="currItem === 'list1' ? 'active' : ''"


#### soda-src
> soda-src="hello{{index}}.png"

#### soda-style
> soda-style="style"

data example:

```js
var data = { style : { width : '100px', height : '100px' } };
```


#### soda-*
> soda-rx="{{rx}}%"

## 自定义

### soda.prefix

改变指令的前缀，默认的前缀是soda-

``` js
soda.prefix('v:')

var tpl = '\
<ul>\
    <li v:repeat="item in list" v:if="item.show">\
        {{item.name}}\
    </li>\
</ul>'


var data = {
    list: [
        {name: "Hello" ,show: true},
        {name: "sodajs" ,show: true},
        {name: "AlloyTeam"}
    ]
};

document.body.innerHTML =  soda(tpl, data);
```
### soda.directive
自定义指令
#### es 2015写法
```js
soda.directive('name',  {
    priority: 8,
	
	// how to compile el
    link({ scope, el, parseSodaExpression, expression,  getValue, compileNode, document }) {

    }
});
```
* scope: 当前的scope数据
* el: 当前节点
* expression: 指令的表达式原始字符串
* getValue: 从data链式获取值
```js
     getValue({a: {b: 1}}, "a.b");  // ===>   1
```
* parseSodaExpression: 解析soda表达式
```js
    parseSodaExpression('{{1 + 2 + a}}', {a: 1}); // ===> 4
```
* compileNode: 继续编译节点
* document:  使用document参数而不是使用window.document, 这样可以在node环境下去用

#### 示例
```js
soda.directive('mydirective', {
    priority: 8,

    link({ scope, el, parseSodaExpression, expression,  getValue, compileNode, document }) {
        var value = parseSodaExpression(expression);
        if(value){
            var textNode = document.createTextNode(value);
            el.appendChild(textNode);
        }
    }
}

soda(`
    <div soda-mydirective="add one tips: {{tips}}"></div>
`, {
    tips: 'tips'
});

// result  ==>   <div>add one tips: tips</div>
```


### soda.setDocument
自定义node端的dom解析引擎

soda.node版本的默认dom解析引擎是nodeWindow,你可以用这个方法替换为jsdom等


```js
var document = require('document');
var soda = require('soda');

soda.setDocument(document);

// ... run 

```


## 贡献代码
### 开发

git clone
``` shell
 git clone git://github.com/AlloyTeam/sodajs.git
 ```

 安装依赖
``` shell
    npm install
```

然后执行npm start

``` shell
    npm start
```
执行run build构建代码

``` shell
    npm run build
```
### 自动化测试
soda使用mocha来做自动化测试

测试单元在test目录
``` shell
    npm run test
```

#### 在线测试页面
* [soda-mocha](http://alloyteam.github.io/sodajs/test/soda-mocha.html)
* [soda.node-mocha](http://alloyteam.github.io/sodajs/test/soda.node-mocha.html)
* [ie8 browser test](http://alloyteam.github.io/sodajs/test/soda-browser.html)


## 使用项目
兴趣部落, QQ群, 群活动

## 协议

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2015-present, AlloyTeam
