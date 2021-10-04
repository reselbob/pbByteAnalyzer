const path = require('path');
const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;

const helper = require("../helpers/analysisHelper");

const protoPath = path.join(process.cwd(), '/protos/animal.proto');
const protoMessage = 'animalpackage.Animal';

const dog = {
    id: 501,
    species: 'Dog',
    breed: 'Terrier',
    legs: 4
}

const bird = {
    id: 502,
    species: 'Bird',
    breed: 'Robin',
    legs: 2
}

describe('Animal Tests', () => {
    it('Can encode dog test', async () => {
        const displayOptions = {showMessageJSON: true, showBytes: true, asJSON:true}
        const analysis = await helper.getEncodedBitsBytesAnalysis(dog, protoPath, protoMessage,displayOptions);
        expect(analysis).to.be.an('object');
        console.log(analysis)
    })

    it('Can encode bird test', async () => {
        const displayOptions = {showMessageJSON: true, showBytes: true, asJSON:true}
        const analysis = await helper.getEncodedBitsBytesAnalysis(bird, protoPath, protoMessage,displayOptions);
        expect(analysis).to.be.an('object');
        console.log(analysis)

    })

})