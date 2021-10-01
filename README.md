# pbByteAnalyzer
A project that demonstrates how to analyze byte arrays that describe messages encoded in the Protocol Buffers format

# Purpose

The purpose of this project is to provide a way to understand the details of Protocol Buffers encoding and decoding logic.

When you run the test as instructed below, you will get some out put that take the following JSON object...

```
{
  name: 'Big Bob Smith',
  age: 30,
  email: 'bigbob@example.com',
  country: 'US'
}
```

... and encodes it into a byte array according to the Protocol Buffers encoding logic.

The Protocol Buffers message format the describes the JSON object is

```protobuf
message User {
  string name = 1;
  int32 age = 2;
  string email = 3;
  string country = 33;
}
```

The test output below

# Installation

`npm install`

# Getting some analytic output

`npm test`

# Result

```
----JSON Object----
{
  name: 'Big Bob Smith',
  age: 30,
  email: 'bigbob@example.com',
  country: 'US'
}



----ProtoBuf encoding in hex----
<Buffer 0a 0d 42 69 67 20 42 6f 62 20 53 6d 69 74 68 10 1e 1a 12 62 69 67 62 6f 62 40 65 78 61 6d 70 6c 65 2e 63 6f 6d 8a 02 02 55 53>
----ProtoBuf encoding in binary----
000010100000110101000010011010010110011100100000010000100110111101100010001000000101001101101101011010010111010001101000000100000001111000011010000100100110001001101001011001110110001001101111011000100100000001100101011110000110000101101101011100000110110001100101001011100110001101101111011011011000101000000010000000100101010101010011


----ProtoBuf encoding in hex and binary----
00001010 | a
00001101 | d
01000010 | 42
01101001 | 69
01100111 | 67
00100000 | 20
01000010 | 42
01101111 | 6f
01100010 | 62
00100000 | 20
01010011 | 53
01101101 | 6d
01101001 | 69
01110100 | 74
01101000 | 68
00010000 | 10
00011110 | 1e
00011010 | 1a
00010010 | 12
01100010 | 62
01101001 | 69
01100111 | 67
01100010 | 62
01101111 | 6f
01100010 | 62
01000000 | 40
01100101 | 65
01111000 | 78
01100001 | 61
01101101 | 6d
01110000 | 70
01101100 | 6c
01100101 | 65
00101110 | 2e
01100011 | 63
01101111 | 6f
01101101 | 6d
10001010 | 8a
00000010 | 2
00000010 | 2
01010101 | 55
01010011 | 53
```



