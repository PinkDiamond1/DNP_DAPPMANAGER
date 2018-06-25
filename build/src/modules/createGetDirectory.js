

const directoryAddr = '0xc8330fB0B7d80A7be4eDB624139e15Ec1f3FfEa3';
const directoryAbi = [{'constant': false, 'inputs': [{'name': 'name', 'type': 'string'}], 'name': 'addPackage', 'outputs': [{'name': 'idPackage', 'type': 'uint256'}], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}, {'constant': true, 'inputs': [], 'name': 'escapeHatchCaller', 'outputs': [{'name': '', 'type': 'address'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'constant': false, 'inputs': [{'name': '_newOwner', 'type': 'address'}], 'name': 'changeOwnership', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}, {'constant': false, 'inputs': [{'name': '_dac', 'type': 'address'}], 'name': 'removeOwnership', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}, {'constant': false, 'inputs': [{'name': '_newOwnerCandidate', 'type': 'address'}], 'name': 'proposeOwnership', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}, {'constant': false, 'inputs': [], 'name': 'acceptOwnership', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}, {'constant': true, 'inputs': [{'name': '_token', 'type': 'address'}], 'name': 'isTokenEscapable', 'outputs': [{'name': '', 'type': 'bool'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'constant': true, 'inputs': [], 'name': 'owner', 'outputs': [{'name': '', 'type': 'address'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'constant': false, 'inputs': [{'name': '_token', 'type': 'address'}], 'name': 'escapeHatch', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}, {'constant': false, 'inputs': [{'name': 'idPackage', 'type': 'uint256'}, {'name': 'name', 'type': 'string'}], 'name': 'updatePackage', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}, {'constant': true, 'inputs': [], 'name': 'numberOfDAppNodePackages', 'outputs': [{'name': '', 'type': 'uint256'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'constant': true, 'inputs': [{'name': 'idPackage', 'type': 'uint256'}], 'name': 'getPackage', 'outputs': [{'name': 'name', 'type': 'string'}, {'name': 'status', 'type': 'uint8'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'constant': false, 'inputs': [{'name': 'idPackage', 'type': 'uint256'}, {'name': 'newStatus', 'type': 'uint8'}], 'name': 'changeStatus', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}, {'constant': true, 'inputs': [], 'name': 'newOwnerCandidate', 'outputs': [{'name': '', 'type': 'address'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'constant': false, 'inputs': [{'name': '_newEscapeHatchCaller', 'type': 'address'}], 'name': 'changeHatchEscapeCaller', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}, {'constant': true, 'inputs': [], 'name': 'escapeHatchDestination', 'outputs': [{'name': '', 'type': 'address'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'name': '_escapeHatchCaller', 'type': 'address'}, {'name': '_escapeHatchDestination', 'type': 'address'}], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor'}, {'anonymous': false, 'inputs': [{'indexed': true, 'name': 'idPackage', 'type': 'uint256'}, {'indexed': false, 'name': 'name', 'type': 'string'}], 'name': 'PackageAdded', 'type': 'event'}, {'anonymous': false, 'inputs': [{'indexed': true, 'name': 'idPackage', 'type': 'uint256'}, {'indexed': false, 'name': 'name', 'type': 'string'}], 'name': 'PackageUpdated', 'type': 'event'}, {'anonymous': false, 'inputs': [{'indexed': false, 'name': 'idPackage', 'type': 'uint256'}, {'indexed': false, 'name': 'newStatus', 'type': 'uint8'}], 'name': 'StatusChanged', 'type': 'event'}, {'anonymous': false, 'inputs': [{'indexed': false, 'name': 'token', 'type': 'address'}], 'name': 'EscapeHatchBlackistedToken', 'type': 'event'}, {'anonymous': false, 'inputs': [{'indexed': false, 'name': 'token', 'type': 'address'}, {'indexed': false, 'name': 'amount', 'type': 'uint256'}], 'name': 'EscapeHatchCalled', 'type': 'event'}, {'anonymous': false, 'inputs': [{'indexed': true, 'name': 'by', 'type': 'address'}, {'indexed': true, 'name': 'to', 'type': 'address'}], 'name': 'OwnershipRequested', 'type': 'event'}, {'anonymous': false, 'inputs': [{'indexed': true, 'name': 'from', 'type': 'address'}, {'indexed': true, 'name': 'to', 'type': 'address'}], 'name': 'OwnershipTransferred', 'type': 'event'}, {'anonymous': false, 'inputs': [], 'name': 'OwnershipRemoved', 'type': 'event'}];

const DAppNodePackageStatus = ['Preparing', 'Develop', 'Active', 'Deprecated', 'Deleted'];

function createGetDirectory(web3) {
  return async function getDirectory() {
    // Expects no input
    // Return an array of objects:
    //   [
    //     {
    //       name: packageName,  (string)
    //       status: 'Preparing' (string)
    //     },
    //     ...
    //   ]

      const directory = new web3.eth.Contract(directoryAbi, directoryAddr);
      const numberOfDAppNodePackages = parseFloat(
        await directory.methods.numberOfDAppNodePackages().call()
      );

      let packages = [];
      for (let i = 0; i < numberOfDAppNodePackages; i++) {
        try {
          const pkg = await directory.methods.getPackage(i).call();
          packages.push({
            name: pkg.name,
            status: DAppNodePackageStatus[pkg.status],
          });
        } catch (e) {
          console.trace('Error retrieving package #' + i + ' from directory, err: ' + e);
        }
      }
      return packages;
  };
}


module.exports = createGetDirectory;
