import { useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";
import { data } from "./data";

function App() {
  const [numbers, setNumbers] = useState([]);
  const [total, setTotal] = useState(0);
  const [calArray, setCalArray] = useState([]);

  useEffect(() => {
    // 숫자별 영역 만들기
    const arr: any = [];
    let total = 0;
    Object.keys(data).forEach((key: string) => {
      const num: number = data[key];
      arr.push([key, total, total + num - 1]);
      total += num;
    });
    setTotal(total);
    setCalArray(arr);
  }, []);

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

  const getNumberFromCalulatedArray = (number: number) => {
    const arr = calArray;
    let num = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][2] > number) {
        num = i + 1;
        break;
      }
    }
    return num;
  };

  const clickForGettingNumber = () => {
    let newNumber = getLottoNumber();
    const newNumbers = [...numbers];
    newNumbers.push(newNumber);
    setNumbers(newNumbers);
  };

  const getLottoNumber = () => {
    if (numbers.length > 5) return;
    let randomNum = getRandomInt(0, total);
    const newNumber = getNumberFromCalulatedArray(randomNum);
    console.log(newNumber);
    return newNumber;
  };

  const clickForDelete = () => {
    setNumbers([]);
  };

  return (
    <>
      <div>
        <h1>오대장님을 위한 로또 번호 생성기</h1>
      </div>
      <BallContainer>
        <NumberBall>{numbers[0]}</NumberBall>
        <NumberBall>{numbers[1]}</NumberBall>
        <NumberBall>{numbers[2]}</NumberBall>
        <NumberBall>{numbers[3]}</NumberBall>
        <NumberBall>{numbers[4]}</NumberBall>
        <NumberBall>{numbers[5]}</NumberBall>
      </BallContainer>
      <div className="card">
        <button onClick={clickForGettingNumber}>하나씩 뽑기</button>
        {/* <button onClick={getLottoNumbers}>한번에 다 뽑기</button> */}
        <button onClick={clickForDelete}>지우기</button>
      </div>
    </>
  );
}

export default App;

const BallContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NumberBall = styled.div`
  border-radius: 50%;
  background: red;
  font-size: 30px;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;
