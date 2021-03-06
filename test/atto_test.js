const { BN, ether, balance } = require('openzeppelin-test-helpers');
const { expect } = require('chai');

const APRWithPoolOracle = artifacts.require('APRWithPoolOracle')
const EarnAPRWithPool = artifacts.require('EarnAPRWithPool')
const XBUSD = artifacts.require('XBUSD')
// const ForceSend = artifacts.require('ForceSend');
// const aaveABI = require('./abi/aave');

// const aaveAddress = '0xD6DF932A45C0f255f85145f286eA0b292B21C90B';
// const aaveContract = new web3.eth.Contract(aaveABI, aaveAddress);
// const aaveOwner = '0x8dCF48FB8BC7FDDA5A3106eDe9b7c69Fc2C7E751';

contract('test EarnAPRWithPool', async([alice, bob, admin, dev, minter]) => {

    before(async () => {

        this.xbusdContract = await XBUSD.new({
            from: alice
        });
        this.aprWithPoolOracle = await APRWithPoolOracle.new({
            from: alice
        });
        this.earnAPRWithPool = await EarnAPRWithPool.new({
            from: alice
        });

        // const forceSend = await ForceSend.new();
        // await forceSend.go(aaveOwner, { value: ether('1') });
        
        // await aaveContract.methods.transfer(alice, '10000000000').send({ from: aaveOwner});

        // let xaave = this.xaaveContract

        // await aaveContract.methods.approve(xaave.address, 10000000).send({
        //     from: alice
        // });

        // await xaave.deposit(10000000, {from: alice});
        console.log('---ended-before---');
    });

    it('recommend test', async() => {
        let aprWithPoolOracle = this.aprWithPoolOracle;
        let earnAPRWithPool = this.earnAPRWithPool;
        let xbusd = this.xbusdContract;
        let statbleTokenAddress = await xbusd.token();
        await earnAPRWithPool.set_new_APR(aprWithPoolOracle.address)
        await xbusd.set_new_APR(earnAPRWithPool.address)
        // await earnAPRWithPool.addXToken(statbleTokenAddress, xbusd.address);

        // var atoken = await earnAPRWithPool.aave(statbleTokenAddress);
        // const aave_rate = await aprWithPoolOracle.getAaveAPRAdjusted(atoken);
        // console.log(aave_rate.toString());

        // var ftoken = await earnAPRWithPool.fulcrum(statbleTokenAddress);
        // const fulcrum_rate = await aprWithPoolOracle.getFulcrumAPRAdjusted(ftoken, 0)
        // console.log(fulcrum_rate.toString());

        // await aprWithPoolOracle.calcVenusAPR('0xecA88125a5ADbe82614ffC12D0DB554E2e2867C8');
        // let result = await aprWithPoolOracle.calcVenusAPR('0xecA88125a5ADbe82614ffC12D0DB554E2e2867C8');
        await xbusd.rebalance();
        let result = await xbusd.provider();
    
        console.log('provider', result.toString());

        // console.log(await xaave.recommend());
    })
})