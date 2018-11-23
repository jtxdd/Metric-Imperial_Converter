/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler(),
    inputs = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'],
    input =  ['gal','l','mi','km','lbs','kg'],
    expect = ['l','gal','km','mi','kg','lbs'],
    names = {gal: 'gallons', l: 'liters', mi: 'miles', km: 'kilometers', lbs: 'pounds', kg: 'kilograms'},
    val = 5,
    gal_l = 3.78541,
    mi_km = 1.60934,
    lbs_kg = 0.453592;
    

suite('Unit Tests', () => {
  //1-6
  suite('Function convertHandler.getNum(input)', () => {
    test('Whole number input', () => assert.equal(convertHandler.getNum('32L'), 32));
    test('Decimal Input', () => assert.equal(convertHandler.getNum('2.5L'), 2.5));
    test('Fractional Input', () => assert.equal(convertHandler.getNum('2/5L'), (2/5)));
    test('Fractional Input w/ Decimal', () => assert.equal(convertHandler.getNum('2.4/5L'), (2.4/5)));
    test('Invalid Input (double fraction)', () => assert.equal(convertHandler.getNum('2/5/5L'), 'invalid number'));
    test('No Numerical Input', () => assert.equal(convertHandler.getNum('L'), 1));
  });
  //7-8
  suite('Function convertHandler.getUnit(input)', () => {
    test('For Each Valid Unit Inputs', () => inputs.forEach(ele => assert.equal(ele, /^gal$|^l$|^lbs$|^kg$|^mi$|^km$/i.exec(ele))));
    test('Unknown Unit Input', () => assert.equal(convertHandler.getUnit('kh'), 'invalid unit'));  
  });
  //9
  suite('Function convertHandler.getReturnUnit(initUnit)', () => {
    test('For Each Valid Unit Inputs', () => input.forEach((ele, i) => assert.equal(convertHandler.getReturnUnit(ele), expect[i])));
  });  
  //10
  suite('Function convertHandler.spellOutUnit(unit)', () => {
    test('For Each Valid Unit Inputs', () => input.forEach(el => assert.equal(convertHandler.spellOutUnit(el), names[el])));
  });
  //11-16
  suite('Function convertHandler.convert(num, unit)', () => {
    test('Gal to L',  () => assert.approximately(convertHandler.convert(val, 'gal'), (val * gal_l), 0.1));
    test('L to Gal',  () => assert.approximately(convertHandler.convert(val, 'l'),   (val / gal_l), 0.1));
    test('Mi to Km',  () => assert.approximately(convertHandler.convert(val, 'mi'),  (val * mi_km), 0.1));
    test('Km to Mi',  () => assert.approximately(convertHandler.convert(val, 'km'),  (val / mi_km), 0.1));
    test('Lbs to Kg', () => assert.approximately(convertHandler.convert(val, 'lbs'), (val * lbs_kg), 0.1));
    test('Kg to Lbs', () => assert.approximately(convertHandler.convert(val, 'kg'),  (val / lbs_kg), 0.1));    
  });
});