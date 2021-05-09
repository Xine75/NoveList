using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoveList.Models
{
    public class Friend
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? FriendId { get; set; }
        public UserProfile friendInfo { get; set; }
    }
}
