"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  Preloaded,
  usePreloadedQuery,
  useMutation,
  useQuery,
} from "convex/react";
import {} from "convex/react";

export default function ClientMessage(props: {
  preloadedMessages: Preloaded<typeof api.messages.messages>;
}) {
  // const increment = useMutation(api.counter.increment);
  const chatId = "k572ecqkj06kzpe839bc8wyxzs76xvhm" as Id<"chats">;

  const messages = usePreloadedQuery(props.preloadedMessages);
  return (
    <>
      <p className="text-xl">
        The current counter is{" "}
        <div>
          {messages.map((item, index) => {
            return <div key={index}>{item.content}</div>;
          })}
        </div>
      </p>
      <p>
        <button
          // onClick={() => increment()}
          className="cursor-pointer block my-3 border-2 rounded p-4 bg-orange-200 dark:bg-orange-900 dark:text-white"
        >
          Increment it!
        </button>
      </p>
    </>
  );
}
