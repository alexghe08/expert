
import { supabase } from "./client";
import { handleConnectionError } from "./connectionManager";

export async function createNotification(userId, type, title, message) {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .insert([{
        user_id: userId,
        type,
        title,
        message,
        read: false
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating notification:", error);
    handleConnectionError(error);
    throw error;
  }
}

export async function getUserNotifications(userId, page = 1, limit = 10) {
  try {
    const { data, error, count } = await supabase
      .from("notifications")
      .select("*", { count: "exact" })
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (error) throw error;
    return {
      notifications: data,
      total: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit)
    };
  } catch (error) {
    console.error("Error fetching notifications:", error);
    handleConnectionError(error);
    throw error;
  }
}
