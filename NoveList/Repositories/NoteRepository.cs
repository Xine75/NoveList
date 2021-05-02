using Microsoft.Extensions.Configuration;
using NoveList.Models;
using NoveList.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoveList.Repositories
{
    public class NoteRepository : BaseRepository
    {
        public NoteRepository(IConfiguration configuration) : base(configuration) { }
        public List<Note>GetNotesByBookId(int id)
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

                    List<Note> NotesByBook = new List<Note>();
                    while (reader.Read())
                    {

                    }
                }
            }
        }
    }
}
