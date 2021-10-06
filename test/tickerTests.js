const path = require('path');
const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;

const helper = require("../helpers/analysisHelper");

const protoPath = path.join(process.cwd(), '/protos/ticker.proto');
const protoMessage = 'tickerpackage.Ticker';


const google = {
    symbol: 'GOOG',
    price: 2642.97,
    timestamp: new Date(Date.now()).getTime()
}


describe('Ticker Tests', () => {
    it('Can encode ticker test', async () => {
        const displayOptions = {showMessageJSON: true, showBytes: true, asJSON: true}
        const analysis = await helper.getEncodedBitsBytesAnalysis(google, protoPath, protoMessage,displayOptions);
        expect(analysis).to.be.a('object');
        console.log(analysis)
    })
})