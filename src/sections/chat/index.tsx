"use client";

import LoginView from "./login";
import ChatView from "./chat";
import LoadingView from "./loading";
import useLogin from "./hooks/use-login";
import { useEffect } from "react";

export default function View() {
  const { status, onUpdateName, updating, currentUser, showLoading } =
    useLogin();

  return (
    <>
      {showLoading && <LoadingView />}
      {status === 1 && (
        <LoginView onUpdateName={onUpdateName} updating={updating} />
      )}
      {status === 2 && <ChatView currentUser={currentUser} />}
    </>
  );
}
