using NoveList.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NoveList.Repositories
{
    public interface IBookRepository
    {
        Task<SearchResponse> Search(string q);
    }
}