const protobuf = require("@apollo/protobufjs");
const baseConvert = require('baseconvert');

const bufferToHex =  (buffer) => {
    return [...new Uint8Array (buffer)]
        .map (b => b.toString (16).padStart (2, "0"))
        .join (" ");
}
/**
 * The purpose of this method is to return an simple, non-random user. Static, never changes.
 * @returns {{country: string, lastName: string, firstName: string, age: number, email: string}}
 */
const getSimpleUserSync = ()=> {

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


/**
 *
 * @param {object} messageJSON The message to encode in JSON format
 * @param {string} protoPath The exact path to the location of the .proto file that
 * contains the Protocol Buffers definition of the various messages
 * @param {string} protoMessage The message definition in the .proto file the defines the
 * message passed in messageJSON. The format of the value is
 * packageName.message, for example, userpackage.User.
 * @return {buffer} a byte buffer the represented the messageJSON encoded in
 * Protocol Buffers format
 */
const getEncodedBytes =  async (messageJSON, protoPath, protoMessage) => {
    const root = await protobuf.load(protoPath);
    const obj = root.lookupType(protoMessage);
    const errMsg = obj.verify(messageJSON);
    if (errMsg) throw Error(errMsg);
    const message = obj.create(messageJSON);
    const encode = obj.encode(message).finish();
    const decode = obj.decode(encode)
    return encode
}

/**
 *
 * @param {object} messageJSON The message to encode in JSON format
 * @param {string} protoPath The exact path to the location of the .proto file that
 * contains the Protocol Buffers definition of the various messages
 * @param {string} protoMessage The message definition in the .proto file the defines the
 * message passed in messageJSON. The format of the value is
 * packageName.message, for example, userpackage.User.
 * @return {string} the Protocol Buffers encoded message, as defined by the parameter
 messageJSON as a string that represents the encoding in binary format.
 */
const getEncodedBits = async (messageJSON, messageProtoPath, protoMessage) => {
    const buf = await getEncodedBytes(messageJSON,messageProtoPath,protoMessage);
    return BigInt('0x' + buf.toString('hex')).toString(2).padStart(buf.length * 8, '0')
}

/**
 *
 * @param {object} messageJSON The message to encode in JSON format
 * @param {string} protoPath The exact path to the location of the .proto file that
 * contains the Protocol Buffers definition of the various messages
 * @param {string} protoMessage The message definition in the .proto file the defines the
 * message passed in messageJSON. The format of the value is
 * packageName.message, for example, userpackage.User.
 * @param displayOptions {object} Set option.showMessageJSON to TRUE to display the original JSON message.
 * Set option.showBytes so display the fully encoded Array Buffer along with the
 * bits and bytes analysis output. Default is FALSE, Set option.asJSON to TRUE to have the output returned
 * as a JSON object.
 * @return {string|Object} Each line in the string returned describes the binary representation of each
 * byte in the encoded message, along with the actual hex value, delimited by at | character. If option.asJSON is
 * TRUE, the return is a JSON object that describes the analysis
 */
const getEncodedBitsBytesAnalysis = async (messageJSON, messageProto,protoMessage, displayOptions) => {
    let bytes = null;
    let json = null;
    let str = '';
    const obj = {};
    obj.values =[];

    if(displayOptions && displayOptions.showBytes){
        bytes = await getEncodedBytes(messageJSON, messageProto,protoMessage)
        if(displayOptions.asJSON){
            obj.bytes = bufferToHex(bytes);
        }
    };

    if(displayOptions && displayOptions.showMessageJSON){
        json = messageJSON
        if(displayOptions.asJSON){
            obj.message = messageJSON;
        }
    };

    const bits = await getEncodedBits(messageJSON, messageProto,protoMessage);
    if(displayOptions && displayOptions.asJSON){
        obj.bits = bits;
    }
    
    
    const arr = bits.match(/.{1,8}/g);

    if(json){
        str = JSON.stringify(json, 2);
        str = str + '\n';
    }

    if(bytes){
        str = str + bufferToHex(bytes);
        str = str + '\n';
    }

    let binHexes = [];
    arr.forEach(n => {
        const hx = baseConvert.bin2hex(n);
        // ... displaying the binary group and the hex equivalent
        str = str + `${n} | ${hx}\n`;
        if(displayOptions && displayOptions.asJSON){
            obj.values.push({binary:n, hex:hx});
        }

    });

    if(displayOptions && displayOptions.asJSON) return obj;

    return str
}

module.exports = {getEncodedBytes, getEncodedBits,getEncodedBitsBytesAnalysis,getSimpleUserSync};