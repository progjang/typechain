import * as CryptoJS from "crypto-js";

class Block {
    static calculateHash = (
        index:number,
        previousHash:string,
        data:string,
        timestamp:number
    ):string => {
        return CryptoJS.SHA256(index+previousHash+data+timestamp).toString();
    }
    static validateBlockStructure = (aBlock:Block):boolean => {
        if(typeof aBlock.index === "number" && typeof aBlock.previousHash ==="string" && typeof aBlock.hash === "string" && typeof aBlock.data === "string" && typeof aBlock.timestamp === "number") {
            return true;
        }

    }

    public index:number;
    public hash:string;
    public previousHash:string;
    public data:string;
    public timestamp:number;
    public constructor(
        index:number,
        hash:string,
        previousHash:string,
        data:string,
        timestamp:number
    ){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const getLatestBlock = ():Block => {
    return blockChain[blockChain.length - 1]
}
const isBlockValidate = (candidateBlock:Block, previousBlock:Block):boolean => {
    if(!Block.validateBlockStructure(candidateBlock)){
        return false;
    } else if(candidateBlock.index !== previousBlock.index + 1) {
        return false;
    } else if(candidateBlock.previousHash !== previousBlock.hash){
        return false;
    } else if(
        candidateBlock.hash !== Block.calculateHash(
            candidateBlock.index, candidateBlock.previousHash, candidateBlock.data, candidateBlock.timestamp)){
        return false;
    } else {
        return true;
    }
}

const createBlock = (data:string):void =>{
    const latestBlock:Block = getLatestBlock();
    const newIndex:number = latestBlock.index + 1;
    const previousHash:string = latestBlock.hash;
    const newTimestamp:number = Math.round(new Date().getTime()/1000);
    const newHash:string = Block.calculateHash(newIndex, previousHash, data, newTimestamp);
    const newBlock:Block = new Block(newIndex, newHash, previousHash, data, newTimestamp);
    if(isBlockValidate(newBlock, latestBlock)) {
        blockChain.push(newBlock);
    }
}

const genesisBlock:Block = new Block(0,"dfjksdafadskfa;d","1242132423jkfksdkfj","Hello",11122222333333);

let blockChain:Block[] = [genesisBlock];

createBlock("Block1");
createBlock("Block2");
createBlock("Block3");
createBlock("Block4");
createBlock("Done");

console.log(blockChain);

export {};