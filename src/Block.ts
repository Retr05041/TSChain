// Imports
import sha256 from 'crypto-js/sha256';

/**
 * Block Object
 * 
 * @author Parker Cranfield
 */
class Block {
    // Block properties
    private data: string;
    private previousHash: string;
    private nonce: number;
    private hash: string;
    private isMined: boolean;

    /**
     * Construcor for Block
     * 
     * @param data Data to be stored in the block
     * @param previousHash Hash of the previous block
     * @param timestamp Timestamp of the block
     */
    constructor(data: string, previousHash: string) {
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
        this.isMined = false;
    }

    /**
     * Gives the data of the block
     * 
     * @returns Data of the block
     */
    public getData() {
        return this.data;
    }

    /**
     * Gives the hash of the block
     * 
     * @returns Hash of the block
     */
    public getHash() {
        return this.hash;
    }

    /**
     * Calculate the hash of the block
     * 
     * @returns Hash of the block
     */
    private calculateHash() {
        return sha256(this.previousHash + this.data + this.nonce).toString();
    }

    /**
     * Mine the block
     * 
     * @param difficulty Difficulty of the block
     */
    public mineBlock(difficulty: number) {
        // Create a string of zeros
        const zeros = Array(difficulty + 1).join("0");

        // Mine the block
        while (this.hash.substring(0, difficulty) !== zeros) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        this.isMined = true;
    }

    /**
     * Creates a new genesis block
     * 
     * @returns Genisis block
     */
    public static createGenesisBlock() {
        return new Block("Genesis Block", "0");
    }

    /**
     * Display the block info
     * 
     * @returns Block info
     */
    public displayInfo() {
        return "Block Info: " + this.data;
    }

    /**
     * Check if the block is mined
     * 
     * @returns If the block is mined
     */
    public isBlockMined() {
        return this.isMined;
    }
}

// Export the Block class
export default Block;