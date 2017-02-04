var request = require('request'),
    chai = require('chai'),
    should = require('chai').should(),
    expect = require('chai').expect,
    ig = require('../processes/igApi'),
    testData = require('./data');
  
// use .skip() and .only() to specify which tests you want to work with so you dont run the other test suits


describe.only('TESTING INSTAGRAM', function(){
    describe('Data Validation', function(){

      it('should return correct shortcode', function(){
        expect(ig.validateData(570293847502)).to.be.false
      })

    })//End of Data Validation
    describe('Parsing Data', function(){
      
      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BNV2cHyhaaI/?taken-by=jon.myrick')
        expect(response.shortcode).to.eql('BNV2cHyhaaI')
      })
      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BMzzt1ABr8U/?taken-by=jon.myrick')
        expect(response.shortcode).to.eql('BMzzt1ABr8U')
      })
      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BMh6EFXhdkP/?taken-by=jon.myrick')
        expect(response.shortcode).to.eql('BMh6EFXhdkP')
      })
      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BMMbXTNBsn7/?taken-by=jon.myrick')
        expect(response.shortcode).to.eql('BMMbXTNBsn7')
      })
      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BMIghBeBqMK/?taken-by=jon.myrick')
        expect(response.shortcode).to.eql('BMIghBeBqMK')
      })
      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BL7W8xvB7RT/?taken-by=jon.myrick')
        expect(response.shortcode).to.eql('BL7W8xvB7RT')
      })
      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BLnPICiBhLR/?taken-by=jon.myrick')
        expect(response.shortcode).to.eql('BLnPICiBhLR')
      })
      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BKsEJoAhhp0/?taken-by=jon.myrick')
        expect(response.shortcode).to.eql('BKsEJoAhhp0')
      })
      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BKjGwVhBmg4/?taken-by=jon.myrick')
        expect(response.shortcode).to.eql('BKjGwVhBmg4')
      })
      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BKfUCxdh25r/?taken-by=jon.myrick')
        expect(response.shortcode).to.eql('BKfUCxdh25r')
      })
      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BKNIWjCBVcf/?taken-by=jon.myrick')
        expect(response.shortcode).to.eql('BKNIWjCBVcf')
      })
      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BJWn9T5hYuK/?taken-by=jon.myrick')
        expect(response.shortcode).to.eql('BJWn9T5hYuK')
      })
      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BIu6mscht43/?taken-by=jon.myrick')
        expect(response.shortcode).to.eql('BIu6mscht43')
      })
      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BIrP5LWhP3t/?taken-by=jon.myrick')
        expect(response.shortcode).to.eqlBIrP5LWhP3t
      })
      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BIrPloQhH8o/?taken-by=jon.myrick')
        expect(response.shortcode).to.eql('BIrPloQhH8o')
      })
      

      
      
      


    })//End of Parsing Data
    describe('Instagram Profiles', function(){
    
    })//End of Instagram Profiles

})//End of Instagram testing 












