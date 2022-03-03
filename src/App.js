import React from 'react';
import './App.css';

const foo = async () => {
  await setTimeout(() => {
    console.log(5, 'React webpack template');
  }, 5000);
};

/**
 * @return {JSX.Element}
 */
function App() {
  foo();
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>My App</h1>
    </div>
  );
}

export default App;
