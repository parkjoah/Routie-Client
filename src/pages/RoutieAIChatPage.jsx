import { ChatMessages } from "../components/AIChatPage/ChatMessages";
import { Header } from "../components/layout/Header";
import { useLutiEngine } from "../hooks/useLutiEngine";
import dogFoot from "../assets/images/dogDot.png";

export default function RoutieAIChatPage() {
  const { messages, onSelect, result, loading } = useLutiEngine();

  return (
    <div className="min-h-screen flex bg-[linear-gradient(180deg,var(--color-white)_47.72%,#fe5081_199.38%)] flex-col pt-[60px]">
      <div className="z-100">
        <Header type="chat" text="Chat-ROUTIE" />
      </div>
      <main className="flex-1 overflow-y-auto relative ">
        <img src={dogFoot} alt="" className="fixed z-10 top-15" />
        <div className=" relative z-20 pt-[18px] ">
          <ChatMessages messages={messages} onSelect={onSelect} />
          {loading && (
            <p className="p-4 text-gray-500">루티가 생각 중이에요...</p>
          )}
          {result && (
            <div className="p-4">
              <h3 className="font-semibold text-[#FF8C7A]">
                {result.routeTitle}
              </h3>
              <pre className="text-xs whitespace-pre-wrap bg-white border p-2 rounded-md mt-2">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
