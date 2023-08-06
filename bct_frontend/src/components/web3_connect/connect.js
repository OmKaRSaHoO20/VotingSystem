import Web3 from "web3";
import { abi, address } from "../../credentials/data";

export default async function initWeb3() {
  const web3 = new Web3("http://localhost:7545");

  const contract = new web3.eth.Contract(abi, address);

  return contract;
}

// const web3 = new Web3(new Web3.providers.HttpProvider("http://remix"));

//   const contract = new web3.eth.Contract(
//     [
//       {
//         inputs: [
//           {
//             internalType: "string",
//             name: "_name",
//             type: "string",
//           },
//         ],
//         name: "addCandidate",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         inputs: [],
//         stateMutability: "nonpayable",
//         type: "constructor",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "candidateId",
//             type: "uint256",
//           },
//           {
//             indexed: false,
//             internalType: "string",
//             name: "name",
//             type: "string",
//           },
//         ],
//         name: "CandidateAdded",
//         type: "event",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "_candidateId",
//             type: "uint256",
//           },
//         ],
//         name: "vote",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//       },
//       {
//         anonymous: false,
//         inputs: [
//           {
//             indexed: true,
//             internalType: "address",
//             name: "voter",
//             type: "address",
//           },
//           {
//             indexed: false,
//             internalType: "uint256",
//             name: "candidateId",
//             type: "uint256",
//           },
//         ],
//         name: "VoteCast",
//         type: "event",
//       },
//       {
//         inputs: [],
//         name: "admin",
//         outputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         name: "candidates",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "id",
//             type: "uint256",
//           },
//           {
//             internalType: "string",
//             name: "name",
//             type: "string",
//           },
//           {
//             internalType: "uint256",
//             name: "voteCount",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "candidatesCount",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "_candidateId",
//             type: "uint256",
//           },
//         ],
//         name: "getCandidate",
//         outputs: [
//           {
//             internalType: "string",
//             name: "",
//             type: "string",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [],
//         name: "getCandidateCount",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "uint256",
//             name: "_candidateId",
//             type: "uint256",
//           },
//         ],
//         name: "getVoteCount",
//         outputs: [
//           {
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//       {
//         inputs: [
//           {
//             internalType: "address",
//             name: "",
//             type: "address",
//           },
//         ],
//         name: "voters",
//         outputs: [
//           {
//             internalType: "bool",
//             name: "hasVoted",
//             type: "bool",
//           },
//           {
//             internalType: "uint256",
//             name: "votedCandidateId",
//             type: "uint256",
//           },
//         ],
//         stateMutability: "view",
//         type: "function",
//       },
//     ],
//     "0xd9145CCE52D386f254917e481eB44e9943F39138"
//   );
