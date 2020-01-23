const {Universal, Node, MemoryAccount} = require("@aeternity/aepp-sdk");

const main = async () => {
    const client = await Universal({
        nodes: [{
            name: 'testnet',
            instance: await Node({
                url: "https://sdk-testnet.aepps.com",
                internalUrl: "https://sdk-testnet.aepps.com"
            })
        }],
        compilerUrl: "https://compiler.aepps.com",
        accounts: [MemoryAccount({
            keypair: {
                publicKey: "ak_2VnwoJPQgrXvreUx2L9BVvd9BidWwpu1ASKK1AMre21soEgpRT",
                secretKey: ""
            }
        })]
    });

    const contractSouce = `
@compiler >= 4

contract Example =
  type state = int
  entrypoint init() = 0
  stateful entrypoint set(x : int) = put(x)
  entrypoint get() = state`;

    const contract = await client.getContractInstance(contractSouce);
    await contract.deploy();

    const nonce = (await client.getAccount("ak_2VnwoJPQgrXvreUx2L9BVvd9BidWwpu1ASKK1AMre21soEgpRT")).nonce;

    [...Array(10).keys()].reduce(async (acc, i) => {
        await acc;
        const nextNonce = nonce + 1 + i;
        console.log(nonce, nextNonce);

        await contract.methods.set(i, {nonce: nextNonce, waitMined: false});
    }, Promise.resolve());

};

main();
