var soda = require('./../node');
console.log(soda);
var data = {
  a: 1,
   list: [
         {list: [{'title': '<>aa</h1>'}, {'title': 'bb'}], name: 0, show: 1},
         {list: [{'title': 0 }, {'title': 'bb'}], name: 'b'},
         {list: [{'title': 'aa'}, {'title': 'bb'}], name: 'b'},
         {list: [{'title': 'aa'}, {'title': 'bb'}], name: 'b'},
         {list: [{'title': 'aa'}, {'title': 'bb'}], name: 'b'},
         {list: [{'title': 'aa'}, {'title': 'bb'}], name: 'b'},
         {list: [{'title': 'aa'}, {'title': 'bb'}], name: 'c'}
   ],

     style: {
       width: 100,
        height: 100,
        opacity: 0.4
     },

     b: '<div><a href=pp>{{s|sdfsdf{{adfdsf}}</a></div>',
       mm: null,

       trackObject: {
         a: 1,
         b: '2'
       }
};
var str = soda(`
    <div p="">12</div>
`, data);

console.log(str);
