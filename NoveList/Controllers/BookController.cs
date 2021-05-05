using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NoveList.Models;
using NoveList.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoveList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        public BookController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }
        //get books by google search
        [HttpGet("search/{searchTerm=searchTerm}")]
        
        public async Task<IActionResult> SearchBooks(string searchTerm)
        {
           searchTerm = searchTerm.Replace(' ', '+');
           
           var searchResults =  await _bookRepository.Search(searchTerm);
           return Ok(searchResults);
        }

    

        //Add book from Google Search/by GoogleApiId
        [HttpPost("{GoogleApiId}")]
        public IActionResult Post(Book book)
        {
            _bookRepository.Add(book);
            return CreatedAtAction("Get", new { id = book.Id }, book);
        }

        //Delete Book
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _bookRepository.Delete(id);
            return NoContent();
        }


    }
}

