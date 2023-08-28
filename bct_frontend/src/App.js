import * as React from "react";
import Header from "./components/header";
import initWeb3, { getFirstAccount } from "./components/web3_connect/connect";
import Login from "./pages/LoginPage/Index";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  const [methods, setMethods] = React.useState(null);
  const [accountData, setAccountData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    initWeb3()
      .then((contract) => {
        setMethods(contract.methods);
      })
      .catch((error) => {
        console.error("Error initializing web3 and contract:", error);
      });

    async function UseFirstAccount() {
      const firstAddress = await getFirstAccount();
      setAccountData(firstAddress);
      setIsLoading(false);
    }

    UseFirstAccount();
  }, []);

  return (
    <>
      <Router>
        <Header methods={methods} accountData={accountData} />
        <div
          style={{
            marginTop: `64px`,
          }}
        >
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Routes>
              <Route
                path="/"
                element={<Login methods={methods} accountData={accountData} />}
              />
            </Routes>
          )}
        </div>
      </Router>
    </>
  );
}
export default App;
