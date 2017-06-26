var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;

//var soda = require('./../node');
var soda = require('./../node');
//}
/*
if(typeof describe === 'undefined'){
    var describe =  function(name, func){
        console.log(name);

        func && func();
    };

    var it = function(name, func){
        console.log(name);
        func && func();
    };
}
*/


 describe('Output', function() {
    it('recovery', function(){
        var html1 = `
            <div>asdfasdf</div>
        `;

        var html2 = `<tr><td>1</td><td></td></tr>`;


        assert.equal(soda(html1), html1);
        assert.equal(soda(html2), html2);
    });

    it('plain', function() {
        assert.equal(
            soda('{{a}}', {a: 1}),
            '1'
        );

        assert.equal(
            soda('{{a + 1}}', {a: 1}),
            '2'
        );

        assert.equal(
            soda('{{1}}', {}),
            '1'
        );

        assert.equal(
            soda('{{1 + 3}}', {}),
            '4'
        );

        assert.equal(
            soda('{{1 + "1"}}', {}),
            '11'
        );

        assert.equal(
            soda('{{true}}', {}),
            'true'
        );

       assert.equal(
            soda('{{false}}', {}),
            'false'
        );

        assert.equal(
            soda('{{true ? 1 : 2}}', {}),
            '1'
        );

       assert.equal(
            soda('{{false ? 1 : 2}}', {}),
            '2'
        );

       assert.equal(
            soda('{{0 ? 1 : 2}}', {}),
            '2'
        );

        assert.equal(
            soda("{{'0' ? 1 : 2}}", {}),
            '1'
        );

        assert.equal(
            soda('{{3 > 2 && "foo"}}', {}),
            'foo'
        );

    });


    it('property', function() {
       var data = {
            a: {
                b: '1'
            },

            list: [
                { title: 1}
            ]
        };

        assert.equal(
            soda('{{a.b}}', data),
            '1'
        );

        assert.equal(
            soda('{{a.c}}', data),
            ''
        );

        assert.equal(
            soda('{{list[0].title}}', data),
            '1'
        );

        assert.equal(
            soda('{{list[0]["title"]}}', data),
            '1'
        );

    });

   it('prototype output', function() {
        var data = {
            test: 'test',
            list: [
                {}
            ]
        };


        assert.equal(
            soda(`<span soda-repeat="item in list">{{test}}</span>`, data),
            '<span>test</span>'
        );
   });

    it('complex output', function(){
        var data = {
              list: [
                 {list: [{'title': '<>aa</h1>'}, {'title': 'bb'}], name: 0, show: 1},
                 {list: [{'title': 0 }, {'title': 'bb'}], name: 'b'},
                 {list: [{'title': 'aa'}, {'title': 'bb'}], name: 'b'},
                 {list: [{'title': 'aa'}, {'title': 'bb'}], name: 'b'},
                 {list: [{'title': 'aa'}, {'title': 'bb'}], name: 'b'},
                 {list: [{'title': 'aa'}, {'title': 'bb'}], name: 'b'},
                 {list: [{'title': 'aa'}, {'title': 'bb'}], name: 'c'}
               ]
           };

        assert.equal(
            soda('{{list[list[0].show === 1 ? list[0].name : 1].list[0].title}}', data),
            '&lt;&gt;aa&lt;/h1&gt;'
        );
    });

    it('attr output', function(){
        var data = {
            a: 1
        };

        assert.equal(
            soda('<div class="p{{a == 1 ? \'flag\' : \'a\'}}"></div>', data),
            '<div class="pflag"></div>'
        );

        assert.equal(
            soda(`<span soda-rx="{{a}}%">a</span>`, data),
            '<span rx="1%">a</span>'
        );
    });

  });


