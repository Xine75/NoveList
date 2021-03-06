using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoveList.Models
{
    public class LimitedSearchResult
    {

        public string Id { get; set; }
        public string Title { get; set; }
        public List<string> Authors { get; set; }
        public string Thumbnail { get; set; }
        public string Description { get; set; }

        public LimitedSearchResult (string id, string title, List<string> authors, string thumbnail, string description)
        {
            Id = id;
            Title = title;
            Authors = authors;
            Thumbnail = thumbnail;
            Description = description;

        }
    }
}

