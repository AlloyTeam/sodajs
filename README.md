# sodajs

Light weight but powerful template engine for JavaScript.

``` js
npm install --save sodajs 
```

## Why using sodajs?
* super tiny size (2kb gzip)
* make your template file tidy, clearly to read.
* good compatibility (IE6+)
* prevents XSS holes in your template file
* high-performance DOM parser

## Usage

### simple

### Output

#### plain

```js
var tpl = '<div>{{name}}</div>';

document.body.innerHTML = soda(tpl,{ name : 'soda' })

```


#### safe propery chain output
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

#### expression

```js
var data = {}

soda("{{1 + 2}}", data);  
// result => 2


soda("{{true ? 'soda' : 'foo'}}", data)
// result => "soda"      

soda("{{1 > 3 && 'soda'}}", data)
// result => "soda"

```

#### complex expression
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

###Directives

#### if

``` js
var data = { name : 'soda',show: true };
soda(` <div soda-if="show">Hello, {{name}}</div>
       <div soda-if="!show">I\'m hidden!</div>`,
       data
    )
// result => <div>Hello, soda</div>
```


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

➜ [replace example](http://alloyteam.github.io/sodajs/pg/rd.html?type=replace)

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
