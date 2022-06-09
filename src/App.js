import React, { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';


// Constants
const TWITTER_HANDLE = 'Rahuls_Coding';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

  const SAMPLE_GIFS = [
    'https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp',
	'https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g',
	'https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g',
	'https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp',
    
    // "https://media.giphy.com/media/xtVkIJzqk4pGJciS1p/giphy.gif",
    // "https://media.giphy.com/media/1APhATvqD65r966yCP/giphy.gif",
    // "https://media.giphy.com/media/m3N5PpxSyYyFICeSvb/giphy.gif",
    // "https://media.giphy.com/media/ov3RQZYiO8Bjy3suFz/giphy.gif"
  ]

  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
        const {solana} = window 
        if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom Wallet is Found')
          
          const response = await solana.connect({onlyIfTrusted: true})
          console.log(
            "Public Key Address:",
            response.publicKey.toString(),
          )
          setWalletAddress(response.publicKey.toString())
        } } else {
          console.log('Phantom Wallet is Not Found')
        }
      }
    catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window
    if (solana) {
      const response = await solana.connect({onlyIfTrusted: true})
      console.log(
        "Public Key Address:",
        response.publicKey.toString(),
      )
      setWalletAddress(response.publicKey.toString())
    }
  };


  const renderNotConnectedContainer = () => {
    return(
    <button 
    className="cta-button connect-wallet-button"
    onClick={connectWallet}>Connect Wallet</button>
    )
  }

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <div className="gif-grid">
        {SAMPLE_GIFS.map(gif => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} className="animated-gif"/>
          </div>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    } 
    window.addEventListener('load', onLoad);
    return () => {
      window.removeEventListener('load', onLoad);
    }
  }, []);


  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className=" glitch header"><span aria-hidden="true">Gamerverse</span> <span aria-hidden="true">Gamerverse</span> Gamerverse</p>
          <p className="sub-text">
            VIEW ALL THE GAMERS FAVOIRTES IN THE METAVERSE 🎮
          </p>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK} 
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>

  );
};

export default App;