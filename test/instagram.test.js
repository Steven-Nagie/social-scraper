var request = require('request'),
    chai = require('chai'),
    should = require('chai').should(),
    expect = require('chai').expect,
    ig = require('../processes/igApi'),
    testData = require('./data');
  
// use .skip() and .only() to specify which tests you want to work with so you dont run the other test suits


describe.only('TESTING INSTAGRAM', function(){
    describe('Data Validation', function(){

      it('Should not validate if data is not a string', function(){
        expect(ig.validateData(570293847502)).to.be.false
      })

    })//End of Data Validation
    describe('Parsing Data', function(){
    
    })//End of Parsing Data
    describe('Instagram Profiles', function(){
    
    })//End of Instagram Profiles

})//End of Instagram testing 











