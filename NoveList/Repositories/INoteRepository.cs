using NoveList.Models;
using System.Collections.Generic;

namespace NoveList.Repositories
{
    public interface INoteRepository
    {
        List<Note> GetNotesByBookId(int id);
        void Add(Note note);
        void Update(Note note);
        void Delete(int id);
        Note GetNoteById(int id);
    }
}