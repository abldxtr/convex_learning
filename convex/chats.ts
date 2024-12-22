import { v } from "convex/values";
import { mutation } from "./_generated/server";

// نمونه استفاده در یک تابع mutation
export const createChat = mutation({
  args: {
    initiatorId: v.string(),
    participantId: v.string(),
  },
  handler: async (ctx, args) => {
    const chatId = await ctx.db.insert("chats", {
      initiatorId: args.initiatorId,
      participantId: args.participantId,
    });
    return chatId;
  },
});
