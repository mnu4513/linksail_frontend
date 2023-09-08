import React, { useState } from 'react';
import axios from 'axios';
import "../index.css"
import { serverUri, bgImgUri } from './Config';
import copy from '../assets/img/copy.png';
import copied from '../assets/img/copied.png';


const Urlshortner = () => {

  const [mainUrl, setMainUrl] = useState("");
  const [copyIcon, setCopyIcon] = useState(copy);
  const [output, setOutput] = useState(null);
  const [text, setText] = useState("Text to be copied");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { mainUrl: mainUrl };
    let res = await axios.post(serverUri + "/sort-the-url", data);

    // const parsedData = await res.json();
    setOutput(res.data.data);
    console.log(res.data.data);
    setText(res.data.data.shortUrl);

    setTimeout(() => {
      setMainUrl('');
    }, 1000);
  };

  const copyButton = document.getElementById('copyButton');
  const textToCopy = document.getElementById('textToCopy');

  copyButton?.addEventListener('click', () => {
    textToCopy.select(); // Select the text inside the input element
    document.execCommand('copy'); // Copy the selected text to the clipboard
    setCopyIcon(copied);;
  });


  return (
    <div className='urlshortner' style={{
      backgroundImage: `url(${bgImgUri})`,
      backgroundSize: 'cover',
      height: "400px",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      padding: "10% 0"
    }}>




      <div >
        <form >
          <h2 style={{ fontFamily: "serif" }}>Urlshortner</h2>
          <input className='input_value' type="text" name="url" placeholder="Enter your URL here..." onChange={(e) => setMainUrl(e.target.value)} />
          <button className="button" onClick={handleSubmit} >Generate Quick Link</button>
        </form>

        {
          <div style={{marginTop:"30px"}}>
            {
              output ? <div style={{height: "50px",gap:"5px", display: "flex", flexDirection: "row", alignItems:"center", justifyContent:"center"}} >
      
            <input type="text"  id="textToCopy" value={text} readOnly style={{padding: "10px", border:"0px transparent", borderRadius:"13px",
             boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px"
            }}/>
            <button id="copyButton" style={{ borderRadius:"13px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}> <img  src={copyIcon} alt="Copy" style={{height: "30px"}} /> </button>
              </div> 
            : null
            }

          </div>
        }
      </div>

      <div>
        <iframe style={{borderRadius:"15px",border:"7px green solid",  borderBottomWidth:"32px"}} src="https://www.youtube.com/embed/FawKFcFk5N8?autoplay=1" allow='autoplay'  height="300px" width="500px" title="1" ></iframe>
      </div>

    </div>
  );
};

export default Urlshortner;