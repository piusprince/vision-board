import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";

// create a vision board
export const createVisionBoard = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("visionBoards", { name: args.name });
    console.log("Created new vision board with id:", id);
    return id;
  },
});

// create a vision board item
export const createVisionBoardItem = mutation({
  args: {
    visionBoardId: v.string(),
    name: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("visionBoardItems", {
      visionBoardId: args.visionBoardId,
      name: args.name,
      description: args.description,
    });
    console.log("Created new vision board item with id:", id);
    return id;
  },
});

// get all vision board items
export const listVisionBoardItems = query({
  args: {
    visionBoardId: v.string(),
  },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("visionBoardItems")
      .filter({ visionBoardId: args.visionBoardId })
      .order("asc")
      .all();
    return items.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
    }));
  },
});
