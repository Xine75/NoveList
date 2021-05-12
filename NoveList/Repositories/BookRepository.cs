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
            if(response.items==null)
            {
                return null;
            }
            var desiredParts = response.items.Select(item => new LimitedSearchResult(item.id, item.volumeInfo.title, item.volumeInfo.authors, item.volumeInfo.imageLinks.thumbnail, item.volumeInfo.description)).ToList();


            return desiredParts;
        }
        public List<Book> GetAllBooks()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT b.Id as BookId, b.GoogleApiId, b.Title, b.Author, b.Thumbnail, b.Rating, b.Description, b.StartDate, b.FinishDate, b.ShelfId as BookShelfId, b.UserId,
                                        s.Name as Shelf, s.Id as ShelfId
                                    FROM Book b
                                    LEFT JOIN Shelf s on s.Id = b.ShelfId
                                    ORDER BY b.StartDate DESC";

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
                            Rating = DbUtils.GetNullableInt(reader, "Rating"),
                            Description = DbUtils.GetNullableString(reader, "Description"),
                            StartDate = DbUtils.GetDateTime(reader, "StartDate"),
                            FinishDate = DbUtils.GetNullableDateTime(reader, "FinishDate"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            ShelfId = DbUtils.GetNullableInt(reader, "BookShelfId"),
                            shelf = new Shelf()
                            {
                                Id = DbUtils.GetNullableInt(reader, "ShelfId"),
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
                    cmd.CommandText = @"SELECT b.Id as BookId, b.GoogleApiId, b.Title, b.Author, b.Thumbnail, b.Description, b.Rating, b.StartDate, b.FinishDate, b.ShelfId as BookShelfId, b.UserId,
                                        s.Name as Shelf, s.Id as ShelfId
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
                            Description = DbUtils.GetNullableString(reader, "Description"),
                            Rating = DbUtils.GetNullableInt(reader, "Rating"),
                            StartDate = DbUtils.GetDateTime(reader, "StartDate"),
                            FinishDate = DbUtils.GetNullableDateTime(reader, "FinishDate"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            ShelfId = DbUtils.GetNullableInt(reader, "BookShelfId"),
                            shelf = new Shelf()
                            {
                                Id = DbUtils.GetNullableInt(reader, "ShelfId"),
                                Name = DbUtils.GetNullableString(reader, "Shelf")
                            }

                        };
                    }
                    reader.Close();
                    return book;
                }

            }
        }

        //get most recently added book with notes  for landing page
        public Book GetBookByIdWithNotes (int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT b.Id as BookId, b.GoogleApiId, b.Title, b.Author, b.Thumbnail, b.Description, b.Rating, b.StartDate, b.FinishDate, b.ShelfId as BookShelfId, b.UserId,
                                        s.Name as Shelf, s.Id as ShelfId,
                                        n.Id, as NoteId, n.pageNum, n.content, n.bookId
                                    FROM Book b
                                    LEFT JOIN Shelf s on s.Id = b.ShelfId
                                    LEFT JOIN Note n on n.bookId = b.Id
                                    WHERE b.Id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Book book = null;
                    while (reader.Read())
                    {
                        var bookId = DbUtils.GetInt(reader, "BookId");
                        if (book == null)
                        {
                            book = new Book()
                            {
                                Id = DbUtils.GetInt(reader, "BookId"),
                                GoogleApiId = DbUtils.GetString(reader, "GoogleApiId"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Author = DbUtils.GetString(reader, "Author"),
                                Thumbnail = DbUtils.GetString(reader, "Thumbnail"),
                                Description = DbUtils.GetNullableString(reader, "Description"),
                                Rating = DbUtils.GetNullableInt(reader, "Rating"),
                                StartDate = DbUtils.GetDateTime(reader, "StartDate"),
                                FinishDate = DbUtils.GetNullableDateTime(reader, "FinishDate"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                ShelfId = DbUtils.GetNullableInt(reader, "BookShelfId"),
                                shelf = new Shelf()
                                {
                                    Id = DbUtils.GetNullableInt(reader, "ShelfId"),
                                    Name = DbUtils.GetNullableString(reader, "Shelf")
                                },
                                //every post starts with an empty comments list
                                Notes = new List<Note>()
                            };
                        }
                        if (DbUtils.IsNotDbNull(reader, "NoteId"))
                        {
                            book.Notes.Add(new Note()
                            {
                                Id = DbUtils.GetInt(reader, "NoteId"),
                                PageNum = DbUtils.GetInt(reader, "PageNum"),
                                Content = DbUtils.GetString(reader, "Content"),
                                BookId = DbUtils.GetInt(reader, "BookId"),
                            });
                        }
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
                    cmd.CommandText = @"SELECT b.Id as BookId, b.GoogleApiId, b.Title, b.Author, b.Thumbnail, b.Description, b.StartDate, b.FinishDate, b.ShelfId
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
                            Description = DbUtils.GetNullableString(reader, "Description"),
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
                    cmd.CommandText = @"INSERT INTO Book (GoogleApiId, Title, Author, Thumbnail, Description, StartDate, ShelfId, UserId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@GoogleApiId, @Title, @Author, @Thumbnail, @Description, @StartDate, @ShelfId, @UserId)";

                    cmd.Parameters.AddWithValue("@GoogleApiId", book.GoogleApiId);
                    cmd.Parameters.AddWithValue("@Title", book.Title) ;
                    cmd.Parameters.AddWithValue("@Author", book.Author);
                    cmd.Parameters.AddWithValue("@Thumbnail", book.Thumbnail);
                    cmd.Parameters.AddWithValue("@Description", book.Description);
                    cmd.Parameters.AddWithValue("@StartDate", book.StartDate);
                    cmd.Parameters.AddWithValue("@ShelfId", book.ShelfId);
                    cmd.Parameters.AddWithValue("@UserId", book.UserId);

                                           book.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        //edit a book
        public void Update (Book book)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        UPDATE Book
                                        SET Rating = @Rating,
                                            FinishDate = @FinishDate,
                                            ShelfId = @ShelfId
                                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", book.Id);

                    DbUtils.AddParameter(cmd, "@Rating", book.Rating);
                    DbUtils.AddParameter(cmd, "@FinishDate", book.FinishDate);
                    DbUtils.AddParameter(cmd, "@ShelfId", book.ShelfId);

                    cmd.ExecuteNonQuery();

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
