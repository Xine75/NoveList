using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        

    
    }
}

