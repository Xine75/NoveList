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
        //get all books by current user
        [HttpGet("{userId}")]
        public IActionResult GetBooksByCurrentUser(int id)
        {
            return Ok(_bookRepository.GetBooksByCurrentUser(id));
        }


        //Add book from Google Search/by GoogleApiId
        [HttpPost("{GoogleApiId}")]
        public IActionResult Post(Book book)
        {
            //set userId to current user
            var currentUser = GetCurrentUserProfile();
            book.UserId = currentUser.Id;
            //set start date to current date
            book.StartDate = DateTime.Now;

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

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseId(firebaseUserId);
        }


    }
}

