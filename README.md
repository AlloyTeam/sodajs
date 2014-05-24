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

infact, you can also using a script tag to identify the js template. Like the following;
```html
<html>
    <head>
        <title>
            SodaRender Examaple
        </title>
    </head>
    
    <div>
    <ul>
        <script type="text/soda" id="dataList">
                <? for(var i = 0; i < list.length; i ++){
                ?>
                <li><?=list[i]?></li>
                <? }
                ?>
        </script>
    </ul>
</div>
</html>
```
##Why we use <? ?> for the start and end tag instead of <% %>?
Cause the content between the <? ?> tag will be parsed as comment in Chrome and IE, our template will not display directly in the browser. On the contrary, the content between the <% %> will display in the browser. It's not what we want.

##API Of SodaRender
>### SodaRender
USING: &nbsp;&nbsp;SodaRender(String id, Object data, Boolean isAppend)<br />OR<br />
USING: &nbsp;&nbsp;new SodaRender(String id, Object data, Boolean isAppend)<br /><br />
DESCR: &nbsp;&nbsp;Init SodaRender, the method will render data to the node with a soda-model attribute named id, or a script typed by soda, which has an id attribute equals to param id. The third param isAppend identifies using append or replace method to render to the parent node. Meanwhile it returns a SodaRender Object.

>### sodarender
equals to SodaRender

>### $SR
equals to SodaRender

##API Of SodaRenderObject
>###render
USING:&nbsp;&nbsp;render(Object data, Boolean isAppend)<br />
DESCR:&nbsp;&nbsp;render data

>###update
USING:&nbsp;&nbsp;update(Object data)<br />
DESCR:&nbsp;&nbsp;update data for the template. Infact this method forces the render method's second to be false to replace old data
