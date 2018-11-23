/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get((req, res) => {
      let input = req.query.input,
          initNum = convertHandler.getNum(input),
          invalid = /invalid/.test(initNum);
    
      if (invalid) {
        return res.send(initNum)
      }
    
      let initUnit = convertHandler.getUnit(input),
          returnNum = convertHandler.convert(initNum, initUnit),
          returnUnit = convertHandler.getReturnUnit(initUnit),
          toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);      
      
      return res.json({initNum: +initNum, initUnit, returnNum, returnUnit, string: toString});
    });
};