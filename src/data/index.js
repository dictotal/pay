export const initData = {
    bankCardList: [],
    currency: "MMK",
    currencyUnit: "ks",
    device: { devicePlatform: "IOS", deviceType: "MOBILE", mobile: true, normal: false, tablet: false },
    lang: "zh",
    paymentId: "zz_b",
    paymentMethodList: [
        {
            keyName: "\u8F6C\u8D26\u652F\u4ED8",
            bankCardList: [
                { bankName: "AYA mBanking", iconUrl: "https://img.yym203.com/link/tt/bank_icon/aya.png", id: "9e2d592545001b25fcdb06296c6fa922", maxAmount: 1000000.0, minAmount: 10000.0 },
                { bankName: "KBZ mBanking", iconUrl: "https://img.yym203.com/link/tt/bank_icon/kbz.png", id: "414340e80b3863d85eedab83c0923ece", maxAmount: 1000000.0, minAmount: 10000.0 },
                { bankName: "KBZ Pay", iconUrl: "https://img.yym203.com/link/tt/bank_icon/kbz_pay.png", id: "8b6234c743458f6dc0b49b10db27f988", maxAmount: 1000000.0, minAmount: 10000.0 },
                { bankName: "Wave Pay", iconUrl: "https://img.yym203.com/link/tt/bank_icon/wave.png", id: "2cd65dbcbd81fd056b8d2d12fd65f669", maxAmount: 1000000.0, minAmount: 10000.0 }
            ],
            maxAmount: 1000000,
            minAmount: 10000,
            paymentIconUrl: "",
            paymentId: "zz_b",
            paymentKey: "zz_b",
            paymentType: "transpay",
            rechargeFees: 0.0,
            icon: 'https://images.weserv.nl/?url=https://article.biliimg.com/bfs/article/709207f8db5c26f801439fd8110ca0c8272abdab.png'
        },
        {
            keyName: "QR",
            paymentType: "third",
            paymentMethodList: [
                { keyName: "THAI QR", maxAmount: 100000, minAmount: 300, paymentIconUrl: "", paymentId: "zz_d", paymentKey: "zz_d", paymentType: "third", rechargeFees: 0.0 },
                { keyName: "THAI QR New", maxAmount: 100000, minAmount: 300, paymentIconUrl: "", paymentId: "zz_s", paymentKey: "zz_s", paymentType: "third", rechargeFees: 0.0 },
                { keyName: "THAI QR 4", maxAmount: 100000, minAmount: 300, paymentIconUrl: "", paymentId: "zz_4", paymentKey: "zz_4", paymentType: "third", rechargeFees: 0.0 }
            ],
            icon: 'https://images.weserv.nl/?url=https://article.biliimg.com/bfs/article/4aa72be3b0633f03d5c5a9ed137929355ccfe958.png'
        },
        {
            keyName: 'onlinBank',
            icon: 'https://images.weserv.nl/?url=https://article.biliimg.com/bfs/article/e07d2b564ac3219d7d7c35a8484166e0250eea41.png'
        }
    ],
    publicKey: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3dKWSUu/GWT8gxN4sZmib9CMkL6q5qZz90IK/n/hediQal9jEeuhjCKefHUn0UUGRC/I2Z/oCLreXemV0I1jwvs8mLiWTo8W2yI+MMvhkgeQL15KYxRSRUUjjwA+EyWDzOTndykAyus9x/tC+1fXXGi8kGrpw04N/MvVyMFwB+wIDAQAB",
    sign: "EB5Igf5e0uMxasTls3JTyNSg8FwMzw0/+GnBkeRCzapV2pn10rxhirE9egGdyfchY0Di9CRKwXfEuh1qN2juLfL2wWgDSIwpbOCng6r956s+Mujngu6FmuVdfL84g/hmfjcGrG1a61PbHcyo7/z7CZVY/dhLAsp3A4dvtOfzeBQI5Rnnt/x8v5C/3FETnTbDH5ilCK1Y8WD0ZDt7BHQDZW99uATMbAYFWkafJVANvBISSL95LFjal3wFs/Q0Fsn0BFdA7YTH0QwZQTa5MWj2sTnJ0p6b5PaLVEKKpt4Y8yMOwHPYCdn5bdmLYJCpR8N3p/nhCrGbRiadbA/jrvjO6Q==",
    uid: 142376
}

