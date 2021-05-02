using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;

namespace NoveList
{
    public class Program
    {
        private static readonly HttpClient client = new HttpClient();

        static async Task Main(string[] args)
        {
            await ProcessRepositories();
        }

        private static async Task ProcessRepositories()
        {
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

            var streamTask = client.GetStreamAsync("GET https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?&key=AIzaSyAWa0D5qNDRqhiLmfU5nE3w7X5ivwP9MZ8");

            ////var streamTask = client.GetStreamAsync("https://www.googleapis.com/books/v1/volumes?q={searchTerms}&key=AIzaSyAWa0D5qNDRqhiLmfU5nE3w7X5ivwP9MZ8");
            var repositories = await JsonSerializer.DeserializeAsync<List<Rootobject>>(await streamTask);

            foreach (var repo in repositories)
                Console.WriteLine(repo.Kind);
        }




        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });

      
    }
}
