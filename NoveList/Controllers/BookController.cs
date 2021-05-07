using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NoveList.Models;
using NoveList.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace NoveList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public BookController(IBookRepository bookRepository, IUserProfileRepository userProfileRepository)
        {
            _bookRepository = bookRepository;
            _userProfileRepository = userProfileRepository;
        }
        //get books by google search
        [HttpGet("search/{searchTerm=searchTerm}")]
        
        public async Task<IActionResult> SearchBooks(string searchTerm)
        {
           searchTerm = searchTerm.Replace(' ', '+');
           
           var searchResults =  await _bookRepository.Search(searchTerm);
           return Ok(searchResults);
        }

        //get all books
        [HttpGet]
        public IActionResult GetAllBooks()
        {
            return Ok(_bookRepository.GetAllBooks());
        }

        //get book by Id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var book = _bookRepository.GetBookById(id);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        //get all books by current user
        //[HttpGet("{id}")]
        //public IActionResult GetBooksByCurrentUser(int id)
        //{
        //    return Ok(_bookRepository.GetBooksByCurrentUser(id));
        //}

        //Add book from Google Search
        [HttpPost]
        public IActionResult Create(Book book)
        {
 
            var currentUser = GetCurrentUserProfile();
            book.UserId = currentUser.Id;
 
            book.StartDate = DateTime.Now;

            _bookRepository.Add(book);
            return NoContent();
        }

        //edit a book
        [HttpPut("{id}")]
        public IActionResult Put(int id, Book book)
        {
            if (id != book.Id)
            {
                return BadRequest();
            }

            _bookRepository.Update(book);
            return NoContent();
        }


        //Delete Book
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _bookRepository.Delete(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseId(firebaseUserId);
        }


    }
}

