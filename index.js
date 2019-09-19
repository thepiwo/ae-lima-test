const Universal = require("@aeternity/aepp-sdk").Universal;

const main = async () => {
    const client = await Universal({
        url: "http://localhost:3013",
        internalUrl: "http://localhost:3113",
        networkId: "ae_next",
        keypair: {
            publicKey: "ak_2VnwoJPQgrXvreUx2L9BVvd9BidWwpu1ASKK1AMre21soEgpRT",
            secretKey: ""
        }
    });

    console.log(client);
};

main();
