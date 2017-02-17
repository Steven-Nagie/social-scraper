var request = require('request'),
    chai = require('chai'),
    should = require('chai').should(),
    expect = require('chai').expect,
    ig = require('../processes/igApi'),
    testData = require('./data');

// use .skip() and .only() to specify which tests you want to work with so you dont run the other test suits

describe('INSTAGRAM TESTING', function(){
    describe('ig.validateData', function(){

      it('should return correct shortcode', function(){
        expect(ig.validateData(570293847502)).to.be.false
      })
      it('should return correct shortcode', function(){
        expect(ig.validateData('https://www.instagram.com/p/BNZ1e5_gqcA/')).to.be.true
      })

    })//End of Data Validation
    describe('ig.parseData', function(){

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

      it('should return correct shortcode', function(){
        let response = ig.parseData('https://instagram.com/p/BMHuwfDgbqc/')
        expect(response.shortcode).to.eql('BMHuwfDgbqc')
      })

      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BNhux3Ngj7O/?taken-by=jimmy_chin')
        expect(response.shortcode).to.eql('BNhux3Ngj7O')
      })

      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BNXVDlXBfnj/?taken-by=shawnjohnson')
        expect(response.shortcode).to.eql('BNXVDlXBfnj')
      })

      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BNIXk4PAG7Q/?taken-by=jamieanderson')
        expect(response.shortcode).to.eql('BNIXk4PAG7Q')
      })

      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BNkVft2h-X1/?taken-by=travelindan')
        expect(response.shortcode).to.eql('BNkVft2h-X1')
      })

      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BNh4y2aFAOB/?taken-by=goprobombsquad')
        expect(response.shortcode).to.eql('BNh4y2aFAOB')
      })

      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BNUTi3Vghki/?taken-by=jebcorliss')
        expect(response.shortcode).to.eql('BNUTi3Vghki')
      })

      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BNnN02lA7JM/?taken-by=sammycarlson1')
        expect(response.shortcode).to.eql('BNnN02lA7JM')
      })

      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BNjEF8DA_-M/?taken-by=aimee_fuller')
        expect(response.shortcode).to.eql('BNjEF8DA_-M')
      })

      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BNSPh4aFRdx/?taken-by=mancinoroberta')
        expect(response.shortcode).to.eql('BNSPh4aFRdx')
      })

      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BNTJVhpAduY/?taken-by=tatummonod')
        expect(response.shortcode).to.eql('BNTJVhpAduY')
      })

      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BNKpL1Dj_mL/?taken-by=highsteph&hl=en')
        expect(response.shortcode).to.eql('BNKpL1Dj_mL')
      })

      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BNXUdwZhQ7a/?taken-by=kaitlynfarr')
        expect(response.shortcode).to.eql('BNXUdwZhQ7a')
      })

      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BNaR1DDhvGP/?taken-by=eric_willett')
        expect(response.shortcode).to.eql('BNaR1DDhvGP')
      })

      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BNKXPB8BItG/?taken-by=willwesson')
        expect(response.shortcode).to.eql('BNKXPB8BItG')
      })

      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BNmre3yhkfW/?taken-by=marshall__miller')
        expect(response.shortcode).to.eql('BNmre3yhkfW')
      })

      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BNhihfFDiwl/?taken-by=bmikesell23&hl=en')
        expect(response.shortcode).to.eql('BNhihfFDiwl')
      })

      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BMKHyuxANPp/?taken-by=cloecouture&hl=en')
        expect(response.shortcode).to.eql('BMKHyuxANPp')
      })

      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BNGI1j5gJMN/?taken-by=cullenburgeryt')
        expect(response.shortcode).to.eql('BNGI1j5gJMN')
      })

      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BNZ1e5_gqcA/')
        expect(response.shortcode).to.eql('BNZ1e5_gqcA')
      })

      it('should return correct shortcode', function(){
        let response = ig.parseData('https://www.instagram.com/p/BL-FTywBlfv/?taken-by=thelasercorn')
        expect(response.shortcode).to.eql('BL-FTywBlfv')
      })

    })
    //End of Parsing Data

    describe('ig.getPost', function(){

      it('Should take full url', function(){
        return ig.getPost('BNV2cHyhaaI').then(response => {
          expect(response).to.have.all.keys('status', 'type', 'givenInput', 'data')
        })
      })

      it('Should take full url', function(){
        return ig.getPost('BMzzt1ABr8U').then(response => {
          expect(response).to.have.all.keys('status', 'type', 'givenInput', 'data')
        })
      })

      it('Should take full url', function(){
        return ig.getPost('BMh6EFXhdkP').then(response => {
          expect(response).to.have.all.keys('status', 'type', 'givenInput', 'data')
        })
      })

      it('Should take full url', function(){
        return ig.getPost('BMMbXTNBsn7').then(response => {
          expect(response).to.have.all.keys('status', 'type', 'givenInput', 'data')
        })
      })

      it('Should take full url', function(){
        return ig.getPost('BMIghBeBqMK').then(response => {
          expect(response).to.have.all.keys('status', 'type', 'givenInput', 'data')
        })
      })

      it('Should take full url', function(){
        return ig.getPost('BL7W8xvB7RT').then(response => {
          expect(response).to.have.all.keys('status', 'type', 'givenInput', 'data')
        })
      })

      it('Should take full url', function(){
        return ig.getPost('BLnPICiBhLR').then(response => {
          expect(response).to.have.all.keys('status', 'type', 'givenInput', 'data')
        })
      })

    })//End of Instagram Profiles

})//End of Instagram testing
