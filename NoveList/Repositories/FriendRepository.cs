using Microsoft.Extensions.Configuration;
using NoveList.Models;
using NoveList.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;

namespace NoveList.Repositories 
{
    public class FriendRepository : BaseRepository
    {
        public FriendRepository(IConfiguration configuration) : base(configuration) { }
        //add friend
        public void Add(Friend friend)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Friend (UserId, FriendId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Friend1, @Friend2)";

                    cmd.Parameters.AddWithValue("@UserId", friend.UserId);
                    cmd.Parameters.AddWithValue("@FriendId", friend.FriendId);


                    friend.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        //remove friend

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Friend WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        //search for friends
        public List<UserProfile> Search(string criterion)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        @"SELECT up.Id as UserId, up.FirstName, up.LastName, up.UserName
                            FROM UserProfile up
                            WHERE up.FirstName LIKE @Criterion OR up.LastName LIKE @Criterion OR up.UserName LIKE @Criterion";

                    DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");
                    var reader = cmd.ExecuteReader();

                    var friends = new List<UserProfile>();
                    while (reader.Read())
                    {
                        var userId = DbUtils.GetInt(reader, "UserId");

                        var userFriend = friends.FirstOrDefault(up => up.Id == userId);
                        //the first time through the loop, it is null bc the list was empty
                        if (userFriend == null)
                        {
                            userFriend = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                UserName = DbUtils.GetString(reader, "UserName")
                            };
                            friends.Add(userFriend);
                        }
                    }
                    reader.Close();
                    return friends;
                }
            }
        }
        //get all friends
        public List<Friend> GetAllFriends()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT f.Id as FriendshipId, f.UserId, f.FriendId as Friend,
                                        up.FirstName, up.LastName, up.UserName
                                     FROM Friend f
                                     LEFT JOIN UserProfile up ON f.Friend1 = up.Id";

                    var reader = cmd.ExecuteReader();
                    var friends = new List<Friend>();
                    while (reader.Read())
                    {
                        friends.Add(new Friend()
                        {
                            Id = DbUtils.GetInt(reader, "FriendshipId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            FriendId = DbUtils.GetInt(reader, "FriendId"),
                            friendInfo = new UserProfile()
                            {
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                UserName = DbUtils.GetString(reader, "UserName")
                            }
                        }
                        );
                    }
                    reader.Close();
                    return friends;
                }
            }
        }
        //list of friends with bookId
        public List <Friend> GetFriendsByBookId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT f.Id as FriendshipId, f.FriendId as Friend,
                                        up.FirstName, up.LastName, up.UserName,
                                        b.Id, b.GoogleApiId, b.Title
                                        FROM Friend f
                                        LEFT JOIN UserProfile on up.Id = f.FriendId
                                        LEFT JOIN Book on b.UserId = up.Id
                                        WHERE b.GoogleApiId = id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    var reader = cmd.ExecuteReader();
                    var friends = new List<Friend>();
                    while (reader.Read())
                    {
                        friends.Add(new Friend()
                        {
                            Id = DbUtils.GetInt(reader, "FriendshipId"),
                            FriendId = DbUtils.GetInt(reader, "Friend"),
                            friendInfo = new UserProfile()
                            {
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                UserName = DbUtils.GetString(reader, "UserName")
                            }
                        });
                    }
                    reader.Close();
                    return friends;
                }
            }
        }
    }
}
