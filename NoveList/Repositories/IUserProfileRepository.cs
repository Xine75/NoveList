using NoveList.Models;
using System.Collections.Generic;

namespace NoveList.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> GetAll();
        UserProfile GetById(int id);
        UserProfile GetByFirebaseId(string firebaseId);
        void Add(UserProfile user);
        void Update(UserProfile user);
        void Delete(int id);
        UserProfile GetUserProfileByIdWithBooks(int id);
    }
}