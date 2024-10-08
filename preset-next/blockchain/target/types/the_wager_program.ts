/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/the_wager_program.json`.
 */
export type TheWagerProgram = {
  "address": "YhH2w4tJgpyGvv7gADLtsqoRezNWhpb7zLzudWAr775",
  "metadata": {
    "name": "theWagerProgram",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "acceptJudging",
      "discriminator": [
        114,
        194,
        67,
        207,
        242,
        221,
        43,
        56
      ],
      "accounts": [
        {
          "name": "wager",
          "writable": true
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "acceptWager",
      "discriminator": [
        214,
        18,
        178,
        214,
        203,
        22,
        50,
        119
      ],
      "accounts": [
        {
          "name": "wager",
          "writable": true
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "cancelWager",
      "discriminator": [
        57,
        92,
        124,
        123,
        216,
        16,
        37,
        148
      ],
      "accounts": [
        {
          "name": "wager",
          "writable": true
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "createWager",
      "discriminator": [
        210,
        82,
        178,
        75,
        253,
        34,
        84,
        120
      ],
      "accounts": [
        {
          "name": "wager",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  119,
                  97,
                  103,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "arg",
                "path": "wagerId"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "wagerId",
          "type": "u64"
        },
        {
          "name": "opponent",
          "type": {
            "option": "pubkey"
          }
        },
        {
          "name": "judge",
          "type": "pubkey"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "expirationDate",
          "type": "i64"
        },
        {
          "name": "endDate",
          "type": "i64"
        },
        {
          "name": "oddsNumerator",
          "type": "u16"
        },
        {
          "name": "oddsDenominator",
          "type": "u16"
        }
      ]
    },
    {
      "name": "declareWinner",
      "discriminator": [
        140,
        135,
        197,
        50,
        9,
        23,
        4,
        80
      ],
      "accounts": [
        {
          "name": "wager",
          "writable": true
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "winner",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "winner",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "refundWager",
      "discriminator": [
        208,
        62,
        96,
        78,
        126,
        46,
        251,
        157
      ],
      "accounts": [
        {
          "name": "wager",
          "writable": true
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "wager",
      "discriminator": [
        3,
        110,
        53,
        190,
        113,
        31,
        230,
        40
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidCaller",
      "msg": "No access"
    },
    {
      "code": 6001,
      "name": "wagerNotReady",
      "msg": "Wager not ready"
    },
    {
      "code": 6002,
      "name": "wagerExpired",
      "msg": "Wager has expired"
    },
    {
      "code": 6003,
      "name": "wagerNotEnded",
      "msg": "Wager has not ended yet"
    },
    {
      "code": 6004,
      "name": "invalidExpirationDate",
      "msg": "Invalid expiration date"
    },
    {
      "code": 6005,
      "name": "invalidEndDate",
      "msg": "Invalid end date"
    },
    {
      "code": 6006,
      "name": "wagerAlreadyAccepted",
      "msg": "Wager has already been accepted"
    },
    {
      "code": 6007,
      "name": "wagerNotExpired",
      "msg": "Wager has not expired yet"
    },
    {
      "code": 6008,
      "name": "invalidOdds",
      "msg": "Invalid odds"
    },
    {
      "code": 6009,
      "name": "insufficientDeposit",
      "msg": "Insufficient deposit"
    },
    {
      "code": 6010,
      "name": "calculationError",
      "msg": "Calculation error"
    }
  ],
  "types": [
    {
      "name": "wager",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "wagerInitiator",
            "type": "pubkey"
          },
          {
            "name": "opponent",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "judge",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "expirationDate",
            "type": "i64"
          },
          {
            "name": "endDate",
            "type": "i64"
          },
          {
            "name": "opponentAccepted",
            "type": "bool"
          },
          {
            "name": "judgeAccepted",
            "type": "bool"
          },
          {
            "name": "winner",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "oddsNumerator",
            "type": "u16"
          },
          {
            "name": "oddsDenominator",
            "type": "u16"
          }
        ]
      }
    }
  ]
};
