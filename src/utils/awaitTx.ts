const DEFAULT_INTERVAL = 500;
const DEFAULT_BLOCKS_TO_WAIT = 6;

function awaitTx(web3, txnHash, options = { interval: 500, blocksToWait: 6 }) {
  const interval =
    options && options.interval ? options.interval : DEFAULT_INTERVAL;

  const blocksToWait =
    options && options.blocksToWait
      ? options.blocksToWait
      : DEFAULT_BLOCKS_TO_WAIT;

  const transactionReceiptAsync = async function (txnHash, resolve, reject) {
    try {
      const receipt = web3.eth.getTransactionReceipt(txnHash);
      if (!receipt) {
        setTimeout(function () {
          transactionReceiptAsync(txnHash, resolve, reject);
        }, interval);
      } else {
        if (blocksToWait > 0) {
          const resolvedReceipt = await receipt;
          if (!resolvedReceipt || !resolvedReceipt.blockNumber)
            setTimeout(function () {
              transactionReceiptAsync(txnHash, resolve, reject);
            }, interval);
          else {
            try {
              const block = await web3.eth.getBlock(
                resolvedReceipt.blockNumber,
              );
              const current = await web3.eth.getBlock('latest');
              if (current.number - block.number >= blocksToWait) {
                var txn = await web3.eth.getTransaction(txnHash);
                if (txn.blockNumber != null) resolve(resolvedReceipt);
                else
                  reject(
                    new Error(
                      'Transaction with hash: ' +
                        txnHash +
                        ' ended up in an uncle block.',
                    ),
                  );
              } else
                setTimeout(function () {
                  transactionReceiptAsync(txnHash, resolve, reject);
                }, interval);
            } catch (e) {
              setTimeout(function () {
                transactionReceiptAsync(txnHash, resolve, reject);
              }, interval);
            }
          }
        } else resolve(receipt);
      }
    } catch (e) {
      reject(e);
    }
  };

  if (Array.isArray(txnHash)) {
    const promises = [];
    txnHash.forEach(function (oneTxHash) {
      // @ts-ignore
      promises.push(awaitTx(web3, oneTxHash, options));
    });
    return Promise.all(promises);
  } else {
    return new Promise(function (resolve, reject) {
      transactionReceiptAsync(txnHash, resolve, reject);
    });
  }
}

export default awaitTx;
