using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoveList.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string FirebaseId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public List<Book> UserBooks { get; set; }
        public List<UserProfile> UserFriends { get; set; }

    }
}
