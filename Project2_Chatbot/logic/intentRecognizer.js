class IntentRecognizer 
{
    constructor(intentMappings, tokenizer, threshold = 0.4) 
    {
        this.intentMappings = intentMappings;
        this.tokenizer = tokenizer;
        this.threshold = threshold;
    }

    jaccardSimilarity(tokensA, tokensB) 
    {
        const setA = new Set(tokensA);
        const setB = new Set(tokensB);
        const intersection = new Set([...setA].filter(x => setB.has(x)));
        const union = new Set([...setA, ...setB]);
        return intersection.size / union.size;
    }

    recognize(inputText) 
    {
        const inputTokens = this.tokenizer.tokenize(inputText);
        let bestIntent = null;
        let bestScore = 0;

        for (const intentObj of this.intentMappings) 
        {
            const intentName = intentObj.Name;
            const examples = intentObj.Examples;

            if (!Array.isArray(examples)) continue;

            for (const ex of examples) 
            {
                const utteranceTokens = this.tokenizer.tokenize(ex.Utterance);
                const score = this.jaccardSimilarity(inputTokens, utteranceTokens);

                if (score > bestScore) 
                {
                    bestScore = score;
                    bestIntent = intentName;
                }
            }
        }

        return bestScore >= this.threshold ? bestIntent : "unknown";
    }
}

module.exports = IntentRecognizer;