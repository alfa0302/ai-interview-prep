export const API_PATHS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    GET_PROFILE: "/auth/profile",
  },

  IMAGE: {
    UPLOAD_IMAGE: "/auth/upload-image",
  },

  QUESTIONS: {
    ADD_TO_SESSION: "/questions/add",
    PIN: (id) => `/questions/${id}/pin`,
    UPDATE_NOTE: (id) => `/questions/${id}/note`,
  },

  SESSIONS: {
    CREATE: "/sessions/create",
    GET_ALL: "/sessions/my-sessions",
    GET_ONE: (id) => `/sessions/${id}`,
    DELETE: (id) => `/sessions/${id}`,
  },

  AI: {
    GENERATE_QUESTIONS: "/ai/generate-questions",
    GENERATE_EXPLANATION: "/ai/generate-explanation",
  },
};