describe('Directives', function() {
    it('repeat', function(){
            var data = {
              list: [
                {name: 'a'},
                {name: 'b'}
               ],

               trackObject: {
                 a: 1,
                 b: '2'
               }
           };


           assert.equal(
                soda(`<span soda-repeat="item in list">{{$index}}{{item.name}}</span>`, data),
                '<span>0a</span><span>1b</span>'
           );

           assert.equal(
                soda(`<span soda-repeat="item in list track by i">{{i}}{{item.name}}</span>`, data),
                '<span>0a</span><span>1b</span>'
           );

           assert.equal(
                soda(`<span soda-repeat="(i, item) in list">{{i}}{{item.name}}</span>`, data),
                '<span>0a</span><span>1b</span>'
           );

           assert.equal(
                soda(`<span soda-repeat="(key, value) in trackObject">{{key}}{{value}}</span>`, data),
                '<span>a1</span><span>b2</span>'
           );

           assert.equal(
                soda(`<span soda-repeat="item in trackObject">{{$index}}{{item}}</span>`, data),
                '<span>a1</span><span>b2</span>'
           );

    });

    it('if', function(){
            assert.equal(
                soda(`<span soda-if="true">1</span><span soda-if="false">2</span>`, {}),
                '<span>1</span>'
           );

           assert.equal(
                soda(`<span soda-if="1">3</span><span soda-if="0">4</span>`, {}),
                '<span>3</span>'
           );
    });


    it('html', function(){
            var data = {
                html: '<div>a</div>'
            };

            assert.equal(
                soda(`<span soda-html="html">1</span>`, data),
                "<span>" + data.html + "</span>"
           );
    });

    
    it('style', function(){
            var data = {
              style: {
               width: 100,
               height: 100,
               opacity: 0.4
             } 
            };

            assert.equal(
                soda(`<span soda-style="style">1</span>`, data),
                `<span style="width:100px;height:100px;opacity:0.4">1</span>`
           );
    });

    it('replace', function(){
            var data = {
                html: '<div>a</div>'
            };

            assert.equal(
                soda(`<span soda-replace="html">1</span>`, data),
                data.html
           );
    });
    
    it('include', function(){
            var data = {
                name: "dorsy"
            };

           soda.discribe('list', `<h1>{{name}}</h1>`);

           assert.equal(
                soda(`<span soda-include="list">1</span>`, data),
                `<h1>dorsy</h1>`
           );

           // static 
           soda.discribe('list-static', `<h1>{{name}}</h1>`, { compile: false });

           assert.equal(
                soda(`<span soda-include="list-static">1</span>`, data),
                `<h1>{{name}}</h1>`
           );

           soda.discribe('list2', function(arg){
                return `<h1>{{name}}</h1>`;
           });

           
           assert.equal(
                soda(`<span soda-include="list2">1</span>`, data),
                `<h1>dorsy</h1>`
           );


           soda.discribe('list3', function(arg){
                return `<h1>{{name}}${arg}</h1>`;
           });

           assert.equal(
                soda(`<span soda-include="list3:subname{{'name' + 1}}">1</span>`, data),
                `<h1>dorsysubnamename1</h1>`
           );
    });
});

describe('filter', function() {
    it('no arguments', function(){
        soda.filter('add', function(input){
            return input + 2;
        });

        assert.equal(
            soda(`{{2|add}}`, {}),
            4
       );

       assert.equal(
            soda(`{{2 | add}}`, {}),
            4
       );
    });


    it('with arguments', function(){
        soda.filter('addnum', function(input, num){
            return input + num;
        });

        soda.filter('addargs', function(input, one, two){
            return input + one + two;
        });


       assert.equal(
            soda(`{{2|addnum:2}}`, {}),
            4
       );

       assert.equal(
            soda(`{{2 | addnum : 3}}`, {}),
            5
       );

       assert.equal(
            soda(`{{2 | addnum : '3'}}`, {}),
            '23'
       );

       assert.equal(
            soda(`{{2 | addargs : '3' : 'YYYY-MMMM-dd'}}`, {}),
            '23YYYY-MMMM-dd'
       );

       
       assert.equal(
            soda(`{{2 | addnum : 3 | addargs : '3' : 'YYYY-MMMM-dd'}}`, {}),
            '53YYYY-MMMM-dd'
       );
    });
});
