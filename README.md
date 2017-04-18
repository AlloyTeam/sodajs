# sodajs

Light weight but powerful template engine for JavaScript.

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

### if

``` js
var tpl = '<div soda-if="show">Hello, {{name}}</div>' +
            '<div soda-if="!show">I\'m hidden!</div>'
document.body.innerHTML = soda(tpl,{ name : 'soda',show: true })
```

### repeat

> soda-repeat="item in array"

> soda-repeat="item in array track by index"

``` js
var tpl = '\
<ul>\
    <li soda-repeat="item in list" soda-if="item.show">\
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

### expression

``` js
var tpl = '<div>Hello, {{count+1}}</div>'
document.body.innerHTML = soda(tpl,{ count : 1 })
```

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

### Others

#### soda-class
> soda-class="currItem === 'list1' ? 'active' : ''"

#### soda-src
> soda-src="hello{{index}}.png"

#### soda-bind-html
> soda-bind-html="<div><a href=pp>click</a></div>"

#### soda-style
> soda-style="style"

#### soda-*
> soda-rx="{{rx}}%"


## Who using sodajs?
sodajs is currently using by QQ Tribes(兴趣部落), QQ Group(群) and other projects

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2015-present, AlloyTeam