import React, { useCallback, useRef, useState } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(true);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) {
      str += '0123456789';
    }
    if (characterAllowed) {
      str += '!@#$%^&*()_+=-|}{":?><';
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  const passwordCopy = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);

  }, [password]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-800 flex flex-col justify-center items-center p-4">
      <h1 className="text-5xl font-extrabold mb-10 text-yellow-300">Password Generator</h1>
      <div className="w-full max-w-md bg-gray-800 shadow-2xl rounded-lg p-6 space-y-4">
        <input
          type="text"
          value={password}
          placeholder="Generated password"
          readOnly
          className="w-full py-3 px-4 border border-gray-600 bg-gray-700 text-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-pink-500 outline-none"
          ref={passwordRef}
        />

        <div className="mt-4 flex items-center space-x-2">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className="cursor-pointer flex-grow accent-pink-500"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="lengthInput" className="text-green-300 font-medium">
            Length: {length}
          </label>
        </div>

        <div className="flex items-center mt-4 space-x-2">
          <input
            type="checkbox"
            checked={numberAllowed}
            id="NumberInput"
            onChange={() => setNumberAllowed((prev) => !prev)}
            className="h-5 w-5 text-yellow-500 focus:ring-yellow-500 border-gray-500 rounded"
          />
          <label htmlFor="NumberInput" className="text-yellow-500 font-medium">
            Include Numbers
          </label>
        </div>

        <div className="flex items-center mt-4 space-x-2">
          <input
            type="checkbox"
            checked={characterAllowed}
            id="CharacterInput"
            onChange={() => setCharacterAllowed((prev) => !prev)}
            className="h-5 w-5 text-green-500 focus:ring-green-500 border-gray-500 rounded"
          />
          <label htmlFor="CharacterInput" className="text-green-500 font-medium">
            Include Special Characters
          </label>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={passwordGenerator}
            className="w-full mr-2 bg-pink-500 hover:bg-pink-600 text-white py-3 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
          >
            Generate Password
          </button>
          <button
            onClick={passwordCopy}
            className="w-full ml-2 bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
          >
            Copy Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
