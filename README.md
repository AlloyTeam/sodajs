SodaRender
==========


##What is SodaRender?
SodaRender is a light template render engine for JavaScript;

##Why to use SodaRender?
SodaRender will make your front end web page like a server side template page. Especially
 when you use ajax in your front end web page, it's very easy to render the data to html views.
 
That is to say, when you have maked a static web page accroding to the web design composition, it just takes a little time to make the static page to a front end page using templates rendering.

What's more, it's using '<?' and '?>' for the start and end markup tag. So the phper will feel it similar.

##How to use SodaRender?
The static web page like the following.

```html
<html>
    <head>
        <title>
            SodaRender Examaple
        </title>
    </head>
    
    <div>
    <ul>
        <li>list1</li>
        <li>list2</li>
        <li>list3</li>
        <li>list3</li>
    </ul>
    </div>
</html>
```

Using SodaRender, it's like the following.

```html
<html>
    <head>
        <title>
            SodaRender Examaple
        </title>
    </head>
    
    <div>
    <ul soda-model="dataList">
        <? for(var i = 0; i < list.length; i ++){
        ?>
        <li><?=list[i]?></li>
        <? }
        ?>
    </ul>
</div>
</html>
```
You will find it's just like using php to render the page in the server side.

But to make it's rendering, we will still write our javscript code like the following.
```html
<script src="sodarender.js" type="text/javascript"></script>
<script type="text/javscript">
//assume that you are using jQuery-like library in your page
$.ajax({
    url: "/cgi-bin/get_list",
    method: "GET",
    data: {},
    success: function(res){
        //the res like
        //{list: ['list1', 'list2', 'list3']}
        SodaRender("dataList", res);
    },
    
    error: function(res){
        
    }
})
</script>
```
