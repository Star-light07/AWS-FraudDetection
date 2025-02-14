import React, { useState, useEffect } from 'react';
import SafeService from '../SafeService'; // Adjust path if needed
import styles from './MyComponent.module.css'; // Import the CSS module

function MyComponent() {
  const [activeTab, setActiveTab] = useState('owners'); // State for active tab
  const [owners, setOwners] = useState([]);
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [data, setData] = useState("");

  const safeAddress = "0x..."; // Replace with the Safe address (or mock address)

  useEffect(() => {
    async function fetchOwners() {
      const fetchedOwners = await SafeService.getSafeOwners(safeAddress);
      setOwners(fetchedOwners);
    }
    fetchOwners();
  }, [safeAddress]);

  const handleProposeTransaction = async () => {
    try {
      const tx = await SafeService.proposeTransaction(safeAddress, toAddress, amount, data);
      console.log("Transaction proposed:", tx);
      // ... handle success (e.g., show a confirmation message)
    } catch (error) {
      console.error("Error proposing transaction:", error);
      // ... handle error (e.g., show an error message)
    }
  };

  return (
    <div className={styles.container}> {/* Use the CSS module styles */}
      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${activeTab === 'owners' ? styles.active : ''}`}
          onClick={() => setActiveTab('owners')}
        >
          Safe Owners
        </div>
        <div
          className={`${styles.tab} ${activeTab === 'propose' ? styles.active : ''}`}
          onClick={() => setActiveTab('propose')}
        >
          Propose Transaction
        </div>
      </div>

      {activeTab === 'owners' && (
        <div className={styles['owner-list']}>
          <h2>Safe Owners:</h2>
          <ul>
            {owners.map((owner) => (
              <li key={owner}>{owner}</li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'propose' && (
        <div className={styles['form-group']}>
          <h2>Propose Transaction:</h2>
          <label htmlFor="toAddress">To Address:</label>
          <input type="text" id="toAddress" placeholder="To Address" value={toAddress} onChange={(e) => setToAddress(e.target.value)} />
          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <label htmlFor="data">Data (hex):</label>
          <input type="text" id="data" placeholder="Data (hex)" value={data} onChange={(e) => setData(e.target.value)} />
          <button className={styles['propose-button']} onClick={handleProposeTransaction}>Propose</button>
        </div>
      )}
    </div>
  );
}

export default MyComponent;