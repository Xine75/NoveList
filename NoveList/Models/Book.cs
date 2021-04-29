﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoveList.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string GoogleApiId { get; set; }
        public int Rating { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
        public int UserId {get; set; }
        public int ShelfId { get; set; }
    }
}
