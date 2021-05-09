using NoveList.Models;
using System.Collections.Generic;

namespace NoveList.Repositories
{
    public interface IFriendRepository
    {
        void Add(Friend friend);
        void Delete(int id);
        List<Friend> GetAllFriends();
        List<Friend> GetFriendsByBookId(string id);
        List<UserProfile> Search(string criterion);
    }
}