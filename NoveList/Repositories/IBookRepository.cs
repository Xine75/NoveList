﻿using NoveList.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NoveList.Repositories
{
    public interface IBookRepository
    {
        Task<List<LimitedSearchResult>> Search(string q);
    }
}