var soda = require('./../dist/soda');

if(typeof document === 'undefined'){
    var NodeWindow = require('nodewindow');
    var nodeWindow = new NodeWindow();

    var win = nodeWindow.runHTML("", {}, {});

    var document = win.document;

    soda.setDocument(document);
}

module.exports = soda;
