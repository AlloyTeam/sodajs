SodaRender
====
### A lite angular-like template engine for JavaScript

## why using SodaRender?
>#### SodaRender is just 3KB in size.
>#### SodaRender has AngularJs Template like Apis. It will make your template file tidy, clearly to read.
>#### SodaRender reduces the error while cgi responses the data in unexpected way, such as losting some keys, error value types.
>#### SodaRender prevents XSS holes in your template file.
>#### SodaRender uses DOM parsor to render your template rather than string replacement, so it's more effective.

## who using sodaRender?
SodaRender is currently using by QQ Tribes(兴趣部落), QQ Group(群) and other projects

## how to use SodaRender

### Examples
```html
<html>
    <head>
        <title>
            SodaRender Examaple
        </title>
    </head>
    
    <div>
    <ul id="targetUl">
        <script type="text/soda" id="dataList">
            <li soda-repeat="item in list" soda-if="item.show">
            {{item.name}}
            </li>
        </script>
    </ul>
</div>
</html>
```

```JavaScript
var templateStr = document.getElementById("dataList");
var target = document.getElementById("targetUl");

var data = {
    list: [
        {name: "A"},
        {name: "B"}
    ]
};

var result = sodaRender(templateStr, data);
target.appendChild(result);
```

## APIs Of SodaRender
>### sodaRender
USING&nbsp;: &nbsp;&nbsp;SodaRender(String templateStr, Object data)<br />
DESCR&nbsp;: &nbsp;&nbsp;Using templateStr with data to render template<br />
RETURN: DOM Fragment<br />
the DOM Frament Object has a method innerHTML which will return the rendered HTML code.<br />
Meanwhile, you can use it like a common DOM Node, such as appending it to your target node.
>### sodaFilter
USING&nbsp;: &nbsp;&nbsp;SodaFilter(String filterName, Function func(input, args...))<br />
DESCR&nbsp;: &nbsp;&nbsp;Defining Filters, so you can use filters in template<br />

## Template Language (AngularJs Template Like)
### Now, we just offer three directives as below. More will be added soon later. But the three directives are able to meet our daily needs.
####{{}}
>out put expressions

>{{item.name + 1}}

#### soda-repeat
>soda-repeat="item in array"
>soda-repeat="item in array track by index"
USING&nbsp;: &nbsp;&nbsp;SodaRender(String templateStr, Object data)<br />
DESCR&nbsp;: &nbsp;&nbsp;Using templateStr with data to render template<br />

#### soda-if
>soda-if="item.show"

#### soda-class
>soda-class="currItem === 'list1' ? 'active' : ''"

#### soda-src
>soda-src="hello{{index}}.png"

#### soda-bind-html
>soda-bind-html="<div><a href=pp>click</a></div>"

#### soda-style
>soda-style="style"

#### soda-*
>soda-rx="{{rx}}%"


#### filters
>{{input|filte1:args1:args2...|filter2:args...}}
how to define filters? Just using sodaFilter Method as methioned above. Here is an example.
```JavaScript
SodaFilter('shortTitle', function(input, length){
        return (input || '').substr(0, length);
});
```
Template below
```html
<div soda-repeat="item in list">
    <div class="title">
        {{item.title|shortTitle:10}}
    </div>
</div>
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2015-present, AlloyTeam
