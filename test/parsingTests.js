'use strict';
const fs = require('fs');
const path = require('path');
const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const baseConvert = require('baseconvert');

const protobuf = require("protobufjs");

const helper = require('../helpers/analysisHelper');

describe('Parsing Tests', () => {

    it('ProtoBuf encoding test', async () => {
        const user = helper.getSimpleUserSync();
        console.log(`----JSON Object----`);
        console.log(user);
        console.log('\n')

        //serialize the message, user
        const dirPath = path.join(process.cwd(), '/protos/user.proto');
        const root = await protobuf.load(dirPath);
        const User = root.lookupType('userpackage.User');
        //dump the serialization to a byte array
        const buf = User.encode(user).finish();
        console.log(`----ProtoBuf encoding in hex----`);
        console.log(buf);
        console.log(`\n`);
        // Convert the byte array to binary output, a bunch of zeros and ones
        const paddedBin = BigInt('0x' + buf.toString('hex')).toString(2).padStart(buf.length * 8, '0')

        //  get a string of the binary output that we'll use for parsing purposes
        const str = paddedBin.toString();
        console.log(`----ProtoBuf encoding in binary----`);
        console.log(`${str}\n`);

        // Create output that separates the binary string into
        // 8 character groups ...
        const arr = str.match(/.{1,8}/g);
        // calculating the each binary group into its hex equivalent ...
        console.log(`----ProtoBuf encoding in hex and binary----`);
        arr.forEach(n => {
            const hx = baseConvert.bin2hex(n);
            // ... displaying the binary group and the hex equivalent
            console.log(`${n} | ${hx}`);
        });
    })
});