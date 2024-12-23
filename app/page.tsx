"use client";

// import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { Id } from "@/convex/_generated/dataModel";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { useMutation, useQuery } from "convex/react";

export default function Home() {
  const { signOut } = useAuthActions();
  let chatId = "k572ecqkj06kzpe839bc8wyxzs76xvhm" as Id<"chats">;

  // const queryClient = useQueryClient();
  // const createChat = useMutation(api.chats.createChat);
  // const createMessage = useMutation(api.messages.createMessage);
  // const user = useQuery(api.users.current);

  // console.log({ user });

  // const { mutate: createChat, isPending: loadingCreateChat } = useMutation({
  //   mutationFn: useConvexMutation(api.chats.createChat),
  // });

  // const { mutate: createMessage, isPending: loadingCreateMessage } =
  //   useMutation({
  //     mutationFn: useConvexMutation(api.messages.createMessage),
  //   });

  // const createM = useMutation(api.messages.createMessage).withOptimisticUpdate(
  //   (localStore, args) => {
  //     const { content } = args;
  //     const currentValue = localStore.getQuery(api.messages.messages);
  //     console.log({ currentValue });
  //     // if (currentValue !== undefined) {
  //     //   localStore.setQuery(api.messages.get, {}, currentValue + increment);
  //     // }
  //   }
  // );

  const createM = useMutation(api.messages.createMessage).withOptimisticUpdate(
    (localStore, args) => {
      const { content } = args;
      const currentValue = localStore.getQuery(api.messages.messages, {
        chatId,
      });
      console.log({ currentValue });

      if (currentValue !== undefined) {
        const now = Date.now() as number;
        const id = "123333" as Id<"messages">;
        // افزودن پیام جدید به لیست فعلی
        localStore.setQuery(
          api.messages.messages,
          {
            chatId,
          },
          [
            ...currentValue,
            {
              content,
              chatId,
              image: [],
              opupId: "123",
              receiverId: "123",
              senderId: "123",
              status: "DELIVERED",
              type: "TEXT",
              _creationTime: now,
              _id: id,
            }, // پیام موقت
          ]
        );
      }
    }
  );

  const messages = useQuery(api.messages.messages, { chatId });
  // const {
  //   data: messages,
  //   error,
  //   isPending,
  // } = useQuery(convexQuery(api.messages.messages, { chatId }));
  const c = {
    initiatorId: "aaaa",
    participantId: "bbbb",
  };

  async function create() {
    // const res = await createChat(c);
    // console.log({ res });
  }
  interface MessageData {
    content: string;
    chatId: Id<"chats">;
    images: string[];
    opupId: string;
    recieverId: string;
    senderId: string;
  }
  async function sendMessageToAPI(data: MessageData) {
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }

  async function MessageCreate() {
    const cc = {
      content: "hello",
      chatId: "k572ecqkj06kzpe839bc8wyxzs76xvhm" as Id<"chats">,
      images: [],
      opupId: "adfasdfadsf",
      recieverId: "bbbb",
      senderId: "aaaa",
    };
    // const res = await createMessage(cc);
    // const res = await sendMessageToAPI(cc);
    const res = await createM(cc);

    console.log({ res });
  }

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      {/* {tasks?.res.map(({ _id, text }) => <div key={_id}>{text}</div>)} */}
      <div onClick={() => signOut()}>signOut</div>
      <div onClick={() => create()}>Crate Chat</div>
      <div onClick={() => MessageCreate()}>Crate Message</div>
      {/* {loadingCreateMessage && <div>loadingCreateMessage...</div>} */}
      <div className="pt-10 flex flex-col gap-2">
        {messages?.map((item, index) => {
          return (
            <div key={index}>
              {item.opupId === "123" && <span>@</span>}
              {item.content}
            </div>
          );
        })}
        {/* {isPending && <div>loading...</div>} */}
      </div>
    </main>
  );
}
