# pbByteAnalyzer
A project that demonstrates how to analyze byte arrays that describe messages encoded in the Protocol Buffers format

![UNDER CONSTRUCTION](https://toppng.com/uploads/thumbnail/under-construction-sign-11532978241z3ajcgelg4.png)

# Purpose

The purpose of this project is to provide a way to understand the details of Protocol Buffers encoding and decoding logic.

When you run the test as instructed below, you will get some out put that take the following JSON object...

```
{
  firstName: 'Bob',
  lastName: 'Smith',
  age: 30,
  followers: 500,
  email: 'bob.smith@example.com',
  country: 'US'
}
```

... and encodes it into a byte array according to the Protocol Buffers encoding logic.

The Protocol Buffers message format the describes the JSON object is

```protobuf
package userpackage;
syntax = "proto3";

message User {
  string firstName = 1;
  string lastName = 2;
  int32 age = 3;
  int32 followers = 4;
  string email = 5;
  string country = 33;
}
```

The test output below shows some encoding and analysis behavior.

# Installation

`npm install`

# Getting some analytic output

`npm test`

# Result

```
----JSON Object----
{
  firstName: 'Bob',
  lastName: 'Smith',
  age: 30,
  followers: 500,
  email: 'bob.smith@example.com',
  country: 'US'
}


----ProtoBuf encoding in hex----
<Buffer 18 1e 20 f4 03 2a 15 62 6f 62 2e 73 6d 69 74 68 40 65 78 61 6d 70 6c 65 2e 63 6f 6d 8a 02 02 55 53>


----ProtoBuf encoding in binary----
000110000001111000100000111101000000001100101010000101010110001001101111011000100010111001110011011011010110100101110100011010000100000001100101011110000110000101101101011100000110110001100101001011100110001101101111011011011000101000000010000000100101010101010011

----ProtoBuf encoding in hex and binary----
00011000 | 18
00011110 | 1e
00100000 | 20
11110100 | f4
00000011 | 3
00101010 | 2a
00010101 | 15
01100010 | 62
01101111 | 6f
01100010 | 62
00101110 | 2e
01110011 | 73
01101101 | 6d
01101001 | 69
01110100 | 74
01101000 | 68
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



