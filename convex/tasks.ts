import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    const res = await ctx.db.query("tasks").collect();
    return userId;
  },
});