export const qrcodeData = {
    "currency": "THB",
    "currencyUnit": "\u0E3F",
    "device": {
        "devicePlatform": "IOS",
        "deviceType": "MOBILE",
        "mobile": true,
        "normal": false,
        "tablet": false
    },
    "lang": "zh",
    "paymentId": "zz_d",
    "qrCodeInfo": {
        "amount": 5000.00,
        "orderNo": "2204566362423516004352",
        "status": "pay$waiting",
        "thirdOrderNo": "2204110000003530474143540978",
        "thirdUrl": "https://cdn.ezpoperation5.com/pay2/?key=isNewOrder~1|saleId~182LP64FB|price~4999.99|ttl~300|mode~2|url_ali~00020101021153037645802TH29370016A0000006770101110113006681017332754074999.9963040154|ali_user~0|bank_user~0|status~1|createTime~2022-04-11 14:35:41",
        "ttlSeconds": 1186
    },
    "sign": "TPdyoqRFTX2UpygLtE5QEk/w8G2+rwu39PXw9u7DE1O0m98Kq0WIlyyi8kG0e6dhN5LPL86kMJygxwe0GNdKSQYxAMVBvti3yywIQntr0UiEvw1bVOut6p5j0MvaTvthqyFh09EIduLLUj3bZEiA1ZBazFIvSYma6RrZlDLgaWYT/OhElyJhJtTBrLDD6FdKDE2riJiGN3h8XGDL2K7WNGfOWlF5ia+U4/uxBWzhN7GIvkahfAmfBXCmi6ueemxQoAW2NCW5EJ8eJOmZ2g7Dhn046gICNHlYXkF0z7rZJgy1cZA4qtl2WFqtVkNpmPI6Tqjg1j5JgntKJ1CTM/PhtQ==",
    "identityName": "Neil123"
}

export const transferData = {
    "createTime": 1649648033849,
    "currency": "THB",
    "currencyUnit": "\u0E3F",
    "device": {"devicePlatform": "IOS", "deviceType": "MOBILE", "mobile": true, "normal": false, "tablet": false},
    "lang": "zh",
    "orderNo": "2204566301577163522048",
    "paymentAmount": 5000.00,
    "paymentId": "zz_b",
    "paymentKey": "zz_b",
    "paymentType": "transpay",
    "rechargeFees": 0,
    "sign": "TPdyoqRFTX2UpygLtE5QEk/w8G2+rwu39PXw9u7DE1O0m98Kq0WIlyyi8kG0e6dhN5LPL86kMJygxwe0GNdKSQYxAMVBvti3yywIQntr0UiEvw1bVOut6p5j0MvaTvthqyFh09EIduLLUj3bZEiA1ZBazFIvSYma6RrZlDLgaWYOzFU7pRswSGl6X7IRDIOYFAYmfnQXCToTsc6Khj4OOyU2fLEsIAZyzuZr53pCIHDEzURcys2uv6CGvd3TX3MBz/hd1A7nWViP7rxHhAk2DJaGb5VISDAVeqw6zjwvSsyQSUtwl8TekqkJkz+ZzIANyhBjX8W0wsRfo4LrWlbUGA==",
    "transferInfo": {
        "amount": 5011,
        "bankCard": "0983650422",
        "bankName": "kasikorn bank",
        "bankType": "kbank",
        "baseAmount": 5000.00,
        "cardNumberType": "bank",
        "cardholder": "sai kham le",
        "currency": "THB",
        "iconUrl": "https://img.yym203.com/link/tt/bank_icon/kbank.png",
        "subbranchName": "robinson bangrak",
        "ttlSeconds": 1800
    },
    "uid": 31272,
    "identityName": "Neil123"
}
