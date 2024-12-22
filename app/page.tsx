"use client";

// import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";

export default function Home() {
  const { signOut } = useAuthActions();
  // const createChat = useMutation(api.chats.createChat);
  // const createMessage = useMutation(api.messages.createMessage);
  // const user = useQuery(api.users.current);

  // console.log({ user });

  const { mutate: createChat, isPending: loadingCreateChat } = useMutation({
    mutationFn: useConvexMutation(api.chats.createChat),
  });

  const { mutate: createMessage, isPending: loadingCreateMessage } =
    useMutation({
      mutationFn: useConvexMutation(api.messages.createMessage),
    });

  const chatId = "k572ecqkj06kzpe839bc8wyxzs76xvhm" as Id<"chats">;
  // const messages = useQuery(api.messages.messages, { chatId });
  const {
    data: messages,
    error,
    isPending,
  } = useQuery(convexQuery(api.messages.messages, { chatId }));
  const c = {
    initiatorId: "aaaa",
    participantId: "bbbb",
  };

  async function create() {
    const res = await createChat(c);

    console.log({ res });
  }

  async function MessageCreate() {
    const res = await createMessage({
      content: "hello",
      chatId: "k572ecqkj06kzpe839bc8wyxzs76xvhm" as Id<"chats">,
      images: [],
      opupId: "adfasdfadsf",
      recieverId: "bbbb",
      senderId: "aaaa",
    });
    console.log({ res });
  }

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      {/* {tasks?.res.map(({ _id, text }) => <div key={_id}>{text}</div>)} */}
      <div onClick={() => signOut()}>signOut</div>
      <div onClick={() => create()}>Crate Chat</div>
      <div onClick={() => MessageCreate()}>Crate Message</div>
      {loadingCreateMessage && <div>loadingCreateMessage...</div>}
      <div className="pt-10 flex flex-col gap-2">
        {messages?.map((item, index) => {
          return <div key={index}>{item.content}</div>;
        })}
        {isPending && <div>loading...</div>}
      </div>
    </main>
  );
}
