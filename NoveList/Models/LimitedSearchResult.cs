using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoveList.Models
{
    public class LimitedSearchResult
    {

        public string Title { get; set; }
        public List<string> Authors { get; set; }
        public string Thumbnail { get; set; }
        public string TextSnippet { get; set; }

        public LimitedSearchResult (string title, List<string> authors, string thumbnail, string textSnippet)
        {
            Title = title;
            Authors = authors;
            //string authorString = String.Join(",", authors);
            Thumbnail = thumbnail;
            TextSnippet = textSnippet;

        }
    }
}

