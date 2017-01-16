var request = require('request'),
    should = require('chai').should,
    expect = require('chai').expect;

describe('A basic test', function(){
  it('should pass when everything is ok', function(){
    expect(true).to.betrue;
  })
})


//Endpoint testing 
describe('return luke', function(){
  it('returns luke', function(done){
    request.get({ url: `http://swapi.co/api/people/1/`},
      function(error, response, body){
        if(error) console.log(error)
        let bodyObj = JSON.parse(body)
        expect(bodyObj.name).to.equal('Luke Skywalker');
        expect(bodyObj.hair_color).to.equal('blond');
        expect(response.statusCode).to.equal(200);
        done();
      })
  })
})