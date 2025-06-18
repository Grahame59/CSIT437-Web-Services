class Tokenizer 
{
    tokenize(text) 
    {
        return text.toLowerCase().split(/\W+/).filter(Boolean);
    }
}

module.exports = Tokenizer;
