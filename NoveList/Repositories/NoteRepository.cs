using Microsoft.Extensions.Configuration;
using NoveList.Models;
using NoveList.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoveList.Repositories
{
    public class NoteRepository : BaseRepository, INoteRepository
    {
        public NoteRepository(IConfiguration configuration) : base(configuration) { }
        public List<Note> GetNotesByBookId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT n.Id as NoteId, n.PageNum, n.Content, n.BookId,
                                        b.GoogleApiId, b.UserId
                                        FROM Note n
                                        LEFT JOIN Book b on b.Id = n.BookId
                                        WHERE b.id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    var notes = new List<Note>();
                    while (reader.Read())
                    {
                        notes.Add(new Note()
                        {
                            Id = DbUtils.GetInt(reader, "NoteId"),
                            PageNum = DbUtils.GetInt(reader, "PageNum"),
                            Content = DbUtils.GetString(reader, "Content"),
                            BookId = DbUtils.GetInt(reader, "BookId"),
                        });
                    }
                    reader.Close();
                    return notes;
                }
            }
        }
        public Note GetNoteById (int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT n.PageNum, n.Content, n.BookId
                                        FROM Note n
                                        WHERE n.id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    var reader = cmd.ExecuteReader();
                    Note note = null;
                    while (reader.Read())
                    {
                        note = new Note()
                        {
                            Id = id,
                            PageNum = DbUtils.GetInt(reader, "PageNum"),
                            Content = DbUtils.GetString(reader, "Content"),
                            BookId = DbUtils.GetInt(reader, "BookId")

                        };
                    }
                    reader.Close();
                    return note;
                }
            }
        }
        public void Add(Note note)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        INSERT INTO Note (PageNum, Content, BookId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@PageNum, @Content, @BookId)";

                    cmd.Parameters.AddWithValue("@PageNum", note.PageNum);
                    cmd.Parameters.AddWithValue("@Content", note.Content);
                    cmd.Parameters.AddWithValue("@BookId", note.BookId);

                    note.Id = (int)cmd.ExecuteScalar();
                    
                }
            }
        }
        public void Update(Note note)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        UPDATE Note
                                        SET PageNum = @PageNum,
                                            Content = @Content
                                            WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@id", note.Id);

                    DbUtils.AddParameter(cmd, "@PageNum", note.PageNum);
                    DbUtils.AddParameter(cmd, "@Content", note.Content);

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
                    cmd.CommandText = "DELETE FROM Note WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
