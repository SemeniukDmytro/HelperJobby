namespace ApplicationBLL.Logic;

public static class TextSplitter
{
    public static string[] TextNormalization(string text)
    {
        text = text.ToLower();
        var separators = new[] { ' ', '.', ',', ';', ':', '!', '?'};
        string[] tokens = text.Split(separators, StringSplitOptions.RemoveEmptyEntries);
        return tokens;
    }
}