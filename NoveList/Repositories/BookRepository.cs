using Microsoft.Extensions.Configuration;
using NoveList.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;

namespace NoveList.Repositories
{
    public class BookRepository : BaseRepository, IBookRepository
    {
        public BookRepository(IConfiguration configuration) : base(configuration) { }

        private static readonly HttpClient client = new HttpClient();
        public async Task<List<LimitedSearchResult>> Search(string searchTerms)
        {
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

            var searchTask = client.GetStreamAsync($"https://www.googleapis.com/books/v1/volumes?q={searchTerms}&key=AIzaSyAWa0D5qNDRqhiLmfU5nE3w7X5ivwP9MZ8");
            var response = await JsonSerializer.DeserializeAsync<SearchResponse>(await searchTask);

            var desiredParts = response.items.Select(item => new LimitedSearchResult(item.volumeInfo.title, item.volumeInfo.authors, item.volumeInfo.imageLinks.thumbnail, item.searchInfo.textSnippet)).ToList();


            return desiredParts;
        }
    }
}
