import "./styles.css";
import { RateLimiter } from "limiter";

const limiter = new RateLimiter({
  tokensPerInterval: 5,
  interval: "min",
  fireImmediately: true
});

export default function App() {
  const printData = async () => {
    const remainingRequests = await limiter.removeTokens(1);
    console.log(remainingRequests);
    if (remainingRequests < 0) {
      console.log(remainingRequests);
    } else {
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
        .then((json) => console.log(json));
    }
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={printData}>Get Data</button>
    </div>
  );
}
