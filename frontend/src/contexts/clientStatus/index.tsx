"use client";

import { listStatus } from "@/services/clientsAPI/status";
import { Status } from "@/services/clientsAPI/status/types";
import { ApiError } from "@/services/clientsAPI/types";
import React, { createContext, useState } from "react";

interface ClientStatusContextData {
  clientStatus: Status[] | null;
  listClientStatus: () => Promise<Status[] | ApiError>;
}

const clientStatusContext = createContext<ClientStatusContextData>(
  {} as ClientStatusContextData
);

const ClientStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<Status[] | null>(null);

  const listClientStatus = async () => {
    if (status !== null) return status;
    const data = await listStatus();

    if (Array.isArray(data)) {
      setStatus(data);
    }

    return data;
  };

  return (
    <clientStatusContext.Provider
      value={{ clientStatus: status, listClientStatus }}
    >
      {children}
    </clientStatusContext.Provider>
  );
};

export { clientStatusContext, ClientStatusProvider };
