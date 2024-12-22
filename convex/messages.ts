import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// نمونه استفاده در یک تابع mutation
export const createMessage = mutation({
  args: {
    content: v.string(),
    chatId: v.id("chats"),
    images: v.array(v.string()),
    senderId: v.string(),
    recieverId: v.string(),
    // status:v.string(),
    opupId: v.string(),

    // سایر پارامترها
  },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("messages", {
      content: args.content,
      image: args.images,
      type: args.images.length > 0 ? "IMAGE" : "TEXT",
      chatId: args.chatId,
      senderId: args.senderId,
      receiverId: args.recieverId,
      status: "SENT",
      opupId: args.opupId,
    });
    return messageId;
  },
});

export const messages = query({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_chatId", (q) => q.eq("chatId", args.chatId))
      .order("desc")
      .collect();

    return messages;
  },
});
