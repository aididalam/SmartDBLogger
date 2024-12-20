// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DatabaseLogger {
    struct LogEntry {
        uint256 id;
        string operation;
        string tableName;
        string data;
        uint256 timestamp;
    }

    LogEntry[] public logs;
    uint256 public logCounter;

    event LogAdded(uint256 id, string operation, string tableName, string data, uint256 timestamp);

    // Add a log to the blockchain
    function addLog(
        string memory _operation,
        string memory _tableName,
        string memory _data
    ) public {
        logCounter++;
        logs.push(LogEntry({
            id: logCounter,
            operation: _operation,
            tableName: _tableName,
            data: _data,
            timestamp: block.timestamp
        }));

        emit LogAdded(logCounter, _operation, _tableName, _data, block.timestamp);
    }

    // Retrieve a specific log by ID
    function getLog(uint256 _id)
        public
        view
        returns (
            uint256 id,
            string memory operation,
            string memory tableName,
            string memory data,
            uint256 timestamp
        )
    {
        require(_id > 0 && _id <= logCounter, "Log ID does not exist.");
        LogEntry storage log = logs[_id - 1];
        return (log.id, log.operation, log.tableName, log.data, log.timestamp);
    }

    // Retrieve all logs
    function getAllLogs() public view returns (LogEntry[] memory) {
        return logs;
    }
}
