import React, { useState, useEffect } from 'react';

// Component is a piece of User Interface (UI)
export default function App() {
  // State of a Component - Internal data which is preserved between the renders

  const [advice, setAdvice] = useState('');
  const [count, setCount] = useState(0);

  async function getAdvice() {
    console.log('getAdvice() function is invoked!');
    // We got to now call an API to fetch data from it
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    console.log(data);
    const { advice } = data.slip;

    console.log(advice);
    setAdvice(advice);
    setCount((prev) => prev + 1);
  }

  // useEffect for side effects | A nice way to show the API results even before user action i-e., click of the button
  useEffect(() => {
    getAdvice();
  }, []);

  return (
    // We are returning JSX which is a syntax just like HTML, which will basically describe what we can see on the screen
    <div>
      <h1>Steadily we progress</h1>
      <button onClick={getAdvice}>Get Advice</button>

      {advice && <p>{advice}</p>}

      {/* We made use of the getAdvice() method to update the count state on each render of the getAdvice to keep the track of the count */}
      <Message count={count} />
    </div>
  );
}

// We divide User Interface into components
// Data is passed down from the parent component to the child component

function Message({ count }) {
  return (
    <>
      {count > 0 && (
        <p>
          You are read <strong>{count}</strong>{' '}
          {count === 1 ? 'piece' : 'pieces'} of advice
        </p>
      )}
    </>
  );
}
