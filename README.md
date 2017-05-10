# sodajs

Light weight but powerful template engine for JavaScript.

``` js
npm install sodajs
```

## Why using sodajs?
* super tiny size (2kb gzip)
* make your template file tidy, clearly to read.
* good compatibility (IE6+)
* prevents XSS holes in your template file
* high-performance DOM parser

## Usage

### simple

``` js
var tpl = '<div>Hello, {{name}}</div>'
document.body.innerHTML = soda(tpl,{ name : 'soda' })
```

➜ [simple example](http://alloyteam.github.io/sodajs/pg/rd.html?type=simple)

### if

``` js
var tpl = '<div soda-if="show">Hello, {{name}}</div>' +
            '<div soda-if="!show">I\'m hidden!</div>'
document.body.innerHTML = soda(tpl,{ name : 'soda',show: true })
```

➜ [if example](http://alloyteam.github.io/sodajs/pg/rd.html?type=if)

### repeat

> soda-repeat="item in array"

> soda-repeat="item in object"

> soda-repeat="item in array by index"

> soda-repeat="item in object by key"

> soda-repeat="(index, value) in array"

> soda-repeat="(key, value) in object"

default index or key is $index


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

➜ [repeat example](http://alloyteam.github.io/sodajs/pg/rd.html?type=repeat)

### expression

``` js
var tpl = '<div>Hello, {{count+1}}</div>'
document.body.innerHTML = soda(tpl,{ count : 1 })
```

➜ [expression example](http://alloyteam.github.io/sodajs/pg/rd.html?type=expression)

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

➜ [filter example](http://alloyteam.github.io/sodajs/pg/rd.html?type=filter)

### html

```js
var tpl = '<div soda-html="html"></div>'
document.body.innerHTML = soda(tpl,{ html : '<span style="color:red;">test soda-html</span>' })
```

➜ [html example](http://alloyteam.github.io/sodajs/pg/rd.html?type=html)

### replace
replace this node with html

```js
var tpl = '<div soda-replace="html"></div>'
document.body.innerHTML = soda(tpl,{ html : '<span style="color:red;">test soda-html</span>' })
```

➜ [html example](http://alloyteam.github.io/sodajs/pg/rd.html?type=replace)

div will be replaced with given html

### Others

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

### soda.prefix

``` js
soda.prefix('o')

var tpl = '\
<ul>\
    <li o-repeat="item in list" o-if="item.show">\
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

you can customize your prefix by `soda.prefix` method.

## Who using sodajs?
sodajs is currently using by QQ Tribes(兴趣部落), QQ Group(群) and other projects

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2015-present, AlloyTeam
