const IterableMapping = artifacts.require("IterableMapping");
const LKBT = artifacts.require("LKBT");

module.exports = function(deployer) {
    deployer.deploy(IterableMapping).then(()=>{
        deployer.link(IterableMapping, LKBT);
        //deployer.deploy(LKBT);
    });
    deployer.deploy(LKBT);
};