using Microsoft.EntityFrameworkCore;
using BruteForce.Models;
using System.Collections.Generic;
using System.Reflection.Emit;
using BruteForce.Data.Configurations;

namespace BruteForce.Data
{
    public class GameContext : DbContext
    {
        public GameContext(DbContextOptions<GameContext> options) : base(options)
        {
        }

        public DbSet<Game> Games { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new GameConfiguration());
        }
    }
}
