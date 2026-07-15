"use client";

import { useEffect, useRef } from "react";
import { getSocket } from "@/lib/socket";
import type { Socket } from "socket.io-client";

interface UseSocketOptions {
  onMessage?: (payload: any) => void;
}

export function useSocket({ onMessage }: UseSocketOptions = {}): Socket | null {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = getSocket();
    socketRef.current = socket;

    if (onMessage) {
      socket.on("chat:message", onMessage);
    }

    return () => {
      if (onMessage) {
        socket.off("chat:message", onMessage);
      }
    };
  }, [onMessage]);

  return socketRef.current;
}
