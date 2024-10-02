import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const [isGoodPassword, setIsGoodPassword] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (char) str += "~!@#$%^&*()_+[]{}";

    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  }, [length, number, char]);

  const copypass = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  });

  useEffect(() => {
    passwordGenerator();
  }, [length, number, char, passwordGenerator]);

  useEffect(() => {
    setIsGoodPassword(length >= 12 && number && char);
  }, [length, number, char]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full mx-auto shadow-md rounded-lg px-4 py-8 text-orange-500 bg-gray-400 text-center">
        <h1 className="text-white text-2xl mb-4">PASSWORD GENERATOR</h1>
        <div className="flex flex-col mb-4 justify-center items-center">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copypass}
            className="bg-blue-700 text-white px-3 py-0.5 shrink-0 mt-2"
          >
            Copy
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-x-2">
          <div className="flex item-center gap-x-1 flex-col">
            <label>Length:</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.valueAsNumber)}
            />
            <label className="text-center">{length}</label>
          </div>
          <div className="flex item-center gap-x-1 flex-col">
            <label>Number:</label>
            <input
              type="checkbox"
              checked={number}
              id="numberInput"
              onChange={() => setNumber((prev) => !prev)}
            />
          </div>
          <div className="flex item-center gap-x-1 flex-col">
            <label>Special Char:</label>
            <input
              type="checkbox"
              checked={char}
              id="charInput"
              onChange={() => setChar((prev) => !prev)}
            />
          </div>
          <div className="flex item-center gap-x-1 flex-col">
            <label>Is Good Password:</label>
            <input
              type="checkbox"
              checked={isGoodPassword}
              id="goodPasswordInput"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
