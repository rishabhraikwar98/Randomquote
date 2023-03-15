import React, { useEffect, useState,useRef } from "react";
import "./quotes.css";
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

var colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
  "#FFC107",
  "#3F51B5",
  "#009688",
  "#8BC34A",
  "#E91E63",
  "#9C27B0",
];

const Quotes = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const quoteRef = useRef(null);

  useEffect(() => {
    newQuote();
  }, []);
  const newQuote = () => {
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((resp) => {
        setQuote(resp.content);
        setAuthor(resp.author);
      });
    document.getElementsByTagName("body")[0].style.backgroundColor =
      colors[parseInt(Math.random() * 19, 10)];
  };

  const handleShare = ()=>{
    html2canvas(quoteRef.current).then(canvas => {
      canvas.toBlob(blob => {
        saveAs(blob, 'quote.png');
      });
    });
  }

  return (
    <div id="main">
      <div id="wrapper">
        <div  ref={quoteRef}  id="quote-box">
          <div className="quote-text">
            <i>{quote}</i>
          </div>
          <div className="quote-author">- {author}</div>
        </div>
        <div className="buttons">
          <button className="button" id="new-quote" onClick={newQuote}>
            Next Quote
          </button>
          <button className="button" id="share" onClick={handleShare}>Share Quote</button>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
