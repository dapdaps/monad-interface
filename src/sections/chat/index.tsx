"use client";

import LoginView from "./login";
import ChatView from "./chat";
import useLogin from "./hooks/use-login";

export default function View() {
  const { status, onUpdateName, updating, currentUser } = useLogin();

  if (status === 1)
    return <LoginView onUpdateName={onUpdateName} updating={updating} />;

  if (status === 2) return <ChatView currentUser={currentUser} />;
}
