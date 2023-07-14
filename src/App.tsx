import { useState, useEffect } from 'react'
import './App.css'
import { data } from './data'

function App() {
  const [count, setCount] = useState(0)
  const [numbers, setNumbers] = useState([])
  const [total, setTotal] = useState(0);
  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  useEffect(() => {
    const arr: [string, number] | [] = [];
    let total = 0;
    Object.keys(data).forEach((key) => {
      const num: number = data[key];
      arr.push([key, total, total + num - 1]);
      total += num;
    })
    setTotal(total);
  }, [])


  const testFunc = () => {
    const arr: [string, number] | [] = [];
    let total = 0;
    Object.keys(data).forEach((key) => {
      const num: number = data[key];
      arr.push([key, total, total + num - 1]);
      total += num;
    })
    setTotal(total);


    const result = getRandomInt(0, total);
    // for (let i = 0; i <)


    let num;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][2] > result) {
        num = i + 1;
        break;
      }
    }
    const newNumbers = [...numbers, num];
    setNumbers(newNumbers);

  }


  return (
    <>
      <div>
        <h1>오대장님을 위한 로또 번호 생성기</h1>
      </div>
      <div style={{ 'display': 'flex', 'justifyContent': 'space-between' }}>
        <div style={{ 'borderRadius': '50%', 'background': 'red', 'width': '50px', 'height': '50px', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'color': '#fff' }}>{numbers[0]}</div>
        <p>{numbers[1]}</p>
        <p>{numbers[2]}</p>
        <p>{numbers[3]}</p>
        <p>{numbers[4]}</p>
        <p>{numbers[5]}</p>
      </div>
      <div className="card">
        <button onClick={testFunc}>
          하나씩 뽑기
        </button>
        <button onClick={testFunc}>
          한번에 다 뽑기
        </button>

      </div>
    </>
  )
}

export default App
