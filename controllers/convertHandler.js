/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  const units = (key, idx) => {
    let obj = {
      gal: ['gal', 'l',   'gallons'], 
      l:   ['l',   'gal', 'liters'], 
      lbs: ['lbs', 'kg',  'pounds'],
      kg:  ['kg',  'lbs', 'kilograms'],
      mi:  ['mi',  'km',  'miles'],
      km:  ['km',  'mi',  'kilometers']
    };//0:initUnit, 1:returnUnit, 2:spellOut
    return obj[key][idx]
  };
  const calc  = (num, unit) => {
    let formulas = {
      gal: () => (num * 3.78541),
      l:   () => (num / 3.78541),
      lbs: () => (num * 0.453592),
      kg:  () => (num / 0.453592),
      mi:  () => (num * 1.60934),
      km:  () => (num / 1.60934)
    };
    return +formulas[unit]().toPrecision(5);
  };
  const parser = (str, item) => {
    let unitIndex = /[a-z]/i.exec(str).index,
        num = str.slice(0, unitIndex) ? str.slice(0, unitIndex) : 1,
        unit = str.slice(unitIndex).toLowerCase(),
        slash = str.match(/\//g) === null ? 0 : str.match(/\//g).length,
        divNum = num.length ? num.split('/') : null,
        valid_unit = /^gal$|^l$|^lbs$|^kg$|^mi$|^km$/i.test(unit),
        text = '';
    
    if (slash) {
      slash > 1 ? text = 'invalid number' : num = divNum[0] / divNum[1];
    }
    
    if (!valid_unit) {
      text = text ? 'invalid number and unit' : 'invalid unit';
    }
    
    return text ? text : (item === 'num' ? num : unit);
  };
  
  
  this.getNum = (input) => parser(input, 'num');
  this.getUnit = (input) => parser(input);
  this.getReturnUnit = (initUnit) => units(initUnit, 1);
  this.spellOutUnit = (unit) => units(unit, 2);
  this.convert = (initNum, initUnit) => calc(initNum, initUnit.toLowerCase());
  this.getString = (initNum, initUnit, returnNum, returnUnit) => `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
}

module.exports = ConvertHandler;