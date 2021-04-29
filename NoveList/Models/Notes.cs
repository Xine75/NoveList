using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoveList.Models
{
    public class Notes
    {
        public int id { get; set; }
        public int PageNum { get; set; }
        public string Content { get; set; }
        public int BookId { get; set; }
    }
}
