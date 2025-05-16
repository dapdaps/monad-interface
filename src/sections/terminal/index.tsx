"use client";

import LoginView from "./login";
import ChatView from "./chat";
import LoadingView from "./loading";
import useLogin from "./hooks/use-login";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function View() {
  const { status, onUpdateName, updating, logining, currentUser, showLoading } =
    useLogin();

  const loadingRef = useRef<any>();
  const [loadDone, setLoadDone] = useState(false);

  useEffect(() => {
    if (showLoading) return;
    loadingRef.current?.onFast();
  }, [showLoading]);

  return (
    <AnimatePresence>
      {!loadDone ? (
        <LoadingView
          key="loading"
          ref={loadingRef}
          onComplete={() => {
            setLoadDone(true);
          }}
        />
      ) : (
        <>
          {status === 1 && (
            <LoginView
              onUpdateName={onUpdateName}
              updating={updating}
              logining={logining}
            />
          )}
          {status === 2 && <ChatView currentUser={currentUser} />}
        </>
      )}
    </AnimatePresence>
  );
}
