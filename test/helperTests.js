const path = require('path');
const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const faker = require('faker');


const helper = require('../helpers/analysisHelper');

const getRandomUser = ()=> {

    const first_name = faker.name.firstName();
    const last_name = faker.name.lastName();
    const age = faker.datatype.number({'min': 10, 'max': 50});
    const email = `${first_name}.${last_name}@${faker.internet.domainName()}`;
    const country = faker.address.countryCode();
    return {
        first_name,
        last_name,
        age,
        email,
        country
    };
}

const messageJSON = getRandomUser();
const protoPath = path.join(process.cwd(), '/protos/user.proto');
const protoMessage = 'userpackage.User';

describe('Helper Tests', () => {
    it('Can get bytes using helper test', async () => {
        const buf = await helper.getEncodedBytes(messageJSON,protoPath,protoMessage)
        expect(buf).to.be.instanceof(Buffer)
    })

    it('Can get bits using helper test', async () => {
        const bits = await helper.getEncodedBits(messageJSON,protoPath,protoMessage)
        expect(bits).to.be.a('string');
    })

    it('Can get bits byes analysis test', async () => {
        const displayOptions = {showMessageJSON: true, showBytes: true}
        const analysis = await helper.getEncodedBitsBytesAnalysis(messageJSON,protoPath,protoMessage, displayOptions)
        expect(analysis).to.be.a('string');
        console.log(analysis);
    })


});