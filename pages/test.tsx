"use client";
import { createPublicClient, http } from "viem";
import {
  useAccount,
  useContractRead,
  usePublicClient,
  useWalletClient,
} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import Metadata from "./metadata.json";
import { useEffect } from "react";
import { polygonMumbai } from "viem/chains";

console.log(Metadata.output.abi);
// import { mainnet,   } from 'viem/chains'

// cons

const client = createPublicClient({
  chain: polygonMumbai,
  // transport: http('https://cloudflare-eth.com/'),
  transport: http(
    "https://polygon-mumbai.infura.io/v3/6ab29688e72d40da8678bf44ed99f65f"
  ),
});

// async function getBlockNumber() {
//   const blockNumber = await client.getBlockNumber();
//   console.log(blockNumber);
// }

// getBlockNumber();

//0xA634de62D606F16E847FEA1F131b2a70Fa0dAbFE

export default function Test() {
  // const { address, isConnecting, isDisconnected } = useAccount();
  const publicClient = usePublicClient();

  const { data: walletClient, isError, isLoading } = useWalletClient();
  console.log(walletClient);
  // console.log(publicClient);

  // const { data, isError, isLoading } = useContractRead({
  //   address: "0xA634de62D606F16E847FEA1F131b2a70Fa0dAbFE",
  //   abi: Metadata.output.abi,
  //   functionName: "owner",
  // });

  // console.log(data);

  // useEffect(() => {
  //   console.log("test")

  //   readContract();
  // }, []);

  async function readContractTest() {
    console.time("readContractTest");
    const data = await publicClient.readContract({
      address: "0xA634de62D606F16E847FEA1F131b2a70Fa0dAbFE",
      abi: Metadata.output.abi,
      functionName: "symbol",
    });

    console.log(data);

    console.timeEnd("readContractTest");
  }

  async function writeContractTest() {
    console.time("readContractTest");

    const [address] = await walletClient.getAddresses();

    const { request } = await publicClient.simulateContract({
      address: "0xA634de62D606F16E847FEA1F131b2a70Fa0dAbFE",
      abi: Metadata.output.abi,
      functionName: "safeMint",
      account: address,
      args: [address, 99],
    });
    const hash = await walletClient.writeContract(request);

    console.log(hash);

    console.timeEnd("readContractTest");
  }
  return (
    <div>
      <ConnectButton />
      <h1>Test</h1>
      <button onClick={readContractTest}>ReadTest</button>
      <button onClick={writeContractTest}>WriteTest</button>
      {/* {address && <p>Address: {address}</p>} */}
      {/* <button onClick={getBlockNumber}>Get Block Number</button> */}
    </div>
  );
}
