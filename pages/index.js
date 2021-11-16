import { useState } from 'react';
import { ethers } from 'ethers';

import Token from '../artifacts/contracts/Token.sol/Token.json';

const tokenAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

export default function Home() {
  const [userAccount, setUserAccount] = useState('');
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState('');
  
  const getBalance = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      const balance = await contract.balanceOf(account);
      console.log(`Balance: ${balance.toString()} - Account: ${account} ` );
      setBalance(balance.toString());
    }
  }

  const sendCoins = async () => {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }    
  };
  
  return (
    <div>
      <button onClick={getBalance}>Get Balance</button><br/>
      Balance: {balance}<br/>
      <button onClick={sendCoins}>Send Coins</button><br/>
      <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" /><br/>
      <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />    
    </div>
  )
}
