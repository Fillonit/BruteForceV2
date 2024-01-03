using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using BruteForce.Models;

namespace BruteForce.Data.Configurations
{
    public class GameConfiguration : IEntityTypeConfiguration<Game>
    {
        public void Configure(EntityTypeBuilder<Game> builder)
        {
            // Configure your Game entity properties, keys, relationships, etc. here
            builder.HasKey(g => g.Id);
            builder.Property(g => g.Title).IsRequired();
            // Add more configuration as needed
        }
    }
}
