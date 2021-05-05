using NoveList.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NoveList.Repositories
{
    public interface IBookRepository
    {
        void Add(Book book);
        void Delete(int id);
        List<Book> GetBooksByCurrentUser(int id);
        Task<List<LimitedSearchResult>> Search(string q);
    }
}