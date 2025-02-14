

class SafeService {
    async getSafeOwners(safeAddress) {
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(["0x...", "0x...", "0x..."]);
        }, 500); 
      });
    }
  
    async proposeTransaction(safeAddress, to, value, data) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
    
          console.log("Simulated transaction proposal:", { to, value, data });
          resolve({ transactionHash: "0x..." }); 
        }, 500);
      });
    }
  
   
  }
  
  export default new SafeService();