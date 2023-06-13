import { Context, ReactNode, createContext, useState } from "react";

export const ArtworkIdContext = createContext<any | null>(null);

type Props = { children: ReactNode };

const ArtworkIdProvider = ({ children }: Props) => {
  const [artworkId, setArtworkId] = useState(null);
  return (
    <ArtworkIdContext.Provider value={[artworkId, setArtworkId]}>
      {children}
    </ArtworkIdContext.Provider>
  );
};

export default ArtworkIdProvider;