class ResponseGenerator 
{
    constructor(responseMappings) 
    {
        this.responseMappings = responseMappings;
    }

    getResponse(intent) 
    {
        const responses = this.responseMappings[intent];
        if (!responses || responses.length === 0) return "I'm not sure how to respond.";
        const randomIndex = Math.floor(Math.random() * responses.length);
        return responses[randomIndex];
    }
}

module.exports = ResponseGenerator;
