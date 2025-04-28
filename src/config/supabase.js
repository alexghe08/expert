
// Placeholder for future Supabase configuration
// DO NOT create Supabase client until user completes integration

// Temporary mock client for maintaining app structure
export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    signInWithPassword: async () => ({ data: null, error: new Error("Supabase not configured") }),
    signOut: async () => ({ error: null })
  },
  from: () => ({
    select: () => ({
      limit: () => ({
        single: async () => ({ data: null, error: new Error("Supabase not configured") })
      })
    }),
    insert: () => ({
      select: () => ({
        single: async () => ({ data: null, error: new Error("Supabase not configured") })
      })
    }),
    update: () => ({
      eq: () => ({
        select: async () => ({ data: null, error: new Error("Supabase not configured") })
      })
    }),
    delete: () => ({
      eq: async () => ({ error: new Error("Supabase not configured") })
    })
  })
};

export const checkConnection = async () => {
  console.warn("Supabase connection not configured");
  return false;
};

export const testConnection = async () => {
  return await checkConnection();
};

export const getConnectionStatus = () => false;
