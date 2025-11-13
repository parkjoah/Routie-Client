import { ChatMessages } from "../components/AIChatPage/ChatMessages";
import { Header } from "../components/layout/Header";
import { useLutiEngine } from "../hooks/useLutiEngine";
import dogFoot from "../assets/images/dogDot.png";

export default function RoutieAIChatPage() {
  const { messages, onSelect, result, loading } = useLutiEngine();

  console.log(result);
  return (
    <div className="min-h-screen flex bg-[linear-gradient(180deg,var(--color-white)_47.72%,#fe5081_199.38%)] flex-col pt-[60px]">
      <div className="z-100">
        <Header type="chat" text="Chat-ROUTIE" />
      </div>
      <main className="flex-1 overflow-y-auto relative ">
        <img src={dogFoot} alt="" className="fixed z-10 top-[117px]" />
        <div className=" relative z-20 pt-[18px] ">
          <ChatMessages messages={messages} onSelect={onSelect} />
          {loading && (
            <p className="p-4 text-gray-500">루티가 생각 중이에요...</p>
          )}
          {result && (
            <div className="p-4 mt-2 space-y-4">
              <h3 className="text-lg font-titan text-[#FF6B8A]">
                {result.routeTitle}
              </h3>

              <div className="space-y-3">
                {result.places?.map((p, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-sm p-4 border border-[#ffdfe8]"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-[#FF8C7A]">
                        #{p.order} {p.name}
                      </span>
                      <span className="text-xs bg-[#FFE3EA] text-[#FF6B8A] px-2 py-0.5 rounded-full">
                        {p.category}
                      </span>
                    </div>

                    <p className="text-sm mt-1 text-gray-700 whitespace-pre-wrap">
                      {p.description}
                    </p>

                    <p className="text-xs text-gray-400 mt-2">
                      📍 {p.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
