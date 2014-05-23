/**
 * SodarRender
 * light tmpl engine
 */
;(function(){
    var encodeHtmlSimple = function(sStr){
        sStr = sStr.replace(/&/g,"&amp;");
        sStr = sStr.replace(/>/g,"&gt;");
        sStr = sStr.replace(/</g,"&lt;");
        sStr = sStr.replace(/"/g,"&quot;");
        sStr = sStr.replace(/'/g,"&#39;");
        return sStr;
    };

        //将&#转为实际字符
    var converToReal = function(str){
        if(! str) return "";
        var reg = /\&#(\d+);/g;

        return str.replace(reg, function(w, d){
            return String.fromCharCode(d);
        });
    };

    /**
     * 转义attribute 
     * @param {String} str 需要转义的字符
     */
    var encodeAttr = function(str){
        var sStr;
        sStr = str;
        sStr += '';
        sStr = sStr.replace(/&/g,"&amp;");
        sStr = sStr.replace(/>/g,"&gt;");
        sStr = sStr.replace(/</g,"&lt;");
        sStr = sStr.replace(/"/g,"&quot;");
        sStr = sStr.replace(/'/g,"&#39;");
        sStr = sStr.replace(/=/g,"&#61;");
        sStr = sStr.replace(/`/g,"&#96;");
        return sStr;		
    };

    var getTmpl = function(tmplStr, data){
        var result;

        var varHtml = "";
        for(var i in data){
            varHtml += "var " + i + " = data." + i + ";";
        }

        tmplStr = tmplStr.replace(/\s+/g, " ");
        tmplStr = varHtml + "var __result = ''; ?>" + tmplStr + "<?";
        tmplStr += " return __result;";
        tmplStr = tmplStr.replace(/<\?=([^\?]+)\?>/g, "' + $1 + '").replace(/<\?\+([^\?]+)\?>/g, "' + encodeHtmlSimple($1) + '").replace(/<\?-([^\?]+)\?>/g, "' + encodeAttr($1) + '").replace(/<\?/gi, "';").replace(/\?>/g,"__result += '");

        var str = new Function("data", "_Utils", tmplStr);
        result = str(data, Utils);

        return result;
    };

    //保留上次的el地址，便于清除
    var lastRenderEls = {};

    var renderTmpl = function(id, data, isAppend){
        var tmplNode = document.getElementById(id);
        var tmplString = tmplNode.innerHTML;
        var result = getTmpl(tmplString, data);

        if(! lastRenderEls[id]) lastRenderEls[id] = [];

        if(! isAppend){
            //清除上次的渲染
            for(var i = 0; i < lastRenderEls[id].length; i ++){
                var lastItem = lastRenderEls[id][i];

                lastItem.parentNode.removeChild(lastItem);
            }
        }

        lastRenderEls[id] = [];


        var div = document.createElement("div");
        div.innerHTML = result;

        var divChildren = div.childNodes;

        while(divChildren.length > 0){
            lastRenderEls[id].push(divChildren[0]);

            tmplNode.parentNode.insertBefore(divChildren[0], tmplNode);
        }
    };

    window.sodarender = window.SodaRender = window.$SR = {
        renderTmpl: function(id, data, isAppend){
            renderTmpl(id, data, isAppend);
        }
    };

})();
