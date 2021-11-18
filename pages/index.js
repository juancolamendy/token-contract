import { useState } from 'react';
import { ethers } from 'ethers';

import Token from '../artifacts/contracts/Token.sol/Token.json';

// public address in ropsten
const tokenAddress = "0x475498bF7511Ae8e96bb9184881b3A177a19D3F8";

export default function Home() {
  const [userAccount, setUserAccount] = useState('');
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState('');
  
  const getBalance = async () => {
    // detect the Ethereum provider
    // console.log('window.ethereum', window.ethereum);
    if (typeof window.ethereum !== 'undefined') {
      // call pop-up UI that asks permission to connect the dApp to MetaMask
      // if already connected, no pop-up UI
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log(`Connected using account:${account}`)

      // create a provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log('Created provider', provider);

      // create contract
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      console.log('Created contract', contract);

      // execute a remote call in the contract
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
  }
  
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
