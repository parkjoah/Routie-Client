import { useState, useEffect, useRef } from "react";
import { SYSTEM_PROMPT } from "../lib/buildPrompt";
import { callLutiAgent } from "../api/aiClient";

const STEPS = [
  {
    key: "region",
    text: "오늘은 어디 근처에서 놀고 싶어? ☀️",
    options: ["성수", "홍대", "한남", "여의도", "강남"],
  },
  {
    key: "partner",
    text: "누구랑 갈 거야? 💞",
    options: ["혼자", "친구랑", "연인이랑", "가족이랑"],
  },
  {
    key: "mood",
    text: "분위기는 어떤 게 좋아? 🌿",
    options: ["조용하게 힐링", "활기차게", "카페 위주", "자연 위주"],
  },
  {
    key: "duration",
    text: "얼마나 놀 거야? ⏰",
    options: ["2시간", "3시간", "4~5시간"],
  },
  {
    key: "theme",
    text: "꼭 포함하고 싶은 테마 있어? ✨",
    options: ["카페", "전시", "산책", "맛집", "없어 괜찮아"],
  },
];

export function useLutiEngine() {
  const [messages, setMessages] = useState([]);
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) {
      return;
    }
    initialized.current = true;
    addAssistant("안녕! 오늘은 어디 근처에서 놀고 싶어?");
    addOptions(STEPS[0].options);
  }, []);

  function addAssistant(text, options) {
    setMessages((prev) => [...prev, { role: "assistant", text, options }]);
  }
  function addUser(text) {
    setMessages((prev) => [...prev, { role: "user", text }]);
  }
  function addOptions(options) {
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (!last || last.role !== "assistant") return prev;
      const updated = [...prev];
      updated[updated.length - 1] = { ...last, options };
      return updated;
    });
  }

  async function onSelect(option) {
    addUser(option);
    const current = STEPS[step];
    const updatedAnswers = { ...answers, [current.key]: option };
    setAnswers(updatedAnswers);
    const nextStep = step + 1;
    setStep(nextStep);

    if (nextStep < STEPS.length) {
      const s = STEPS[nextStep];
      addAssistant(s.text, s.options);
      return;
    }

    setLoading(true);
    addAssistant("잠깐만~ 루티가 예쁜 코스 만들어볼게 💫");

    try {
      const userPrompt = `
사용자의 하루 루트 요구사항:
- 지역: ${updatedAnswers.region}
- 동행자: ${updatedAnswers.partner}
- 분위기: ${updatedAnswers.mood}
- 시간: ${updatedAnswers.duration}
- 테마: ${updatedAnswers.theme}
      `;

      const data = await callLutiAgent({
        systemPrompt: SYSTEM_PROMPT,
        userPrompt,
      });
      setResult(data);
      addAssistant("짜봤어! 이 코스 어때? 😆");
    } catch (e) {
      addAssistant("앗... 루트 만드는 중에 문제가 생겼어 🥲");
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return { messages, onSelect, result, loading };
}
