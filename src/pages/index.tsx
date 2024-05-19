import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { FormEvent, useEffect, useState } from "react";
import { confirmDialog } from "primereact/confirmdialog";
import { fiftyTone } from "../application/fiftyTone";
import React, { useRef } from "react";
import Footer from "@/components/Footer";
import ContactDialog from "@/components/ContactDialog";
import { IFiftyTone } from "../application/fiftyTone";
import { Dialog } from "primereact/dialog";
import PeekTonesTableDialog from "@/components/PeekTonesTableDialog";

export default function Home() {
  const dropdownOption = [
    { name: "平仮名ひらがな(hiragana)", code: "hiragana" },
    { name: "片仮名かたかな(katakana)", code: "katakana" },
    { name: "Mix", code: "mix" },
  ];

  const [toneType, setToneType] = useState<"hiragana" | "katakana" | "mix">(
    "hiragana"
  );
  const [ansArr, setAnsArr] = useState<string[]>([]);
  const [inputAns, setInputAns] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [invalidTipShow, setInvalidTipShow] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [correctAmount, setCorrectAmount] = useState<number>(0);
  const [total, setTotal] = useState<number>(1);
  const [randomQuestion, setRandomQuestion] = useState<string>("");
  const [questionList, setQuestionList] = useState<string[]>([]);
  const [isContactShow, setIsContactShow] = useState<boolean>(false);
  const [isPeekingShow, setIsPeekingShow] = useState<boolean>(false);

  enum toneTypeEnum {
    hiragana,
    katakana,
    mix,
  }

  useEffect(() => {
    let list: string[] = [];

    if (toneType === "mix") {
      fiftyTone.forEach((i) => {
        list.push(i.hiragana);
        list.push(i.katakana);
      });
    } else {
      list = fiftyTone.map((i) => Object.values(i)[toneTypeEnum[toneType]]);
    }
    setQuestionList(list);
    setIsChecked(false);
    setCorrectAmount(0);
    setInputAns("");
    setTotal(0);
  }, [toneType]);

  useEffect(() => {
    getRandomQuestion();
  }, [questionList]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isChecked]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      clickNext();
      window.removeEventListener("keydown", handleKeyDown);
    }
  };

  const getRandomQuestion = () => {
    const pronounceArr = [];
    let target;

    const randomIndex = Math.floor(Math.random() * questionList?.length);
    if (toneType === "mix") {
      const questionText = questionList[randomIndex];
      target = fiftyTone.find((i: IFiftyTone) => {
        return i.hiragana === questionText || i.katakana === questionText;
      });
      if (target) {
        setRandomQuestion(questionList[randomIndex]);
      }
    } else {
      const questionText = questionList[randomIndex];
      target = fiftyTone.find((i: IFiftyTone) => i[toneType] === questionText);
      if (target) {
        setRandomQuestion(questionList[randomIndex]);
      }
    }
    if (target) {
      pronounceArr.push(target.pronounce);
      if (target.pronounce2) {
        pronounceArr.push(target.pronounce2);
      }
      setAnsArr(pronounceArr);
    }
  };

  const onChangeType = (e: DropdownChangeEvent) => {
    confirmDialog({
      header: "Change type",
      message: "Going to clear answer history, are you sure?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        setToneType(e.value);
      },
    });
  };

  const onCheck = (e: FormEvent) => {
    e.preventDefault();
    if (!inputAns) {
      return;
    }
    setInvalidTipShow(!inputAns);
    setIsChecked(true);
    if (ansArr.includes(inputAns)) {
      setIsCorrect(true);
      setCorrectAmount((prev) => prev + 1);
    }
    window.addEventListener("keydown", handleKeyDown);
  };

  const clickNext = () => {
    setIsChecked(false);
    setIsCorrect(false);
    setInputAns("");
    setTotal((prev) => prev + 1);
    getRandomQuestion();
  };

  const CardFooter = (
    <Button
      label="next"
      className={styles["footer-button"]}
      disabled={!isChecked}
      onClick={clickNext}
    ></Button>
  );

  return (
    <div className={styles["index-main"]}>
      <Head>
        <title>aiueo-playground</title>
        <meta
          name="description"
          content="This is aiueo あいうえお 五十音 playground, non-stop practice!"
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://aiueo-playground.vercel.app/"
        />
        <meta property="og:title" content="aiueo-playground" />
        <meta
          property="og:description"
          content="This is aiueo あいうえお 五十音 playground, non-stop practice!"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://aiueo-playground.vercel.app/"
        />
        <meta property="twitter:title" content="aiueo-playground" />
        <meta
          property="twitter:description"
          content="This is aiueo あいうえお 五十音 playground, non-stop practice!"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dropdown
        value={toneType}
        options={dropdownOption}
        optionLabel="name"
        optionValue="code"
        className="w-full md:w-14rem"
        onChange={(e) => {
          onChangeType(e);
        }}
      />
      <Card
        title={`No. ${total + 1}`}
        className={styles["text-card"]}
        footer={CardFooter}
      >
        <h1>{randomQuestion}</h1>
        <form onSubmit={onCheck} className={styles["input-group"]}>
          <InputText
            id="value"
            ref={inputRef}
            name="value"
            value={inputAns}
            disabled={isChecked}
            maxLength={3}
            onChange={(e) => {
              setInputAns(e.target.value);
            }}
          />
          <Button
            type="submit"
            label="check"
            disabled={isChecked}
            onClick={onCheck}
          />
          {invalidTipShow && (
            <span className={styles["tip-invalid"]}>
              please enter your answer
            </span>
          )}
        </form>
        {isChecked ? (
          isCorrect ? (
            <p>
              <i className="pi pi-check" style={{ color: "green" }} />
              {ansArr.join(", ")}
            </p>
          ) : (
            <div className={styles["result-group"]}>
              <span className={styles["wrong-group"]}>
                <i className="pi pi-times" style={{ color: "red" }} />
                {inputAns}
              </span>
              <span>
                <i className="pi pi-check" style={{ color: "green" }} />
                {ansArr.join(", ")}
              </span>
            </div>
          )
        ) : (
          ""
        )}
      </Card>
      <p>
        correct: {correctAmount}/{total}
      </p>

      <Button className={styles['peek-button']} label="Peek all tones" severity="info" outlined onClick={() => setIsPeekingShow(true)} />

      <PeekTonesTableDialog
        visible={isPeekingShow}
        onHideDialog={() => setIsPeekingShow(false)}
      />
      <ContactDialog
        visible={isContactShow}
        onHideDialog={() => setIsContactShow(false)}
      />

      <Footer
        onClickContact={() => {
          setIsContactShow(true);
        }}
      />
    </div>
  );
}
