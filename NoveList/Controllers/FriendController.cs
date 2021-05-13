using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    public class FriendController : ControllerBase
    {
        private readonly IFriendRepository _friendRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public FriendController(IFriendRepository friendRepository, IUserProfileRepository userProfileRepository)
        {
            _friendRepository = friendRepository;
            _userProfileRepository = userProfileRepository;
        }

        //Add friend
        [HttpPost]
        public IActionResult Create(Friend friend)
        {
            _friendRepository.Add(friend);
            return NoContent();
        }

        //Delete friend
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _friendRepository.Delete(id);
            return NoContent();
        }
        //search for a friend
        [HttpGet("search/{searchName=searchName}")]
        public IActionResult Search(string searchName)
        {
            return Ok(_friendRepository.Search(searchName));
        }
        //get all friends
        [HttpGet]
        public IActionResult GetAllFriends()
        {
            return Ok(_friendRepository.GetAllFriends());
        }

        //get friends by book id
        [HttpGet("{googleApiId}")]
        public IActionResult GetFriendsByBookId(string googleApiId)
        {
            return Ok(_friendRepository.GetFriendsByBookId(googleApiId));
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseId(firebaseUserId);
        }


    }
}
