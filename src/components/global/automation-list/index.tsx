'use client';

import { usePaths } from "@/hooks/user-nav";
import { cn, getMonth } from "@/lib/utils";
import Link from "next/link";
import GradientButton from "../gradient-button";
import { Button } from "@/components/ui/button";
import { useQueryAutomation } from "@/hooks/use-query-automation";
import CreateAutomation from "../create-automation";
import { useMutationDataState } from "@/hooks/use-mutation-data";

type Listener = {
    listener: 'SMARTAI' | 'STANDARD';
    id: string;
    automationId: string;
    prompt: string;
    commentReply: string | null;
    dmCount: number;
    commentCount: number;
  };
  
  type Automation = {
    id: string;
    name: string;
    keywords: { id: string; word: string }[];
    createdAt: Date;
  };
type Props = {};

const AutomationList = (props: Props) => {
  const { data } = useQueryAutomation();
  console.log(data)
  const { pathname } = usePaths();
  const {latestVariable} = useMutationDataState(['create-automation'])
  console.log(latestVariable)

  if (data?.status !== 200 || data.data.length <= 0) {
    return (
      <div className="h-[70vh] flex justify-center items-center flex-col gap-y-3">
        <h3 className="text-lg text-gray-400">
          No automations created
        </h3>
        <CreateAutomation />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-3">
      {data.data.map((automation: Automation) => (
        <Link
          href={`${pathname}/${automation.id}`}
          key={automation.id}
          className="bg-[#1D1D1D] hover:opacity-80 transition duration-100 rounded-xl p-5 border-[1px] radial--gradient--automations flex border-[#545454]"
        >
          <div className="flex flex-col flex-1 items-start">
            <h2 className="text-xl font-semibold">
              {automation.name}
            </h2>
            <p className="text-[#9D9D9D] text-sm font-light mb-2">
              This is the comment
            </p>

            {automation.keywords.length > 0 ? (
              <div className="flex gap-x-2 flex-wrap mt-3">
                {automation.keywords.map((keyword, index) => (
                  <div
                    key={keyword.id}
                    className={cn(
                      'rounded-full px-4 py-1 capitalize',
                      index % 4 === 0 && 'bg-keyword-green/15 border-2 border-keyword-green',
                      index % 4 === 1 && 'bg-keyword-purple/15 border-2 border-keyword-purple',
                      index % 4 === 2 && 'bg-keyword-yellow/15 border-2 border-keyword-yellow',
                      index % 4 === 3 && 'bg-keyword-red/15 border-2 border-keyword-red'
                    )}
                  >
                    {keyword.word}
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-full border-2 mt-3 border-dashed border-white/60 px-3 py-1">
                <p className="text-sm text-[#bfc0c3]">No Keywords</p>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <p className="capitalize text-sm font-light text-[#9B9CA0]">
            {getMonth(automation.createdAt.getUTCMonth() + 1)}{' '}
              {automation.createdAt.getUTCDate() === 1
                ? `${automation.createdAt.getUTCDate()}st`
                : `${automation.createdAt.getUTCDate()}th`}{' '}
              {automation.createdAt.getUTCFullYear()}
            </p>
            {automation.listener?.listener === 'SMARTAI'? <GradientButton type="BUTTON" className="w-full bg-background-80 text-white hover:bg-background-80">
              Smart AI
            </GradientButton>: <Button className="bg-background-80 hover:bg-background-80 text-white">
              Standard
            </Button>}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AutomationList;
