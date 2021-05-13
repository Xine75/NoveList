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
    public class FriendRepository : BaseRepository, IFriendRepository
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
                                        VALUES (@UserId, @FriendId)";

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
        public List<UserProfile> Search(string searchName)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText =
                        @"SELECT up.Id as UserId, up.FirstName, up.LastName, up.UserName
                            FROM UserProfile up
                            WHERE up.FirstName LIKE @searchName OR up.LastName LIKE @searchName OR up.UserName LIKE @searchName";

                    DbUtils.AddParameter(cmd, "@searchName", $"%{searchName}%");
                    var reader = cmd.ExecuteReader();

                    var friends = new List<UserProfile>();
                    while (reader.Read())
                    {
                        var userId = DbUtils.GetNullableInt(reader, "UserId");

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
                                     LEFT JOIN UserProfile up ON f.FriendId = up.Id";

                    var reader = cmd.ExecuteReader();
                    var friends = new List<Friend>();
                    while (reader.Read())
                    {
                        friends.Add(new Friend()
                        {
                            Id = DbUtils.GetInt(reader, "FriendshipId"),
                            UserId = DbUtils.GetNullableInt(reader, "UserId"),
                            FriendId = DbUtils.GetNullableInt(reader, "Friend"),
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
        //list of friends with googleApiId
        public List<Friend> GetFriendsByBookId(string googleApiId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT f.Id as FriendshipId, f.UserId, f.FriendId as Friend,
                                        up.FirstName, up.LastName, up.UserName,
                                        b.Id, b.GoogleApiId, b.Title
                                        FROM Friend f
                                        LEFT JOIN UserProfile up on up.Id = f.FriendId
                                        LEFT JOIN Book b on b.UserId = up.Id
                                        WHERE b.GoogleApiId = @id";

                    DbUtils.AddParameter(cmd, "@Id", googleApiId);

                    var reader = cmd.ExecuteReader();
                    var friends = new List<Friend>();
                    while (reader.Read())
                    {
                        friends.Add(new Friend()
                        {
                            Id = DbUtils.GetInt(reader, "FriendshipId"),
                            UserId = DbUtils.GetNullableInt(reader, "UserId"),
                            FriendId = DbUtils.GetNullableInt(reader, "Friend"),
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
