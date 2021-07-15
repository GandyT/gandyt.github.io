import DNA from "../DNA.js";

const runTests = () => {
    const testDNA = new DNA("helloWorld");

    console.log("ORIGINAL: " + testDNA.getString());

    console.log("MUTATED: " + testDNA.getString());

}

export default runTests;
