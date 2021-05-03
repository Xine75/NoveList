using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoveList.Models
{
    public class DesiredSearchResult
    {

        public string Title { get; set; }
        public string Author { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }

        public DesiredSearchResult (string title, string author, string imageUrl, string description)
        {
            Title = title;
            Author = author;
            ImageUrl = imageUrl;
            Description = description;

        }
    }
}
