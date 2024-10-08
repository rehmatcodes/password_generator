import React, { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numAllowed) str += '0123456789';
    if (charAllowed) str += '!@£%^&*';

    for (let i = 0; i < length; i++) {
      const char = str.charAt(Math.floor(Math.random() * str.length));
      pass += char;
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setRangeText(0, password.length); // Fixed typo and incorrect method
      document.execCommand('copy');
    }
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-600'>
      <h2 className='text-lg font-semibold mb-4'>Password Generator</h2>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Generated Password'
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-1'
        >
          Copy
        </button>
      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
          <label htmlFor="">Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            id='numinput'
            checked={numAllowed}
            onChange={() => setNumAllowed((prev) => !prev)}
          />
          <label htmlFor="numinput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            id='charinput'
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="charinput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
