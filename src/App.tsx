import { useState, useEffect } from "react";
import store from './store';
import styled from "styled-components";
import "./App.css";
import { useRecoilState } from 'recoil';
import { data, colorSet } from "./data";

function App() {
  const [total, setTotal] = useState(0);
  const [calArray, setCalArray] = useState([]);
  // const [popText, setPopText] = useState('한번에 다뽑기');

  const [selectedNumbers, setSelectedNumber] = useRecoilState(store.numbers);

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


  const getLottoNumber = (arr: Number[]) => {
    let isDuplicated = true;
    let newNumber = 0;
    while (isDuplicated) {
      let randomNum = getRandomInt(0, total);
      newNumber = getNumberFromCalulatedArray(randomNum);

      if (!arr.length || arr.indexOf(newNumber) < 0)
        isDuplicated = false;
    }
    return newNumber;
  };

  const clickForDelete = () => {
    setSelectedNumber([]);
    // setPopText('한번에 다뽑기');
  };

  // const getLottoNumbers = () => {
  //   const numArr = [];
  //   for (let i = 0; i < 7; i++) {
  //     numArr.push(getLottoNumber(numArr))
  //   }
  //   numArr.sort((a, b) => a - b)
  //   setSelectedNumber([numArr]);
  //   setPopText('다시 뽑기')

  //   if (popText === '다시 뽑기') {
  //     const arr = [...pastNumbers];
  //     arr.push(numArr)
  //     setPastNumbers(arr);
  //     console.log(arr, pastNumbers)
  //   }

  // }


  const getLottoNumbersFiveTimes = () => {
    const numSet = [];
    for (let j = 0; j < 5; j++) {
      let numArr = [];
      for (let i = 0; i < 7; i++) {
        numArr.push(getLottoNumber(numArr))
      }
      numArr.sort((a, b) => a - b)
      numSet.push(numArr);
    }

    setSelectedNumber(numSet);
    // setPopText('다시 뽑기')

  }



  return (
    <>
      <div>
        <h1>오대장</h1>
        <h1> 1등 뽑아 제발</h1>
      </div>
      <Wrapper>
        {
          selectedNumbers.map((numbers, index) => {
            return <BallContainer key={index}>
              {numbers.map((number, _index) => {
                if (index < 6) return <NumberBall key={index + '_' + _index} className={number}>{number}</NumberBall>
                else return <>
                  <PlusText key={'plus_' + index}> + </PlusText>
                  <NumberBall key={index + '_' + _index} className={number}>{number}</NumberBall>
                </>
              })}
            </BallContainer>
          })
        }
      </Wrapper>
      <div className="card">
        {/* <button onClick={clickForGettingNumber}>하나씩 뽑기</button> */}
        {/* <button onClick={getLottoNumbers}>{popText}</button> */}
        <button onClick={getLottoNumbersFiveTimes}>5개씩 뽑기</button>
        <button onClick={clickForDelete}>지우기</button>
      </div>
    </>
  );
}

export default App;
const BallContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  background: lavender;
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

const Wrapper = styled.div`
  display: flex;
  gap:20px;
  flex-direction: column;
`