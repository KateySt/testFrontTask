"use client";

import { Provider } from "react-redux";
import React from "react";
import { makeStore } from "@/store/store";

type Props = {
  children: React.ReactNode;
};

export function StorageProvider({ children }: Props) {
  return <Provider store={makeStore()}>{children}</Provider>;
}
