const path = require('path');
const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const faker = require('faker');


const helper = require('../helpers/analysisHelper');

const getOtherUserSync = ()=> {

    const firstName = 'Bob';
    const lastName = 'Smith';
    const age = 30;
    const followers = 500;
    const email = 'bob.smith@example.com';
    const country = 'US';
    const usr = {
        firstName,
        lastName,
        age,
        followers,
        email,
        country
    }
    return usr;
}

const getRandomUser = () => {

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const age = faker.datatype.number({'min': 10, 'max': 50});
    const followers = faker.datatype.number({'min': 500, 'max': 2000});
    const email = `${firstName}.${lastName}@${faker.internet.domainName()}`;
    const country = faker.address.countryCode();
    return {
        firstName,
        lastName,
        age,
        followers,
        email,
        country
    };
}

const messageJSON = getRandomUser();
const protoPath = path.join(process.cwd(), '/protos/user.proto');
const protoOtherPath = path.join(process.cwd(), '/protos/otheruser.proto');
const protoMessage = 'userpackage.User';
const protoOtherMessage = 'otheruserpackage.OtherUser';

describe('User Tests', () => {
    it('Can get bytes using helper test', async () => {
        const buf = await helper.getEncodedBytes(messageJSON, protoPath, protoMessage)
        expect(buf).to.be.instanceof(Buffer)
    })

    it('Can get bits using helper test', async () => {
        const bits = await helper.getEncodedBits(messageJSON, protoPath, protoMessage)
        expect(bits).to.be.a('string');
    })

    it('Can get bits bytes analysis test', async () => {
        const displayOptions = {showMessageJSON: true, showBytes: true}
        const analysis = await helper.getEncodedBitsBytesAnalysis(messageJSON, protoPath, protoMessage, displayOptions)
        expect(analysis).to.be.a('string');
        console.log(analysis);
    })

    it('Can get bits bytes analysis as object test', async () => {
        const displayOptions = {showMessageJSON: true, showBytes: true, asJSON: true}
        const user = helper.getSimpleUserSync();
        const analysis = await helper.getEncodedBitsBytesAnalysis(user, protoPath, protoMessage, displayOptions)
        expect(analysis).to.be.an('object');
        console.log(analysis);
    })


    it('Can get simple user  output', async () => {
        const displayOptions = {showMessageJSON: true, showBytes: true}
        const user = helper.getSimpleUserSync();
        const analysis = await helper.getEncodedBitsBytesAnalysis(user, protoPath, protoMessage, displayOptions)
        expect(analysis).to.be.a('string');
        console.log(analysis);
    })

    it('Can get other user  output', async () => {
        const displayOptions = {showMessageJSON: true, showBytes: true}
        const user = getOtherUserSync();
        const analysis = await helper.getEncodedBitsBytesAnalysis(user, protoOtherPath, protoOtherMessage, displayOptions)
        expect(analysis).to.be.a('string');
        console.log(analysis);
    })


});
