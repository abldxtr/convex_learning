import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { usePreloadedQuery } from "convex/react";
import ClientMessage from "./ClientMessages";
import { preloadQuery } from "convex/nextjs";
import { headers } from "next/headers";

export default async function Server() {
  const headersList = headers();

  const chatId = "k572ecqkj06kzpe839bc8wyxzs76xvhm" as Id<"chats">;

  const preloadedMessages = await preloadQuery(
    api.messages.messages,
    { chatId }
    // پاس دادن headers به preloadQuery
  );

  return (
    <div>
      <ClientMessage preloadedMessages={preloadedMessages} />
    </div>
  );
}
