exports.fromWei = function(n) {
    return web3.utils.toBN(web3.utils.fromWei(n, 'ether'))
}

exports.toWei = function(n) {
    return web3.utils.toBN(web3.utils.toWei(n, 'ether'))
  }