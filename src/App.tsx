import { useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";
import { data, colorSet } from "./data";

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
    if (numbers.length > 6) return;
    let newNumber = getLottoNumber();
    const newNumbers = [...numbers];
    newNumbers.push(newNumber);
    setNumbers(newNumbers);
  };

  const getLottoNumber = () => {
    if (numbers.length > 6) return;
    let isDuplicated = true;
    let newNumber = 0;
    while (isDuplicated) {
      let randomNum = getRandomInt(0, total);
      newNumber = getNumberFromCalulatedArray(randomNum);

      if (!numbers.length || numbers.indexOf(newNumber) < 0)
        isDuplicated = false;
    }
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
        <NumberBall className={numbers[0]}>{numbers[0]}</NumberBall>
        <NumberBall className={numbers[1]}>{numbers[1]}</NumberBall>
        <NumberBall className={numbers[2]}>{numbers[2]}</NumberBall>
        <NumberBall className={numbers[3]}>{numbers[3]}</NumberBall>
        <NumberBall className={numbers[4]}>{numbers[4]}</NumberBall>
        <NumberBall className={numbers[5]}>{numbers[5]}</NumberBall>
        <PlusText> + </PlusText>
        <NumberBall className={numbers[6]}>{numbers[6]}</NumberBall>
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
  background: ${(props) => colorSet[props.className] || "white"};
  font-size: 24px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
`;

const PlusText = styled.span`
  font-size: 26px;
  display: flex;
  align-items: center;
`;
