// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    struct Voter {
        bool hasVoted;
        uint256 votedCandidateId;
    }

    mapping(address => Voter) public voters;
    Candidate[] public candidates;
    uint256 public candidatesCount;
    address public admin;

    event VoteCast(address indexed voter, uint256 candidateId);
    event CandidateAdded(uint256 candidateId, string name);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only the admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function addCandidate(string memory _name) public onlyAdmin {
        candidates.push(Candidate(candidatesCount, _name, 0));
        candidatesCount++;
        emit CandidateAdded(candidatesCount - 1, _name);
    }

    function vote(uint256 _candidateId) public {
        require(_candidateId < candidatesCount, "Invalid candidate ID");
        require(!voters[msg.sender].hasVoted, "You have already voted");

        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedCandidateId = _candidateId;
        candidates[_candidateId].voteCount++;

        emit VoteCast(msg.sender, _candidateId);
    }

    function getCandidateCount() public view returns (uint256) {
        return candidatesCount;
    }

    function getCandidate(
        uint256 _candidateId
    ) public view returns (string memory) {
        require(_candidateId < candidatesCount, "Invalid candidate ID");
        return candidates[_candidateId].name;
    }

    function getVoteCount(uint256 _candidateId) public view returns (uint256) {
        require(_candidateId < candidatesCount, "Invalid candidate ID");
        return candidates[_candidateId].voteCount;
    }
}

// Identify kaise kre ki admin kon hai
// login => check => admin/voter/candidate
