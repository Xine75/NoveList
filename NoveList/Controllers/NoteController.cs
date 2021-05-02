using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoveList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private readonly INoteRepository _noteRepository;
        public NoteController (INoteController noteController)
        {
            _noteRepository = noteRepository;
        }

        //Get note by Book Id
        [HttpGet("notes/{bookId}")]
        public IActionResult GetNotesByBookId(string bookId)
        {
            return Ok(_noteRepository.GetNotesByBookId(bookId));
        }

        //Add Note
        [HttpPost]
        public IActionResult Post(Note note)
        {
            _noteRepository.Add(note);
            return CreatedAtAction("Get", new { id = note.id } note);
        }

        //Edit a note
        [HttpPut]
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
