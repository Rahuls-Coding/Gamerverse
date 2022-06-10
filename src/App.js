import React, { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';


// Constants
const TWITTER_HANDLE = 'Rahuls_Coding';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

  const TEST_GIFS = [
    'https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp',
    'https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g',
    'https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g',
    'https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp',
  
  ]

  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [gifList, setGifList] = useState([]);


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

  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log('Gif link:', inputValue);
      setGifList([...gifList, inputValue])
      setInputValue("")
    } else {
      console.log('Empty input. Try again.');
    }
  };

  const onInputChange = (event) => {
    const value = event.target.value
    setInputValue(value)

  }

  const renderConnectedContainer = () => (
    <div className="connected-container">
    {/* Go ahead and add this input and button to start */}
    <form
      onSubmit={(event) => {
        event.preventDefault();
        sendGif();
      }}
    >
      <input type="text" placeholder="Enter gif link!" value={inputValue} onChange={onInputChange} />
      <button type="submit" className="cta-button submit-gif-button">Submit</button>
    </form>
    <div className="connected-container">
      <div className="gif-grid">
        {gifList.map(gif => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  </div>
  );

  const renderNotConnectedContainer = () => {
    return(
    <button 
    className="cta-button connect-wallet-button"
    onClick={connectWallet}>Connect Wallet</button>
    )
  }

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    } 
    window.addEventListener('load', onLoad);
    return () => {
      window.removeEventListener('load', onLoad);
    }
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching GIF list...');
      setGifList(TEST_GIFS);
    }
  }, [walletAddress]);


  return (
    <div className="App">
      <div className='authed-container'>
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