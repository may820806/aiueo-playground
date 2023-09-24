import { useState } from "react";
import { fiftyTone } from "./fiftyTone";

enum toneTypeEnum{
  hiragana,
  katakana,
  mix
}

const useGetHiragana = (type: 'hiragana' | 'katakana' | 'mix' ) => {
  console.log('useGetHiragana');
  
  const [randomQuestion, setRandomQuestion] = useState<string>('');
  // const [ans, setAnsArr] = useState<string>('');
  let ans;

  const list = fiftyTone.map(i => Object.values(i)[toneTypeEnum[type]]);

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * list.length);
    setRandomQuestion(list[randomIndex]);
    ans = fiftyTone[randomIndex].pronounce;
  }

  return { list, getRandomQuestion, randomQuestion, ans }
}

export default useGetHiragana;