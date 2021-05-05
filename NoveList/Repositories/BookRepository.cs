using Microsoft.Extensions.Configuration;
using NoveList.Models;
using NoveList.Utils;
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

            var desiredParts = response.items.Select(item => new LimitedSearchResult(item.id, item.volumeInfo.title, item.volumeInfo.authors, item.volumeInfo.imageLinks.thumbnail, item.searchInfo.textSnippet)).ToList();


            return desiredParts;
        }
        //get all books of current user
        public List<Book> GetBooksByCurrentUser(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT b.Id as BookId, b.GoogleApiId, b.StartDate, b.FinishDate, b.ShelfId
                                    FROM Book b
                                    WHERE b.userId = @Id
                                    ORDER BY b.StartDate ASC";

                    var reader = cmd.ExecuteReader();
                    var books = new List<Book>();
                    while (reader.Read())
                    {
                        books.Add(new Book()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            GoogleApiId = DbUtils.GetString(reader, "GoogleApiId"),
                            ShelfId = DbUtils.GetInt(reader, "ShelfId"),
                            StartDate = DbUtils.GetDateTime(reader, "StartDate"),
                            FinishDate = DbUtils.GetDateTime(reader, "FinishDate")
                        });
                    }
                    reader.Close();
                    return books;
                }
            }
        }
        //add book by GoogleApiId
        public void Add(Book book)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Book (GoogleApiId, StartDate, ShelfId, UserId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@GoogleApiId, @StartDate, @UserId)";

                    cmd.Parameters.AddWithValue("@GoogleApiId", book.GoogleApiId);
                    cmd.Parameters.AddWithValue("@StartDate", book.StartDate);
                    cmd.Parameters.AddWithValue("@ShelfId", book.ShelfId);
                    cmd.Parameters.AddWithValue("@UserId", book.UserId);

                    book.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Book WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
