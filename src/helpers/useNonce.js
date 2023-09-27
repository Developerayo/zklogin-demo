import { generateNonce } from "@mysten/zklogin";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { useEffect, useState } from "react";
// Handle Buffer error
window.global = window;
window.Buffer = window.Buffer || require("buffer").Buffer;

function generateRandomBytes(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

function generateRandomness() {
  const randomBytesArray = generateRandomBytes(16); // Generate 16 random bytes

  const bigIntValue = Buffer.from(randomBytesArray).reduce(
    // eslint-disable-next-line no-undef
    (acc, byte) => (acc << 8n) | BigInt(byte),
    0n
  );
  return bigIntValue;
}

const getActiveNetworkSuiClient = async () => {
  try {
    // Create a Sui Client
    const client = new SuiClient({ url: getFullnodeUrl("testnet") });

    // Optionally, you can initialize the client or perform other configurations here

    // Return the initialized client
    return client;
  } catch (error) {
    console.error("Error creating Sui Client:", error);
    throw error; // Handle the error
  }
};

export const useNonce = () => {
  const [nonce, setNonce] = useState(null);
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const getNonce = async () => {
      try {
        const suiClient = await getActiveNetworkSuiClient();
        const { epoch } = await suiClient.getLatestSuiSystemState();

        const maxEpoch = epoch + 2; // this means the ephemeral key will be active for 2 epochs from now.
        const ephemeralKeyPair = new Ed25519Keypair();
        const randomness = generateRandomness();
        const calculatedNonce = generateNonce(
          ephemeralKeyPair.getPublicKey(),
          maxEpoch,
          randomness
        );

        setNonce(calculatedNonce);
        setMetadata({ maxEpoch, randomness });
      } catch (error) {
        console.error("Error getting nonce:", error);
      }
    };
    getNonce();
  }, []);

  return {
    maxEpoch: metadata?.maxEpoch,
    nonce,
    randomness: metadata?.randomness,
  };
};
