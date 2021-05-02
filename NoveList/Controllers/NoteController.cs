using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NoveList.Models;
using NoveList.Repositories;

namespace NoveList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private readonly INoteRepository _noteRepository;
        public NoteController(INoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }

        //Get notes by Book Id
        [HttpGet("notes/{bookId}")]
        public IActionResult GetNotesByBookId(int bookId)
        {
            return Ok(_noteRepository.GetNotesByBookId(bookId));
        }

        //Add Note
        [HttpPost]
        public IActionResult Post(Note note)
        {
            _noteRepository.Add(note);
            return CreatedAtAction("Get", new { id = note.Id }, note);
        }

        //Edit a note
        [HttpPut("{id}")]
        public IActionResult Put(int id, Note note)
        {
            if (id != note.Id)
            {
                return BadRequest();
            }
            _noteRepository.Update(note);
            return NoContent();
        }

        //Delete a note
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _noteRepository.Delete(id);
            return NoContent();
        }
    }
}
