import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import abi from "./utils/RecoPortal.json";

export default function App() {
  // Just a state variable we use to store our user's public wallet.
  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "0xf4fE8f5FD4B6483de75Fc8E22639eea1437902Ef";
  const contractABI = abi.abi;

  const recommend = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const recoPortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await recoPortalContract.getTotalReco();
        console.log("Retrieved total wave count...", count.toNumber());

        const recoTxn = await recoPortalContract.recommend();
        console.log("Mining...", recoTxn.hash);

        await recoTxn.wait();
        console.log("Mined -- ", recoTxn.hash);

        count = await recoPortalContract.getTotalReco();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      // Check if we're authorized to access the user's wallet
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // This runs our function when the page loads.
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  // Implement your connectWallet method here
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">👋 Hey there!</div>
        <div className="bio">I am Cedric and I am a Software Engineer. Recommend a movie, series, anime, song, or anything to me!</div>
        <button className="waveButton" onClick={recommend}>
          Give recommendations
        </button>
        {/* If there is no currentAccount render this button */}
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
