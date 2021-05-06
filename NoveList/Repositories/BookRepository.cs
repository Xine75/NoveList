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

            var searchTask = client.GetStreamAsync($"https://www.googleapis.com/books/v1/volumes?q={searchTerms}&printType=books&key=AIzaSyAWa0D5qNDRqhiLmfU5nE3w7X5ivwP9MZ8");
            var response = await JsonSerializer.DeserializeAsync<SearchResponse>(await searchTask);

            var desiredParts = response.items.Select(item => new LimitedSearchResult(item.id, item.volumeInfo.title, item.volumeInfo.authors, item.volumeInfo.imageLinks.thumbnail, item.searchInfo.textSnippet)).ToList();


            return desiredParts;
        }
        public List<Book> GetAllBooks()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT b.Id as BookId, b.GoogleApiId, b.Title, b.Author, b.Thumbnail, b.TextSnippet, b.StartDate, b.FinishDate, b.UserId,
                                        s.Name as Shelf
                                    FROM Book b
                                    LEFT JOIN Shelf s on s.Id = b.ShelfId
                                    ORDER BY b.StartDate ASC";

                    var reader = cmd.ExecuteReader();
                    var books = new List<Book>();
                    while (reader.Read())
                    {
                        books.Add(new Book()
                        {
                            Id = DbUtils.GetInt(reader, "BookId"),
                            GoogleApiId = DbUtils.GetString(reader, "GoogleApiId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Author = DbUtils.GetString(reader, "Author"),
                            Thumbnail = DbUtils.GetString(reader, "Thumbnail"),
                            TextSnippet = DbUtils.GetString(reader, "TextSnippet"),
                            StartDate = DbUtils.GetDateTime(reader, "StartDate"),
                            FinishDate = DbUtils.GetNullableDateTime(reader, "FinishDate"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            shelf = new Shelf()
                            {
                                Name = DbUtils.GetNullableString(reader, "Shelf") 
                            }
                        }
                        );
                    }
                    reader.Close();
                    return books;
                }
            }
        }

        //get book by Id
        public Book GetBookById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT b.Id as BookId, b.GoogleApiId, b.Title, b.Author, b.Thumbnail, b.TextSnippet, b.StartDate, b.FinishDate, b.UserId,
                                        s.Name as Shelf
                                    FROM Book b
                                    LEFT JOIN Shelf s on s.Id = b.ShelfId
                                    WHERE b.Id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    Book book = null;
                    while (reader.Read())
                    {
                        book = new Book()
                        {
                            Id = DbUtils.GetInt(reader, "BookId"),
                            GoogleApiId = DbUtils.GetString(reader, "GoogleApiId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Author = DbUtils.GetString(reader, "Author"),
                            Thumbnail = DbUtils.GetString(reader, "Thumbnail"),
                            TextSnippet = DbUtils.GetString(reader, "TextSnippet"),
                            StartDate = DbUtils.GetDateTime(reader, "StartDate"),
                            FinishDate = DbUtils.GetNullableDateTime(reader, "FinishDate"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            shelf = new Shelf()
                            {
                                Name = DbUtils.GetNullableString(reader, "Shelf")
                            }

                        };
                    }
                    reader.Close();
                    return book;
                }

            }
        }


        //get all books of current user
        public List<Book> GetBooksByCurrentUser(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT b.Id as BookId, b.GoogleApiId, b.Title, b.Author, b.Thumbnail, b.TextSnippet, b.StartDate, b.FinishDate, b.ShelfId
                                    FROM Book b
                                    WHERE b.userId = @id
                                    ORDER BY b.StartDate ASC";

                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();
                    var books = new List<Book>();
                    while (reader.Read())
                    {
                        books.Add(new Book()
                        {
                            Id = DbUtils.GetInt(reader, "BookId"),
                            GoogleApiId = DbUtils.GetString(reader, "GoogleApiId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Author = DbUtils.GetString(reader, "Author"),
                            Thumbnail = DbUtils.GetString(reader, "Thumbnail"),
                            TextSnippet = DbUtils.GetString(reader, "TextSnippet"),
                            ShelfId = DbUtils.GetInt(reader, "ShelfId"),
                            StartDate = DbUtils.GetDateTime(reader, "StartDate"),
                            FinishDate = DbUtils.GetNullableDateTime(reader, "FinishDate")
                        });
                    }
                    reader.Close();
                    return books;
                }
            }
        }
  

        //add book 
        public void Add(Book book)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Book (GoogleApiId, Title, Author, Thumbnail, TextSnippet, StartDate, ShelfId, UserId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@GoogleApiId, @Title, @Author, @Thumbnail, @TextSnippet, @StartDate, @ShelfId, @UserId)";

                    cmd.Parameters.AddWithValue("@GoogleApiId", book.GoogleApiId);
                    cmd.Parameters.AddWithValue("@Title", book.Title) ;
                    cmd.Parameters.AddWithValue("@Author", book.Author);
                    cmd.Parameters.AddWithValue("@Thumbnail", book.Thumbnail);
                    cmd.Parameters.AddWithValue("@TextSnippet", book.TextSnippet);
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
