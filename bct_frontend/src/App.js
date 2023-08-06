import initWeb3 from "./components/web3_connect/connect";

function App() {
  // Call the function to initialize web3 and the contract
  initWeb3()
    .then((contract) => {
      console.log("Contract instance:", contract);
    })
    .catch((error) => {
      console.error("Error initializing web3 and contract:", error);
    });
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
